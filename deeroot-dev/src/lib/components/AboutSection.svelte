<section id="about" class="section" aria-labelledby="about-heading">
	<div class="section-inner">
		<div class="glass-card about-card">
			<p class="section-label">About</p>
			<h2 id="about-heading" class="about-heading">CS at NJIT, engineering in the real world.</h2>
			<div class="about-body">
				<p>
					I'm Daniel Emerle, a Computer Science major (Business minor) at NJIT with a
					3.8 GPA, graduating May 2027. Since January 2026, I've been a Software
					Engineering Intern at <strong>Control Associates / Continua Process
					Systems</strong>, where I work on the TakeoffAI project — using ML to extract
					bid-estimate information from engineering drawings.
				</p>
				<p>
					There, I've shipped things like a YOLO classification pipeline (tuned from 75%
					to 98% accuracy), a production TimescaleDB/Snowflake-schema data layer, an MCP
					server that exposes model-training tooling to AI agents, and a full Ignition
					Perspective UI rework.
				</p>
				<p>
					Outside of work and class, I'm a TA for CS100 and I build music-tech tools —
					pipelines that turn raw sheet-music PDFs into MusicXML, MIDI, and Synthesia
					videos. I like working where data, backend systems, and automation meet.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.about-card {
		padding: 2.5rem 1.75rem;
	}

	.about-heading {
		font-size: 1.875rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		max-width: 36rem;
	}

	.about-body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 48rem;
	}

	.about-body p {
		font-size: 1.0625rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	@media (min-width: 768px) {
		.about-card {
			padding: 3.5rem 2.5rem;
		}

		.about-heading {
			font-size: 2.5rem;
		}
	}
</style>
