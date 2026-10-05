import { chromium } from '/home/deeroot/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';

const run = async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	page.on('pageerror', (err) => console.log('[pageerror]', String(err).slice(0, 400)));
	await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(4500);

	const targets = [
		['about', '10-about.png'],
		['experience', '11-experience.png'],
		['skills', '12-skills.png'],
		['projects', '13-projects.png'],
		['contact', '14-contact.png']
	];
	for (const [id, file] of targets) {
		await page.evaluate((sel) => document.getElementById(sel)?.scrollIntoView({ behavior: 'instant', block: 'start' }), id);
		await page.waitForTimeout(1800);
		await page.screenshot({ path: 'screenshots/' + file });
	}
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(1200);
	await page.screenshot({ path: 'screenshots/15-footer.png' });
	await browser.close();
	console.log('done');
};
run().catch((e) => { console.error(e); process.exit(1); });
