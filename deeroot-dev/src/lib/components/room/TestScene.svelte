<script lang="ts">
	import { T, Canvas } from '@threlte/core';
</script>

<div class="canvas-wrapper">
	<Canvas>
		<T.PerspectiveCamera
			makeDefault
			position={[0, 0, 5]}
			oncreate={(ref) => {
				console.log('Camera created:', ref);
			}}
		/>
		
		<T.Mesh 
			position={[0, 0, 0]}
			oncreate={(ref) => {
				console.log('Mesh created:', ref);
			}}
		>
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshBasicMaterial color="#ff0000" />
		</T.Mesh>
		
		<T.AmbientLight intensity={1} />
	</Canvas>
</div>

<style>
	.canvas-wrapper {
		width: 100%;
		height: 100vh;
		background: #000;
	}
</style>
