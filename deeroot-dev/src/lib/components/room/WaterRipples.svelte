<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { useTask, useThrelte } from '@threlte/core';
	import { WaterRipplePass } from '$lib/three/water';

	const { renderer, scene, camera, size, dpr } = useThrelte();

	let pass: WaterRipplePass | null = $state(null);
	let heroActive = $state(true);
	let reducedMotion = false;

	// Pointer state for interactive drops
	let lastX = -1;
	let lastY = -1;

	function onPointerMove(event: PointerEvent) {
		if (!pass?.active) return;
		const x = event.clientX / window.innerWidth;
		const y = 1 - event.clientY / window.innerHeight;
		if (lastX >= 0) {
			const dist = Math.hypot(x - lastX, y - lastY);
			if (dist > 0.004) {
				pass.addDrop(x, y, 0.04, Math.min(0.02, 0.005 + dist * 1.4));
			}
		}
		lastX = x;
		lastY = y;
	}

	function onPointerDown(event: PointerEvent) {
		if (!pass?.active) return;
		const x = event.clientX / window.innerWidth;
		const y = 1 - event.clientY / window.innerHeight;
		pass.addDrop(x, y, 0.055, 0.12);
	}

	function onScroll() {
		heroActive = window.scrollY < window.innerHeight * 0.85;
		if (!heroActive) {
			lastX = -1;
			lastY = -1;
		}
	}

	onMount(() => {
		if (!browser) return;

		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		pass = new WaterRipplePass(renderer);

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		window.addEventListener('pointerdown', onPointerDown, { passive: true });
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => {
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerdown', onPointerDown);
			window.removeEventListener('scroll', onScroll);
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
		if (!pass) return;
		pass.active = heroActive && !reducedMotion;
		pass.step(delta);
		pass.render(scene, camera.current);
	});
</script>
