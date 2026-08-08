<section id="contact" class="section">
	<div class="section-inner">
		<div class="glass-card contact-card">
			<p class="section-label">Contact</p>
			<h2 class="contact-heading">Let’s build something together.</h2>
			<p class="contact-body">
				I’m currently open to new opportunities and collaborations. If you have a project
				in mind or just want to connect, reach out and I’ll get back to you.
			</p>
			<div class="contact-actions">
				<a href="mailto:hello@deeroot.dev" class="btn btn-primary">hello@deeroot.dev</a>
				<a
					href="https://linkedin.com/in/daniel-emerle"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-secondary"
				>
					LinkedIn
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-card {
		padding: 2.5rem 1.75rem;
		text-align: center;
	}

	.contact-heading {
		font-size: 1.875rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.contact-body {
		font-size: 1.0625rem;
		line-height: 1.7;
		color: var(--text-secondary);
		max-width: 42rem;
		margin: 0 auto 2rem;
	}

	.contact-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.btn {
		padding: 0.875rem 1.75rem;
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: 12px;
		text-decoration: none;
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

	@media (min-width: 768px) {
		.contact-card {
			padding: 4rem 2.5rem;
		}

		.contact-heading {
			font-size: 2.5rem;
		}

		.contact-actions {
			flex-direction: row;
		}
	}
</style>
