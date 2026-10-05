<script lang="ts">
	let flipped = $state<number | null>(null);
	let reducedMotion = $state(false);

	if (typeof document !== 'undefined') {
		if (document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			reducedMotion = true;
		}
	}

	function toggleFlip(i: number) {
		if (reducedMotion) return;
		flipped = flipped === i ? null : i;
	}

	const skillGroups = [
		{
			category: 'Languages',
			icon: 'M8 3H7a3 3 0 0 0-3 3v3c0 1-.5 2-2 2v2c1.5 0 2 1 2 2v3a3 3 0 0 0 3 3h1M16 3h1a3 3 0 0 1 3 3v3c0 1 .5 2 2 2v2c-1.5 0-2 1-2 2v3a3 3 0 0 1-3 3h-1',
			description: 'The tools I think in.',
			items: ['Python', 'Java', 'JavaScript', 'SQL', 'C', 'Bash']
		},
		{
			category: 'Frameworks & Libraries',
			icon: 'M4 6h16M4 10h16M4 14h10M4 18h7',
			description: 'What I build on.',
			items: ['Spring Boot', 'FastAPI', 'React.js', 'Ultralytics YOLO']
		},
		{
			category: 'Tools & Platforms',
			icon: 'M14.7 6.3a5 5 0 1 1-6.9 6.9L3 18l3 3 4.8-4.8a5 5 0 1 1 6.9-6.9l-3.5 3.5 2 2 3.5-3.5',
			description: 'Where things run.',
			items: ['AWS (EC2, RDS, S3)', 'PostgreSQL', 'TimescaleDB', 'Docker / Docker Compose', 'Git', 'Linux']
		},
		{
			category: 'AI & Agentic',
			icon: 'M12 2a5 5 0 0 1 5 5v1a4 4 0 0 1 3 3.9V14a4 4 0 0 1-3 3.9V19a3 3 0 0 1-5 2.2M9 2a5 5 0 0 0-5 5v1a4 4 0 0 0-3 3.9V14a4 4 0 0 0 3 3.9V19a3 3 0 0 0 5 2.2M12 8v8',
			description: 'How I automate.',
			items: ['OpenAI Codex', 'OpenCode', 'Model Context Protocol (MCP)']
		}
	];

	const allTags = [
		'Python',
		'Java',
		'JavaScript',
		'SQL',
		'C',
		'Bash',
		'Spring Boot',
		'FastAPI',
		'React.js',
		'Ultralytics YOLO',
		'AWS EC2',
		'AWS RDS',
		'AWS S3',
		'PostgreSQL',
		'TimescaleDB',
		'Docker',
		'Git',
		'Linux',
		'OpenAI Codex',
		'OpenCode',
		'MCP',
		'Figma',
		'Ignition Perspective',
		'Sparkplug B'
	];
</script>

<section id="skills" class="section" aria-labelledby="skills-heading">
	<div class="section-inner">
		<p class="section-eyebrow">What I Do</p>
		<h2 id="skills-heading" class="section-heading">Tools &amp; technologies I work with.</h2>

		<div class="skills-grid">
			{#each skillGroups as group, i}
				<button
					type="button"
					class="flip-wrap"
					class:flipped={flipped === i}
					onclick={() => toggleFlip(i)}
					aria-label="{group.category} — activate to flip for details"
				>
					<div class="flip-inner">
						<!-- Front -->
						<div class="flip-face flip-front">
							<span class="flip-number">{String(i + 1).padStart(2, '0')}</span>
							<h3 class="flip-title">{group.category}</h3>
							<span class="flip-hint">Hover to flip</span>
						</div>
						<!-- Back -->
						<div class="flip-face flip-back">
							<svg class="flip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d={group.icon}
								/>
							</svg>
							<h3 class="flip-title">{group.category}</h3>
							<p class="flip-description">{group.description}</p>
							<div class="flip-items">
								{#each group.items as item}
									<span class="flip-item">{item}</span>
								{/each}
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>

		<div class="tag-cloud">
			{#each allTags as tag}
				<span class="skill-tag">{tag}</span>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
		margin-bottom: 2.5rem;
	}

	.flip-wrap {
		perspective: 1200px;
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		text-align: left;
		min-height: 250px;
	}

	.flip-inner {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: inherit;
		transform-style: preserve-3d;
		transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.flip-wrap.flipped .flip-inner {
		transform: rotateX(180deg);
	}

	.flip-face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		border-radius: 12px;
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
	}

	.flip-front {
		background: var(--surface-gradient);
		border: 1px solid var(--border-hairline);
		box-shadow: var(--shadow-card);
		justify-content: center;
		gap: 0.75rem;
	}

	.flip-front::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent, var(--accent-bright), transparent);
		opacity: 0.7;
		border-radius: 12px 12px 0 0;
	}

	.flip-number {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--accent-bright);
		letter-spacing: 2px;
	}

	.flip-title {
		font-size: 1.375rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.flip-hint {
		font-size: 0.75rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.flip-back {
		background: linear-gradient(145deg, #1976d2 0%, #0d47a1 100%);
		transform: rotateX(180deg);
		gap: 0.625rem;
		justify-content: center;
	}

	.flip-icon {
		width: 1.75rem;
		height: 1.75rem;
		color: #ffffff;
	}

	.flip-back .flip-title {
		color: #ffffff;
		font-size: 1.125rem;
	}

	.flip-description {
		font-size: 0.8125rem;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1.5;
	}

	.flip-items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.flip-item {
		font-size: 0.6875rem;
		font-weight: 500;
		padding: 0.25rem 0.625rem;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.14);
		color: #ffffff;
	}

	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	@media (max-width: 640px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}

		.flip-wrap {
			min-height: 200px;
		}
	}

	@media (min-width: 641px) and (max-width: 900px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 901px) {
		.skills-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
