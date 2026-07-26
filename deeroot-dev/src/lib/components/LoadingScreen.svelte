<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="loading-screen" transition:fly={{ y: -50, duration: 500 }}>
		<div class="piano-loader">
			{#each Array(5) as _, i}
				<div class="key" style="animation-delay: {i * 0.1}s"></div>
			{/each}
		</div>
		<p class="text-white/70 text-lg">Loading Experience...</p>
</div>

<style>
	.loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.piano-loader {
		display: flex;
		gap: 4px;
		margin-bottom: 20px;
	}

	.key {
		width: 12px;
		height: 40px;
		background: linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%);
		border-radius: 2px;
		animation: keyPress 0.8s ease-in-out infinite;
	}

	@keyframes keyPress {
		0%,
		100% {
			transform: translateY(0);
			background: linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%);
		}
		50% {
			transform: translateY(10px);
			background: #4a90d9;
		}
	}
</style>
