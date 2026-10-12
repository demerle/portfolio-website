/**
 * Water ripple post-processing pass.
 *
 * Recreates the classic "jquery.ripples" WebGL water simulation natively:
 * a ping-pong height/velocity simulation rendered over the main scene as a
 * screen-space refraction pass. The whole hero (the 3D room) appears to sit
 * behind rippling water; pointer movement and ambient drops perturb it.
 *
 * Render pipeline per frame (driven by WaterRipples.svelte):
 *   1. simulate:     simA <- waveUpdate(simB, drops)   (ping-pong, 512²)
 *   2. scene:        sceneRT <- renderer.render(scene, camera)
 *   3. composite:    screen <- distort(sceneRT, simA)
 */

import * as THREE from 'three';

const SIM_SIZE = 512;
const MAX_DROPS_PER_FRAME = 4;

const fullscreenVertex = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = vec4(position.xy, 0.0, 1.0);
	}
`;

const simFragment = /* glsl */ `
	precision highp float;

	uniform sampler2D uPrev;
	uniform vec2 uDelta;
	uniform vec4 uDrops[${MAX_DROPS_PER_FRAME}]; // xy = uv, z = radius (uv), w = strength
	uniform int uDropCount;
	varying vec2 vUv;

	void main() {
		vec4 info = texture2D(uPrev, vUv);

		// Average neighbouring heights -> velocity -> height (wave equation)
		vec2 dx = vec2(uDelta.x, 0.0);
		vec2 dy = vec2(0.0, uDelta.y);
		float average = (
			texture2D(uPrev, vUv - dx).r +
			texture2D(uPrev, vUv - dy).r +
			texture2D(uPrev, vUv + dx).r +
			texture2D(uPrev, vUv + dy).r
		) * 0.25;

		info.g += (average - info.r) * 2.0;
		info.g *= 0.995; // damping (matches jquery.ripples)
		info.r += info.g;

		// Inject drops queued this frame
		for (int i = 0; i < ${MAX_DROPS_PER_FRAME}; i++) {
			if (i >= uDropCount) break;
			vec4 d = uDrops[i];
			float drop = max(0.0, 1.0 - length(d.xy - vUv) / d.z);
			drop = 0.5 - cos(drop * 3.14159265) * 0.5;
			info.r += drop * d.w;
		}

		// Safety clamps only — the reference has none, these never fire in
		// normal operation but stop runaway blow-ups (half-float buffers).
		info.r = clamp(info.r, -0.5, 0.5);
		info.g = clamp(info.g, -0.5, 0.5);

		gl_FragColor = info;
	}
`;

const compositeFragment = /* glsl */ `
	precision highp float;

	uniform sampler2D uScene;
	uniform sampler2D uWater;
	uniform vec2 uDelta;
	uniform float uPerturbance;
	varying vec2 vUv;

	void main() {
		// Surface normal from one-sided height derivatives — the same math as
		// the jquery.ripples render shader. The cross of the two surface
		// slant vectors yields a unit normal; its xz components drive both
		// refraction and shading.
		float height = texture2D(uWater, vUv).r;
		float heightX = texture2D(uWater, vec2(vUv.x + uDelta.x, vUv.y)).r;
		float heightY = texture2D(uWater, vec2(vUv.x, vUv.y + uDelta.y)).r;
		vec3 dx = vec3(uDelta.x, heightX - height, 0.0);
		vec3 dy = vec3(0.0, heightY - height, uDelta.y);
		vec2 offset = -normalize(cross(dy, dx)).xz;

		// Signature wavefront glint: a white plus whose intensity peaks where
		// the surface normal aligns with the fixed light direction. The
		// original adds it in display space (max 1.0); here it lands in linear
		// space and the tone mapping keeps it within range. Scaled ×0.7 — the
		// literal port read slightly hot on this dark scene.
		float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0) * 0.7;

		// Refraction of the underlying scene (linear working space)
		vec3 color = texture2D(uScene, vUv + offset * uPerturbance).rgb + specular;

		gl_FragColor = vec4(color, 1.0);
		// Tone mapping + encoding happen here: three.js skips them when a
		// scene renders into a render target, but the composite renders to
		// screen — so this restores the exact same look as a direct render.
		#include <tonemapping_fragment>
		#include <colorspace_fragment>
	}
