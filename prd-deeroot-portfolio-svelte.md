# PRD: deeroot.dev Portfolio Website (Svelte Edition)

## Introduction

A stunning, interactive portfolio website for deeroot.dev built with **SvelteKit** and **Threlte** (ThreeJS for Svelte). The centerpiece is an immersive ThreeJS animated background featuring floating piano keys that react to user interaction, combined with code/tech-themed visual elements. The design embraces rich colors, gradients, and depth to create a memorable first impression.

**Why Svelte?**
- Better performance with compile-time optimizations
- Fine-grained reactivity perfect for 60fps animations
- Threlte provides elegant ThreeJS integration
- Smaller bundle size than React
- Built-in transitions (no Framer Motion needed)

## Goals

- Create a visually stunning single-page portfolio with an immersive ThreeJS hero section
- Showcase professional identity through interactive piano-key animations
- Leverage Svelte 5 runes for reactive, performant animations
- Use Threlte for idiomatic ThreeJS integration in Svelte
- Achieve sub-3-second initial load time
- Ensure responsive design works on all devices
- Create a memorable brand experience

## User Stories

### US-001: ThreeJS Hero Background (Svelte + Threlte)
**Description:** As a visitor, I want to see an immersive animated 3D background so that I'm immediately impressed by the technical creativity.

**Acceptance Criteria:**
- [ ] Threlte scene renders full-viewport animated background
- [ ] Background features 24 floating piano keys (2 octaves) using InstancedMesh
- [ ] Keys respond to mouse cursor position (tilt + glow)
- [ ] Code blocks float in 3D space as decorative elements
- [ ] Animation runs at 60fps on modern desktop browsers
- [ ] Falls back to CSS gradient animation on mobile
- [ ] Loading screen displays piano key animation while initializing
- [ ] Uses Svelte stores for mouse position tracking
- [ ] Uses `$state` and `$effect` runes for reactive animations

### US-002: Piano Key Interaction
**Description:** As a visitor, I want the piano keys to react when I move my mouse.

