import type { RequestHandler } from './$types';

const BASE_URL = 'https://deeroot.dev';
// Single-page portfolio — single URL. Add entries here as the site grows.
const urls: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
	{ loc: BASE_URL + '/', changefreq: 'monthly', priority: '1.0' }
];

export const prerender = true;
export const trailingSlash = 'ignore';

export const GET: RequestHandler = async () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>
`;
	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};