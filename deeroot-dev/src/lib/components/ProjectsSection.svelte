<script lang="ts">
	import { browser } from '$app/environment';

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

	const AUTOPLAY_MS = 4500;
	const SETTLE_MS = 200;
	const SETTLE_MAX_MS = 1200;

	let track: HTMLDivElement | null = $state(null);
	let activeIndex = $state(0);
	let paused = $state(false);

	// While a programmatic scroll is in flight, scroll-derived index updates are
	// suppressed so the highlight doesn't cascade through intermediate slides.
	let programmatic = false;
	let settleTimer = 0;
	let scrollRaf = 0;

	function slides(): HTMLElement[] {
		if (!track) return [];
		return Array.from(track.children) as HTMLElement[];
	}

	// offsetLeft of slides and of the track share the same offsetParent
	// (.carousel is the nearest positioned ancestor), so this difference is the
	// slide's position relative to the track's scroll content — transform-free,
	// unlike getBoundingClientRect.
	function slideLeft(slide: HTMLElement): number {
		return slide.offsetLeft - (track?.offsetLeft ?? 0);
	}

	function nearestIndex(): number {
		const list = slides();
		if (!track || list.length === 0) return activeIndex;
		const viewportCenter = track.scrollLeft + track.clientWidth / 2;
		let best = 0;
		let bestDist = Infinity;
		for (let i = 0; i < list.length; i++) {
			const center = slideLeft(list[i]) + list[i].offsetWidth / 2;
			const dist = Math.abs(center - viewportCenter);
			if (dist < bestDist) {
				bestDist = dist;
				best = i;
			}
		}
		return best;
	}

	function clearSettle() {
		if (settleTimer !== 0) {
			window.clearTimeout(settleTimer);
			settleTimer = 0;
		}
	}

	function armSettle(delay: number) {
		clearSettle();
		settleTimer = window.setTimeout(() => {
			settleTimer = 0;
			if (programmatic) {
				programmatic = false;
				activeIndex = nearestIndex();
			}
		}, delay);
	}

	// Single scroll entry point used by arrows, dots and autoplay. Scrolls the
	// target slide's center to the track's viewport center (the browser clamps
	// the edges, so first/last slides rest on their boundaries).
	function scrollToSlide(index: number) {
		if (!track) return;
		const list = slides();
		const target = (index + projects.length) % projects.length;
		const slide = list[target];
		if (!slide) return;
		const left = slideLeft(slide) - (track.clientWidth - slide.offsetWidth) / 2;
		programmatic = true;
		activeIndex = target;
		// Bound the suppression in case no scroll events fire (e.g. instant scroll);
		// scrollend (below) or per-event re-arming settles it sooner.
		armSettle(SETTLE_MAX_MS);
		track.scrollTo({ left, behavior: 'smooth' });
	}

	function next() {
		scrollToSlide(activeIndex + 1);
	}

	function prev() {
		scrollToSlide(activeIndex - 1);
	}

	function handleScroll() {
		if (!track) return;
		if (programmatic) {
			// Extend suppression while the smooth scroll is still moving; clears
			// SETTLE_MS after the last scroll event (covers browsers without
			// `scrollend`, e.g. Safari < 18.4).
			armSettle(SETTLE_MS);
			return;
		}
		if (scrollRaf !== 0) window.cancelAnimationFrame(scrollRaf);
		scrollRaf = window.requestAnimationFrame(() => {
			scrollRaf = 0;
			activeIndex = nearestIndex();
		});
	}

	// Autoplay — pauses on hover, touch, or focus
	$effect(() => {
		if (!browser || reducedAutoplay()) return;
		const interval = window.setInterval(() => {
			if (!paused && track && document.visibilityState === 'visible') next();
		}, AUTOPLAY_MS);
		return () => window.clearInterval(interval);
	});

	function reducedAutoplay(): boolean {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	// Center the first slide on load so the muted/spotlight states match the view.
	$effect(() => {
		if (!browser || !track) return;
		const slide = slides()[0];
		if (!slide) return;
		programmatic = true;
		clearSettle();
		track.scrollTo({
			left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
			behavior: 'auto'
		});
		armSettle(SETTLE_MAX_MS);
	});

	// `scrollend` fires once the scroll (including mandatory snap adjustment) has
	// fully stopped — the earliest reliable moment to hand the highlight back to
	// scroll-derived tracking.
	$effect(() => {
		if (!browser || !track) return;
		const onSettle = () => {
			clearSettle();
			if (programmatic) {
				programmatic = false;
				activeIndex = nearestIndex();
			}
		};
		track.addEventListener('scrollend', onSettle);
		const el = track;
		return () => el.removeEventListener('scrollend', onSettle);
	});

	$effect(() => {
		return () => {
			clearSettle();
			if (scrollRaf !== 0) window.cancelAnimationFrame(scrollRaf);
		};
	});
</script>

<section id="projects" class="section" aria-labelledby="projects-heading">
	<div class="section-inner">
		<p class="section-eyebrow">Achievements</p>
		<h2 id="projects-heading" class="section-heading">My Projects</h2>

		<div
			class="carousel"
			role="region"
			aria-label="Projects carousel"
			onmouseenter={() => (paused = true)}
			onmouseleave={() => (paused = false)}
			onpointerdown={() => (paused = true)}
			onfocusin={() => (paused = true)}
			onfocusout={() => (paused = false)}
		>
			<button type="button" class="carousel-arrow prev" aria-label="Previous project" onclick={prev}>
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<div class="track" bind:this={track} onscroll={handleScroll}>
				{#each projects as project, i}
					<article class="material-card project-slide" class:current={i === activeIndex}>
						<div class="project-header">
							<h3 class="project-title">{project.title}</h3>
							<span class="badge-chip">{project.year}</span>
						</div>
						<p class="project-description">{project.description}</p>
						<div class="project-tags">
							{#each project.tags as tag}
								<span class="project-tag">{tag}</span>
							{/each}
						</div>
						<a
							href={project.href}
							class="project-link"
							target="_blank"
							rel="noopener noreferrer"
						>
							View project
							<svg class="project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</a>
					</article>
				{/each}
			</div>

			<button type="button" class="carousel-arrow next" aria-label="Next project" onclick={next}>
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<div class="carousel-dots" role="tablist" aria-label="Project slides">
			{#each projects as _, i}
				<button
					type="button"
					class="dot"
					class:active={i === activeIndex}
					aria-label="Go to project {i + 1}"
					onclick={() => scrollToSlide(i)}
				></button>
			{/each}
		</div>

		<div class="swipe-hint">
			<span>← Swipe to see more! →</span>
		</div>

		<a
			href="https://github.com/demerle"
			target="_blank"
			rel="noopener noreferrer"
			class="projects-more-link"
		>
			See all 25+ repositories on GitHub
			<svg class="project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</a>
	</div>
</section>

<style>
	.carousel {
		position: relative;
	}

	.track {
		display: flex;
		gap: 1.25rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		/* Horizontal padding equal to (track − slide)/2 gives the first and last
		   slides a reachable centered snap position too — without it the scroll
		   clamps at the edges and the nearest-slice math there skips to the
		   neighbor. The percentage resolves against the carousel width, which
		   matches the track's width. Negative result (slide wider than track,
		   small screens) is clamped to 0 by the browser, which is fine since an
		   oversized slide can never center anyway. */
		padding: 0.5rem calc((100% - min(88vw, 26rem)) / 2) 1rem;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.project-slide {
		flex: 0 0 min(88vw, 26rem);
		scroll-snap-align: center;
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		opacity: 0.65;
		filter: saturate(0.85);
		transition:
			opacity 0.4s ease,
			filter 0.4s ease,
			transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.4s ease,
			background 0.4s ease,
			box-shadow 0.4s ease;
	}

	/* One spotlight for both mechanisms: hovering a slide gives it exactly the
	   treatment the current slide has — full opacity, accent border, accent
	   strip, gentle lift — instead of the generic material-card hover. The
	   extra specificity here also overrides app.css `.material-card:hover`,
	   so carousel cards no longer lift/shadow independently of the spotlight. */
	.project-slide:hover,
	.project-slide.current {
		opacity: 1;
		filter: none;
		transform: translateY(-5px);
		border-color: rgba(33, 150, 243, 0.18);
		background: var(--surface-gradient-hover);
		box-shadow: var(--shadow-card-hover);
	}

	.project-slide:hover::before,
	.project-slide.current::before {
		opacity: 1;
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

	.project-description {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--text-secondary);
		flex: 1;
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
		color: var(--accent-soft);
		background: rgba(66, 165, 245, 0.1);
		border: 1px solid rgba(66, 165, 245, 0.25);
		border-radius: 999px;
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--accent-bright);
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

	/* Glass circular arrows */
	.carousel-arrow {
		position: absolute;
		top: 45%;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: rgba(25, 118, 210, 0.15);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(66, 165, 245, 0.25);
		border-radius: 50%;
		color: var(--accent-bright);
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.carousel-arrow:hover {
		background: rgba(25, 118, 210, 0.35);
		border-color: rgba(66, 165, 245, 0.6);
		transform: scale(1.12);
		box-shadow: 0 4px 20px rgba(33, 150, 243, 0.2);
	}

	.carousel-arrow svg {
		width: 20px;
		height: 20px;
	}

	.carousel-arrow.prev {
		left: -24px;
	}

	.carousel-arrow.next {
		right: -24px;
	}

	/* Dots */
	.carousel-dots {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		cursor: pointer;
		padding: 0;
		transition: all 0.3s ease;
	}

	.dot.active {
		background: var(--accent-bright);
		box-shadow: 0 0 8px rgba(66, 165, 245, 0.6);
		transform: scale(1.25);
	}

	/* Swipe hint pill */
	.swipe-hint {
		display: flex;
		justify-content: center;
		margin-top: 1.75rem;
	}

	.swipe-hint span {
		display: inline-block;
		background: rgba(25, 118, 210, 0.12);
		backdrop-filter: blur(12px) saturate(1.4);
		-webkit-backdrop-filter: blur(12px) saturate(1.4);
		border: 1px solid rgba(66, 165, 245, 0.2);
		border-radius: 30px;
		padding: 0.625rem 1.75rem;
		color: var(--accent-soft);
		font-size: 0.8125rem;
		font-weight: 500;
		letter-spacing: 1.5px;
		animation: gentle-pulse 3s ease-in-out infinite;
	}

	@keyframes gentle-pulse {
		0%,
		100% {
			opacity: 0.7;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.03);
		}
	}

	.projects-more-link {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--accent-bright);
		text-decoration: none;
		margin-top: 1.75rem;
		transition: gap 0.2s ease;
	}

	.projects-more-link:hover {
		gap: 0.625rem;
	}

	@media (max-width: 640px) {
		.carousel-arrow {
			width: 36px;
			height: 36px;
		}

		.carousel-arrow.prev {
			left: 2px;
		}

		.carousel-arrow.next {
			right: 2px;
		}

		.carousel-arrow svg {
			width: 14px;
			height: 14px;
		}
	}
</style>
