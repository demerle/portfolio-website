<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import ThreeBackground from './ThreeBackground.svelte';

	let visible = $state(false);

	$effect(() => {
		visible = true;
	});

	function scrollToSection(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section id="hero" class="relative min-h-screen w-full overflow-hidden">
	<ThreeBackground />

	<div class="hero-content">
		{#if visible}
			<h1 in:fly={{ y: 30, duration: 1000, easing: quintOut }} class="hero-title">
				<span class="gradient-text">Daniel Emerle</span>
			</h1>

			<p in:fly={{ y: 30, duration: 1000, delay: 200, easing: quintOut }} class="hero-tagline">
				Developer <span class="text-amber-400 mx-2">•</span>
				Creator <span class="text-amber-400 mx-2">•</span>
				Piano Enthusiast
			</p>

			<p
				in:fly={{ y: 30, duration: 1000, delay: 400, easing: quintOut }}
				class="hero-description"
			>
				I craft digital experiences that blend technical excellence with creative expression. From
				writing clean code to playing piano melodies, I believe in creating with passion.
			</p>

			<div
				in:fly={{ y: 30, duration: 1000, delay: 600, easing: quintOut }}
				class="hero-buttons"
			>
				<button onclick={() => scrollToSection('projects')} class="btn-primary">
					View My Work
				</button>
				<button onclick={() => scrollToSection('contact')} class="btn-secondary">
					Get In Touch
				</button>
			</div>

			<div
				in:fly={{ y: 30, duration: 1000, delay: 800, easing: quintOut }}
				class="social-links"
			>
				<a
					href="https://github.com/demerle"
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="GitHub"
				>
					<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
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
					<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
			</div>

		{/if}
	</div>
</section>

<style>
	.hero-content {
		position: relative;
		z-index: 10;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
	}

	.hero-title {
		font-size: 4rem;
		font-weight: 700;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	@media (min-width: 768px) {
		.hero-title {
			font-size: 6rem;
		}
	}

	.gradient-text {
		background: linear-gradient(to right, #4a90d9, #ff6b9d, #ffd700);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.hero-tagline {
		font-size: 1.25rem;
		color: rgba(160, 160, 176, 1);
		margin-bottom: 0.5rem;
		font-weight: 300;
		letter-spacing: 0.025em;
	}

	@media (min-width: 768px) {
		.hero-tagline {
			font-size: 1.5rem;
		}
	}

	.hero-description {
		max-width: 42rem;
		color: rgba(160, 160, 176, 1);
		font-size: 1.125rem;
		line-height: 1.75;
		margin-bottom: 2rem;
		padding: 0 1rem;
	}

	@media (min-width: 768px) {
		.hero-description {
			font-size: 1.25rem;
		}
	}

	.hero-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	@media (min-width: 640px) {
		.hero-buttons {
			flex-direction: row;
		}
	}

	.btn-primary {
		padding: 1rem 2rem;
		background: linear-gradient(to right, #4a90d9, #ff6b9d);
		color: white;
		font-weight: 600;
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(4px);
		transition: all 0.3s;
	}

	.btn-primary:hover {
		box-shadow: 0 0 30px rgba(74, 144, 217, 0.5);
		transform: scale(1.05);
	}

	.btn-secondary {
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.05);
		color: white;
		font-weight: 600;
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(4px);
		transition: all 0.3s;
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: scale(1.05);
	}

	.social-links {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.social-link {
		color: rgba(160, 160, 176, 1);
		transition: all 0.3s;
	}

	.social-link:hover {
		color: #4a90d9;
		transform: scale(1.1);
	}
</style>
