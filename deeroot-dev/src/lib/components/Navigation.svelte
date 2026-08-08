<script lang="ts">
	import { browser } from '$app/environment';

	let visible = $state(false);
	let mobileOpen = $state(false);

	const navLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#contact' }
	];

	function handleScroll() {
		if (!browser) return;
		visible = window.scrollY > window.innerHeight * 0.8;
	}

	function scrollToSection(href: string) {
		if (!browser) return;
		mobileOpen = false;
		const target = document.querySelector(href);
		target?.scrollIntoView({ behavior: 'smooth' });
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
		<a href="#hero" class="nav-logo" onclick={() => scrollToSection('#hero')}>
			Daniel Emerle
		</a>

		<div class="nav-links" class:open={mobileOpen}>
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-link"
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
			aria-label="Toggle navigation"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="bar" class:open={mobileOpen}></span>
			<span class="bar" class:open={mobileOpen}></span>
			<span class="bar" class:open={mobileOpen}></span>
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
		padding: 1rem 1.5rem;
		transform: translateY(-100%);
		opacity: 0;
		transition:
			transform 0.4s ease,
			opacity 0.4s ease;
	}

	.nav.visible {
		transform: translateY(0);
		opacity: 1;
	}

	.nav-inner {
		max-width: 72rem;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.25rem;
		background: rgba(10, 10, 26, 0.72);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--glass-border);
		border-radius: 16px;
	}

	.nav-logo {
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-primary);
		text-decoration: none;
		letter-spacing: -0.02em;
		transition: color 0.2s ease;
	}

	.nav-logo:hover {
		color: var(--accent);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: var(--text-primary);
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

	.bar {
		display: block;
		width: 100%;
		height: 2px;
		background: var(--text-primary);
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	.bar.open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.bar.open:nth-child(2) {
		opacity: 0;
	}

	.bar.open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	@media (max-width: 768px) {
		.nav-links {
			position: absolute;
			top: calc(100% + 0.75rem);
			left: 1.5rem;
			right: 1.5rem;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			padding: 0.75rem;
			background: rgba(10, 10, 26, 0.92);
			backdrop-filter: blur(16px);
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

		.nav-link:hover {
			background: var(--glass-bg);
		}

		.nav-toggle {
			display: flex;
		}
	}
</style>
