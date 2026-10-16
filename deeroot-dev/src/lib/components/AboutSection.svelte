<script lang="ts">
	import { browser } from '$app/environment';

	// Animated stat counters, triggered on first scroll into view
	let gpa = $state(0);
	let repos = $state(0);
	let accuracy = $state(0);
	let counted = $state(false);

	const stats: Array<{
		label: string;
		prefix?: string;
		target?: number;
		decimals?: number;
		suffix?: string;
		staticText?: string;
	}> = [
		{ label: 'GPA at NJIT', target: 3.8, decimals: 1 },
		{ label: 'Graduation', staticText: 'May 2027' },
		{ label: 'GitHub repositories', target: 25, suffix: '+' },
		{ label: 'YOLO accuracy tuned', prefix: '', target: 98, suffix: '%' }
	];

	function display(s: (typeof stats)[number], i: number): string {
		if (s.staticText) return s.staticText;
		const value = i === 0 ? gpa : i === 2 ? repos : accuracy;
		return `${(value).toFixed(s.decimals ?? 0)}${s.suffix ?? ''}`;
	}

	$effect(() => {
		if (!browser || counted) return;
		const section = document.querySelector('#about');
		if (!section) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting) || counted) return;
				counted = true;

				const duration = 1400;
				const start = performance.now();
				const step = (now: number) => {
					const t = Math.min(1, (now - start) / duration);
					const eased = 1 - Math.pow(1 - t, 3);
					gpa = 3.8 * eased;
					repos = Math.round(25 * eased);
					accuracy = Math.round(98 * eased);
					if (t < 1) window.requestAnimationFrame(step);
				};
				window.requestAnimationFrame(step);
			},
			{ threshold: 0.35 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});

	const terminalLines = [
		{ prompt: true, text: 'whoami' },
		{ prompt: false, text: 'daniel emerle' },
		{ prompt: true, text: 'cat focus.txt' },
		{ prompt: false, text: 'ML pipelines · IIoT data systems' },
		{ prompt: false, text: 'music-tech · automation' },
		{ prompt: true, text: 'uptime' },
		{ prompt: false, text: 'NJIT CS · Class of 2027' }
	];
</script>

<section id="about" class="section" aria-labelledby="about-heading">
	<div class="section-inner">
		<p class="section-eyebrow">About Me</p>
		<h2 id="about-heading" class="section-heading about-heading">
			CS at NJIT, engineering in the real world.
		</h2>

		<div class="about-grid">
			<div class="about-bio material-card">
				<p>
					I'm Daniel Emerle, a Computer Science major (Minor in Business) at NJIT with a
					3.8 GPA, graduating May 2027. Since January 2026, I've been a System/Software
					Engineering Intern at <strong>Control Associates / Continua Process
					Systems</strong>, where I work on the TakeoffAI project — using ML to extract
					bid-estimate information from engineering drawings.
				</p>
				<p>
					There, I've shipped things like a YOLO classification pipeline (tuned from 75%
					to 98% accuracy), a production TimescaleDB/Snowflake-schema data layer, an MCP
					server that exposes model-training tooling to AI agents, and a full Ignition
					Perspective UI.
				</p>
				<p>
					Outside of work and class, I'm a TA for CS100 and I build music-tech tools —
					pipelines that turn raw sheet-music PDFs into MusicXML, MIDI, and Synthesia
					videos. I like working where data, backend systems, and automation meet.
				</p>
			</div>

			<div class="terminal-card" aria-hidden="true">
				<div class="terminal-bar">
					<span class="terminal-dot"></span>
					<span class="terminal-dot"></span>
					<span class="terminal-dot"></span>
					<span class="terminal-title">deeroot@njit: ~</span>
				</div>
				<div class="terminal-body">
					{#each terminalLines as line}
						<p class="terminal-line">
							{#if line.prompt}<span class="terminal-prompt">$ </span>{/if}<span
								class={line.prompt ? 'terminal-cmd' : 'terminal-out'}>{line.text}</span
							>
						</p>
					{/each}
				</div>
			</div>
		</div>

		<div class="stats-row">
			{#each stats as stat, i}
				<div class="material-card stat-card">
					<span class="stat-number">{display(stat, i)}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.about-heading {
		max-width: 36rem;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.about-bio {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
	}

	/* Static text card — no hover lift/edge like interactive cards */
	.about-bio:hover {
		background: var(--surface-gradient);
		box-shadow: var(--shadow-card);
		transform: none;
	}

	.about-bio:hover::before {
		opacity: 0;
	}

	.about-bio p {
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--text-secondary);
	}

	.about-bio strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	/* Terminal card */
	.terminal-card {
		background: #111111;
		border: 1px solid var(--border-hairline);
		border-radius: 12px;
		box-shadow: var(--shadow-card);
		overflow: hidden;
		align-self: start;
	}

	.terminal-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: var(--bg-elevated);
		border-bottom: 1px solid var(--border-soft);
	}

	.terminal-dot {
		width: 0.625rem;
		height: 0.625rem;
		border-radius: 50%;
		background: #3a3a3a;
	}

	.terminal-dot:first-child {
		background: var(--accent);
	}

	.terminal-title {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-left: 0.5rem;
	}

	.terminal-body {
		padding: 1.25rem 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.terminal-line {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1.6;
	}

	.terminal-prompt {
		color: var(--accent-bright);
	}

	.terminal-cmd {
		color: var(--text-primary);
	}

	.terminal-out {
		color: var(--text-secondary);
	}

	/* Stats row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.stat-card {
		padding: 1.5rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stat-number {
		font-family: var(--font-mono);
		font-size: 2.25rem;
		font-weight: 600;
		color: var(--accent-bright);
	}

	.stat-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--text-muted);
	}

	@media (min-width: 768px) {
		.about-grid {
			grid-template-columns: 7fr 5fr;
			gap: 3rem;
		}

		.stats-row {
			grid-template-columns: repeat(4, 1fr);
			gap: 1.25rem;
		}

		.stat-number {
			font-size: 2.625rem;
		}
	}
</style>
