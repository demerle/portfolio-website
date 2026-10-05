<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Stars } from '@threlte/extras';
	import { AdditiveBlending, BackSide, Color, ShaderMaterial, Vector3 } from 'three';

	const { scene } = useThrelte();

	// Deep space backdrop
	$effect(() => {
		const previous = scene.background;
		scene.background = new Color('#050510');
		return () => {
			scene.background = previous;
		};
	});

	// Nebula dome shader — huge inverted sphere with soft color washes
	const nebulaMaterial = new ShaderMaterial({
		side: BackSide,
		depthWrite: false,
		uniforms: {},
		vertexShader: /* glsl */ `
			varying vec3 vPos;
			void main() {
				vPos = position;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: /* glsl */ `
			precision highp float;
			varying vec3 vPos;

			void main() {
				// Normalized direction
				vec3 d = normalize(vPos);

				// Vertical gradient: deep indigo overhead -> near-black below
				float h = d.y * 0.5 + 0.5;
				vec3 top = vec3(0.024, 0.031, 0.086);
				vec3 mid = vec3(0.012, 0.014, 0.043);
				vec3 bottom = vec3(0.004, 0.004, 0.012);
				vec3 color = mix(bottom, mid, smoothstep(0.0, 0.55, h));
				color = mix(color, top, smoothstep(0.5, 1.0, h));

				// Soft nebula washes
				float wash1 = smoothstep(0.72, 0.0, distance(d, normalize(vec3(-0.6, 0.35, -0.7))));
				float wash2 = smoothstep(0.8, 0.0, distance(d, normalize(vec3(0.7, 0.15, -0.4))));
				color += vec3(0.05, 0.07, 0.16) * wash1 * wash1;
				color += vec3(0.09, 0.045, 0.11) * wash2 * wash2;

				// Author palette is display-referred; convert to linear working
				// space, then let the standard chunks tone-map + encode — the
				// same rules the built-in materials follow.
				color = pow(clamp(color, vec3(0.0), vec3(1.0)), vec3(2.2));
				gl_FragColor = vec4(color, 1.0);
				#include <tonemapping_fragment>
				#include <colorspace_fragment>
			}
		`
	});

	// ================= Shooting star =================
	let shootingStarVisible = $state(false);
	const DISABLE_METEOR_TEST = false;
	let shootingStarProgress = $state(0);
	let nextMeteor = $state(4);

	const meteorStart = new Vector3(-7, 5.5, -9);
	const meteorEnd = new Vector3(7, 3, -9);
	const meteorDuration = 1.1;

	useTask((delta) => {
		if (DISABLE_METEOR_TEST) return;
		if (!shootingStarVisible) {
			nextMeteor -= delta;
			if (nextMeteor <= 0) {
				shootingStarVisible = true;
				shootingStarProgress = 0;
			}
			return;
		}
		shootingStarProgress += delta / meteorDuration;
		if (shootingStarProgress >= 1) {
			shootingStarVisible = false;
			nextMeteor = 6 + Math.random() * 7;
		}
	});
</script>

<!-- Nebula dome -->
<T.Mesh material={nebulaMaterial}>
	<T.SphereGeometry args={[46, 32, 32]} />
</T.Mesh>

<!-- Two parallax star fields -->
<Stars radius={26} depth={12} count={1800} factor={1.4} saturation={0} lightness={0.95} fade opacity={0.9} rounded speed={0.6} />
<Stars radius={38} depth={14} count={1400} factor={2} saturation={0} lightness={1} fade opacity={0.95} rounded speed={0.25} />

<!-- Moon floating beyond the back wall -->
<T.Group position={[-3.5, 4.2, -8]}>
	<T.Mesh>
		<T.SphereGeometry args={[0.55, 32, 32]} />
		<T.MeshBasicMaterial color="#fff8dc" />
	</T.Mesh>
	<!-- Soft halo -->
	<T.Mesh>
		<T.SphereGeometry args={[0.85, 24, 24]} />
		<T.MeshBasicMaterial color="#fff8dc" transparent opacity={0.12} blending={AdditiveBlending} depthWrite={false} />
	</T.Mesh>
</T.Group>

<!-- Shooting star -->
{#if shootingStarVisible}
	{@const t = shootingStarProgress}
	{@const x = meteorStart.x + (meteorEnd.x - meteorStart.x) * t}
	{@const y = meteorStart.y + (meteorEnd.y - meteorStart.y) * t}
	{@const fade = Math.sin(t * Math.PI)}
	<T.Group position={[x, y, meteorStart.z]} rotation={[0, 0, 0.32]}>
		<T.Mesh>
			<T.PlaneGeometry args={[1.6, 0.03]} />
			<T.MeshBasicMaterial
				color="#cfe8ff"
				transparent
				opacity={0.9 * fade}
				blending={AdditiveBlending}
				depthWrite={false}
			/>
		</T.Mesh>
		<T.Mesh position={[-0.9, 0, 0]}>
			<T.PlaneGeometry args={[0.8, 0.015]} />
			<T.MeshBasicMaterial
				color="#9fc8ff"
				transparent
				opacity={0.5 * fade}
				blending={AdditiveBlending}
				depthWrite={false}
			/>
		</T.Mesh>
	</T.Group>
{/if}
