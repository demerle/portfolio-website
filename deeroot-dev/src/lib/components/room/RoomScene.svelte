<script lang="ts">
	import { T, useTask, useLoader } from '@threlte/core';
	import { TextureLoader, DoubleSide } from 'three';
	import SceneLighting from './SceneLighting.svelte';
	import PianoKeyboard from './PianoKeyboard.svelte';
	import PianoBenchSeat from './PianoBenchSeat.svelte';
	import PianoBenchStand from './PianoBenchStand.svelte';
	
	// Breathing animation for character
	let breatheOffset = $state(0);
	let time = $state(0);

	useTask((delta) => {
		time += delta;
		breatheOffset = Math.sin(time * 2) * 0.015;
	});

	// Monitor screen textures
	const firstMonitorTexture = useLoader(TextureLoader).load('/first-monitor.png');
	const secondMonitorTexture = useLoader(TextureLoader).load('/second-monitor.png');
</script>

<!-- Camera - Center of room looking at desk -->
<T.PerspectiveCamera
	makeDefault
	position={[0, 1.4, 0]}
	near={0.1}
	far={50}
	oncreate={(ref) => {
		ref.lookAt(0, 0.6, -2.2);
	}}
/>

<!-- Lighting -->
<SceneLighting />

<!-- ================= ROOM ENVIRONMENT (RECTANGULAR - SKINNY) ================= -->
<!-- Room dimensions: 4m wide (back wall) x 5m deep (side walls) -->

<!-- Floor -->
<T.Mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
	<T.PlaneGeometry args={[4, 5]} />
	<T.MeshStandardMaterial color="#5c4033" roughness={0.6} metalness={0.05} />
</T.Mesh>

