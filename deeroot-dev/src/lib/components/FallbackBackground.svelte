<script lang="ts">
	import { browser } from '$app/environment';

	/**
	 * Non-WebGL fallback: charcoal backdrop, blue gradient orbs, and a 2D
	 * perspective grid canvas with mouse-reactive tiles (echoing the
	 * reference site's content-section backdrop).
	 */
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!browser || !canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		let width = window.innerWidth;
		let height = window.innerHeight;

		const TILE = 28;
		const P = 2000;
		const FADE = 1500;
		// Rotation Rx(30) * Ry(-5) * Rz(20), same as the reference grid
		const rx = (30 * Math.PI) / 180;
		const ry = (-5 * Math.PI) / 180;
		const rz = (20 * Math.PI) / 180;
		const cRx = Math.cos(rx), sRx = Math.sin(rx);
		const cRy = Math.cos(ry), sRy = Math.sin(ry);
		const cRz = Math.cos(rz), sRz = Math.sin(rz);
		const R00 = cRy * cRz, R01 = -cRy * sRz;
		const R10 = sRx * sRy * cRz + cRx * sRz, R11 = -sRx * sRy * sRz + cRx * cRz;
		const R20 = -cRx * sRy * cRz + sRx * sRz, R21 = cRx * sRy * sRz + sRx * cRz;

		const COLORS = [
			'33, 150, 243',
			'66, 165, 245',
			'144, 202, 249',
			'25, 118, 210'
		];

		const active = new Map<string, { gx: number; gy: number; color: string; t: number }>();
		let mouseX = -9999;
		let mouseY = -9999;
		let raf = 0;

		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas!.width = width * dpr;
			canvas!.height = height * dpr;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		function proj(gx: number, gy: number, cx: number, cy: number, gw: number, gh: number) {
			const x = (gx - gw / 2) * 2;
			const y = (gy - gh / 2) * 2;
			const x2 = R00 * x + R01 * y;
			const y2 = R10 * x + R11 * y;
			const z2 = R20 * x + R21 * y;
			const s = P / (P + z2);
			return { x: cx + x2 * s, y: cy + y2 * s };
		}

		function screenToCell(sx: number, sy: number, cx: number, cy: number, gw: number, gh: number) {
			const dx = sx - cx;
			const dy = sy - cy;
			const A = dx * R20 - P * R00;
			const B = dx * R21 - P * R01;
			const C = dy * R20 - P * R10;
			const D = dy * R21 - P * R11;
			const det = A * D - B * C;
			if (Math.abs(det) < 0.001) return null;
			const x = (P * (-dx * D + B * dy)) / det;
			const y = (P * (-A * dy + C * dx)) / det;
			const col = Math.floor(x / TILE);
			const row = Math.floor(y / TILE);
			if (col < -25 || col > 25 || row < -25 || row > 25) return null;
			return { col, row };
		}

		function draw() {
			const now = performance.now();
			ctx!.clearRect(0, 0, width, height);

			// One virtual grid plane covering the viewport
			const cols = Math.ceil(width / TILE) + 20;
			const rows = Math.ceil(height / TILE) + 20;
			const gw = cols * TILE;
			const gh = rows * TILE;
			const cx = width / 2;
			const cy = height / 2;

			// Grid lines
			ctx!.strokeStyle = 'rgba(255,255,255,0.05)';
			ctx!.lineWidth = 0.5;
			ctx!.beginPath();
			for (let r = 0; r <= rows; r++) {
				const a = proj(0, r * TILE, cx, cy, gw, gh);
				const b = proj(gw, r * TILE, cx, cy, gw, gh);
				ctx!.moveTo(a.x, a.y);
				ctx!.lineTo(b.x, b.y);
			}
			for (let c = 0; c <= cols; c++) {
				const a = proj(c * TILE, 0, cx, cy, gw, gh);
				const b = proj(c * TILE, gh, cx, cy, gw, gh);
				ctx!.moveTo(a.x, a.y);
				ctx!.lineTo(b.x, b.y);
			}
			ctx!.stroke();

			// Fading active tiles
			for (const [key, tile] of active) {
				const elapsed = now - tile.t;
				if (elapsed > FADE) {
					active.delete(key);
					continue;
				}
				const alpha = 0.5 * (1 - elapsed / FADE);
				const p0 = proj(tile.gx * TILE, tile.gy * TILE, cx, cy, gw, gh);
				const p1 = proj((tile.gx + 1) * TILE, tile.gy * TILE, cx, cy, gw, gh);
				const p2 = proj((tile.gx + 1) * TILE, (tile.gy + 1) * TILE, cx, cy, gw, gh);
				const p3 = proj(tile.gx * TILE, (tile.gy + 1) * TILE, cx, cy, gw, gh);
				ctx!.fillStyle = `rgba(${tile.color}, ${alpha})`;
				ctx!.beginPath();
				ctx!.moveTo(p0.x, p0.y);
				ctx!.lineTo(p1.x, p1.y);
				ctx!.lineTo(p2.x, p2.y);
				ctx!.lineTo(p3.x, p3.y);
				ctx!.closePath();
				ctx!.fill();
			}

			// Light up the tile under the pointer
			if (!reduced && mouseX >= 0) {
				const cell = screenToCell(mouseX, mouseY, cx, cy, gw, gh);
				if (cell) {
					const key = `${cell.col}-${cell.row}`;
					const idx = Math.abs(cell.col * 7 + cell.row * 13) % COLORS.length;
					active.set(key, {
						gx: cell.col,
						gy: cell.row,
						color: COLORS[idx]!,
						t: now
					});
				}
			}

			raf = window.requestAnimationFrame(draw);
		}

		function onMouseMove(event: MouseEvent) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		}

		resize();
		window.addEventListener('resize', resize);
		window.addEventListener('mousemove', onMouseMove, { passive: true });
		raf = window.requestAnimationFrame(draw);

		return () => {
			window.cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', onMouseMove);
		};
	});
</script>

<div class="fallback-bg">
	<canvas bind:this={canvas} class="grid-canvas"></canvas>

	<div class="gradient-orb orb-1"></div>
	<div class="gradient-orb orb-2"></div>
	<div class="gradient-orb orb-3"></div>
</div>

<style>
	.fallback-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(135deg, #191919 0%, #212121 50%, #151515 100%);
		z-index: 0;
		overflow: hidden;
	}

	.grid-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.35;
		animation: float 8s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: #1976d2;
		top: 10%;
		left: 10%;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: #42a5f5;
		bottom: 20%;
		right: 15%;
		animation-delay: -2s;
	}

	.orb-3 {
		width: 250px;
		height: 250px;
		background: #90caf9;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: -4s;
	}

	@keyframes float {
		0%,
		100% {
			translate: 0 0;
		}
		50% {
			translate: 0 -30px;
		}
	}
</style>
