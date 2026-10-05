import { chromium } from '/home/deeroot/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';

/**
 * Verify the water ripple pass: move the pointer across the hero and capture
 * before/after frames, plus a zoomed crop to inspect the distortion.
 */
const run = async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewportSize: { width: 1280, height: 720 } });
	page.on('pageerror', (err) => console.log('[pageerror]', String(err).slice(0, 500)));

	await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(6000);
	// single click drop for a clean ring
	await page.mouse.click(430, 300);

	// Frame A: idle (only ambient drops)
	await page.screenshot({ path: 'screenshots/water-idle.png' });

	// Sweep the pointer diagonally across the hero to inject drops
	for (let i = 0; i < 24; i++) {
		await page.mouse.move(200 + i * 38, 120 + i * 18, { steps: 4 });
		await page.waitForTimeout(40);
	}
	await page.waitForTimeout(150);

	// Frame B: immediately after sweep
	await page.screenshot({ path: 'screenshots/water-after-sweep.png' });

	// Cropped zoom on the panel above the name to check ripple texture
	await page.screenshot({
		path: 'screenshots/water-ripple-crop.png',
		clip: { x: 100, y: 60, width: 560, height: 300 }
	});

	await browser.close();
	console.log('done');
};

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
