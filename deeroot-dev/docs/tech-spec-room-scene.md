# Technical Specification: 3D Room Scene Background

## Overview
Replace the current floating piano keys/code blocks background with an immersive 3D room scene depicting a person working at a computer desk. This creates a more narrative-driven visual that represents the developer at work.

## Concept Vision

### Scene Description
A stylized, low-poly 3D room showing:
- **Room Environment**: Cozy developer workspace with walls, floor, ceiling
- **Furniture**: Desk, chair, shelves, maybe a window
- **Computer Setup**: Monitor, keyboard, mouse on desk
- **Character**: Simplified stylized figure sitting at the desk
- **Lighting**: Warm ambient lighting with screen glow effect
- **Atmosphere**: Cozy, focused, creative workspace vibe

### Visual Style
- **Aesthetic**: Low-poly / stylized (performance-friendly, visually clean)
- **Color Palette**: 
  - Warm wood tones (desk, floor)
  - Cool tech blues (screen glow, accent lighting)
  - Purple/pink ambient lighting (matching brand colors)
  - Neutral walls with warm undertones
- **Lighting**: Dynamic with screen glow pulsing, ambient room light
- **Camera**: Fixed angle or slow subtle movement (parallax effect on mouse)

## Technical Architecture

### Component Structure

```
RoomScene.svelte          # Main scene component
├── RoomEnvironment/      # Room shell (walls, floor, ceiling)
├── Furniture/           # Desk, chair, shelves
├── ComputerSetup/       # Monitor, keyboard, mouse, PC tower
├── Character/           # Stylized seated figure
├── Lighting/           # Ambient, screen glow, accent lights
└── Effects/            # Particles, ambient animations
```

### Threlte Components

#### 1. RoomEnvironment.svelte
```typescript
// Room dimensions: 10x10x8 units
interface RoomProps {
  wallColor: string;
  floorTexture: string;
  hasWindow: boolean;
}

// Components:
// - Floor plane with wood texture
// - Back wall
// - Side wall (optional, for depth)
// - Ceiling (optional, may not be visible)
// - Window with night sky view
```

#### 2. Furniture.svelte
```typescript
// Desk: 3x1.5x0.1 units, positioned center-back
// Chair: Simple low-poly design
// Shelves: Wall-mounted with books/plants
// Decor: Plants, lamp, small items

interface FurnitureProps {
  deskColor: string;
  chairColor: string;
  decorItems: DecorItem[];
}
```

#### 3. ComputerSetup.svelte
```typescript
// Monitor: Rectangular box with glowing screen plane
// Keyboard: Low-profile rectangular shape
// Mouse: Small rounded shape
// PC Tower: Vertical box under desk

interface ComputerProps {
  screenGlowColor: string;
  screenGlowIntensity: number;
  hasPCGlow: boolean;
}
```

#### 4. Character.svelte
```typescript
// Stylized low-poly figure
// Seated pose at desk
// Simplified anatomy (no fingers, simple limbs)
// Subtle idle animation (breathing, slight head movement)

interface CharacterProps {
  shirtColor: string;
  skinTone: string;
  hairColor: string;
  animationState: 'idle' | 'typing' | 'thinking';
}
```

#### 5. SceneLighting.svelte
```typescript
// Ambient light: Warm base illumination
// Screen glow: Dynamic point light from monitor
// Desk lamp: Warm accent light
// Window light: Cool moonlight (if window visible)
// Rim lighting: Purple/pink accent from behind

interface LightingProps {
  ambientIntensity: number;
  screenGlowIntensity: number;
  accentColor: string;
  timeOfDay: 'night' | 'evening';
}
```

### State Management

