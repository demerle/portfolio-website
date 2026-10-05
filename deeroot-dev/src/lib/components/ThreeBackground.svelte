<script lang="ts">
	import { browser } from '$app/environment';
	import { isLoading, isWebGLSupported } from '$lib/stores/loadingStore';
	import ThreeCanvas from './ThreeCanvas.svelte';
	import FallbackBackground from './FallbackBackground.svelte';
	import LoadingScreen from './LoadingScreen.svelte';

	let hasWebGL = $state(false);
	let loading = $state(true);

	$effect(() => {
		if (!browser) return;
		
		// Check WebGL support
		try {
			const canvas = document.createElement('canvas');
			hasWebGL = !!(
				window.WebGLRenderingContext &&
				(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
			);
		} catch {
			hasWebGL = false;
		}
		
		isWebGLSupported.set(hasWebGL);
		
		// Simulate loading time
		const timer = setTimeout(() => {
			loading = false;
			isLoading.set(false);
		}, 1500);
		
		return () => clearTimeout(timer);
	});
</script>

{#if loading && hasWebGL}
	<LoadingScreen />
{/if}

{#if hasWebGL}
	<div class="fixed inset-0" style="z-index: 0;">
		<ThreeCanvas />
	</div>
{:else}
	<FallbackBackground />
{/if}
