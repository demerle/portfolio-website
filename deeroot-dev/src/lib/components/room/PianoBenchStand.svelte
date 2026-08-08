<script lang="ts">
	import { T } from '@threlte/core';

	// Piano bench stand: 4 round tapered legs with two-level stretchers and floor pads.
	// Realistic turned-leg look (cylindrical, slight taper top -> bottom) with classic
	// double-stretcher (upper + lower) construction tying the legs together.
	// Sits on the floor (y=0) up to the bottom of the seat's apron.

	// Stand height = floor up to bottom of seat's aprons (matches seat constants).
	const seatWidth = 0.41;
	const seatDepth = 0.33;
	const legInsetX = 0.045;
	const legInsetZ = 0.055;
	const legX = seatWidth / 2 - legInsetX;
	const legZ = seatDepth / 2 - legInsetZ;

	// Apron bottom = seatTopY - cushionHeight - boardHeight - apronHeight
	//                = 0.375 - 0.055 - 0.028 - 0.05 = 0.242
	const standTopY = 0.375 - 0.055 - 0.028 - 0.05; // 0.242
	const standHeight = standTopY; // 0.242
	const legY = standHeight / 2;

	// Tapered round leg dimensions (slightly wider at top, narrower at floor).
	const legTopR = 0.018;
	const legBottomR = 0.014;
	// 16 radial segments = smooth round leg, 1 height segment.
	const legRadialSegments = 16;

	// Stretcher configuration: classic two-level, two-stretcher (front-back + side-side).
	const stretcherSize = 0.016; // square cross-section

	// Lower stretcher near the floor
	const lowerStretcherY = 0.04;
	// Upper stretcher about 2/3 up
	const upperStretcherY = standTopY * 0.55; // ~0.092

	// Floor pad (small black disc under each leg)
	const padHeight = 0.008;
	const padSize = 0.034;

	const frameColor = '#121212';
	const frameRoughness = 0.38;
	const frameMetalness = 0.18;
	const padColor = '#050505';
</script>

<!-- Piano bench stand: 4 round tapered legs + 2-level stretchers + floor pads. -->
<T.Group>
	<!-- Four round tapered legs (no rotation hack) -->
	{#each [-legX, legX] as x}
		{#each [-legZ, legZ] as z}
			<T.Mesh position={[x, legY, z]}>
				<T.CylinderGeometry
					args={[legTopR, legBottomR, standHeight, legRadialSegments]}
				/>
				<T.MeshStandardMaterial
					color={frameColor}
					roughness={frameRoughness}
					metalness={frameMetalness}
				/>
			</T.Mesh>

			<!-- Floor pad under each leg -->
			<T.Mesh position={[x, padHeight / 2, z]}>
				<T.BoxGeometry args={[padSize, padHeight, padSize]} />
				<T.MeshStandardMaterial color={padColor} roughness={0.7} metalness={0.1} />
			</T.Mesh>
		{/each}
	{/each}

	<!-- Lower stretchers: front/back (run along X) and sides (run along Z) -->
	<!-- Front + back (along X) -->
	{#each [-legZ, legZ] as z}
		<T.Mesh position={[0, lowerStretcherY, z]}>
			<T.BoxGeometry args={[legX * 2, stretcherSize, stretcherSize]} />
			<T.MeshStandardMaterial
				color={frameColor}
				roughness={frameRoughness}
				metalness={frameMetalness}
			/>
		</T.Mesh>
	{/each}
	<!-- Left + right sides (along Z) -->
	{#each [-legX, legX] as x}
		<T.Mesh position={[x, lowerStretcherY, 0]}>
			<T.BoxGeometry args={[stretcherSize, stretcherSize, legZ * 2]} />
			<T.MeshStandardMaterial
				color={frameColor}
				roughness={frameRoughness}
				metalness={frameMetalness}
			/>
		</T.Mesh>
	{/each}

	<!-- Upper stretchers: front/back (along X) and sides (along Z) -->
	{#each [-legZ, legZ] as z}
		<T.Mesh position={[0, upperStretcherY, z]}>
			<T.BoxGeometry args={[legX * 2, stretcherSize, stretcherSize]} />
			<T.MeshStandardMaterial
				color={frameColor}
				roughness={frameRoughness}
				metalness={frameMetalness}
			/>
		</T.Mesh>
	{/each}
	{#each [-legX, legX] as x}
		<T.Mesh position={[x, upperStretcherY, 0]}>
			<T.BoxGeometry args={[stretcherSize, stretcherSize, legZ * 2]} />
			<T.MeshStandardMaterial
				color={frameColor}
				roughness={frameRoughness}
				metalness={frameMetalness}
			/>
		</T.Mesh>
	{/each}
</T.Group>
