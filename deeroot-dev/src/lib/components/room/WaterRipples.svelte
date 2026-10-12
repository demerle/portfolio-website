<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { useTask, useThrelte } from '@threlte/core';
	import { WaterRipplePass } from '$lib/three/water';

	const { renderer, scene, camera, size, dpr } = useThrelte();

	let pass: WaterRipplePass | null = $state(null);
	let reducedMotion = false;

	function onPointerMove(event: PointerEvent) {
		// jquery.ripples behavior: a small drop on every move event
		if (!pass?.active) return;
		pass.addDrop(
			event.clientX / window.innerWidth,
			1 - event.clientY / window.innerHeight,
			20 / Math.max(window.innerWidth, window.innerHeight),
			0.01
		);
	}

	function onPointerDown(event: PointerEvent) {
		// ...and only a bigger ripple on press
		if (!pass?.active) return;
		pass.addDrop(
			event.clientX / window.innerWidth,
			1 - event.clientY / window.innerHeight,
			(20 / Math.max(window.innerWidth, window.innerHeight)) * 1.5,
			0.14
		);
	}

	onMount(() => {
		if (!browser) return;

		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		pass = new WaterRipplePass(renderer);

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		window.addEventListener('pointerdown', onPointerDown, { passive: true });

		return () => {
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerdown', onPointerDown);
			pass?.dispose();
			pass = null;
		};
	});

	// Keep the scene render target in sync with the canvas size
	$effect(() => {
		const s = size.current;
		void dpr.current;
		if (pass) pass.resize(s.width, s.height, dpr.current);
	});

	useTask((delta) => {
		if (!pass || document.hidden) return;
		pass.active = !reducedMotion;
		pass.step(delta);
		pass.render(scene, camera.current);
	});
</script>
