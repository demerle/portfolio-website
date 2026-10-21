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

	const SETTLE_MS = 200;
	const SETTLE_MAX_MS = 1200;

	let track: HTMLDivElement | null = $state(null);
	let activeIndex = $state(0); // real project index (0..projects.length-1)
	let hoverIdx = $state<number | null>(null); // index within the rendered (cloned) list

	// While a programmatic scroll is in flight, scroll-derived index updates are
	// suppressed so the highlight doesn't cascade through intermediate slides.
	let programmatic = false;
	let settleTimer = 0;
	let scrollRaf = 0;

	const n = projects.length;
	// [twin of last, ...real projects..., twin of first] — makes the carousel
	// seamlessly circular. The twins let prev/next scroll off the edges in the
	// correct direction; once the scroll settles on a twin, the view silently
	// jumps (identical content, invisible swap) to the corresponding real slide.
	const slidesList = [
		{ ...projects[n - 1], clone: true },
		...projects.map((p) => ({ ...p, clone: false })),
		{ ...projects[0], clone: true }
	];

	function isClone(idx: number): boolean {
		return idx === 0 || idx === slidesList.length - 1;
	}

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

	function realIndex(cloneIdx: number): number {
		return (((cloneIdx - 1) % n) + n) % n;
	}

	function nearestClone(): number | null {
		const list = slides();
		if (!track || list.length === 0) return null;
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
			resolveSettle();
		}, delay);
	}

	// A scroll has fully stopped (event-quiet or `scrollend`): hand the
	// highlight back to scroll-derived tracking and unwrap any twin resting at
	// the viewport center.
	function resolveSettle() {
		clearSettle();
		programmatic = false;
		const clone = nearestClone();
		if (clone !== null) activeIndex = realIndex(clone);
		normalizeTwins();
	}

	// If the settled position is an edge twin, silently re-center on the real
	// slide it duplicates — nothing visibly moves, and the spotlight/dots then
	// track the real slide.
	function normalizeTwins() {
		const clone = nearestClone();
		if (clone === 0) {
			programmatic = true;
			activeIndex = n - 1;
			armSettle(SETTLE_MAX_MS);
			centerClone(n, 'auto');
		} else if (clone === slidesList.length - 1) {
			programmatic = true;
			activeIndex = 0;
			armSettle(SETTLE_MAX_MS);
			centerClone(1, 'auto');
		}
	}

	// Horizontal scroll position that centers the given rendered slide.
	function centerClone(cloneIdx: number, behavior: ScrollBehavior) {
		if (!track) return;
		const list = slides();
		const slide = list[cloneIdx];
		if (!slide) return;
		const left = slideLeft(slide) - (track.clientWidth - slide.offsetWidth) / 2;
		track.scrollTo({ left, behavior });
	}

	// Single scroll entry point used by arrows and dots.
	function scrollToProject(index: number) {
		if (!track) return;
		const target = ((index % n) + n) % n;
		// Wraps scroll onto the spatial twin beyond the edge so the track moves
		// in the direction the user asked for; resolveSettle() swaps it for the
		// real slide once the scroll stops.
		const twin = index < 0 ? 0 : index >= n ? n + 1 : target + 1;
		programmatic = true;
		activeIndex = target;
		// Bound the suppression in case no scroll events fire (e.g. instant scroll);
		// scrollend (below) or per-event re-arming settles it sooner.
		armSettle(SETTLE_MAX_MS);
		centerClone(twin, 'smooth');
	}

	function next() {
		scrollToProject(activeIndex + 1);
	}

	function prev() {
		scrollToProject(activeIndex - 1);
	}

	// Hover takes priority over the scroll position: exactly one spotlit card
	// at any time, whichever the pointer (or keyboard focus) is over.
	function handleTrackOver(event: MouseEvent) {
		const slide = (event.target as HTMLElement).closest?.('.project-slide') as HTMLElement | null;
		hoverIdx = slide ? Number(slide.dataset.clone) : null;
	}

	function handleTrackLeave() {
		hoverIdx = null;
	}

	function handleFocusIn(event: FocusEvent) {
		const slide = (event.target as HTMLElement).closest?.('.project-slide') as HTMLElement | null;
		if (slide) hoverIdx = Number(slide.dataset.clone);
	}

	function handleFocusOut(event: FocusEvent) {
		// Only clear when focus left the track entirely, not when it moved to a
		// sibling slide's link.
		const to = event.relatedTarget as HTMLElement | null;
		if (!to || !to.closest?.('.project-slide')) hoverIdx = null;
	}

	$effect(() => {
		if (!browser || !track) return;
		const el = track;
		el.addEventListener('mouseover', handleTrackOver);
		el.addEventListener('mouseleave', handleTrackLeave);
		el.addEventListener('focusin', handleFocusIn);
		el.addEventListener('focusout', handleFocusOut);
		return () => {
			el.removeEventListener('mouseover', handleTrackOver);
			el.removeEventListener('mouseleave', handleTrackLeave);
			el.removeEventListener('focusin', handleFocusIn);
			el.removeEventListener('focusout', handleFocusOut);
		};
	});

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
			const clone = nearestClone();
			if (clone !== null) activeIndex = realIndex(clone);
		});
	}

	// Base view: center the first real project instantly (no motion), so the
	// twin of the last project peeks in on the left.
	$effect(() => {
		if (!browser || !track) return;
		programmatic = true;
		clearSettle();
		centerClone(1, 'auto');
		armSettle(SETTLE_MAX_MS);
	});

	// `scrollend` fires once the scroll (including mandatory snap adjustment) has
	// fully stopped — the earliest reliable moment to unwrap twins and hand the
	// highlight back to scroll-derived tracking.
	$effect(() => {
		if (!browser || !track) return;
		track.addEventListener('scrollend', resolveSettle);
		const el = track;
		return () => el.removeEventListener('scrollend', resolveSettle);
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

		<div class="carousel" role="region" aria-label="Projects carousel">
			<button type="button" class="carousel-arrow prev" aria-label="Previous project" onclick={prev}>
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<div class="track" bind:this={track} onscroll={handleScroll}>
				{#each slidesList as project, idx}
					<article
						class="material-card project-slide"
						data-clone={idx}
						class:spotlight={idx === (hoverIdx ?? activeIndex + 1)}
						aria-hidden={project.clone || undefined}
					>
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
							tabindex={project.clone ? -1 : undefined}
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
					onclick={() => scrollToProject(i)}
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

	/* The global .material-card hover is neutralized inside the carousel: the
	   spotlight below (JS-driven, exactly one card) is the single visual focus.
	   The scoped selectors out-rank app.css's .material-card:hover, so carousel
	   cards never lift/shadow independently of the spotlight. */
	.project-slide,
	.project-slide:hover {
		transform: none;
		border-color: var(--border-hairline);
		background: var(--surface-gradient);
		box-shadow: var(--shadow-card);
	}

	/* Exactly one card carries .spotlight (hover wins over the scroll position).
	   Full opacity + accent border + gentle lift. */
	.project-slide.spotlight {
		opacity: 1;
		filter: none;
		transform: translateY(-5px);
		border-color: rgba(33, 150, 243, 0.18);
		background: var(--surface-gradient-hover);
		box-shadow: var(--shadow-card-hover);
	}

	/* Scoped specificity beats app.css's .material-card:hover::before, keeping
	   the accent strip off every non-spotlight card. */
	.project-slide::before {
		opacity: 0;
	}

	.project-slide.spotlight::before {
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
