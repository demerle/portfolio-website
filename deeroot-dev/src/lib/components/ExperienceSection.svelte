<section id="experience" class="section" aria-labelledby="experience-heading">
	<div class="section-inner">
		<p class="section-eyebrow">My Experience</p>
		<h2 id="experience-heading" class="section-heading">Where I've worked.</h2>

		<div class="experience-list">
			<!-- Featured internship -->
			<article class="material-card experience-card featured">
				<div class="experience-header">
					<div>
						<h3 class="experience-title">Software / System Engineering Intern</h3>
						<p class="experience-org">
							Control Associates / Continua Process Systems · Allendale, NJ
						</p>
					</div>
					<span class="badge-chip">Jan 2026 – Aug 2026</span>
				</div>
				<ul class="experience-bullets">
					<li>
						Engineered an <strong>Ultralytics YOLO</strong> classification pipeline in
						Python, curating training data and tuning hyperparameters to raise
						classification accuracy from <strong>75% to 98%</strong>.
					</li>
					<li>
						Designed a <strong>Star/Snowflake schema</strong> in PostgreSQL and deployed a
						containerized <strong>TimescaleDB</strong> instance via Docker Compose for
						time-series IIoT analytics.
					</li>
					<li>
						Diagnosed a memory bottleneck in a PDF→image pipeline (unbounded PNG loading)
						and rebuilt it with batching, reducing peak memory usage by <strong>90%</strong>.
					</li>
					<li>
						Built an <strong>MCP server</strong> exposing model training, tuning, and
						inference as callable tools for AI-agent integration.
					</li>
					<li>
						Engineered a fault-tolerant <strong>Python MQTT adapter</strong> translating raw
						bioreactor sensor data into structured <strong>Sparkplug B</strong> payloads for
						SCADA (Ignition), DataOps (HighByte), and Historian platforms.
					</li>
					<li>
						Rebuilt the application UI in <strong>Ignition Perspective</strong> after a full
						Figma design rework, following beta user feedback.
					</li>
					<li>
						Collaborated with a project manager and 5 engineers in a parallel Agile sprint
						workflow, presenting progress in weekly client cadence meetings.
					</li>
				</ul>
			</article>

			<!-- Second tier -->
			<article class="material-card experience-card">
				<div class="experience-header">
					<div>
						<h3 class="experience-title">Teaching Assistant — CS100</h3>
						<p class="experience-org">New Jersey Institute of Technology · Newark, NJ</p>
					</div>
					<span class="badge-chip">Sep 2024 – Present</span>
				</div>
				<p class="experience-summary">
					Tutor students in Python fundamentals and hold full grading responsibility for
					70 students in the course.
				</p>
			</article>

			<article class="material-card experience-card">
				<div class="experience-header">
					<div>
						<h3 class="experience-title">Office Administrator Intern</h3>
						<p class="experience-org">Builders FirstSource · Berlin, NJ</p>
					</div>
					<span class="badge-chip">May 2024 – Sep 2024</span>
				</div>
				<p class="experience-summary">
					Organized $500K+ in customer orders in Excel and maintained filing for 2,500+
					records, contributing to a perfect year-end audit.
				</p>
			</article>
		</div>

		<p class="experience-phone">
			609-367-4996 · <a href="mailto:danny.emerle@gmail.com">danny.emerle@gmail.com</a>
		</p>
	</div>
</section>

<style>
	.experience-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.experience-card {
		padding: 2rem;
	}

	.experience-card.featured {
		border-color: rgba(66, 165, 245, 0.25);
	}

	.experience-header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		margin-bottom: 1.25rem;
	}

	.experience-title {
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.5px;
		color: var(--text-primary);
	}

	.experience-org {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--text-muted);
		margin-top: 0.25rem;
	}

	.experience-bullets {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		padding-left: 1.25rem;
	}

	.experience-bullets li {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.experience-bullets strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.experience-summary {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.experience-phone {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--text-muted);
		margin-top: 2rem;
	}

	.experience-phone a {
		color: var(--accent-soft);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.experience-phone a:hover {
		color: #bbdefb;
	}
</style>
