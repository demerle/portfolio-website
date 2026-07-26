# Technical Specification: US-001 ThreeJS Hero Background (Svelte Edition)

## 1. Architecture Overview

### Tech Stack
- **Framework:** SvelteKit (w/ Svelte 5 runes)
- **3D Library:** Three.js + Threlte (Svelte wrapper for ThreeJS)
- **Styling:** Tailwind CSS v4
- **Build:** Vite (via SvelteKit)

### Why Svelte + Threlte?
- **Threlte** is the idiomatic way to use ThreeJS in Svelte
- Declarative component-based scene graph (like React Three Fiber)
- Reactive stores for mouse position, animation state
- Better performance with Svelte's compile-time optimizations
- No virtual DOM overhead for the 3D scene

### Project Structure
```
 src/
├── lib/
│   ├── components/
│   │   │   ThreeBackground.svelte       # Main container
│   │   │   PianoKeys.svelte             # Instanced piano keys
│   │   │   CodeBlock.svelte             # Individual code snippet
│   │   │   Scene.svelte                 # Threlte canvas scene
│   │   │   HeroSection.svelte           # Hero content overlay
│   │   │   FallbackBackground.svelte    # Mobile CSS fallback
│   │   │   LoadingScreen.svelte         # Piano loader animation
│   │   └── ui/                          # UI components
│   ├── stores/
│   │   └── mouseStore.ts                # Reactive mouse position store
│   ├── utils/
│   │   └── pianoKeyUtils.ts             # Key generation logic
│   └── types/
│       └── index.ts                     # TypeScript interfaces
├── routes/
│   └── +page.svelte                   # Homepage
├── app.html                       # HTML template
└── app.css                        # Global styles + Tailwind
```

## 2. Store-Based State Management

### Mouse Position Store
```typescript
// lib/stores/mouseStore.ts
import { writable } from 'svelte/store';

interface MousePosition {
  x: number;  // -1 to 1 (normalized)
  y: number;  // -1 to 1 (normalized)
}

function createMouseStore() {
  const { subscribe, set } = writable<MousePosition>({ x: 0, y: 0 });

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      set({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    });
  }

  return { subscribe };
}

export const mousePosition = createMouseStore();
```

### Loading State Store
```typescript
// lib/stores/loadingStore.ts
import { writable } from 'svelte/store';

export const isLoading = writable(true);
export const isWebGLSupported = writable(true);
```

## 3. Threlte Scene Components

### Main Scene Component
```svelte
<!-- lib/components/Scene.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { mousePosition } from '$lib/stores/mouseStore';
  import PianoKeys from './PianoKeys.svelte';
  import CodeBlocks from './CodeBlocks.svelte';
  import SceneLighting from './SceneLighting.svelte';
</script>

<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  renderer={{ antialias: true, alpha: true }}
  dpr={Math.min(window.devicePixelRatio, 2)}
>
  <SceneLighting />
  <PianoKeys mousePosition={$mousePosition} />
  <CodeBlocks />
</Canvas>
```

### Piano Keys Component (Threlte)
```svelte
<!-- lib/components/PianoKeys.svelte -->
<script lang="ts">
  import { InstancedMesh, Instance } from '@threlte/core';
  import { Vector3, Euler } from 'three';
  import { generateKeys } from '$lib/utils/pianoKeyUtils';
  
  export let mousePosition: { x: number; y: number };
  
  const keys = generateKeys(24); // 2 octaves
  
  // Reactive calculations with Svelte 5 runes
  let keyTransforms = $state(keys.map(key => ({
    position: new Vector3(...key.basePosition),
    rotation: new Euler(0, 0, 0),
    glowIntensity: 0
  })));
  
  // Update in animation loop
  useTask((delta) => {
    const time = performance.now() * 0.001;
    
    keyTransforms = keys.map((key, i) => {
      const [baseX, baseY, baseZ] = key.basePosition;
      
      // Floating animation
      const floatY = Math.sin(time * key.floatSpeed + key.floatOffset) * 0.15;
      
      // Mouse interaction
      const mouseX = mousePosition.x * 10;
      const mouseY = mousePosition.y * 5;
      const dx = mouseX - baseX;
      const dy = mouseY - (baseY + floatY);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Rotation toward cursor
      const maxDistance = 8;
      const influence = Math.max(0, 1 - distance / maxDistance);
      const maxRotation = 15 * (Math.PI / 180);
      const rotX = (dy / maxDistance) * maxRotation * influence;
      const rotY = (dx / maxDistance) * maxRotation * influence;
      
      // Glow calculation
      const glowRadius = 3;
      const glowIntensity = Math.max(0, 1 - distance / glowRadius);
      
      return {
        position: new Vector3(baseX, baseY + floatY, baseZ),
        rotation: new Euler(rotX, rotY, 0),
        glowIntensity
      };
    });
  });
</script>

<InstancedMesh>
  <boxGeometry args={[0.8, 0.3, 3.5]} />
  <meshStandardMaterial 
    color="#f5f5f5" 
    roughness={0.2}
    emissive="#4a90d9"
    emissiveIntensity={0}
  />
  
  {#each keys.filter(k => k.type === 'white') as key, i}
    <Instance
      position={keyTransforms[key.id].position}
      rotation={keyTransforms[key.id].rotation}
      emissiveIntensity={keyTransforms[key.id].glowIntensity * 0.5}
    />
  {/each}
</InstancedMesh>

<InstancedMesh>
  <boxGeometry args={[0.5, 0.4, 2.2]} />
  <meshStandardMaterial 
    color="#1a1a1a" 
    roughness={0.3}
    emissive="#ff6b9d"
    emissiveIntensity={0}
  />
  
  {#each keys.filter(k => k.type === 'black') as key, i}
    <Instance
      position={keyTransforms[key.id].position}
      rotation={keyTransforms[key.id].rotation}
      emissiveIntensity={keyTransforms[key.id].glowIntensity * 0.5}
    />
  {/each}
</InstancedMesh>
```

