<script lang="ts">
	import { Canvas } from '@threlte/core';
	import RoomScene from './room/RoomScene.svelte';
</script>

<div class="canvas-container">
	<Canvas
		renderer={{ antialias: true, alpha: false }}
		dpr={Math.min(window.devicePixelRatio, 2)}
	>
		<RoomScene />
	</Canvas>
</div>

<style>
	.canvas-container {
		width: 100%;
		height: 100%;
		background: #0a0a1a;
	}
</style>
