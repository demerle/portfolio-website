<div class="fallback-bg">
	<div class="gradient-orb orb-1"></div>
	<div class="gradient-orb orb-2"></div>
	<div class="gradient-orb orb-3"></div>

	<!-- Piano key pattern overlay -->
	<div
		class="absolute inset-0 opacity-10"
		style="background-image: repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(245, 245, 245, 0.1) 20px, rgba(245, 245, 245, 0.1) 35px, transparent 35px, transparent 40px, rgba(26, 26, 26, 0.2) 40px, rgba(26, 26, 26, 0.2) 50px); background-size: 60px 100%;"
	></div>
</div>

<style>
	.fallback-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%);
		z-index: -1;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.5;
		animation: float 8s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: #4a90d9;
		top: 10%;
		left: 10%;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: #ff6b9d;
		bottom: 20%;
		right: 15%;
		animation-delay: -2s;
	}

	.orb-3 {
		width: 250px;
		height: 250px;
		background: #ffd700;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: -4s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0) scale(1);
		}
		50% {
			transform: translateY(-30px) scale(1.1);
		}
	}
</style>
