<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { CharacterConfig } from './types';
	import { Vector3 } from 'three';

	interface Props {
		config?: CharacterConfig;
	}

	let { config }: Props = $props();

	// Default character config
	const character = $derived({
		position: [0, 0.8, -0.5] as [number, number, number],
		rotation: [0, -0.3, 0] as [number, number, number],
		scale: 1,
		colors: {
			skin: '#d4a574',
			shirt: '#2d3436',
			pants: '#2c3e50',
			hair: '#1a1a1a'
		},
		...config
	});

	// Breathing animation
	let breatheOffset = $state(0);
	let time = $state(0);

	useTask((delta) => {
		time += delta;
		// Slow breathing cycle (3 seconds)
		breatheOffset = Math.sin(time * 2) * 0.015;
	});

	// Body part dimensions (Minecraft-style proportions)
	const headSize = 0.25;
	const torsoWidth = 0.35;
	const torsoHeight = 0.45;
	const torsoDepth = 0.2;
	const limbWidth = 0.12;
	const limbDepth = 0.12;
	const armLength = 0.4;
	const legLength = 0.45;
</script>

<!-- CHARACTER GROUP -->
<T.Group 
	position={character.position}
	rotation={character.rotation}
	scale={character.scale}
>
	<!-- HEAD -->
	<T.Mesh position={[0, legLength + torsoHeight + headSize / 2 + breatheOffset, 0]}>
		<T.BoxGeometry args={[headSize, headSize, headSize]} />
		<T.MeshStandardMaterial color={character.colors.skin} />
	</T.Mesh>

	<!-- HAIR (Top) -->
	<T.Mesh position={[0, legLength + torsoHeight + headSize + breatheOffset, 0]}>
		<T.BoxGeometry args={[headSize + 0.02, 0.08, headSize + 0.02]} />
		<T.MeshStandardMaterial color={character.colors.hair} />
	</T.Mesh>

	<!-- HAIR (Back) -->
	<T.Mesh position={[0, legLength + torsoHeight + headSize / 2 + breatheOffset, -headSize / 2 - 0.01]}>
		<T.BoxGeometry args={[headSize + 0.02, headSize, 0.05]} />
		<T.MeshStandardMaterial color={character.colors.hair} />
	</T.Mesh>

	<!-- HAIR (Sides) -->
	<T.Mesh position={[-headSize / 2 - 0.01, legLength + torsoHeight + headSize / 2 + breatheOffset, 0]}>
		<T.BoxGeometry args={[0.05, headSize * 0.7, headSize]} />
		<T.MeshStandardMaterial color={character.colors.hair} />
	</T.Mesh>

	<T.Mesh position={[headSize / 2 + 0.01, legLength + torsoHeight + headSize / 2 + breatheOffset, 0]}>
		<T.BoxGeometry args={[0.05, headSize * 0.7, headSize]} />
		<T.MeshStandardMaterial color={character.colors.hair} />
	</T.Mesh>

	<!-- TORSO -->
	<T.Mesh position={[0, legLength + torsoHeight / 2 + breatheOffset, 0]}>
		<T.BoxGeometry args={[torsoWidth, torsoHeight, torsoDepth]} />
		<T.MeshStandardMaterial color={character.colors.shirt} />
	</T.Mesh>

	<!-- LEFT ARM -->
	<!-- Shoulder/Upper Arm -->
	<T.Mesh position={[-(torsoWidth / 2 + limbWidth / 2), legLength + torsoHeight - armLength / 2 + breatheOffset, 0]}>
		<T.BoxGeometry args={[limbWidth, armLength, limbDepth]} />
		<T.MeshStandardMaterial color={character.colors.shirt} />
	</T.Mesh>

	<!-- Left Hand -->
	<T.Mesh position={[-(torsoWidth / 2 + limbWidth / 2), legLength + torsoHeight - armLength + breatheOffset, 0]}>
		<T.BoxGeometry args={[limbWidth, 0.1, limbDepth]} />
		<T.MeshStandardMaterial color={character.colors.skin} />
	</T.Mesh>

	<!-- RIGHT ARM -->
	<!-- Shoulder/Upper Arm -->
	<T.Mesh position={[(torsoWidth / 2 + limbWidth / 2), legLength + torsoHeight - armLength / 2 + breatheOffset, 0]}>
		<T.BoxGeometry args={[limbWidth, armLength, limbDepth]} />
		<T.MeshStandardMaterial color={character.colors.shirt} />
	</T.Mesh>

	<!-- Right Hand -->
	<T.Mesh position={[(torsoWidth / 2 + limbWidth / 2), legLength + torsoHeight - armLength + breatheOffset, 0]}>
		<T.BoxGeometry args={[limbWidth, 0.1, limbDepth]} />
		<T.MeshStandardMaterial color={character.colors.skin} />
	</T.Mesh>

	<!-- LEFT LEG -->
	<!-- Thigh (sitting pose - horizontal) -->
	<T.Mesh position={[-0.1, legLength - 0.1 + breatheOffset, 0.15]}>
		<T.BoxGeometry args={[limbWidth, limbDepth, legLength * 0.5]} />
		<T.MeshStandardMaterial color={character.colors.pants} />
	</T.Mesh>

	<!-- Lower Leg (vertical, down from chair) -->
	<T.Mesh position={[-0.1, legLength / 2 - 0.1, 0.35 + breatheOffset]}>
		<T.BoxGeometry args={[limbWidth, legLength * 0.5, limbDepth]} />
		<T.MeshStandardMaterial color={character.colors.pants} />
	</T.Mesh>

	<!-- LEFT SHOE -->
	<T.Mesh position={[-0.1, 0.05, 0.4]}>
		<T.BoxGeometry args={[limbWidth + 0.02, 0.1, limbDepth + 0.1]} />
		<T.MeshStandardMaterial color="#1a1a1a" />
	</T.Mesh>

	<!-- RIGHT LEG -->
	<!-- Thigh (sitting pose - horizontal) -->
	<T.Mesh position={[0.1, legLength - 0.1 + breatheOffset, 0.15]}>
		<T.BoxGeometry args={[limbWidth, limbDepth, legLength * 0.5]} />
		<T.MeshStandardMaterial color={character.colors.pants} />
	</T.Mesh>

	<!-- Lower Leg (vertical, down from chair) -->
	<T.Mesh position={[0.1, legLength / 2 - 0.1, 0.35 + breatheOffset]}>
		<T.BoxGeometry args={[limbWidth, legLength * 0.5, limbDepth]} />
		<T.MeshStandardMaterial color={character.colors.pants} />
	</T.Mesh>

	<!-- RIGHT SHOE -->
	<T.Mesh position={[0.1, 0.05, 0.4]}>
		<T.BoxGeometry args={[limbWidth + 0.02, 0.1, limbDepth + 0.1]} />
		<T.MeshStandardMaterial color="#1a1a1a" />
	</T.Mesh>
</T.Group>
