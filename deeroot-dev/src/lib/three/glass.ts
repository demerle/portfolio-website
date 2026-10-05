/**
 * Fresnel "starry glass" material for the room shell.
 *
 * Nearly invisible face-on, glowing rim at grazing angles, with tiny
 * twinkling star speckles embedded in the surface — so walls read as thin
 * glass panes floating in space rather than solid geometry.
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
	uniform float uTime;
	uniform float uSparkles;
	varying vec3 vWorldPos;
	varying vec3 vNormal;

	float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
	}

	void main() {
		vec3 viewDir = normalize(cameraPosition - vWorldPos);
		vec3 normal = normalize(vNormal);

		// Fresnel rim: bright at grazing angles, clear face-on
		float fresnel = pow(1.0 - abs(dot(normal, viewDir)), uRimPower);

		vec3 color = uColor * (0.35 + 1.4 * fresnel);
		float alpha = uBaseAlpha + uRimStrength * fresnel;

		// Embedded star speckles twinkling over time
		if (uSparkles > 0.5) {
			vec2 cell = floor(vec2(vWorldPos.x + vWorldPos.z, vWorldPos.y - vWorldPos.z) * 60.0);
			float h = hash(cell);
			float twinkle = 0.5 + 0.5 * sin(uTime * 1.4 + h * 6.2831853);
			float sparkle = step(0.986, h) * twinkle;
			color += vec3(0.8, 0.9, 1.0) * sparkle * 0.9;
			alpha = max(alpha, sparkle * 0.85);
		}

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
	sparkles?: boolean;
}

/** Shared clock uniform so all glass surfaces twinkle in sync. */
export const glassTime = { value: 0 };

export function createGlassMaterial(options: GlassOptions = {}): THREE.ShaderMaterial {
	const {
		color = '#8fc4ff',
		rimPower = 2.6,
		rimStrength = 0.5,
		baseAlpha = 0.06,
		sparkles = true
	} = options;

	return new THREE.ShaderMaterial({
		vertexShader: glassVertex,
		fragmentShader: glassFragment,
		uniforms: {
			uColor: { value: new THREE.Color(color) },
			uRimPower: { value: rimPower },
			uRimStrength: { value: rimStrength },
			uBaseAlpha: { value: baseAlpha },
			uTime: glassTime,
			uSparkles: { value: sparkles ? 1 : 0 }
		},
		transparent: true,
		depthWrite: false,
		side: THREE.DoubleSide
	});
}
