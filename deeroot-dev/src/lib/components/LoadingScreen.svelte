<div class="loading-screen" aria-hidden="true">
	<div class="pl">
		{#each Array(12) as _, i}
			<div class="pl-dot" style="animation-delay: -{i * 0.1666667}s"></div>
		{/each}
		<p class="pl-text">Loading</p>
	</div>
</div>

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: var(--bg-elevated);
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 1;
		transition: opacity 0.8s ease 0.4s;
	}

	.pl {
		position: relative;
		width: 20em;
		height: 20em;
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		transform: rotateX(30deg) rotateZ(45deg);
		color: #ffffff;
		font-size: 16px;
		box-shadow:
			2em 0 2em rgba(0, 0, 0, 0.2) inset,
			-2em 0 2em rgba(255, 255, 255, 0.1) inset;
	}

	.pl,
	.pl-dot {
		border-radius: 50%;
	}

	.pl-dot {
		position: absolute;
		top: calc(50% - 0.75em);
		left: calc(50% - 0.75em);
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		box-shadow:
			0.1em 0.1em 0 0.1em rgba(0, 0, 0, 0.2),
			0.3em 0 0.3em rgba(0, 0, 0, 0.3);
		animation: orbit 2s linear infinite;
	}

	.pl-text {
		position: absolute;
		font-size: 0.75em;
		max-width: 5rem;
		text-shadow: 0 0 0.1em rgba(255, 255, 255, 0.5);
		transform: rotateZ(-45deg);
	}

	@keyframes orbit {
		from {
			transform: rotate(0deg) translateX(7em) rotate(0deg);
			animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
		}
		to {
			transform: rotate(-360deg) translateX(7em) rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pl-dot {
			animation: none;
			transform: rotate(0deg) translateX(7em) rotate(0deg);
		}
	}
</style>
