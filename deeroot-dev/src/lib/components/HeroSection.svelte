<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import ThreeBackground from './ThreeBackground.svelte';

	function scrollToSection(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section id="hero" class="relative min-h-screen w-full overflow-hidden" aria-labelledby="hero-heading">
	<ThreeBackground />

	<div class="hero-content">
		<div class="hero-grid">
				<!-- Name tile -->
				<div
					in:fly={{ y: 30, duration: 900, easing: quintOut }}
					class="glass-card hero-tile name-tile"
				>
					<p class="hero-eyebrow">Portfolio</p>
					<h1 id="hero-heading" class="hero-name">Daniel Emerle</h1>
					<p class="hero-tagline">Developer • Creator • Piano Enthusiast</p>
				</div>

				<!-- Intro tile -->
				<div
					in:fly={{ y: 30, duration: 900, delay: 100, easing: quintOut }}
					class="glass-card hero-tile intro-tile"
				>
					<p class="hero-description">
						I craft digital experiences that blend technical excellence with creative
						expression. From writing clean code to playing piano melodies, I believe in
						creating with passion and precision.
					</p>
				</div>

				<!-- CTA tile -->
				<div
					in:fly={{ y: 30, duration: 900, delay: 200, easing: quintOut }}
					class="glass-card hero-tile cta-tile"
				>
					<div class="cta-content">
						<p class="cta-label">Explore my work</p>
						<div class="cta-buttons">
							<button onclick={() => scrollToSection('projects')} class="btn btn-primary">
								View Projects
							</button>
							<button onclick={() => scrollToSection('contact')} class="btn btn-secondary">
								Get in Touch
							</button>
						</div>
					</div>
				</div>

				<!-- Social tile -->
				<div
					in:fly={{ y: 30, duration: 900, delay: 300, easing: quintOut }}
					class="glass-card hero-tile social-tile"
				>
					<p class="social-label">Connect</p>
					<div class="social-links">
						<a
							href="https://github.com/demerle"
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label="GitHub"
						>
							<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
						</a>
						<a
							href="https://linkedin.com/in/daniel-emerle"
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label="LinkedIn"
						>
							<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
						</a>
					</div>
				</div>

				<!-- Status tile -->
				<div
					in:fly={{ y: 30, duration: 900, delay: 400, easing: quintOut }}
					class="glass-card hero-tile status-tile"
				>
					<div class="status-row">
						<span class="status-dot"></span>
						<span class="status-text">Open to opportunities</span>
					</div>
				</div>
			</div>
	</div>
</section>

<style>
	.hero-content {
		position: relative;
		z-index: 10;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6rem 1.5rem;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 100%;
		max-width: 56rem;
	}

	.hero-tile {
		padding: 1.75rem;
	}

	.hero-eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.hero-name {
		font-size: 3rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
		text-shadow: 0 2px 24px rgba(0, 0, 0, 0.3);
	}

	.hero-tagline {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.hero-description {
		font-size: 1.125rem;
		font-weight: 400;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.cta-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.cta-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-muted);
	}

	.cta-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		border: 1px solid transparent;
	}

	.btn-primary {
		background: var(--accent);
		color: #0a0a1a;
		border-color: var(--accent);
	}

	.btn-primary:hover {
		background: #8cc5ff;
		border-color: #8cc5ff;
		transform: translateY(-1px);
	}

	.btn-secondary {
		background: transparent;
		color: var(--text-primary);
		border-color: var(--glass-border-strong);
	}

	.btn-secondary:hover {
		background: var(--glass-bg);
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	.social-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-muted);
		margin-bottom: 1rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		color: var(--text-secondary);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 12px;
		transition: all 0.2s ease;
	}

	.social-link:hover {
		color: var(--accent);
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.social-icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.status-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		background: var(--accent);
		border-radius: 50%;
		box-shadow: 0 0 10px var(--accent);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.status-text {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	@media (min-width: 768px) {
		.hero-content {
			padding: 8rem 2rem;
		}

		.hero-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}

		.hero-tile {
			padding: 2.25rem;
		}

		.hero-name {
			font-size: 4rem;
		}

		.name-tile {
			grid-column: span 1;
		}

		.intro-tile {
			grid-column: span 1;
			display: flex;
			align-items: center;
		}

		.cta-tile {
			grid-column: span 1;
		}

		.social-tile {
			grid-column: span 1;
		}

		.status-tile {
			grid-column: span 2;
		}
	}

	@media (min-width: 1024px) {
		.hero-name {
			font-size: 4.5rem;
		}
	}
</style>
