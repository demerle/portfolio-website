<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Vector3, Euler } from 'three';
	import { generateKeys } from '$lib/utils/pianoKeyUtils';

	interface Props {
		mouseX: number;
		mouseY: number;
	}

	let { mouseX, mouseY }: Props = $props();

	const keys = generateKeys(24);
	const whiteKeys = keys.filter((k) => k.type === 'white');
	const blackKeys = keys.filter((k) => k.type === 'black');

	// Reactive transforms for white keys
	let whiteKeyTransforms = $state(
		whiteKeys.map(() => ({
			position: new Vector3(0, 0, 0),
			rotation: new Euler(0, 0, 0),
			glowIntensity: 0
		}))
	);

	// Reactive transforms for black keys
	let blackKeyTransforms = $state(
		blackKeys.map(() => ({
			position: new Vector3(0, 0, 0),
			rotation: new Euler(0, 0, 0),
			glowIntensity: 0
		}))
	);

	useTask((delta) => {
		const time = performance.now() * 0.001;

		// Update white keys
		whiteKeyTransforms = whiteKeys.map((key, i) => {
			const [baseX, baseY, baseZ] = key.basePosition;

			// Floating animation
			const floatY = Math.sin(time * key.floatSpeed * 1000 + key.floatOffset) * 0.15;

			// Mouse interaction
			const mX = mouseX * 10;
			const mY = mouseY * 5;
			const dx = mX - baseX;
			const dy = mY - (baseY + floatY);
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Rotation toward cursor
			const maxDistance = 8;
			const influence = Math.max(0, 1 - distance / maxDistance);
			const maxRotation = 15 * (Math.PI / 180);
			const rotX = (dy / maxDistance) * maxRotation * influence;
			const rotY = (dx / maxDistance) * maxRotation * influence;

			// Glow calculation
			const glowRadius = 3;
			const glowIntensity = Math.max(0, 1 - distance / glowRadius);

			return {
				position: new Vector3(baseX, baseY + floatY, baseZ),
				rotation: new Euler(rotX, rotY, 0),
				glowIntensity
			};
		});

		// Update black keys
		blackKeyTransforms = blackKeys.map((key, i) => {
			const [baseX, baseY, baseZ] = key.basePosition;

			// Floating animation
			const floatY = Math.sin(time * key.floatSpeed * 1000 + key.floatOffset) * 0.15;

			// Mouse interaction
			const mX = mouseX * 10;
			const mY = mouseY * 5;
			const dx = mX - baseX;
			const dy = mY - (baseY + floatY);
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Rotation toward cursor
			const maxDistance = 8;
			const influence = Math.max(0, 1 - distance / maxDistance);
			const maxRotation = 15 * (Math.PI / 180);
			const rotX = (dy / maxDistance) * maxRotation * influence;
			const rotY = (dx / maxDistance) * maxRotation * influence;

			// Glow calculation
			const glowRadius = 3;
			const glowIntensity = Math.max(0, 1 - distance / glowRadius);

			return {
				position: new Vector3(baseX, baseY + floatY + 0.2, baseZ),
				rotation: new Euler(rotX, rotY, 0),
				glowIntensity
			};
		});
	});
</script>

<T.InstancedMesh>
	<T.BoxGeometry args={[0.8, 0.3, 3.5]} />
	<T.MeshStandardMaterial color="#f5f5f5" roughness={0.2} metalness={0.1} emissive="#4a90d9" emissiveIntensity={0} />

	{#each whiteKeys as key, i}
		<T.Instance
			position={whiteKeyTransforms[i].position}
			rotation={whiteKeyTransforms[i].rotation}
			emissiveIntensity={whiteKeyTransforms[i].glowIntensity * 0.5}
		/>
	{/each}
</T.InstancedMesh>

<T.InstancedMesh>
	<T.BoxGeometry args={[0.5, 0.4, 2.2]} />
	<T.MeshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} emissive="#ff6b9d" emissiveIntensity={0} />

	{#each blackKeys as key, i}
		<T.Instance
			position={blackKeyTransforms[i].position}
			rotation={blackKeyTransforms[i].rotation}
			emissiveIntensity={blackKeyTransforms[i].glowIntensity * 0.5}
		/>
	{/each}
</T.InstancedMesh>
