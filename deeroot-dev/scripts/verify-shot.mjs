import { chromium } from '/home/deeroot/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';

const run = async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewportSize: { width: 1280, height: 720 } });
	page.on('console', (msg) => console.log('[console.' + msg.type() + ']', msg.text().slice(0, 500)));
	page.on('pageerror', (err) => console.log('[pageerror]', String(err).slice(0, 800)));
	await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(6000);
	await page.screenshot({ path: 'screenshots/01-hero-default.png' });
	await browser.close();
};

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