**Acceptance Criteria:**
- [ ] Keys tilt/rotate toward cursor position (max 15 degrees)
- [ ] Keys emit subtle glow effect on hover proximity
- [ ] White keys glow blue (#4a90d9), black keys glow pink (#ff6b9d)
- [ ] Keys return smoothly to original position using `useTask` loop
- [ ] Floating animation independent of mouse interaction
- [ ] Uses Svelte's fine-grained reactivity for smooth 60fps

### US-003: Hero Section Content
**Description:** As a visitor, I want to quickly understand who Daniel is.

**Acceptance Criteria:**
- [ ] Hero displays name "Daniel Emerle" with `fly` transition
- [ ] Tagline: "Developer • Creator • Piano Enthusiast"
- [ ] Brief intro paragraph with staggered fade-in
- [ ] Primary CTA: "View My Work" scrolls to Projects
- [ ] Secondary CTA: "Get In Touch" scrolls to Contact
- [ ] Social links (GitHub, LinkedIn) with hover effects
- [ ] Uses Svelte's built-in `transition` directive

### US-009: Navigation
**Description:** As a visitor, I want to easily navigate between sections.

**Acceptance Criteria:**
- [ ] Fixed navigation bar appears after scrolling past hero
- [ ] Smooth scroll to each section
- [ ] Active section highlighted in nav using `$derived`
- [ ] Mobile hamburger menu with slide-out drawer
- [ ] Progress indicator showing scroll position
- [ ] Uses Svelte stores for scroll position tracking

### US-010: Performance & Accessibility
**Description:** As a visitor on any device, I want the site to be fast and accessible.

**Acceptance Criteria:**
- [ ] Initial paint under 3 seconds
- [ ] ThreeJS background disabled on mobile (CSS fallback)
- [ ] Reduced motion preference respected
- [ ] WCAG 2.1 AA color contrast compliance
- [ ] Keyboard navigation functional
- [ ] SvelteKit's built-in accessibility warnings enabled

## Functional Requirements

### Hero & ThreeJS (Threlte)
- **FR-1:** Threlte `<Canvas>` with perspective camera at z=5
- **FR-2:** Piano keys as `<InstancedMesh>` with `<Instance>` children
- **FR-3:** Mouse position stored in Svelte writable store
- **FR-4:** Keys use `$state` for reactive transforms
- **FR-5:** Animation loop via `useTask` from Threlte
- **FR-6:** Code blocks as `<Mesh>` with canvas-generated textures
- **FR-7:** Fog and 4 light sources (ambient, directional, point, spot)
- **FR-8:** Mobile detection disables WebGL, shows CSS fallback
- **FR-9:** Loading state managed by `isLoading` store

### SvelteKit Structure
- **FR-10:** File-based routing with `+page.svelte`
- **FR-11:** Layout with `+layout.svelte` for shared elements
- **FR-12:** SSR-friendly (no window access during SSR)
- **FR-13:** Static adapter for deployment to any host

### Content Sections
- **FR-14:** Hero section full viewport with ThreeJS background
- **FR-15:** About section with `fade` + `fly` transitions
- **FR-16:** Skills with animated progress bars (on scroll trigger)
- **FR-17:** Projects grid using `{#each}` block
- **FR-18:** Contact form with `enhance` for progressive enhancement

### Styling & Theme
- **FR-19:** Tailwind CSS v4 with custom color palette
- **FR-20:** Glassmorphism effects using `backdrop-blur`
- **FR-21:** Typography: Inter for headings, Fira Code for code
- **FR-22:** Svelte transitions: `fly`, `fade`, `slide`, `scale`
- **FR-23:** Custom easing with `quintOut`, `cubicOut`

## Non-Goals (Out of Scope)

- Blog functionality (v2)
- CMS integration (static site)
- Backend API (use form services)
- Multi-language support
- Dark/light mode toggle (single rich theme)
- User authentication
- Real-time features
- Admin dashboard
- PWA features (for now)

## Design Considerations

### Color Palette
```css
--bg-primary: #0a0a1a;
--bg-secondary: #1a1a2e;
--accent-blue: #4a90d9;
--accent-pink: #ff6b9d;
--accent-gold: #ffd700;
--text-primary: #ffffff;
--text-secondary: #a0a0b0;
```

### ThreeJS Scene
- 24 piano keys scattered across z: -1 to -6
- 5 code blocks with syntax highlighting
- Fog: purple, near 5, far 20
- Camera: FOV 75, position [0, 0, 5]

## Technical Considerations

### Tech Stack
- **Framework:** SvelteKit 2.0
- **Language:** Svelte 5 (with runes) + TypeScript
- **3D:** Three.js + Threlte 8
- **Styling:** Tailwind CSS v4
- **Build:** Vite (via SvelteKit)

### Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: <200KB (excluding ThreeJS)

### Svelte-Specific Optimizations
- Use `$derived` for computed values (no duplicate calculations)
- Use `$effect` sparingly (prefer reactive statements)
- Lazy load ThreeJS component with `import()`
- Use `{#key}` blocks for forcing re-renders when needed
- Leverage Svelte's compile-time optimizations

## Success Metrics

- Page load under 3 seconds
- 60fps maintained during ThreeJS interaction
- Zero layout shift
- Contact form functional
- Mobile experience rated "good"
- Lighthouse score 90+

## Implementation Phases

### Phase 1: Foundation
- Initialize SvelteKit project
- Configure Tailwind CSS v4
- Install Threlte and Three.js
- Set up folder structure

### Phase 2: ThreeJS Hero
- Create mouse position store
- Build PianoKeys component
- Add CodeBlocks component
- Configure lighting and fog
- Implement loading screen

### Phase 3: Content
- Hero section with transitions
- Navigation component
- All content sections
- Responsive styling

### Phase 4: Polish
- Performance optimization
- Accessibility audit
- Build and deploy

## Open Questions

- Should piano keys play actual sounds? (Tone.js integration)
- Preferred email for contact form?
- Specific achievements to highlight?
- Headshot style preference?

---

**Svelte Edition PRD Complete!** 🎺✨
