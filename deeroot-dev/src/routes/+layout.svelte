<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const siteName = 'deeroot.dev';
	const baseUrl = 'https://deeroot.dev';
	const description =
		'Daniel Emerle — Computer Science student at NJIT (3.8 GPA) and Software Engineering Intern at Control Associates / Continua Process Systems. Python, Java, SQL, ML pipelines, and music-tech projects.';
	const ogImage = `${baseUrl}/og.png`;
	const title = 'Daniel Emerle — CS Student & Software Engineering Intern | deeroot.dev';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': `${baseUrl}/#person`,
				name: 'Daniel Emerle',
				alternateName: 'deeroot',
				url: baseUrl,
				image: ogImage,
				email: 'mailto:danny.emerle@gmail.com',
				telephone: '+1-609-367-4996',
				jobTitle: 'CS Student & Software Engineering Intern',
				alumniOf: {
					'@type': 'CollegeOrUniversity',
					name: 'New Jersey Institute of Technology'
				},
				description:
					'Daniel Emerle is a Computer Science student at NJIT and a Software Engineering Intern at Control Associates / Continua Process Systems, working on ML pipelines, IIoT data systems, and music-tech projects.',
				sameAs: [
					'https://github.com/demerle',
					'https://www.linkedin.com/in/danielemerle/'
				]
			},
			{
				'@type': 'WebSite',
				'@id': `${baseUrl}/#website`,
				url: baseUrl,
				name: siteName,
				description,
				publisher: { '@id': `${baseUrl}/#person` },
				inLanguage: 'en'
			},
			{
				'@type': 'ProfilePage',
				'@id': `${baseUrl}/#profilepage`,
				url: baseUrl,
				name: 'Daniel Emerle — Portfolio',
				isPartOf: { '@id': `${baseUrl}/#website` },
				about: { '@id': `${baseUrl}/#person` },
				inLanguage: 'en'
			}
		]
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
	<link rel="canonical" href={baseUrl} />
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content="Daniel Emerle, deeroot, deeroot.dev, NJIT, Computer Science, Software Engineering Intern, Python, Java, PostgreSQL, Machine Learning, portfolio" />
	<meta name="author" content="Daniel Emerle" />
	<meta name="application-name" content={siteName} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="theme-color" content="#0a0a1a" />

	<!-- Open Graph -->
	<meta property="og:type" content="profile" />
	<meta property="og:profile:first_name" content="Daniel" />
	<meta property="og:profile:last_name" content="Emerle" />
	<meta property="og:profile:username" content="deeroot" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={baseUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content="Daniel Emerle — deeroot.dev portfolio" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content="Daniel Emerle — deeroot.dev portfolio" />

	<!-- Verification placeholders: fill in codes after registering with each search console -->
	<meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE" />
	<meta name="msvalidate.01" content="BING_VERIFICATION_CODE" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap"
		rel="stylesheet"
	/>

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

{@render children()}