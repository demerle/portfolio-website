import type { PianoKeyConfig } from '$lib/types';

const KEY_LAYOUT = {
	totalKeys: 24,
	octavePattern: ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'] as const,
	whiteKeySpacing: 0.85,
	whiteKeyStartX: -8.5,
	blackKeyOffset: 0.425
};

export function generateKeys(count: number = 24): PianoKeyConfig[] {
	const keys: PianoKeyConfig[] = [];
	let whiteKeyIndex = 0;

	for (let i = 0; i < count; i++) {
		const isBlack = [1, 3, 6, 8, 10].includes(i % 12);
		const type = isBlack ? 'black' : 'white';

		let x: number;
		if (!isBlack) {
			x = KEY_LAYOUT.whiteKeyStartX + whiteKeyIndex * KEY_LAYOUT.whiteKeySpacing;
			whiteKeyIndex++;
		} else {
			x = KEY_LAYOUT.whiteKeyStartX + (whiteKeyIndex - 1) * KEY_LAYOUT.whiteKeySpacing + KEY_LAYOUT.blackKeyOffset;
		}

		const y = Math.sin(i * 0.5) * 1.5 + (Math.sin(i * 1.3) * 0.5);
		const z = -2 - (Math.abs(Math.cos(i * 0.7)) * 5);

		keys.push({
			id: i,
			type,
			basePosition: [x, y, z],
			floatOffset: i * 0.3,
			floatSpeed: 0.0005 + (Math.abs(Math.sin(i)) * 0.0005)
		});
	}

	return keys;
}