`;

function createFullscreenTriangle(): THREE.BufferGeometry {
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		'position',
		new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
	);
	geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
	return geometry;
}

export interface Drop {
	x: number; // uv space [0,1]
	y: number; // uv space [0,1]
	radius: number; // uv space
	strength: number;
}

export class WaterRipplePass {
	private renderer: THREE.WebGLRenderer;

	private simA: THREE.WebGLRenderTarget;
	private simB: THREE.WebGLRenderTarget;
	private sceneRT: THREE.WebGLRenderTarget;

	private simScene = new THREE.Scene();
	private simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	private simMaterial: THREE.ShaderMaterial;

	private outScene = new THREE.Scene();
	private outCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	private outMaterial: THREE.ShaderMaterial;

	private queue: Drop[] = [];
	private ambientTimer = 2.5;

	/** When false the scene renders straight to screen (no water). */
	active = true;
	/** UV-space refraction amount (jquery.ripples calls this `perturbance`). */
	perturbance = 0.03;

	constructor(renderer: THREE.WebGLRenderer) {
		this.renderer = renderer;

		const rtSettings: THREE.RenderTargetOptions = {
			format: THREE.RGBAFormat,
			type: THREE.HalfFloatType,
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			depthBuffer: false,
			stencilBuffer: false
		};
		this.simA = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtSettings);
		this.simB = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtSettings);

		const bufferSize = renderer.getDrawingBufferSize(new THREE.Vector2());
		this.sceneRT = new THREE.WebGLRenderTarget(bufferSize.x, bufferSize.y, {
			format: THREE.RGBAFormat,
			type: THREE.UnsignedByteType,
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			depthBuffer: true,
			samples: 0
		});

		// Zero the simulation buffers (render targets are uninitialized)
		const prevClear = renderer.getClearColor(new THREE.Color());
		const prevAlpha = renderer.getClearAlpha();
		renderer.setClearColor(0x000000, 1);
		for (const target of [this.simA, this.simB]) {
			renderer.setRenderTarget(target);
			renderer.clear();
		}
		renderer.setClearColor(prevClear, prevAlpha);
		renderer.setRenderTarget(null);

		const triangle = createFullscreenTriangle();

		this.simMaterial = new THREE.ShaderMaterial({
			vertexShader: fullscreenVertex,
			fragmentShader: simFragment,
			uniforms: {
				uPrev: { value: this.simB.texture },
				uDelta: { value: new THREE.Vector2(1 / SIM_SIZE, 1 / SIM_SIZE) },
				uDrops: {
					value: Array.from({ length: MAX_DROPS_PER_FRAME }, () => new THREE.Vector4())
				},
				uDropCount: { value: 0 }
			},
			depthTest: false,
			depthWrite: false
		});
		this.simScene.add(new THREE.Mesh(triangle, this.simMaterial));

		this.outMaterial = new THREE.ShaderMaterial({
			vertexShader: fullscreenVertex,
			fragmentShader: compositeFragment,
			uniforms: {
				uScene: { value: this.sceneRT.texture },
				uWater: { value: this.simA.texture },
				uDelta: { value: new THREE.Vector2(1 / SIM_SIZE, 1 / SIM_SIZE) },
				uPerturbance: { value: this.perturbance }
			},
			depthTest: false,
			depthWrite: false
		});
		this.outScene.add(new THREE.Mesh(triangle, this.outMaterial));
	}

	/** Re-align the scene render target with the drawing buffer size. */
	resize(width: number, height: number, dpr: number): void {
		if (width <= 0 || height <= 0) return;
		this.sceneRT.setSize(Math.ceil(width * dpr), Math.ceil(height * dpr));
	}

	/** Queue a drop. Coordinates are in uv space, y already flipped for GL. */
	addDrop(x: number, y: number, radius: number, strength: number): void {
		this.queue.push({ x, y, radius, strength });
	}

	/** Advance the simulation one frame and handle ambient rain. */
	step(delta: number): void {
		if (!this.active) return;

		// Occasional ambient drop so the water is never fully still
		// (subtle: the reference has none, but a dead-flat hero feels inert)
		this.ambientTimer -= delta;
		if (this.ambientTimer <= 0) {
			this.queue.push({
				x: Math.random(),
				y: Math.random(),
				radius: 0.015 + Math.random() * 0.02,
				strength: 0.012 + Math.random() * 0.018
			});
			this.ambientTimer = 3.0 + Math.random() * 4.0;
		}

		// Write up to N queued drops into uniforms
		const drops = this.simMaterial.uniforms.uDrops.value as THREE.Vector4[];
		const count = Math.min(MAX_DROPS_PER_FRAME, this.queue.length);
		for (let i = 0; i < count; i++) {
			const d = this.queue[i]!;
			drops[i]!.set(d.x, d.y, d.radius, d.strength);
		}
		this.simMaterial.uniforms.uDropCount.value = count;
		this.queue = this.queue.slice(MAX_DROPS_PER_FRAME);

		// Ping-pong: simA <- update(simB)
		this.simMaterial.uniforms.uPrev.value = this.simB.texture;
		this.renderer.setRenderTarget(this.simA);
		this.renderer.render(this.simScene, this.simCamera);
		const tmp = this.simA;
		this.simA = this.simB;
		this.simB = tmp;
	}

	/**
	 * Render the scene: through the water pass when active, straight to
	 * screen otherwise.
	 */
	render(scene: THREE.Scene, camera: THREE.Camera): void {
		if (!this.active) {
			this.renderer.setRenderTarget(null);
			this.renderer.render(scene, camera);
			return;
		}

		this.renderer.setRenderTarget(this.sceneRT);
		this.renderer.render(scene, camera);

		this.outMaterial.uniforms.uScene.value = this.sceneRT.texture;
		this.outMaterial.uniforms.uWater.value = this.simA.texture;
		this.outMaterial.uniforms.uPerturbance.value = this.perturbance;

		this.renderer.setRenderTarget(null);
		this.renderer.render(this.outScene, this.outCamera);
	}

	dispose(): void {
		this.simA.dispose();
		this.simB.dispose();
		this.sceneRT.dispose();
		this.simMaterial.dispose();
		this.outMaterial.dispose();
	}
}
