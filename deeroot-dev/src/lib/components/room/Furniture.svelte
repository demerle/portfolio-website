<script lang="ts">
	import { T } from '@threlte/core';
	import type { FurnitureConfig } from './types';

	interface Props {
		config?: FurnitureConfig;
	}

	let { config }: Props = $props();

	// Default furniture config
	const furniture = $derived({
		desk: {
			width: 3,
			depth: 1.5,
			height: 0.1,
			color: '#5c3d1e',
			position: [0, 1.5, -2] as [number, number, number]
		},
		chair: {
			seatHeight: 0.8,
			color: '#1a1a2e',
			position: [0, 0, -0.5] as [number, number, number]
		},
		...config
	});
</script>

<!-- DESK -->
<!-- Desk Top -->
<T.Mesh position={furniture.desk.position}>
	<T.BoxGeometry args={[furniture.desk.width, furniture.desk.height, furniture.desk.depth]} />
	<T.MeshStandardMaterial color={furniture.desk.color} roughness={0.6} />
</T.Mesh>

<!-- Desk Legs -->
<!-- Front Left -->
<T.Mesh position={[
	furniture.desk.position[0] - furniture.desk.width / 2 + 0.1,
	furniture.desk.position[1] / 2,
	furniture.desk.position[2] + furniture.desk.depth / 2 - 0.1
]}>
	<T.BoxGeometry args={[0.08, furniture.desk.position[1], 0.08]} />
	<T.MeshStandardMaterial color="#3d2817" />
</T.Mesh>

<!-- Front Right -->
<T.Mesh position={[
	furniture.desk.position[0] + furniture.desk.width / 2 - 0.1,
	furniture.desk.position[1] / 2,
	furniture.desk.position[2] + furniture.desk.depth / 2 - 0.1
]}>
	<T.BoxGeometry args={[0.08, furniture.desk.position[1], 0.08]} />
	<T.MeshStandardMaterial color="#3d2817" />
</T.Mesh>

<!-- Back Left -->
<T.Mesh position={[
	furniture.desk.position[0] - furniture.desk.width / 2 + 0.1,
	furniture.desk.position[1] / 2,
	furniture.desk.position[2] - furniture.desk.depth / 2 + 0.1
]}>
	<T.BoxGeometry args={[0.08, furniture.desk.position[1], 0.08]} />
	<T.MeshStandardMaterial color="#3d2817" />
</T.Mesh>

<!-- Back Right -->
<T.Mesh position={[
	furniture.desk.position[0] + furniture.desk.width / 2 - 0.1,
	furniture.desk.position[1] / 2,
	furniture.desk.position[2] - furniture.desk.depth / 2 + 0.1
]}>
	<T.BoxGeometry args={[0.08, furniture.desk.position[1], 0.08]} />
	<T.MeshStandardMaterial color="#3d2817" />
</T.Mesh>

<!-- Desk Drawer Unit (right side) -->
<T.Mesh position={[
	furniture.desk.position[0] + furniture.desk.width / 2 - 0.3,
	furniture.desk.position[1] - 0.3,
	furniture.desk.position[2]
]}>
	<T.BoxGeometry args={[0.5, 0.6, furniture.desk.depth - 0.1]} />
	<T.MeshStandardMaterial color={furniture.desk.color} roughness={0.6} />
</T.Mesh>

<!-- Drawer Handle -->
<T.Mesh position={[
	furniture.desk.position[0] + furniture.desk.width / 2 - 0.1,
	furniture.desk.position[1] - 0.2,
	furniture.desk.position[2]
]}>
	<T.BoxGeometry args={[0.05, 0.02, 0.15]} />
	<T.MeshStandardMaterial color="#2a2a2a" metalness={0.8} />
</T.Mesh>

<!-- CHAIR -->
<!-- Chair Seat -->
<T.Mesh position={[
	furniture.chair.position[0],
	furniture.chair.seatHeight,
	furniture.chair.position[2]
]}>
	<T.BoxGeometry args={[0.8, 0.1, 0.8]} />
	<T.MeshStandardMaterial color={furniture.chair.color} />
