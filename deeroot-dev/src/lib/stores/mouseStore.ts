import { writable } from 'svelte/store';
import type { MousePosition } from '$lib/types';

function createMouseStore() {
	const { subscribe, set } = writable<MousePosition>({ x: 0, y: 0 });

	if (typeof window !== 'undefined') {
		window.addEventListener('mousemove', (e) => {
			set({
				x: (e.clientX / window.innerWidth) * 2 - 1,
				y: -(e.clientY / window.innerHeight) * 2 + 1
			});
		});
	}

	return { subscribe };
}

export const mousePosition = createMouseStore();
