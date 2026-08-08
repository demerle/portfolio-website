<script lang="ts">
	import { T } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';

	// Piano bench seat: cushion, welt, seat board, aprons.
	// Sits on top of PianoBenchStand; bottom-of-apron should match the stand's top.
	// All units in real-world meters.

	// Seat top height: 0.30 -> 0.375 (halfway back to the 0.45 prior value)
	const seatTopY = 0.375;

	// Seat width: reduced from 0.56 -> 0.41 (about 6 inches narrower), kept centered.
	const seatWidth = 0.41;
	const seatDepth = 0.33;

	const cushionHeight = 0.055;
	const cushionY = seatTopY - cushionHeight / 2;

	const boardHeight = 0.028;
	const boardTopY = seatTopY - cushionHeight;
	const boardY = boardTopY - boardHeight / 2;

	const apronHeight = 0.05;
	const apronTopY = boardTopY - boardHeight;
	const apronY = apronTopY - apronHeight / 2;

	// Apron layout: legs are inset 0.045m from X edges, 0.055m from Z edges.
	const legInsetX = 0.045;
	const legInsetZ = 0.055;
	const apronX = seatWidth / 2 - legInsetX;
	const apronZ = seatDepth / 2 - legInsetZ;

	const frameColor = '#121212';
	const frameRoughness = 0.38;
	const frameMetalness = 0.18;
</script>

<!-- Piano bench seat: cushioned top + wooden base/aprons. -->
<T.Group>
	<!-- Padded cushion (vinyl/leather look, slightly rounded) -->
	<T.Mesh position={[0, cushionY, 0]}>
		<RoundedBoxGeometry args={[seatWidth, cushionHeight, seatDepth]} radius={0.018} smoothness={4} />
		<T.MeshStandardMaterial color="#1b1b1e" roughness={0.6} metalness={0.05} />
	</T.Mesh>

	<!-- Welt/piping seam around the cushion base -->
	<T.Mesh position={[0, boardTopY + 0.004, 0]}>
		<RoundedBoxGeometry
			args={[seatWidth + 0.006, 0.007, seatDepth + 0.006]}
			radius={0.003}
			smoothness={4}
		/>
		<T.MeshStandardMaterial color="#0a0a0a" roughness={0.5} metalness={0.05} />
	</T.Mesh>

	<!-- Wooden seat board under the cushion -->
	<T.Mesh position={[0, boardY, 0]}>
		<RoundedBoxGeometry
			args={[seatWidth - 0.02, boardHeight, seatDepth - 0.02]}
			radius={0.004}
			smoothness={4}
		/>
		<T.MeshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={frameMetalness} />
	</T.Mesh>

	<!-- Aprons: front/back run along X, sides run along Z -->
	{#each [-apronZ, apronZ] as z}
		<T.Mesh position={[0, apronY, z]}>
			<T.BoxGeometry args={[apronX * 2, apronHeight, 0.02]} />
			<T.MeshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={frameMetalness} />
		</T.Mesh>
	{/each}
	{#each [-apronX, apronX] as x}
		<T.Mesh position={[x, apronY, 0]}>
			<T.BoxGeometry args={[0.02, apronHeight, apronZ * 2]} />
			<T.MeshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={frameMetalness} />
		</T.Mesh>
	{/each}
</T.Group>
