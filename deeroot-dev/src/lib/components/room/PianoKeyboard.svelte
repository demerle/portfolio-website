<script lang="ts">
	import { T } from '@threlte/core';

	const bodyWidth = 1.336;
	const bodyDepth = 0.376;
	const keybedWidth = 1.222;
	const whiteKeyCount = 52;
	const whiteKeyWidth = keybedWidth / whiteKeyCount;
	const whiteKeyGap = 0.0008;
	const whiteKeyLength = 0.154;
	const blackKeyWidth = whiteKeyWidth * 0.58;
	const blackKeyLength = 0.097;
	const whiteNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	const blackAfter = new Set(['A', 'C', 'D', 'F', 'G']);
	const keybedLeft = -keybedWidth / 2;
	const whiteKeyZ = 0.072;
	const blackKeyZ = whiteKeyZ - whiteKeyLength / 2 + blackKeyLength / 2;
	const standScale = 0.8;
	const keyboardDrop = 0.605 * (1 - standScale);

	const whiteKeys = Array.from({ length: whiteKeyCount }, (_, index) => ({
		index,
		x: keybedLeft + whiteKeyWidth * (index + 0.5),
		note: whiteNotes[index % whiteNotes.length]
	}));

	const blackKeys = whiteKeys
		.slice(0, -1)
		.filter((key) => blackAfter.has(key.note))
		.map((key) => ({
			index: key.index,
			x: keybedLeft + whiteKeyWidth * (key.index + 1)
		}));

	const speakerSlots = Array.from({ length: 18 }, (_, index) => ({
		x: -0.535 + index * 0.012
	}));

	const rightSpeakerSlots = speakerSlots.map((slot) => ({
		x: -slot.x
	}));
</script>

