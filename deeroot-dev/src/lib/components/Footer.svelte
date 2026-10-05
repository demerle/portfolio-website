<footer class="footer">
	<div class="footer-inner">
		<p class="footer-text">© {new Date().getFullYear()} Daniel Emerle. All rights reserved.</p>
		<div class="footer-links">
			<a
				href="https://github.com/demerle"
				target="_blank"
				rel="noopener noreferrer"
				class="footer-link"
			>
				GitHub
			</a>
			<a
				href="https://www.linkedin.com/in/danielemerle/"
				target="_blank"
				rel="noopener noreferrer"
				class="footer-link"
			>
				LinkedIn
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		z-index: 10;
		width: 100%;
		padding: 2rem 1.5rem;
		background: rgba(15, 15, 20, 0.6);
		backdrop-filter: blur(16px) saturate(1.5);
		-webkit-backdrop-filter: blur(16px) saturate(1.5);
		border-top: 1px solid rgba(66, 165, 245, 0.08);
	}

	.footer-inner {
		max-width: 72rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.footer-text {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.footer-links {
		display: flex;
		gap: 1.5rem;
	}

	.footer-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-link:hover {
		color: var(--accent-bright);
	}

	@media (min-width: 768px) {
		.footer-inner {
			flex-direction: row;
		}
	}
</style>
