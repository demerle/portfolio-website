<script lang="ts">
	import { Canvas } from '@threlte/core';
	import RoomScene from './room/RoomScene.svelte';
	import WaterRipples from './room/WaterRipples.svelte';
</script>

<div class="canvas-container">
	<Canvas dpr={[1, 2]} renderMode={'always'} autoRender={false}>
		<RoomScene />
		<WaterRipples />
	</Canvas>
</div>

<style>
	.canvas-container {
		width: 100%;
		height: 100%;
		background: #050510;
	}
</style>
