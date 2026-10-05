<script lang="ts">
	import { T } from '@threlte/core';
</script>

<!-- Ambient base — dark but still readable -->
<T.AmbientLight color="#33405e" intensity={1.1} />

<!-- Soft room fill from camera side -->
<T.DirectionalLight position={[2, 5, 4]} color="#aebfe0" intensity={0.55} />

<!-- Moonlight from the celestial body beyond the glass -->
<T.DirectionalLight position={[-4, 6, -8]} color="#cfe0ff" intensity={1.2} />

<!-- Screen glow from the monitors -->
<T.PointLight position={[0, 1.0, -2.2]} color="#8bc7ff" intensity={2.2} distance={4} />

<!-- Desk lamp warmth -->
<T.PointLight position={[-0.5, 1.2, -2.3]} color="#ffe8d0" intensity={0.9} distance={3} />

<!-- Pink PC RGB accent -->
<T.PointLight position={[2, 1.5, -1]} color="#ffb8d0" intensity={0.9} distance={4} />

<!-- Cool starlight fill from above -->
<T.PointLight position={[0, 2.8, 1.5]} color="#3d5aa8" intensity={0.55} distance={6} />
