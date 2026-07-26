<script lang="ts">
	import { T } from '@threlte/core';
	import * as THREE from 'three';
</script>

<!-- Fog -->
<T.Fog color="#0a0a1a" near={5} far={20} />

<!-- Ambient light -->
<T.AmbientLight intensity={0.4} color="#4a4a6a" />

<!-- Directional light (purple tint) -->
<T.DirectionalLight
	position={[5, 10, 7]}
	intensity={0.8}
	color="#6b5ce7"
	castShadow
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
	shadow.camera.near={0.1}
	shadow.camera.far={50}
	shadow.camera.left={-15}
	shadow.camera.right={15}
	shadow.camera.top={15}
	shadow.camera.bottom={-15}
/>

<!-- Point light (gold accent) -->
<T.PointLight position={[0, 0, 2]} intensity={0.5} color="#ffd700" distance={10} decay={2} />

<!-- Spot light (pink accent) -->
<T.SpotLight
	position={[-5, 5, 5]}
	target.position={[0, 0, 0]}
	intensity={0.6}
	color="#ff6b9d"
	angle={Math.PI / 6}
	penumbra={0.3}
	distance={20}
	castShadow
/>

<!-- Blue accent light -->
<T.SpotLight
	position={[5, -3, 4]}
	target.position={[0, 0, 0]}
	intensity={0.4}
	color="#4a90d9"
	angle={Math.PI / 5}
	penumbra={0.5}
	distance={15}
/>