<!-- Yamaha P-525 style full-size digital piano, placed on a slim stand. -->
<T.Group>
	<!-- Single full-width X stand -->
	<T.Group position={[-0.055, 0, 0]} scale={standScale}>
		<T.Mesh position={[0, 0.335, -0.005]} rotation={[0, 0, 1.09]}>
			<T.BoxGeometry args={[0.035, 1.42, 0.04]} />
			<T.MeshStandardMaterial color="#111111" roughness={0.38} metalness={0.48} />
		</T.Mesh>
		<T.Mesh position={[0, 0.335, -0.005]} rotation={[0, 0, -1.09]}>
			<T.BoxGeometry args={[0.035, 1.42, 0.04]} />
			<T.MeshStandardMaterial color="#111111" roughness={0.38} metalness={0.48} />
		</T.Mesh>
		<T.Mesh position={[0, 0.335, -0.005]} rotation={[Math.PI / 2, 0, 0]}>
			<T.CylinderGeometry args={[0.032, 0.032, 0.045, 24]} />
			<T.MeshStandardMaterial color="#222222" roughness={0.28} metalness={0.55} />
		</T.Mesh>
		<T.Mesh position={[0, 0.605, -0.005]}>
			<T.BoxGeometry args={[1.12, 0.035, 0.05]} />
			<T.MeshStandardMaterial color="#111111" roughness={0.42} metalness={0.48} />
		</T.Mesh>
		{#each [-0.63, 0.63] as x}
			<T.Mesh position={[x, 0.035, -0.005]}>
				<T.BoxGeometry args={[0.075, 0.032, 0.38]} />
				<T.MeshStandardMaterial color="#101010" roughness={0.45} metalness={0.5} />
			</T.Mesh>
			<T.Mesh position={[x, 0.035, -0.205]}>
				<T.BoxGeometry args={[0.09, 0.035, 0.035]} />
				<T.MeshStandardMaterial color="#050505" roughness={0.65} />
			</T.Mesh>
			<T.Mesh position={[x, 0.035, 0.195]}>
				<T.BoxGeometry args={[0.09, 0.035, 0.035]} />
				<T.MeshStandardMaterial color="#050505" roughness={0.65} />
			</T.Mesh>
		{/each}
	</T.Group>

	<!-- Keyboard body, lowered to sit on the smaller stand -->
	<T.Group position={[0, -keyboardDrop, 0]}>
		<!-- Main chassis -->
		<T.Mesh position={[0, 0.675, 0]}>
			<T.BoxGeometry args={[bodyWidth, 0.13, bodyDepth]} />
			<T.MeshStandardMaterial color="#121212" roughness={0.34} metalness={0.18} />
		</T.Mesh>
		<T.Mesh position={[0, 0.745, -0.035]}>
			<T.BoxGeometry args={[bodyWidth - 0.035, 0.018, bodyDepth - 0.05]} />
			<T.MeshStandardMaterial color="#1b1b1b" roughness={0.27} metalness={0.2} />
		</T.Mesh>

		<!-- Slightly raised back control deck -->
		<T.Mesh position={[0, 0.77, -0.13]}>
			<T.BoxGeometry args={[bodyWidth - 0.06, 0.026, 0.105]} />
			<T.MeshStandardMaterial color="#101010" roughness={0.3} metalness={0.25} />
		</T.Mesh>

		<!-- Keybed tray and red felt strip -->
		<T.Mesh position={[0, 0.758, 0.072]}>
			<T.BoxGeometry args={[keybedWidth + 0.035, 0.018, whiteKeyLength + 0.035]} />
			<T.MeshStandardMaterial color="#050505" roughness={0.42} />
		</T.Mesh>
		<T.Mesh position={[0, 0.784, -0.012]}>
			<T.BoxGeometry args={[keybedWidth, 0.006, 0.009]} />
			<T.MeshBasicMaterial color="#6d1218" />
		</T.Mesh>

		<!-- 52 full-size white keys from A0 to C8 -->
		{#each whiteKeys as key}
			<T.Mesh position={[key.x, 0.785, whiteKeyZ]}>
				<T.BoxGeometry args={[whiteKeyWidth - whiteKeyGap, 0.022, whiteKeyLength]} />
				<T.MeshStandardMaterial
					color={key.index % 7 === 2 || key.index % 7 === 5 ? '#f1eee6' : '#faf8f0'}
					roughness={0.18}
					metalness={0.02}
				/>
			</T.Mesh>
			<T.Mesh position={[key.x + whiteKeyWidth / 2, 0.798, whiteKeyZ + 0.012]}>
				<T.BoxGeometry args={[0.0009, 0.004, whiteKeyLength - 0.018]} />
				<T.MeshBasicMaterial color="#c7c1b6" />
			</T.Mesh>
		{/each}

		<!-- 36 black keys, grouped naturally as 2s and 3s across the full 88-key layout -->
		{#each blackKeys as key}
			<T.Mesh position={[key.x, 0.807, blackKeyZ]}>
				<T.BoxGeometry args={[blackKeyWidth, 0.036, blackKeyLength]} />
				<T.MeshStandardMaterial color="#060606" roughness={0.25} metalness={0.08} />
			</T.Mesh>
			<T.Mesh position={[key.x, 0.829, blackKeyZ - 0.01]}>
				<T.BoxGeometry args={[blackKeyWidth * 0.82, 0.008, blackKeyLength * 0.66]} />
				<T.MeshStandardMaterial color="#1b1b1b" roughness={0.2} metalness={0.12} />
			</T.Mesh>
		{/each}

		<!-- End cheeks around the action -->
		<T.Mesh position={[-0.638, 0.787, 0.067]}>
			<T.BoxGeometry args={[0.035, 0.055, 0.18]} />
			<T.MeshStandardMaterial color="#0d0d0d" roughness={0.32} metalness={0.15} />
		</T.Mesh>
		<T.Mesh position={[0.638, 0.787, 0.067]}>
			<T.BoxGeometry args={[0.035, 0.055, 0.18]} />
			<T.MeshStandardMaterial color="#0d0d0d" roughness={0.32} metalness={0.15} />
		</T.Mesh>

		<!-- Control surface: speakers, display, buttons, and knobs. -->
		{#each speakerSlots as slot}
			<T.Mesh position={[slot.x, 0.787, -0.132]}>
				<T.BoxGeometry args={[0.006, 0.006, 0.07]} />
				<T.MeshBasicMaterial color="#050505" />
			</T.Mesh>
		{/each}
		{#each rightSpeakerSlots as slot}
			<T.Mesh position={[slot.x, 0.787, -0.132]}>
				<T.BoxGeometry args={[0.006, 0.006, 0.07]} />
				<T.MeshBasicMaterial color="#050505" />
			</T.Mesh>
		{/each}
		<T.Mesh position={[0, 0.79, -0.133]}>
			<T.BoxGeometry args={[0.13, 0.008, 0.046]} />
			<T.MeshBasicMaterial color="#182436" />
		</T.Mesh>
		{#each [-0.22, -0.18, -0.14, 0.14, 0.18, 0.22] as x}
			<T.Mesh position={[x, 0.792, -0.132]} rotation={[Math.PI / 2, 0, 0]}>
				<T.CylinderGeometry args={[0.012, 0.012, 0.008, 24]} />
				<T.MeshStandardMaterial color="#222222" roughness={0.2} metalness={0.22} />
			</T.Mesh>
		{/each}

		<!-- Yamaha-style front badge and subtle bevel lines -->
		<T.Mesh position={[0, 0.718, 0.191]}>
			<T.BoxGeometry args={[0.105, 0.022, 0.004]} />
			<T.MeshStandardMaterial color="#d5d2c8" roughness={0.18} metalness={0.35} />
		</T.Mesh>
		<T.Mesh position={[0, 0.612, 0.192]}>
			<T.BoxGeometry args={[bodyWidth - 0.06, 0.006, 0.004]} />
			<T.MeshBasicMaterial color="#2b2b2b" />
		</T.Mesh>
	</T.Group>
</T.Group>
