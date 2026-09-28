<footer class="footer">
	<div class="footer-inner">
		<p class="footer-text">© {new Date().getFullYear()} Daniel Emerle. All rights reserved.</p>
		<div class="footer-links">
			<a href="https://github.com/demerle" target="_blank" rel="noopener noreferrer" class="footer-link">
				GitHub
			</a>
			<a href="https://www.linkedin.com/in/danielemerle/" target="_blank" rel="noopener noreferrer" class="footer-link">
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
		border-top: 1px solid var(--glass-border);
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
		transition: color 0.2s ease;
	}

	.footer-link:hover {
		color: var(--accent);
	}

	@media (min-width: 768px) {
		.footer-inner {
			flex-direction: row;
		}
	}
</style>
