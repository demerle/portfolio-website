<section id="skills" class="section" aria-labelledby="skills-heading">
	<div class="section-inner">
		<p class="section-label">Skills</p>
		<h2 id="skills-heading" class="skills-heading">Tools &amp; technologies I work with.</h2>

		<div class="skills-grid">
			{#each skillGroups as group}
				<div class="glass-card skill-card">
					<h3 class="skill-category">{group.category}</h3>
					<p class="skill-items">{group.items}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<script lang="ts">
	const skillGroups = [
		{
			category: 'Languages',
			items: 'Python, Java, JavaScript, SQL, C, Bash'
		},
		{
			category: 'Frameworks & Libraries',
			items: 'Spring Boot, FastAPI, React.js, Ultralytics YOLO'
		},
		{
			category: 'Tools & Platforms',
			items: 'AWS (EC2, RDS, S3), PostgreSQL, TimescaleDB, Docker / Docker Compose, Git, Linux'
		},
		{
			category: 'AI & Agentic',
			items: 'OpenAI Codex, OpenCode, Model Context Protocol (MCP)'
		}
	];
</script>

<style>
	.skills-heading {
		font-size: 1.875rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin-bottom: 2rem;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	.skill-card {
		padding: 1.5rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skill-category {
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.skill-items {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.skill-card:hover .skill-items {
		color: var(--text-primary);
	}

	@media (min-width: 640px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.skills-heading {
			font-size: 2.5rem;
			margin-bottom: 2.5rem;
		}

		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}
</style>
