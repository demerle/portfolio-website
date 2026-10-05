<script lang="ts">
	import { browser } from '$app/environment';

	let visible = $state(false);
	let mobileOpen = $state(false);
	let activeSection = $state('');

	const navLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#contact' }
	];

	function handleScroll() {
		if (!browser) return;
		visible = window.scrollY > window.innerHeight * 0.75;

		// Scroll-spy: last section whose top passed 40% of the viewport
		let current = '';
		for (const link of navLinks) {
			const el = document.querySelector(link.href);
			if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
				current = link.href;
			}
		}
		activeSection = current;
	}

	function scrollToSection(href: string) {
		if (!browser) return;
		mobileOpen = false;
		document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
	}

	$effect(() => {
		if (!browser) return;
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class="nav" class:visible aria-label="Main navigation">
	<div class="nav-inner">
		<a href="#hero" class="nav-brand" onclick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}>
			Daniel
		</a>

		<div class="nav-links" class:open={mobileOpen}>
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-link"
					class:active={activeSection === link.href}
					onclick={(e) => {
						e.preventDefault();
						scrollToSection(link.href);
					}}
				>
					{link.label}
				</a>
			{/each}
		</div>

		<button
			class="nav-toggle"
			class:open={mobileOpen}
			aria-label="Toggle navigation"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</button>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		transform: translateY(-100%);
		opacity: 0;
		transition:
			transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.nav.visible {
		transform: translateY(0);
		opacity: 1;
	}

	.nav-inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: var(--glass-dark);
		backdrop-filter: blur(20px) saturate(1.8);
		-webkit-backdrop-filter: blur(20px) saturate(1.8);
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	}

	/* Aurora glow line along the bottom edge */
	.nav-inner::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 1px;
		background-image: linear-gradient(
			90deg,
			transparent 0%,
			rgba(33, 150, 243, 0) 10%,
			rgba(33, 150, 243, 0.4) 30%,
			rgba(66, 165, 245, 0.6) 50%,
			rgba(33, 150, 243, 0.4) 70%,
			rgba(33, 150, 243, 0) 90%,
			transparent 100%
		);
		filter: blur(0.5px);
		animation: aurora 4s ease-in-out infinite;
	}

	@keyframes aurora {
		0% {
			transform: translateX(-30%);
			opacity: 0.6;
		}
		50% {
			transform: translateX(30%);
			opacity: 1;
		}
		100% {
			transform: translateX(-30%);
			opacity: 0.6;
		}
	}

	.nav-brand {
		font-size: 1.125rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--text-primary);
		text-decoration: none;
		transition:
			text-shadow 0.3s ease,
			color 0.3s ease;
	}

	.nav-brand:hover {
		text-shadow:
			0 0 12px rgba(66, 165, 245, 0.5),
			0 0 24px rgba(66, 165, 245, 0.2);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-link {
		position: relative;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		padding-bottom: 2px;
		transition:
			color 0.3s ease,
			opacity 0.3s ease,
			transform 0.2s ease;
	}

	.nav-link:hover {
		transform: translateY(-1px);
		color: #ffffff;
	}

	/* Glowing underline */
	.nav-link::before {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 50%;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--accent-bright), transparent);
		border-radius: 2px;
		transform: translateX(-50%);
		transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow:
			0 0 8px rgba(66, 165, 245, 0.5),
			0 0 20px rgba(66, 165, 245, 0.2);
	}

	.nav-link:hover::before,
	.nav-link.active::before {
		width: 80%;
	}

	/* Pulsing dot on the active link */
	.nav-link.active {
		color: var(--accent-bright);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -7px;
		left: 50%;
		width: 4px;
		height: 4px;
		background: var(--accent-bright);
		border-radius: 50%;
		transform: translateX(-50%);
		box-shadow:
			0 0 6px var(--accent-bright),
			0 0 12px rgba(66, 165, 245, 0.4);
		animation: nav-dot-pulse 2s ease-in-out infinite;
	}

	@keyframes nav-dot-pulse {
		0%,
		100% {
			box-shadow:
				0 0 6px var(--accent-bright),
				0 0 12px rgba(66, 165, 245, 0.4);
		}
		50% {
			box-shadow:
				0 0 10px var(--accent-bright),
				0 0 24px rgba(66, 165, 245, 0.6);
		}
	}

	.nav-toggle {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 28px;
		height: 28px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.nav-toggle .bar {
		display: block;
		width: 100%;
		height: 2px;
		background: var(--text-primary);
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	.nav-toggle.open .bar:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.nav-toggle.open .bar:nth-child(2) {
		opacity: 0;
	}

	.nav-toggle.open .bar:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	@media (max-width: 768px) {
		.nav-inner {
			padding: 0.875rem 1.25rem;
		}

		.nav-links {
			position: absolute;
			top: 100%;
			left: 1rem;
			right: 1rem;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			padding: 0.75rem;
			background: var(--glass-dark);
			backdrop-filter: blur(20px) saturate(1.8);
			-webkit-backdrop-filter: blur(20px) saturate(1.8);
			border: 1px solid var(--glass-border);
			border-radius: 16px;
			opacity: 0;
			visibility: hidden;
			transform: translateY(-8px);
			transition: all 0.3s ease;
		}

		.nav-links.open {
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		}

		.nav-link {
			padding: 0.75rem 1rem;
			border-radius: 8px;
		}

		.nav-link::before,
		.nav-link.active::after {
			display: none;
		}

		.nav-link:hover,
		.nav-link.active {
			background: var(--glass-bg);
		}

		.nav-toggle {
			display: flex;
		}
	}
</style>
