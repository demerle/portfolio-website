/**
 * Fresnel "starry glass" material for the room shell.
 *
 * Nearly invisible face-on, glowing rim at grazing angles — so walls read
 * as thin glass panes floating in space rather than solid geometry. The
 * actual stars live in SpaceEnvironment.svelte, not in this material.
 */

import * as THREE from 'three';

const glassVertex = /* glsl */ `
	varying vec3 vWorldPos;
	varying vec3 vNormal;

	void main() {
		vNormal = normalize(mat3(modelMatrix) * normal);
		vec4 worldPos = modelMatrix * vec4(position, 1.0);
		vWorldPos = worldPos.xyz;
		gl_Position = projectionMatrix * viewMatrix * worldPos;
	}
`;

const glassFragment = /* glsl */ `
	precision highp float;

	uniform vec3 uColor;
	uniform float uRimPower;
	uniform float uRimStrength;
	uniform float uBaseAlpha;
	varying vec3 vWorldPos;
	varying vec3 vNormal;

	void main() {
		vec3 viewDir = normalize(cameraPosition - vWorldPos);
		vec3 normal = normalize(vNormal);

		// Fresnel rim: bright at grazing angles, clear face-on
		float fresnel = pow(1.0 - abs(dot(normal, viewDir)), uRimPower);

		vec3 color = uColor * (0.35 + 1.4 * fresnel);
		float alpha = uBaseAlpha + uRimStrength * fresnel;

		gl_FragColor = vec4(color, alpha);
		#include <tonemapping_fragment>
		#include <colorspace_fragment>
	}
`;

export interface GlassOptions {
	color?: THREE.ColorRepresentation;
	rimPower?: number;
	rimStrength?: number;
	baseAlpha?: number;
}

export function createGlassMaterial(options: GlassOptions = {}): THREE.ShaderMaterial {
	const { color = '#8fc4ff', rimPower = 2.6, rimStrength = 0.5, baseAlpha = 0.06 } = options;

	return new THREE.ShaderMaterial({
		vertexShader: glassVertex,
		fragmentShader: glassFragment,
		uniforms: {
			uColor: { value: new THREE.Color(color) },
			uRimPower: { value: rimPower },
			uRimStrength: { value: rimStrength },
			uBaseAlpha: { value: baseAlpha }
		},
		transparent: true,
		depthWrite: false,
		side: THREE.DoubleSide
	});
}
