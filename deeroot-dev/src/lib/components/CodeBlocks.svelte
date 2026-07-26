<script lang="ts">
	import { T } from '@threlte/core';
	import { useTask } from '@threlte/core';
	import * as THREE from 'three';
	import type { CodeBlockConfig } from '$lib/types';

	const codeBlocks: CodeBlockConfig[] = [
		{
			content: "function createMagic() {\n  return '✨';\n}",
			position: [-6, 2, -4],
			rotation: [0, 0.3, 0],
			color: "#4a90d9",
			fontSize: 24
		},
		{
			content: "const passion = 'coding';\nconst hobby = 'piano';",
			position: [5, -1, -5],
			rotation: [0, -0.2, 0],
			color: "#ff6b9d",
			fontSize: 20
		},
		{
			content: "<Developer\n  name='Daniel'\n  skills={['JS', 'Java']}\n/>",
			position: [-4, -2, -3],
			rotation: [0, 0.1, 0],
			color: "#ffd700",
			fontSize: 22
		},
		{
			content: "git commit -m 'Create\nawesome portfolio'",
			position: [6, 1.5, -6],
			rotation: [0, -0.3, 0],
			color: "#4a90d9",
			fontSize: 20
		},
		{
			content: "console.log('Hello');",
			position: [0, 3, -7],
			rotation: [0, 0, 0],
			color: "#ff6b9d",
			fontSize: 26
		}
	];

	function createCodeTexture(text: string, color: string, fontSize: number): THREE.CanvasTexture {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;

		canvas.width = 512;
		canvas.height = 256;

		// Background
		const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
		gradient.addColorStop(0, 'rgba(10, 10, 26, 0.85)');
		gradient.addColorStop(1, 'rgba(26, 26, 46, 0.85)');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Border glow
		ctx.shadowColor = color;
		ctx.shadowBlur = 20;
		ctx.strokeStyle = color;
		ctx.lineWidth = 3;
		ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

		// Text
		ctx.shadowBlur = 10;
		ctx.font = `${fontSize}px 'Fira Code', monospace`;
		ctx.fillStyle = color;

		const lines = text.split('\n');
		lines.forEach((line, i) => {
			ctx.fillText(line, 24, 48 + i * (fontSize + 8));
		});

		const texture = new THREE.CanvasTexture(canvas);
		texture.minFilter = THREE.LinearFilter;
		return texture;
	}

	const textures = codeBlocks.map((block) => createCodeTexture(block.content, block.color, block.fontSize));

	// Floating animation state
	let floatOffsets = $state(codeBlocks.map(() => Math.random() * Math.PI * 2));

	useTask((delta) => {
		const time = performance.now() * 0.001;
		floatOffsets = floatOffsets.map((offset, i) => {
			return Math.sin(time * 0.5 + i * 0.8) * 0.1;
		});
	});
</script>

{#each codeBlocks as block, i}
	<T.Mesh position={[block.position[0], block.position[1] + floatOffsets[i], block.position[2]]} rotation={block.rotation}>
		<T.PlaneGeometry args={[3, 1.5]} />
		<T.MeshBasicMaterial map={textures[i]} transparent opacity={0.9} side={THREE.DoubleSide} />
	</T.Mesh>
{/each}