</T.Mesh>

<!-- Chair Back -->
<T.Mesh position={[
	furniture.chair.position[0],
	furniture.chair.seatHeight + 0.6,
	furniture.chair.position[2] + 0.35
]}>
	<T.BoxGeometry args={[0.8, 1.2, 0.1]} />
	<T.MeshStandardMaterial color={furniture.chair.color} />
</T.Mesh>

<!-- Chair Base (center post) -->
<T.Mesh position={[
	furniture.chair.position[0],
	furniture.chair.seatHeight / 2,
	furniture.chair.position[2]
]}>
	<T.CylinderGeometry args={[0.05, 0.05, furniture.chair.seatHeight]} />
	<T.MeshStandardMaterial color="#2a2a2a" metalness={0.7} />
</T.Mesh>

<!-- Chair Legs (5-star base) -->
{#each Array(5) as _, i}
	{@const angle = (i / 5) * Math.PI * 2}
	<T.Mesh position={[
		furniture.chair.position[0] + Math.cos(angle) * 0.25,
		0.1,
		furniture.chair.position[2] + Math.sin(angle) * 0.25
	]}>
		<T.BoxGeometry args={[0.4, 0.05, 0.05]} />
		<T.MeshStandardMaterial color="#2a2a2a" metalness={0.7} />
		<T.Group rotation={[0, angle, 0]}>
			<T.Mesh>
				<T.BoxGeometry args={[0.4, 0.05, 0.05]} />
				<T.MeshStandardMaterial color="#2a2a2a" metalness={0.7} />
			</T.Mesh>
		</T.Group>
	</T.Mesh>
{/each}

<!-- Chair Wheels -->
{#each Array(5) as _, i}
	{@const angle = (i / 5) * Math.PI * 2}
	<T.Mesh position={[
		furniture.chair.position[0] + Math.cos(angle) * 0.4,
		0.05,
		furniture.chair.position[2] + Math.sin(angle) * 0.4
	]}>
		<T.CylinderGeometry args={[0.04, 0.04, 0.1]} />
		<T.MeshStandardMaterial color="#1a1a1a" />
	</T.Mesh>
{/each}

<!-- WALL SHELF (back wall, left of window) -->
<T.Mesh position={[-3, 5, -4.8]}>
	<T.BoxGeometry args={[2, 0.05, 0.3]} />
	<T.MeshStandardMaterial color="#4a3728" />
</T.Mesh>

<!-- Shelf Brackets -->
<T.Mesh position={[-3.8, 4.8, -4.8]}>
	<T.BoxGeometry args={[0.05, 0.4, 0.2]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<T.Mesh position={[-2.2, 4.8, -4.8]}>
	<T.BoxGeometry args={[0.05, 0.4, 0.2]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- Books on shelf (decorative blocks) -->
<T.Mesh position={[-3.3, 5.15, -4.8]}>
	<T.BoxGeometry args={[0.1, 0.3, 0.25]} />
	<T.MeshStandardMaterial color="#8b4513" />
</T.Mesh>

<T.Mesh position={[-3.1, 5.15, -4.8]}>
	<T.BoxGeometry args={[0.1, 0.35, 0.25]} />
	<T.MeshStandardMaterial color="#2c3e50" />
</T.Mesh>

<T.Mesh position={[-2.9, 5.15, -4.8]}>
	<T.BoxGeometry args={[0.1, 0.28, 0.25]} />
	<T.MeshStandardMaterial color="#27ae60" />
</T.Mesh>

<!-- Small Plant on Shelf -->
<!-- Pot -->
<T.Mesh position={[-2.4, 5.2, -4.8]}>
	<T.CylinderGeometry args={[0.1, 0.08, 0.15]} />
	<T.MeshStandardMaterial color="#c0392b" />
</T.Mesh>

<!-- Plant (simple blocks for leaves) -->
<T.Mesh position={[-2.4, 5.4, -4.8]}>
	<T.BoxGeometry args={[0.15, 0.3, 0.15]} />
	<T.MeshStandardMaterial color="#27ae60" />
</T.Mesh>