## 4. Component Specifications

### ThreeBackground Container
```svelte
<!-- lib/components/ThreeBackground.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  import { isWebGLSupported, isLoading } from '$lib/stores/loadingStore';
  import Scene from './Scene.svelte';
  import FallbackBackground from './FallbackBackground.svelte';
  import LoadingScreen from './LoadingScreen.svelte';
  
  // Check WebGL support
  function checkWebGL(): boolean {
    if (!browser) return false;
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }
  
  const hasWebGL = checkWebGL();
  isWebGLSupported.set(hasWebGL);
  
  // Simulate loading time
  setTimeout(() => isLoading.set(false), 1500);
</script>

{#if $isLoading}
  <LoadingScreen />
{/if}

{#if hasWebGL}
  <div class="fixed inset-0 -z-10">
    <Scene />
  </div>
{:else}
  <FallbackBackground />
{/if}
```

### Hero Section with Svelte Transitions
```svelte
<!-- lib/components/HeroSection.svelte -->
<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import ThreeBackground from './ThreeBackground.svelte';
  
  let visible = $state(false);
  
  $effect(() => {
    visible = true;
  });
  
  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="hero" class="relative min-h-screen w-full overflow-hidden">
  <ThreeBackground />
  
  <div class="hero-content">
    {#if visible}
      <h1 
        in:fly={{ y: 30, duration: 1000, easing: quintOut }}
        class="text-6xl md:text-8xl font-bold mb-4 tracking-tight"
      >
        <span class="bg-gradient-to-r from-accent-blue via-accent-pink to-accent-gold bg-clip-text text-transparent">
          Daniel Emerle
        </span>
      </h1>
      
      <p 
        in:fly={{ y: 30, duration: 1000, delay: 200, easing: quintOut }}
        class="text-xl md:text-2xl text-text-secondary mb-2"
      >
        Developer <span class="text-accent-gold mx-2">•</span>
        Creator <span class="text-accent-gold mx-2">•</span>
        Piano Enthusiast
      </p>
      
      <!-- More content with staggered transitions -->
    {/if}
  </div>
</section>
```

## 5. Dependencies

```json
{
  "dependencies": {
    "@threlte/core": "^8.0.0",
    "@threlte/extras": "^9.0.0",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "@types/three": "^0.160.0",
    "autoprefixer": "^10.4.16",
    "@tailwindcss/postcss": "^4.0.0",
    "svelte": "^5.0.0",
    "svelte-check": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  }
}
```

## 6. Key Differences from React Version

| Aspect | React | Svelte |
|--------|-------|--------|
| **State** | `useState`, `useRef` | `$state`, `$derived` runes |
| **Effects** | `useEffect` | `$effect` rune |
| **Mouse tracking** | Custom hook | Writable store |
| **Animation loop** | `useFrame` (R3F) | `useTask` (Threlte) |
| **Transitions** | Framer Motion | Built-in `transition` directive |
| **Conditionals** | `{condition && <Component />}` | `{#if condition}<Component />{/if}` |
| **Lists** | `.map()` | `{#each}` block |
| **Reactivity** | Manual dependencies | Automatic fine-grained reactivity |

## 7. Svelte Advantages for This Project

1. **No Hook Rules** - No worrying about dependency arrays
2. **Automatic Subscriptions** - `$mousePosition` auto-subscribes to store
3. **Transitions Built-in** - No extra animation library needed
4. **Smaller Bundle** - Compile-time code elimination
5. **Threlte Integration** - Native feeling ThreeJS in Svelte
6. **Performance** - Less runtime overhead for 60fps animations

## 8. Build Commands

```bash
# Create project
npm create svelte@latest deeroot-dev
# Select: Skeleton project, TypeScript, ESLint + Prettier

cd deeroot-dev
npm install

# Install dependencies
npm install @threlte/core @threlte/extras three
npm install -D @types/three @tailwindcss/postcss autoprefixer

# Dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 9. Implementation Checklist

- [ ] Initialize SvelteKit project with TypeScript
- [ ] Configure Tailwind CSS v4 with PostCSS
- [ ] Install Threlte and Three.js
- [ ] Create mouse position store
- [ ] Build PianoKeys component with InstancedMesh
- [ ] Create CodeBlock components with canvas textures
- [ ] Set up scene lighting and fog
- [ ] Implement loading screen with piano animation
- [ ] Build CSS fallback for mobile/no-WebGL
- [ ] Create HeroSection with Svelte transitions
- [ ] Add scroll indicator and CTAs
- [ ] Test performance (target 60fps)

---

**Svelte Edition Ready!** This approach leverages Svelte 5's runes and Threlte for a cleaner, more performant implementation. 🎺✨
