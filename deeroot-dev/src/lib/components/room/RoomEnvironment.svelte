<script lang="ts">
	import { T } from '@threlte/core';
	import type { RoomConfig } from './types';

	interface Props {
		config?: RoomConfig;
	}

	let { config }: Props = $props();

	// Default config
	const room = $derived({
		width: 12,
		depth: 10,
		height: 8,
		wallColor: '#2a2a3e',
		floorColor: '#3d2817',
		ceilingColor: '#1a1a2e',
		...config
	});

	// Window dimensions
	const windowWidth = 3;
	const windowHeight = 2;
	const windowY = 5;
</script>

<!-- Floor -->
<T.Mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
	<T.PlaneGeometry args={[room.width, room.depth]} />
	<T.MeshStandardMaterial color={room.floorColor} roughness={0.8} />
</T.Mesh>

<!-- Ceiling -->
<T.Mesh position={[0, room.height, 0]} rotation={[Math.PI / 2, 0, 0]}>
	<T.PlaneGeometry args={[room.width, room.depth]} />
	<T.MeshStandardMaterial color={room.ceilingColor} />
</T.Mesh>

<!-- Back Wall (with window) -->
<!-- Wall Left of window -->
<T.Mesh position={[-(room.width / 2 - (room.width - windowWidth) / 4), room.height / 2, -room.depth / 2]}>
	<T.BoxGeometry args={[(room.width - windowWidth) / 2, room.height, 0.2]} />
	<T.MeshStandardMaterial color={room.wallColor} />
</T.Mesh>

<!-- Wall Right of window -->
<T.Mesh position={[(room.width / 2 - (room.width - windowWidth) / 4), room.height / 2, -room.depth / 2]}>
	<T.BoxGeometry args={[(room.width - windowWidth) / 2, room.height, 0.2]} />
	<T.MeshStandardMaterial color={room.wallColor} />
</T.Mesh>

<!-- Wall Below window -->
<T.Mesh position={[0, windowY / 2, -room.depth / 2]}>
	<T.BoxGeometry args={[windowWidth, windowY, 0.2]} />
	<T.MeshStandardMaterial color={room.wallColor} />
</T.Mesh>

<!-- Wall Above window -->
<T.Mesh position={[0, windowY + windowHeight + (room.height - windowY - windowHeight) / 2, -room.depth / 2]}>
	<T.BoxGeometry args={[windowWidth, room.height - windowY - windowHeight, 0.2]} />
	<T.MeshStandardMaterial color={room.wallColor} />
</T.Mesh>

<!-- Window Frame - Top -->
<T.Mesh position={[0, windowY + windowHeight, -room.depth / 2]}>
	<T.BoxGeometry args={[windowWidth + 0.2, 0.1, 0.3]} />
	<T.MeshStandardMaterial color="#3a3a4e" />
</T.Mesh>

<!-- Window Frame - Bottom -->
<T.Mesh position={[0, windowY, -room.depth / 2]}>
	<T.BoxGeometry args={[windowWidth + 0.2, 0.1, 0.3]} />
	<T.MeshStandardMaterial color="#3a3a4e" />
</T.Mesh>

<!-- Window Frame - Left -->
<T.Mesh position={[-windowWidth / 2, windowY + windowHeight / 2, -room.depth / 2]}>
	<T.BoxGeometry args={[0.1, windowHeight, 0.3]} />
	<T.MeshStandardMaterial color="#3a3a4e" />
</T.Mesh>

<!-- Window Frame - Right -->
<T.Mesh position={[windowWidth / 2, windowY + windowHeight / 2, -room.depth / 2]}>
	<T.BoxGeometry args={[0.1, windowHeight, 0.3]} />
	<T.MeshStandardMaterial color="#3a3a4e" />
</T.Mesh>

<!-- Window Glass - Night Sky -->
<T.Mesh position={[0, windowY + windowHeight / 2, -room.depth / 2]}>
	<T.PlaneGeometry args={[windowWidth, windowHeight]} />
	<T.MeshBasicMaterial color="#0a0a1a" />
</T.Mesh>

<!-- Left Wall -->
<T.Mesh position={[-room.width / 2, room.height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[room.depth, room.height, 0.2]} />
	<T.MeshStandardMaterial color={room.wallColor} />
</T.Mesh>

<!-- Right Wall -->
<T.Mesh position={[room.width / 2, room.height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[room.depth, room.height, 0.2]} />
<T.MeshStandardMaterial color={room.wallColor} />
</T.Mesh>

<!-- Baseboards -->
<T.Mesh position={[-room.width / 2 + 0.1, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[room.depth, 0.3, 0.05]} />
	<T.MeshStandardMaterial color="#4a4a5e" />
</T.Mesh>

<T.Mesh position={[room.width / 2 - 0.1, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[room.depth, 0.3, 0.05]} />
	<T.MeshStandardMaterial color="#4a4a5e" />
</T.Mesh>

<T.Mesh position={[0, 0.15, -room.depth / 2 + 0.1]}>
	<T.BoxGeometry args={[room.width, 0.3, 0.05]} />
	<T.MeshStandardMaterial color="#4a4a5e" />
</T.Mesh>
