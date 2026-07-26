<script lang="ts">
	import { T } from '@threlte/core';
</script>

<!-- Ambient Light - Bright base for small room -->
<T.AmbientLight color="#b8b0d8" intensity={1.5} />

<!-- Main Directional Light - Warm key from front -->
<T.DirectionalLight position={[2, 5, 4]} color="#fff8f0" intensity={0.8} />

<!-- Screen Glow - Light from monitor -->
<T.PointLight position={[0, 1.0, -2.2]} color="#8bc7ff" intensity={2.0} distance={4} />

<!-- Window Moonlight (from left wall) -->
<T.PointLight position={[-2.5, 2, 0]} color="#d0d8f0" intensity={1.2} distance={5} />

<!-- Desk Lamp Warmth -->
<T.PointLight position={[-0.5, 1.2, -2.3]} color="#ffe8d0" intensity={1.0} distance={3} />

<!-- Accent Light - Purple from right -->
<T.PointLight position={[2, 1.5, -1]} color="#ffb8d0" intensity={0.8} distance={4} />

<!-- Soft Fill from front -->
<T.PointLight position={[1, 1.2, 2]} color="#f0e8ff" intensity={0.5} distance={4} />