<!-- Floor planks -->
{#each Array(5) as _, i}
	<T.Mesh position={[-1.8 + i * 0.9, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
		<T.PlaneGeometry args={[0.015, 5]} />
		<T.MeshBasicMaterial color="#4a3328" />
	</T.Mesh>
{/each}

<!-- Back Wall (where desk goes) - SHORTER -->
<T.Mesh position={[0, 1.5, -2.5]}>
	<T.BoxGeometry args={[4, 3, 0.15]} />
	<T.MeshStandardMaterial color="#4a4a6a" />
</T.Mesh>

<!-- Left Wall (with window) - LONGER -->
<T.Mesh position={[-2, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[5, 3, 0.15]} />
	<T.MeshStandardMaterial color="#404060" />
</T.Mesh>

<!-- Right Wall - LONGER -->
<T.Mesh position={[2, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[5, 3, 0.15]} />
	<T.MeshStandardMaterial color="#404060" />
</T.Mesh>

<!-- Baseboards -->
<T.Mesh position={[0, 0.05, -2.42]}>
	<T.BoxGeometry args={[4, 0.1, 0.02]} />
	<T.MeshStandardMaterial color="#3d3d50" />
</T.Mesh>
<T.Mesh position={[-1.92, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[5, 0.1, 0.02]} />
	<T.MeshStandardMaterial color="#3d3d50" />
</T.Mesh>

<!-- ================= WINDOW ON LEFT WALL ================= -->
<!-- Window Frame (outer) -->
<T.Mesh position={[-1.92, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[2, 1.5, 0.08]} />
	<T.MeshStandardMaterial color="#2a2a35" />
</T.Mesh>

<!-- Window Glass -->
<T.Mesh position={[-1.88, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.PlaneGeometry args={[1.8, 1.3]} />
	<T.MeshBasicMaterial color="#1a1f2e" />
</T.Mesh>

<!-- Window cross frame (horizontal) -->
<T.Mesh position={[-1.88, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[1.8, 0.05, 0.02]} />
	<T.MeshStandardMaterial color="#2a2a35" />
</T.Mesh>
<!-- Window cross frame (vertical) -->
<T.Mesh position={[-1.88, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[0.05, 1.3, 0.02]} />
	<T.MeshStandardMaterial color="#2a2a35" />
</T.Mesh>

<!-- Moon visible through window -->
<T.Mesh position={[-1.85, 2.1, 0.3]} rotation={[0, Math.PI / 2, 0]}>
	<T.CircleGeometry args={[0.12, 32]} />
	<T.MeshBasicMaterial color="#fff8dc" />
</T.Mesh>

<!-- Stars through window -->
{#each [
	{x: -1.86, y: 1.5, z: -0.4}, {x: -1.86, y: 2.0, z: 0.5}, {x: -1.86, y: 2.2, z: -0.2},
	{x: -1.86, y: 1.7, z: 0.3}, {x: -1.86, y: 1.9, z: -0.6}, {x: -1.86, y: 2.3, z: 0.1},
	{x: -1.86, y: 1.6, z: 0.6}
] as star}
	<T.Mesh position={[star.x, star.y, star.z]} rotation={[0, Math.PI / 2, 0]}>
		<T.CircleGeometry args={[0.012, 8]} />
		<T.MeshBasicMaterial color="#ffffff" />
	</T.Mesh>
{/each}

<!-- Window Sill -->
<T.Mesh position={[-1.75, 1.05, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[2.1, 0.06, 0.2]} />
	<T.MeshStandardMaterial color="#5c4033" />
</T.Mesh>

<!-- ================= FURNITURE (Realistic Scale) ================= -->
<!-- Desk UP AGAINST BACK WALL - AGGRESSIVELY LOWERED -->
<!-- Desk Surface - MUCH LOWER (0.58m) and NARROWER (1.2m) -->
<T.Mesh position={[0, 0.58, -2.35]}>
	<T.BoxGeometry args={[1.2, 0.06, 0.7]} />
	<T.MeshStandardMaterial color="#6b4423" roughness={0.5} />
</T.Mesh>

<!-- Desk Edge Detail -->
<T.Mesh position={[0, 0.55, -2.35]}>
	<T.BoxGeometry args={[1.22, 0.02, 0.72]} />
	<T.MeshStandardMaterial color="#5a381d" />
</T.Mesh>

<!-- Desk Legs (much shorter) -->
{#each [[-0.5, -2.0], [0.5, -2.0]] as pos}
	<!-- Front legs -->
	<T.Mesh position={[pos[0], 0.29, pos[1]]}>
		<T.BoxGeometry args={[0.04, 0.58, 0.04]} />
		<T.MeshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
	</T.Mesh>
{/each}
<!-- Back legs (against wall) -->
{#each [[-0.5, -2.4], [0.5, -2.4]] as pos}
	<T.Mesh position={[pos[0], 0.29, pos[1]]}>
		<T.BoxGeometry args={[0.04, 0.58, 0.04]} />
		<T.MeshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
	</T.Mesh>
{/each}

<!-- ================= COMPUTER SETUP (Realistic Scale) ================= -->
<!-- Monitor on desk against wall (new z positions) -->
<!-- MAIN MONITOR - CENTERED, FORWARD ENOUGH FOR KEYBOARD SPACE -->
<!-- Monitor Stand Base -->
<T.Mesh position={[0, 0.64, -2.35]}>
	<T.CylinderGeometry args={[0.08, 0.1, 0.015]} />
	<T.MeshStandardMaterial color="#1a1a1a" />
</T.Mesh>

<!-- Monitor Stand Neck - SLIGHTLY TALLER THAN SECOND MONITOR -->
<T.Mesh position={[0, 0.69, -2.35]}>
	<T.BoxGeometry args={[0.04, 0.14, 0.03]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Monitor Bezel - SMALLER (0.5 x 0.32) -->
<T.Mesh position={[0, 0.88, -2.25]}>
	<T.BoxGeometry args={[0.5, 0.32, 0.025]} />
	<T.MeshStandardMaterial color="#0a0a0a" />
</T.Mesh>

<!-- Monitor Screen (Glowing) - SMALLER -->
{#if $firstMonitorTexture}
	<T.Mesh position={[0, 0.88, -2.235]}>
		<T.PlaneGeometry args={[0.45, 0.28]} />
		<T.MeshBasicMaterial map={$firstMonitorTexture} toneMapped={false} />
	</T.Mesh>
{/if}

<!-- Screen Reflection on Desk -->
<T.Mesh position={[0, 0.59, -2.0]} rotation={[-Math.PI / 2, 0, 0]}>
	<T.PlaneGeometry args={[0.3, 0.15]} />
	<T.MeshBasicMaterial color="#6bb3ff" transparent opacity={0.12} />
</T.Mesh>

<!-- SECOND MONITOR - LEFT SIDE, 60 DEGREES INWARD, MOVED BACK -->
<!-- Monitor Stand Base - Centered under monitor -->
<T.Mesh position={[-0.42, 0.64, -2.05]}>
	<T.CylinderGeometry args={[0.08, 0.1, 0.015]} />
	<T.MeshStandardMaterial color="#1a1a1a" />
</T.Mesh>

<!-- Monitor Stand Neck - Angled 60 degrees, SHORTER to not poke through -->
<T.Mesh position={[-0.42, 0.67, -2.05]} rotation={[0, 1.047, 0]}>
	<T.BoxGeometry args={[0.04, 0.08, 0.03]} />
	<T.MeshStandardMaterial color="#2a2a2a" />
</T.Mesh>

<!-- Monitor Bezel - Left monitor, rotated 60 deg inward, further back -->
<T.Mesh position={[-0.42, 0.84, -2.05]} rotation={[0, 1.047, 0]}>
	<T.BoxGeometry args={[0.5, 0.32, 0.025]} />
	<T.MeshStandardMaterial color="#0a0a0a" />
</T.Mesh>

<!-- Monitor Screen - Left monitor -->
{#if $secondMonitorTexture}
	<T.Mesh position={[-0.405, 0.84, -2.035]} rotation={[0, 1.047, 0]}>
		<T.PlaneGeometry args={[0.45, 0.28]} />
		<T.MeshBasicMaterial map={$secondMonitorTexture} toneMapped={false} />
	</T.Mesh>
{/if}

<!-- PC Tower UNDER DESK (shorter to fit lower desk) -->
<!-- Main PC case -->
<T.Mesh position={[0.45, 0.205, -2.35]}>
	<T.BoxGeometry args={[0.18, 0.38, 0.4]} />
	<T.MeshStandardMaterial color="#1a1a1a" roughness={0.3} />
</T.Mesh>

<!-- PC Front Panel -->
<T.Mesh position={[0.54, 0.205, -2.35]}>
	<T.BoxGeometry args={[0.01, 0.33, 0.35]} />
	<T.MeshStandardMaterial color="#252525" />
</T.Mesh>

<!-- PC RGB Strip -->
<T.Mesh position={[0.545, 0.22, -2.35]}>
	<T.BoxGeometry args={[0.005, 0.25, 0.01]} />
	<T.MeshBasicMaterial color="#ff6b9d" />
</T.Mesh>

<!-- PC Power Button -->
<T.Mesh position={[0.545, 0.33, -2.2]}>
	<T.CylinderGeometry args={[0.008, 0.008, 0.005]} rotation={[0, 0, Math.PI / 2]} />
	<T.MeshBasicMaterial color="#4a90d9" />
</T.Mesh>

<!-- ================= REALISTIC FULL-SIZE KEYBOARD WITH CHASSIS ================= -->
<!-- Keyboard Chassis/Body - CENTERED to match all keys including numpad -->
<T.Mesh position={[-0.06, 0.605, -2.2]}>
	<T.BoxGeometry args={[0.44, 0.025, 0.12]} />
	<T.MeshStandardMaterial color="#151515" />
</T.Mesh>

<!-- Keyboard Bezel/Frame (the rim around the keys) -->
<T.Mesh position={[-0.06, 0.62, -2.2]}>
	<T.BoxGeometry args={[0.435, 0.005, 0.115]} />
	<T.MeshStandardMaterial color="#1a1a1a" />
</T.Mesh>

<!-- Function Keys Row (F1-F12) - MOVED LEFT -->
{#each [
	{x: -0.252, label: 'Esc'}, {x: -0.212, label: 'F1'}, {x: -0.192, label: 'F2'}, {x: -0.172, label: 'F3'}, {x: -0.152, label: 'F4'},
	{x: -0.124, label: 'F5'}, {x: -0.104, label: 'F6'}, {x: -0.084, label: 'F7'}, {x: -0.064, label: 'F8'},
	{x: -0.036, label: 'F9'}, {x: -0.016, label: 'F10'}, {x: 0.004, label: 'F11'}, {x: 0.024, label: 'F12'}
] as key}
	<T.Mesh position={[key.x, 0.628, -2.255]}>
		<T.BoxGeometry args={[0.014, 0.006, 0.009]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- Number Row (` 1 2 3 4 5 6 7 8 9 0 - = Backspace) -->
{#each [
	{x: -0.256, w: 0.016}, {x: -0.236, w: 0.014}, {x: -0.218, w: 0.014}, {x: -0.20, w: 0.014}, {x: -0.182, w: 0.014},
	{x: -0.164, w: 0.014}, {x: -0.146, w: 0.014}, {x: -0.128, w: 0.014}, {x: -0.11, w: 0.014}, {x: -0.092, w: 0.014},
	{x: -0.074, w: 0.014}, {x: -0.056, w: 0.014}, {x: -0.038, w: 0.014}, {x: -0.012, w: 0.026}
] as key}
	<T.Mesh position={[key.x, 0.628, -2.23]}>
		<T.BoxGeometry args={[key.w || 0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- QWERTY Row (Tab Q W E R T Y U I O P [ ] \) -->
{#each [
	{x: -0.256, w: 0.022}, {x: -0.232, w: 0.014}, {x: -0.214, w: 0.014}, {x: -0.196, w: 0.014}, {x: -0.178, w: 0.014},
	{x: -0.16, w: 0.014}, {x: -0.142, w: 0.014}, {x: -0.124, w: 0.014}, {x: -0.106, w: 0.014}, {x: -0.088, w: 0.014},
	{x: -0.07, w: 0.014}, {x: -0.052, w: 0.014}, {x: -0.034, w: 0.014}, {x: -0.01, w: 0.02}
] as key}
	<T.Mesh position={[key.x, 0.628, -2.208]}>
		<T.BoxGeometry args={[key.w || 0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- ASDF Row (Caps A S D F G H J K L ; ' Enter) -->
{#each [
	{x: -0.256, w: 0.026}, {x: -0.23, w: 0.014}, {x: -0.212, w: 0.014}, {x: -0.194, w: 0.014}, {x: -0.176, w: 0.014},
	{x: -0.158, w: 0.014}, {x: -0.14, w: 0.014}, {x: -0.122, w: 0.014}, {x: -0.104, w: 0.014}, {x: -0.086, w: 0.014},
	{x: -0.068, w: 0.014}, {x: -0.05, w: 0.014}, {x: -0.022, w: 0.03}
] as key}
	<T.Mesh position={[key.x, 0.628, -2.186]}>
		<T.BoxGeometry args={[key.w || 0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- ZXCV Row (Shift Z X C V B N M , . / Shift) -->
{#each [
	{x: -0.256, w: 0.034}, {x: -0.226, w: 0.014}, {x: -0.208, w: 0.014}, {x: -0.19, w: 0.014}, {x: -0.172, w: 0.014},
	{x: -0.154, w: 0.014}, {x: -0.136, w: 0.014}, {x: -0.118, w: 0.014}, {x: -0.1, w: 0.014}, {x: -0.082, w: 0.014},
	{x: -0.064, w: 0.014}, {x: -0.046, w: 0.014}, {x: -0.016, w: 0.038}
] as key}
	<T.Mesh position={[key.x, 0.628, -2.164]}>
		<T.BoxGeometry args={[key.w || 0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- Bottom Row (Ctrl Win Alt Space Alt Fn Ctrl) -->
{#each [
	{x: -0.256, w: 0.02}, {x: -0.232, w: 0.018}, {x: -0.208, w: 0.02}, {x: -0.144, w: 0.078},
	{x: -0.088, w: 0.02}, {x: -0.064, w: 0.018}, {x: -0.04, w: 0.018}, {x: -0.016, w: 0.02}
] as key}
	<T.Mesh position={[key.x, 0.628, -2.142]}>
		<T.BoxGeometry args={[key.w || 0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- ================= NAVIGATION CLUSTER (Above Arrows) -->
<!-- Insert, Home, Page Up, Delete, End, Page Down -->
{#each [
	{x: 0.024, label: 'Insert'}, {x: 0.042, label: 'Home'}, {x: 0.06, label: 'PgUp'},
	{x: 0.024, label: 'Delete'}, {x: 0.042, label: 'End'}, {x: 0.06, label: 'PgDn'}
] as key, i}
	{@const row = i < 3 ? -2.23 : -2.208}
	<T.Mesh position={[key.x, 0.628, row]}>
		<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- ================= ARROW KEYS -->
<!-- Left Arrow -->
<T.Mesh position={[0.024, 0.628, -2.164]}>
	<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- Down Arrow -->
<T.Mesh position={[0.042, 0.628, -2.164]}>
	<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- Right Arrow -->
<T.Mesh position={[0.06, 0.628, -2.164]}>
	<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- Up Arrow (above Down) -->
<T.Mesh position={[0.042, 0.628, -2.186]}>
	<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- ================= NUMPAD SECTION -->
<!-- Num Lock, /, *, - -->
{#each [
	{x: 0.092, label: 'Num'}, {x: 0.11, label: '/'}, {x: 0.128, label: '*'}, {x: 0.146, label: '-'}
] as key}
	<T.Mesh position={[key.x, 0.628, -2.255]}>
		<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>
{/each}

<!-- 7, 8, 9 -->
{#each [{x: 0.092}, {x: 0.11}, {x: 0.128}] as key}
	<T.Mesh position={[key.x, 0.628, -2.23]}>
		<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- 4, 5, 6 -->
{#each [{x: 0.092}, {x: 0.11}, {x: 0.128}] as key}
	<T.Mesh position={[key.x, 0.628, -2.208]}>
		<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- 1, 2, 3 -->
{#each [{x: 0.092}, {x: 0.11}, {x: 0.128}] as key}
	<T.Mesh position={[key.x, 0.628, -2.186]}>
		<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
		<T.MeshStandardMaterial color="#3a3a3a" />
	</T.Mesh>
{/each}

<!-- 0 (wide), . -->
<T.Mesh position={[0.101, 0.628, -2.164]}>
	<T.BoxGeometry args={[0.032, 0.006, 0.014]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>
<T.Mesh position={[0.128, 0.628, -2.164]}>
	<T.BoxGeometry args={[0.014, 0.006, 0.014]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- + (tall, spans 2 rows) -->
<T.Mesh position={[0.146, 0.628, -2.219]}>
	<T.BoxGeometry args={[0.014, 0.006, 0.034]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- Enter (tall, spans 2 rows) -->
<T.Mesh position={[0.146, 0.628, -2.179]}>
	<T.BoxGeometry args={[0.014, 0.006, 0.034]} />
	<T.MeshStandardMaterial color="#3a3a3a" />
</T.Mesh>

<!-- ================= DETAILED REALISTIC MOUSE ================= -->
<T.Group position={[0.25, 0.605, -2.2]}>
	<!-- Mouse Main Body (ergonomic curved shape using scaled sphere) - TALLER -->
	<T.Mesh position={[0, 0.012, 0]} scale={[1, 0.7, 1.4]}>
		<T.SphereGeometry args={[0.038, 32, 24]} />
		<T.MeshStandardMaterial 
			color="#1a1a1a" 
			roughness={0.4} 
			metalness={0.1}
		/>
	</T.Mesh>
	
	<!-- Mouse Palm Rest (rear hump) - TALLER -->
	<T.Mesh position={[0, 0.02, 0.02]} scale={[1, 0.75, 1.1]}>
		<T.SphereGeometry args={[0.035, 24, 16]} />
		<T.MeshStandardMaterial 
			color="#1f1f1f" 
			roughness={0.35} 
			metalness={0.15}
		/>
	</T.Mesh>
	
	<!-- Left Mouse Button (separate piece) - RAISED -->
	<T.Mesh position={[-0.018, 0.028, -0.035]}>
		<T.BoxGeometry args={[0.028, 0.015, 0.045]} />
		<T.MeshStandardMaterial 
			color="#222222" 
			roughness={0.3} 
			metalness={0.05}
		/>
	</T.Mesh>
	
	<!-- Right Mouse Button (separate piece) - RAISED -->
	<T.Mesh position={[0.018, 0.028, -0.035]}>
		<T.BoxGeometry args={[0.028, 0.015, 0.045]} />
		<T.MeshStandardMaterial 
			color="#222222" 
			roughness={0.3} 
			metalness={0.05}
		/>
	</T.Mesh>
	
	<!-- Mouse Button Gap/Seam - RAISED -->
	<T.Mesh position={[0, 0.032, -0.035]}>
		<T.BoxGeometry args={[0.003, 0.01, 0.04]} />
		<T.MeshBasicMaterial color="#0a0a0a" />
	</T.Mesh>
	
	<!-- Scroll Wheel Housing - RAISED -->
	<T.Mesh position={[0, 0.038, -0.025]}>
		<T.BoxGeometry args={[0.016, 0.012, 0.025]} />
		<T.MeshStandardMaterial color="#2a2a2a" />
	</T.Mesh>
	
	<!-- Scroll Wheel (main cylinder with grip) - RAISED -->
	<T.Mesh position={[0, 0.046, -0.025]} rotation={[0, 0, Math.PI / 2]}>
		<T.CylinderGeometry args={[0.008, 0.008, 0.014, 16]} />
		<T.MeshStandardMaterial 
			color="#4a4a4a" 
			roughness={0.6}
			metalness={0.3}
		/>
	</T.Mesh>
	
	<!-- Scroll Wheel Grip Lines - RAISED -->
	{#each [-0.003, 0, 0.003] as offset}
		<T.Mesh position={[offset, 0.046, -0.025]} rotation={[0, 0, Math.PI / 2]}>
			<T.CylinderGeometry args={[0.0082, 0.0082, 0.002, 8]} />
			<T.MeshStandardMaterial color="#333333" />
		</T.Mesh>
	{/each}
	
	<!-- Side Buttons (Forward/Back) - RAISED -->
	<T.Mesh position={[-0.038, 0.025, -0.015]}>
		<T.BoxGeometry args={[0.006, 0.012, 0.018]} />
		<T.MeshStandardMaterial color="#252525" />
	</T.Mesh>
	<T.Mesh position={[-0.038, 0.025, 0.008]}>
		<T.BoxGeometry args={[0.006, 0.012, 0.015]} />
		<T.MeshStandardMaterial color="#252525" />
	</T.Mesh>
	
	<!-- Mouse Feet (PTFE sliders) - Front Left -->
	<T.Mesh position={[-0.022, -0.008, -0.045]}>
		<T.BoxGeometry args={[0.015, 0.003, 0.02]} />
		<T.MeshStandardMaterial color="#111111" roughness={0.2} />
	</T.Mesh>
	<!-- Mouse Feet - Front Right -->
	<T.Mesh position={[0.022, -0.008, -0.045]}>
		<T.BoxGeometry args={[0.015, 0.003, 0.02]} />
		<T.MeshStandardMaterial color="#111111" roughness={0.2} />
	</T.Mesh>
	<!-- Mouse Feet - Rear -->
	<T.Mesh position={[0, -0.008, 0.045]}>
		<T.BoxGeometry args={[0.04, 0.003, 0.025]} />
		<T.MeshStandardMaterial color="#111111" roughness={0.2} />
	</T.Mesh>
	
	<!-- Logo/Brand Indentation on palm - RAISED -->
	<T.Mesh position={[0, 0.038, 0.035]}>
		<T.PlaneGeometry args={[0.015, 0.02]} />
		<T.MeshBasicMaterial color="#2a2a2a" />
	</T.Mesh>
	
	<!-- RGB LED Strip (subtle underglow) -->
	<T.Mesh position={[0, -0.012, 0]}>
		<T.RingGeometry args={[0.028, 0.036, 32]} rotation={[Math.PI / 2, 0, 0]} />
		<T.MeshBasicMaterial color="#4a90d9" transparent opacity={0.6} />
	</T.Mesh>
	
	<!-- Wireless USB Dongle (small, near mouse) -->
	<T.Mesh position={[0.15, 0.602, -2.25]}>
		<T.BoxGeometry args={[0.012, 0.004, 0.02]} />
		<T.MeshStandardMaterial color="#1a1a1a" />
	</T.Mesh>
</T.Group>

<!-- ================= DESK ACCESSORIES (CLEANED UP) ================= -->

<!-- Coaster under mug -->
<T.Mesh position={[0.45, 0.6115, -2.1]}>
	<T.CylinderGeometry args={[0.05, 0.05, 0.003, 32]} />
	<T.MeshStandardMaterial color="#8b5a2b" roughness={0.9} />
</T.Mesh>

<!-- Mug group -->
<T.Group position={[0.45, 0.639, -2.1]}>
	<!-- Mug body (open-ended cylinder so we can see the coffee inside) -->
	<T.Mesh>
		<T.CylinderGeometry args={[0.032, 0.028, 0.058, 32, 1, true]} />
		<T.MeshStandardMaterial color="#f5f5f5" roughness={0.25} metalness={0.05} side={DoubleSide} />
	</T.Mesh>

	<!-- Mug interior bottom -->
	<T.Mesh position={[0, -0.0294, 0]} rotation={[-Math.PI / 2, 0, 0]}>
		<T.CircleGeometry args={[0.0275, 32]} />
		<T.MeshStandardMaterial color="#e8e8e8" roughness={0.35} metalness={0.05} side={DoubleSide} />
	</T.Mesh>

	<!-- Mug handle (half-torus on the right, attached to the body) -->
	<T.Mesh position={[0.022, 0, 0]} rotation={[0, 0, Math.PI * 1.5]}>
		<T.TorusGeometry args={[0.025, 0.005, 12, 32, Math.PI]} />
		<T.MeshStandardMaterial color="#f5f5f5" roughness={0.25} metalness={0.05} />
	</T.Mesh>

	<!-- Coffee liquid -->
	<T.Mesh position={[0, 0.022, 0]} rotation={[-Math.PI / 2, 0, 0]}>
		<T.CircleGeometry args={[0.029, 32]} />
		<T.MeshStandardMaterial color="#3a2410" roughness={0.15} metalness={0} />
	</T.Mesh>
</T.Group>

<!-- Steam -->
{#each [
	{x: 0.445, y: 0.675, z: -2.095},
	{x: 0.452, y: 0.695, z: -2.102},
	{x: 0.448, y: 0.715, z: -2.098}
] as puff, i}
	<T.Mesh position={[puff.x, puff.y, puff.z]}>
		<T.SphereGeometry args={[0.006 + i * 0.0015, 12, 12]} />
		<T.MeshBasicMaterial color="#ffffff" transparent opacity={0.18 - i * 0.04} />
	</T.Mesh>
{/each}

<!-- Smartphone on desk - right side -->
<T.Mesh position={[0.45, 0.6, -2.0]} rotation={[0, -0.4, 0]}>
	<T.BoxGeometry args={[0.035, 0.005, 0.07]} />
	<T.MeshStandardMaterial color="#1a1a1a" />
</T.Mesh>

<!-- ================= YAMAHA P-525 DIGITAL PIANO ================= -->
<!-- Full-size 88-key piano placed to the left of the desk. -->
<T.Group position={[-1.28, 0.02, -2.1]} scale={0.84}>
	<PianoKeyboard />
</T.Group>

<!-- ================= PIANO BENCH (4-leg stand + cushioned seat) ================= -->
<!-- Centered on the piano, tucked up to the key fronts, at real-world scale. -->
<T.Group position={[-1.28, 0, -1.8]}>
	<PianoBenchStand />
	<PianoBenchSeat />
</T.Group>

<!-- ================= CHAIR (Smaller, facing desk) ================= -->
<!-- Chair positioned in front of desk, facing toward it -->
<T.Group position={[0, 0, -1.5]} rotation={[0, Math.PI, 0]}>
	<!-- Chair Base/Wheels -->
	<T.Mesh position={[0, 0.04, 0]}>
		<T.CylinderGeometry args={[0.15, 0.15, 0.02]} />
		<T.MeshStandardMaterial color="#1a1a1a" />
	</T.Mesh>
	
	<!-- Chair Stem -->
	<T.Mesh position={[0, 0.2, 0]}>
		<T.CylinderGeometry args={[0.02, 0.02, 0.3]} />
		<T.MeshStandardMaterial color="#3a3a3a" metalness={0.6} />
	</T.Mesh>
	
	<!-- Chair Seat (smaller) -->
	<T.Mesh position={[0, 0.36, 0]}>
		<T.BoxGeometry args={[0.35, 0.04, 0.35]} />
		<T.MeshStandardMaterial color="#2d4a3e" />
	</T.Mesh>
	
	<!-- Chair Back (angled slightly) -->
	<T.Mesh position={[0, 0.55, -0.15]} rotation={[-0.1, 0, 0]}>
		<T.BoxGeometry args={[0.35, 0.4, 0.04]} />
		<T.MeshStandardMaterial color="#2d4a3e" />
	</T.Mesh>
	
	<!-- Chair Armrests (optional, smaller) -->
	<T.Mesh position={[-0.2, 0.45, 0]}>
		<T.BoxGeometry args={[0.03, 0.03, 0.25]} />
		<T.MeshStandardMaterial color="#2a2a2a" />
	</T.Mesh>
	<T.Mesh position={[0.2, 0.45, 0]}>
		<T.BoxGeometry args={[0.03, 0.03, 0.25]} />
		<T.MeshStandardMaterial color="#2a2a2a" />
	</T.Mesh>
</T.Group>

<!-- ================= ATMOSPHERIC PARTICLES (Reduced for smaller room) ================= -->
<!-- Floating Dust Motes -->
{#each Array(10) as _, i}
	{@const x = (Math.random() - 0.5) * 4}
	{@const y = 0.5 + Math.random() * 2}
	{@const z = (Math.random() - 0.5) * 4}
	<T.Mesh position={[x, y, z]}>
		<T.SphereGeometry args={[0.003 + Math.random() * 0.003]} />
		<T.MeshBasicMaterial color="#ffffff" transparent opacity={0.15 + Math.random() * 0.2} />
	</T.Mesh>
{/each}
