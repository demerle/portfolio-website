<script lang="ts">
	import { T } from '@threlte/core';
	import type { ComputerConfig } from './types';

	interface Props {
		config?: ComputerConfig;
	}

	let { config }: Props = $props();

	// Default computer config
	const computer = $derived({
		monitor: {
			width: 1.2,
			height: 0.7,
			depth: 0.05,
			position: [0, 2.1, -2.3] as [number, number, number],
			rotation: [0, -0.3, 0] as [number, number, number], // 30° toward camera
			screenGlowColor: '#4a90d9',
			screenGlowIntensity: 2
		},
		keyboard: {
			width: 0.8,
			depth: 0.3,
			position: [0, 1.55, -1.5] as [number, number, number]
		},
		mouse: {
			position: [0.6, 1.55, -1.5] as [number, number, number]
		},
		pcTower: {
			position: [2, 0.5, -2] as [number, number, number],
			hasRGB: true
		},
		...config
	});
</script>

<!-- MONITOR -->
<!-- Monitor Stand Base -->
<T.Mesh position={[
	computer.monitor.position[0],
	1.55,
	computer.monitor.position[2] + 0.2
]}>
	<T.BoxGeometry args={[0.3, 0.02, 0.25]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Monitor Stand Neck -->
<T.Mesh position={[
	computer.monitor.position[0],
	1.75,
	computer.monitor.position[2] + 0.2
]}>
	<T.BoxGeometry args={[0.05, 0.4, 0.05]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Monitor Screen Bezel -->
<T.Mesh 
	position={computer.monitor.position}
	rotation={computer.monitor.rotation}
>
	<T.BoxGeometry args={[computer.monitor.width, computer.monitor.height, computer.monitor.depth]} />
	<T.MeshStandardMaterial color="#1a1a1a" roughness={0.3} />
</T.Mesh>

<!-- Monitor Screen (glowing part) -->
<T.Mesh 
	position={[
		computer.monitor.position[0] - 0.02,
		computer.monitor.position[1],
		computer.monitor.position[2] + 0.03
	]}
	rotation={computer.monitor.rotation}
>
	<T.PlaneGeometry args={[computer.monitor.width - 0.05, computer.monitor.height - 0.05]} />
	<T.MeshBasicMaterial color={computer.monitor.screenGlowColor} />
</T.Mesh>

<!-- Screen Glow Light (point light) -->
<T.PointLight
	position={[
		computer.monitor.position[0] + 0.5,
		computer.monitor.position[1],
		computer.monitor.position[2] + 1
	]}
color={computer.monitor.screenGlowColor}
intensity={computer.monitor.screenGlowIntensity}
distance={5}
/>

<!-- KEYBOARD -->
<!-- Keyboard Base -->
<T.Mesh position={computer.keyboard.position}>
	<T.BoxGeometry args={[computer.keyboard.width, 0.03, computer.keyboard.depth]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Keys (simplified as smaller box on top) -->
<T.Mesh position={[
	computer.keyboard.position[0],
	computer.keyboard.position[1] + 0.02,
	computer.keyboard.position[2]
]}>
	<T.BoxGeometry args={[computer.keyboard.width - 0.05, 0.02, computer.keyboard.depth - 0.05]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- MOUSE -->
<!-- Mouse Body -->
<T.Mesh position={computer.mouse.position}>
	<T.BoxGeometry args={[0.1, 0.05, 0.15]} />
	<T.MeshStandardMaterial color="#1a1a1a" />
</T.Mesh>

<!-- Mouse Wheel -->
<T.Mesh position={[
	computer.mouse.position[0],
	computer.mouse.position[1] + 0.03,
	computer.mouse.position[2] - 0.03
]}>
	<T.CylinderGeometry args={[0.01, 0.01, 0.08]} rotation={[0, 0, Math.PI / 2]} />
	<T.MeshStandardMaterial color="#4a4a4a" />
</T.Mesh>

<!-- PC TOWER -->
<!-- Tower Case -->
<T.Mesh position={computer.pcTower.position}>
	<T.BoxGeometry args={[0.4, 1, 0.8]} />
	<T.MeshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.5} />
</T.Mesh>

<!-- Tower Front Panel -->
<T.Mesh position={[
	computer.pcTower.position[0] + 0.21,
	computer.pcTower.position[1],
	computer.pcTower.position[2]
]}>
	<T.BoxGeometry args={[0.02, 0.9, 0.7]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- RGB Strip (if enabled) -->
{#if computer.pcTower.hasRGB}
	<T.Mesh position={[
		computer.pcTower.position[0] + 0.22,
		computer.pcTower.position[1] + 0.2,
		computer.pcTower.position[2]
	]}>
		<T.BoxGeometry args={[0.01, 0.6, 0.02]} />
		<T.MeshBasicMaterial color="#ff6b9d" />
	</T.Mesh>

	<!-- PC RGB Light -->
	<T.PointLight
		position={[
			computer.pcTower.position[0] + 0.5,
			computer.pcTower.position[1] + 0.5,
			computer.pcTower.position[2]
		]
		}
		color="#ff6b9d"
		intensity={0.5}
		distance={3}
	/>
{/if}

<!-- Power Button -->
<T.Mesh position={[
	computer.pcTower.position[0] + 0.22,
	computer.pcTower.position[1] + 0.35,
	computer.pcTower.position[2] + 0.25
]}>
	<T.CylinderGeometry args={[0.02, 0.02, 0.01]} rotation={[0, 0, Math.PI / 2]} />
	<T.MeshBasicMaterial color="#4a90d9" />
</T.Mesh>

<!-- USB Ports -->
<T.Mesh position={[
	computer.pcTower.position[0] + 0.22,
	computer.pcTower.position[1] + 0.25,
	computer.pcTower.position[2] + 0.25
]}>
	<T.BoxGeometry args={[0.01, 0.03, 0.08]} />
	<T.MeshStandardMaterial color="#1a1a1a" />
</T.Mesh>

<!-- DESK LAMP -->
<!-- Lamp Base -->
<T.Mesh position={[-1.2, 1.55, -1.8]}>
	<T.CylinderGeometry args={[0.1, 0.12, 0.05]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Lamp Arm -->
<T.Mesh position={[-1.2, 1.75, -1.8]} rotation={[0, 0, -0.3]}>
	<T.BoxGeometry args={[0.03, 0.4, 0.03]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Lamp Head -->
<T.Mesh position={[-1.0, 2.0, -1.8]} rotation={[0, 0, -0.5]}>
	<T.ConeGeometry args={[0.12, 0.2, 4]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Lamp Light -->
<T.SpotLight
	position={[-1.0, 1.95, -1.8]}
	target={[-0.5, 1.5, -1.5]}
	color="#ffb347"
	intensity={1}
	angle={Math.PI / 4}
	penumbra={0.5}
	distance={4}
/>

<!-- Lamp Bulb Glow -->
<T.Mesh position={[-1.0, 1.9, -1.8]}>
	<T.SphereGeometry args={[0.03]} />
	<T.MeshBasicMaterial color="#ffb347" />
</T.Mesh>
