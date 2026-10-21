<script lang="ts">
	import { browser } from '$app/environment';
	import ThreeBackground from './ThreeBackground.svelte';

	const roles = ['CS Tutor @ NJIT', 'System Engineering Intern', 'Top 1 Engineer'];

	let typedText = $state('');
	let roleIndex = 0;
	let charIndex = 0;
	let deleting = false;

	function tick() {
		if (browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			typedText = roles[0]!;
			return;
		}
		const role = roles[roleIndex]!;
		if (deleting) {
			charIndex--;
		} else {
			charIndex++;
		}
		typedText = role.slice(0, charIndex);

		let delay: number;
		if (!deleting && charIndex === role.length) {
			delay = 2000;
			deleting = true;
		} else if (deleting && charIndex === 0) {
			deleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
			delay = 500;
		} else {
			delay = deleting ? 45 : 90;
		}
		window.setTimeout(tick, delay);
	}

	$effect(() => {
		if (!browser) return;
		const timeout = window.setTimeout(tick, 1200);
		return () => window.clearTimeout(timeout);
	});

	function scrollToSection(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section id="hero" class="hero" aria-labelledby="hero-heading">
	<ThreeBackground />

	<div class="hero-content">
		<p class="hero-eyebrow liquid-text-soft">Hello, I am</p>
		<h1 id="hero-heading" class="hero-name liquid-text">Daniel Emerle</h1>
		<p class="hero-typing" aria-live="polite">
			<span class="typing-text">{typedText}</span><span class="typing-cursor">|</span>
		</p>

		<div class="hero-ctas">
			<button onclick={() => scrollToSection('projects')} class="btn btn-primary">
				View My Work
			</button>
			<a
				href="https://github.com/demerle"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-outline"
			>
				GitHub
			</a>
			<a
				href="https://www.linkedin.com/in/danielemerle/"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-outline"
			>
				LinkedIn
			</a>
		</div>
        <!--
		<div class="hero-status">
			<span class="status-dot"></span>
			<span>Open to software engineering roles</span>
		</div>
		-->
	</div>

	<a href="#about" class="scroll-indicator" aria-label="Scroll down">
		<span class="scroll-mouse">
			<span class="scroll-wheel"></span>
		</span>
		<span class="scroll-text">Scroll</span>
	</a>
</section>

<style>
	.hero {
		position: relative;
		z-index: 10;
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	/* Soft vignette for text legibility over the room */
	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: radial-gradient(
			ellipse 70% 55% at 50% 45%,
			rgba(5, 5, 16, 0.45) 0%,
			rgba(5, 5, 16, 0.15) 55%,
			transparent 100%
		);
	}

	.hero-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 6rem 1.5rem;
		max-width: 60rem;
	}

	.hero-eyebrow {
		font-size: 0.9375rem;
		font-weight: 300;
		letter-spacing: 5px;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	.hero-name {
		font-size: clamp(3rem, 9vw, 5.5rem);
		font-weight: 700;
		letter-spacing: 2px;
		line-height: 1.05;
		margin-bottom: 1.25rem;
	}

	.hero-typing {
		font-family: var(--font-mono);
		font-size: 1.25rem;
		font-weight: 400;
		letter-spacing: 2px;
		color: var(--accent-soft);
		height: 2rem;
		margin-bottom: 2.5rem;
	}

	.typing-cursor {
		animation: blink 1s step-end infinite;
		color: var(--accent-bright);
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.hero-status {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-top: 2.5rem;
		padding: 0.625rem 1.25rem;
		border-radius: 30px;
		background: rgba(25, 118, 210, 0.1);
		backdrop-filter: blur(12px) saturate(1.4);
		-webkit-backdrop-filter: blur(12px) saturate(1.4);
		border: 1px solid rgba(66, 165, 245, 0.2);
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.5px;
		color: var(--text-secondary);
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		background: var(--accent-bright);
		border-radius: 50%;
		box-shadow: 0 0 10px var(--accent-bright);
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

	/* Mouse-wheel scroll indicator */
	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}

	.scroll-indicator:hover {
		opacity: 1;
	}

	.scroll-mouse {
		width: 24px;
		height: 40px;
		border: 2px solid #ffffff;
		border-radius: 12px;
		position: relative;
	}

	.scroll-wheel {
		width: 4px;
		height: 8px;
		background: #ffffff;
		border-radius: 2px;
		position: absolute;
		top: 6px;
		left: 50%;
		transform: translateX(-50%);
		animation: wheel 2s ease-in-out infinite;
	}

	@keyframes wheel {
		0% {
			transform: translate(-50%, 0);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, 15px);
			opacity: 0;
		}
	}

	.scroll-text {
		font-size: 0.75rem;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: #ffffff;
	}
</style>