```typescript
// roomStore.ts
interface RoomState {
  // Camera
  cameraPosition: { x: number; y: number; z: number };
  cameraTarget: { x: number; y: number; z: number };
  
  // Animation
  characterAnimation: 'idle' | 'typing' | 'thinking';
  screenGlowPulse: boolean;
  
  // Interaction
  mouseParallax: { x: number; y: number };
  
  // Effects
  particlesEnabled: boolean;
  ambientFloatEnabled: boolean;
}
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create basic room shell (floor, walls)
- [ ] Set up camera with parallax on mouse movement
- [ ] Basic lighting setup
- [ ] Integrate into ThreeBackground component

### Phase 2: Furniture (Week 1-2)
- [ ] Build desk geometry
- [ ] Build chair geometry
- [ ] Add simple decor items
- [ ] Position everything in scene

### Phase 3: Computer Setup (Week 2)
- [ ] Monitor with screen plane
- [ ] Keyboard and mouse
- [ ] Screen glow effect (dynamic light)
- [ ] PC tower with optional RGB glow

### Phase 4: Character (Week 2-3)
- [ ] Low-poly character model
- [ ] Seated pose rigging
- [ ] Idle animation (breathing)
- [ ] Typing animation state

### Phase 5: Polish & Effects (Week 3)
- [ ] Ambient particles (dust motes, screen glow particles)
- [ ] Window view (night sky/stars)
- [ ] Lighting refinement
- [ ] Performance optimization

### Phase 6: Screen Content Hook (Week 4 - Future)
- [ ] Expose screen texture reference
- [ ] Create interface for dynamic content
- [ ] Test with placeholder content

## Asset Requirements

### Generated Assets (Procedural)
All geometry created via Three.js primitives:
- BoxGeometry for desk, monitor, PC tower
- PlaneGeometry for screen, walls, floor
- CylinderGeometry for chair legs, lamp
- SphereGeometry for character head, joints
- ConeGeometry for chair back

### Textures (Optional - can use solid colors)
- Wood texture for desk/floor (procedural or simple image)
- Window view (night sky gradient)

### No External Models Required
Keeping everything procedural ensures:
- Zero external dependencies
- Fast loading
- Full control over geometry
- Easy modifications

## Code Example: Basic Structure

```svelte
<!-- RoomScene.svelte -->
<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { Vector3 } from 'three';
  import RoomEnvironment from './RoomEnvironment.svelte';
  import Furniture from './Furniture.svelte';
  import ComputerSetup from './ComputerSetup.svelte';
  import Character from './Character.svelte';
  import SceneLighting from './SceneLighting.svelte';
  import { mousePosition } from '$lib/stores/mouseStore';

  // Camera parallax based on mouse
  let cameraX = $state(0);
  let cameraY = $state(2);
  
  $effect(() => {
    cameraX = $mousePosition.x * 0.5;
    cameraY = 2 + $mousePosition.y * 0.3;
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[cameraX, cameraY, 8]}
  lookAt={[0, 1, 0]}
/>

<SceneLighting />
<RoomEnvironment />
<Furniture />
<ComputerSetup />
<Character />
```

## Performance Considerations

### Geometry Optimization
- Keep poly count < 5000 triangles
- Use simple primitives, no complex curves
- Character: ~500 polys max
- Room: ~100 polys
- Furniture: ~200 polys total

### Rendering Optimizations
- Single draw call where possible (instancing)
- Simple materials (MeshStandardMaterial)
- Limit shadow casting (only key objects)
- Use baked lighting where possible

### Animation Budget
- Character: 10-15 bones max
- Use vertex shader for simple animations
- Throttle animation updates to 30fps

## Future Extensibility

### Dynamic Screen Content
```typescript
// Future API for screen content
interface ScreenContentAPI {
  setTexture(texture: Texture): void;
  setVideo(url: string): void;
  setCanvas(canvas: HTMLCanvasElement): void;
  enableInteractivity(): void;
}
```

### Time of Day System
```typescript
interface TimeOfDaySystem {
  setTime(time: 'morning' | 'day' | 'evening' | 'night'): void;
  windowView: WindowViewType;
  lightingPreset: LightingPreset;
}
```

### Interactive Elements
- Click on desk items for subtle reactions
- Character looks toward mouse occasionally
- Screen content reacts to user actions

## Color Palette Reference

```css
/* Room Scene Colors */
--room-wall: #2a2a3e;
--room-floor: #3d2817;
--desk-wood: #5c3d1e;
--desk-metal: #2a2a2a;
--chair-fabric: #1a1a2e;
--screen-glow: #4a90d9;
--ambient-purple: #6b4c9a;
--ambient-pink: #ff6b9d;
--character-shirt: #2d3436;
--character-skin: #d4a574;
--lamp-warm: #ffb347;
```

## File Structure

```
src/lib/components/room/
├── RoomScene.svelte              # Main entry
├── RoomEnvironment.svelte        # Walls, floor, window
├── Furniture.svelte              # Desk, chair, shelves
├── ComputerSetup.svelte          # Monitor, peripherals
├── Character.svelte              # Stylized figure
├── SceneLighting.svelte          # All lighting
├── RoomParticles.svelte          # Ambient effects
└── types.ts                      # Shared interfaces

src/lib/stores/
├── roomStore.ts                  # Room scene state
```

## Success Criteria

- [ ] Scene renders at 60fps on desktop
- [ ] Mouse parallax feels smooth and natural
- [ ] Character animation is subtle but alive
- [ ] Screen glow effect is visible and appealing
- [ ] Color scheme matches portfolio brand
- [ ] Scene is recognizable as "developer at work"
- [ ] No external model dependencies
- [ ] Clean fallback for WebGL failures

## Design Decisions (Confirmed)

| Question | Decision |
|----------|----------|
| **Character Style** | Blocky low-poly (Minecraft-style) - cube-based geometry |
| **View Angle** | 3/4 view - camera positioned at front-right of room |
| **Room Scope** | Full room with walls, floor, ceiling, and window |
| **Animation** | Simple breathing animation only (no typing) |
| **Screen Angle** | Angled 30° toward camera - visible but creating depth |
| **Interactivity** | Purely ambient (no click interactions) |

### Visual Direction

**Blocky Character Style:**
- Cube-based body parts (head, torso, arms, legs)
- No fingers - simple block hands
- Pixel-art inspired but 3D
- Simple joint rotations for breathing

**3/4 View Composition:**
```
    [Window]
       |
    [Wall]
       |
[Desk+Computer] ---- [Character]
       |                  |
    [Chair]             [Camera]
       |
    [Floor]
```

Camera positioned at approximately:
- Position: `[6, 3, 6]` (looking from front-right)
- Target: `[0, 1, 0]` (centered on desk area)
- Angle: ~45° from front, slightly elevated

**Full Room Layout:**
```
Room dimensions: 12 x 10 x 8 (W x D x H)

    BACK WALL (with window)
    ┌─────────────────────────────┐
    │         [Window]            │
    │              |              │
    │    ┌─────────────────┐      │
    │    │    [Shelf]      │      │
    │    └─────────────────┘      │
    │                             │
L   │    ┌─────────────────┐      │  R
E   │    │   [Monitor]     │      │  I
F   │    │      glow       │      │  G
T   │    └─────────────────┘      │  H
    │           [Desk]            │  T
    │    ⚪                 [PC]   │
    │                             │
    │          [Chair]            │
    │            👤                │
    │                             │
    └─────────────────────────────┘
    
         FRONT (camera here)
```

**Monitor Positioning:**
- Angled 30° toward camera
- Screen plane visible from camera angle
- Screen glow affects character and desk
- Creates nice rim lighting on character's face

---

**Estimated Implementation Time**: 2-3 weeks
**Priority**: Medium (after core portfolio sections)
**Dependencies**: None (replaces existing background)
