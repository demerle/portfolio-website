<section id="projects" class="section" aria-labelledby="projects-heading">
	<div class="section-inner">
		<p class="section-label">Projects</p>
		<h2 id="projects-heading" class="projects-heading">Selected work.</h2>

		<div class="projects-grid">
			{#each projects as project}
				<div class="glass-card project-card">
					<div class="project-header">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-year">{project.year}</p>
					</div>
					<p class="project-description">{project.description}</p>
					<div class="project-tags">
						{#each project.tags as tag}
							<span class="project-tag">{tag}</span>
						{/each}
					</div>
					<a href={project.href} class="project-link" target="_blank" rel="noopener noreferrer">
						View project
						<svg class="project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</div>
			{/each}
		</div>

		<a href="https://github.com/demerle" target="_blank" rel="noopener noreferrer" class="projects-more-link">
			See all 25+ repositories on GitHub
			<svg class="project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</a>
	</div>
</section>

<script lang="ts">
	const projects = [
		{
			title: 'Automated Sheet Music Pipeline',
			year: '2026',
			description:
				'Python pipeline converting raw sheet-music images/PDFs into MusicXML, then MIDI, then Synthesia videos — built on the HOMR optical music recognition model, with multi-page merging and continuous measure numbering.',
			tags: ['Python', 'HOMR', 'OMR', 'MusicXML', 'MIDI'],
			href: 'https://github.com/demerle/synthesia-bridge'
		},
		{
			title: 'Cloud-Native E-Commerce Store',
			year: '2025',
			description:
				'Full-stack store with a secure Spring Boot REST API (15+ endpoints), React frontend with Stripe payments, deployed on AWS EC2 with Docker Compose and GitHub Actions CI/CD.',
			tags: ['Spring Boot', 'React', 'AWS', 'Stripe', 'Docker'],
			href: 'https://shop.deeroot.dev'
		},
		{
			title: 'custom-llm',
			year: '2026',
			description:
				'A minimal terminal LLM agent with native tool calling: local bash execution, web-search fallback, and optional stdio MCP server integration — kept deliberately small.',
			tags: ['Python', 'LLM', 'MCP', 'Tool Calling'],
			href: 'https://github.com/demerle/custom-llm'
		},
		{
			title: 'realtime-translator',
			year: '2026',
			description:
				'Voice conversation product built on OpenAI Realtime over WebRTC: Flutter mobile client, Python session/control API, short-lived credentials, and natural turn-taking.',
			tags: ['Flutter', 'Python', 'WebRTC', 'OpenAI Realtime'],
			href: 'https://github.com/demerle/realtime-translator'
		},
		{
			title: 'deeroot-cards',
			year: '2026',
			description:
				'A Unity/C# mod for the game Rounds — custom cards and stat logic built against UnboundLib, compiled and debugged in batch-mode Unity.',
			tags: ['Unity', 'C#', 'Game Modding'],
			href: 'https://github.com/demerle/deeroot-cards'
		},
		{
			title: 'mahjong-calculator',
			year: '2026',
			description:
				'Japanese riichi mahjong hand-payment calculator: Python scoring backend on the mahjong library with a React frontend.',
			tags: ['Python', 'React', 'FastAPI'],
			href: 'https://github.com/demerle/mahjong-calculator'
		}
	];
</script>

<style>
	.projects-heading {
		font-size: 1.875rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin-bottom: 2rem;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.projects-more-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;
		margin-top: 1.75rem;
		transition: gap 0.2s ease;
	}

	.projects-more-link:hover {
		gap: 0.625rem;
	}

	.project-card {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.project-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	.project-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.project-year {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-muted);
	}

	.project-description {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.project-tag {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.375rem 0.75rem;
		color: var(--text-secondary);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 999px;
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;
		margin-top: auto;
		transition: gap 0.2s ease;
	}

	.project-link:hover {
		gap: 0.625rem;
	}

	.project-link-icon {
		width: 1rem;
		height: 1rem;
	}

	@media (min-width: 768px) {
		.projects-heading {
			font-size: 2.5rem;
			margin-bottom: 2.5rem;
		}

		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}

		.project-card {
			padding: 2.25rem;
		}
	}

	@media (min-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
