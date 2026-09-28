<section id="contact" class="section" aria-labelledby="contact-heading">
	<div class="section-inner">
		<div class="glass-card contact-card">
			<p class="section-label">Contact</p>
			<h2 id="contact-heading" class="contact-heading">Let's build something together.</h2>
			<p class="contact-body">
				I'm open to software engineering roles and internships. If you have a project in
				mind or just want to connect, reach out and I'll get back to you.
			</p>
			<div class="contact-actions">
				<a href="mailto:danny.emerle@gmail.com" class="btn btn-primary">Email me</a>
				<a
					href="https://www.linkedin.com/in/danielemerle/"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-secondary"
				>
					LinkedIn
				</a>
				<a
					href="https://github.com/demerle"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-secondary"
				>
					GitHub
				</a>
			</div>
			<p class="contact-phone">609-367-4996</p>
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

	.contact-phone {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--text-muted);
		margin-top: 1.25rem;
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
