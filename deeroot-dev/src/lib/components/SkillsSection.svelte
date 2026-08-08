<section id="skills" class="section">
	<div class="section-inner">
		<p class="section-label">Skills</p>
		<h2 class="skills-heading">Tools & technologies I work with.</h2>

		<div class="skills-grid">
			{#each skills as skill}
				<div class="glass-card skill-card">
					<span class="skill-name">{skill}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<script lang="ts">
	const skills = [
		'TypeScript',
		'Svelte / SvelteKit',
		'React',
		'Next.js',
		'Node.js',
		'Tailwind CSS',
		'PostgreSQL',
		'GraphQL',
		'Python',
		'AWS',
		'Docker',
		'Figma'
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
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.skill-name {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.skill-card:hover .skill-name {
		color: var(--text-primary);
	}

	@media (min-width: 640px) {
		.skills-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 768px) {
		.skills-heading {
			font-size: 2.5rem;
			margin-bottom: 2.5rem;
		}

		.skills-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem;
		}
	}
</style>
