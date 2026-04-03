# Design: Microfrontend Architecture Presentation Website — Phase 1 Foundation

## Architecture Decisions

### Decision 1 — slides.ts is the only source of truth
All section names, slide counts, URL slugs, sidebar dots, bottom bar dots,
and route validation are derived dynamically from the sections array.

Consequence: adding a new section requires only a new entry in slides.ts.
No routes file, no nav config, no component changes needed.

Rejected alternative: define routes statically in a router config.
Rejected because: it creates two places to maintain section data.

### Decision 2 — URL is the navigation state
The current section and slide index live in the URL, not in component state.
The app reads sectionId and slideIndex from the route params on every render.

Consequence: the app is fully bookmarkable. Refresh always restores state.
Browser history works for free.

Rejected alternative: store currentSection and currentSlide in Zustand.
Rejected because: it duplicates state that already lives in the URL,
creating sync bugs.

### Decision 3 — Progress store is separate from navigation state
Zustand handles only visited/completed tracking, not current position.
Current position is always derived from the URL.

### Decision 4 — No borders between layout regions
Separation is achieved through background color shifts only, per the
No-Line Rule in the design system spec.

surface (#0c0e14) → surface-container (#171921) creates enough contrast
for the eye to perceive the boundary without a visible line.

### Decision 5 — Preact + RsBuild, no SSR
Static files only. No server rendering. This means direct URL access
requires the server to serve index.html for all routes.
For development, RsBuild handles this automatically.
For production, document the required server config (Vercel, Nginx, etc).

---

## File Structure
```
src/
  components/
    Header/
      Header.tsx
      Header.css
    Sidebar/
      Sidebar.tsx
      Sidebar.css
    CenterPanel/
      CenterPanel.tsx
      CenterPanel.css
    DiagramPanel/
      DiagramPanel.tsx
      DiagramPanel.css
    NavArrows/
      NavArrows.tsx
      NavArrows.css
    BottomBar/
      BottomBar.tsx
      BottomBar.css
    SlideTransition/
      SlideTransition.tsx
      SlideTransition.css
  diagrams/
    index.ts              ← diagramMap export
    OverviewDiagram.tsx
    MonorepoDiagram.tsx
    StackDiagram.tsx
    UIComponentsDiagram.tsx
    ShellDiagram.tsx
    MockModeDiagram.tsx
    ModuleFederationDiagram.tsx
    InfrastructureDiagram.tsx
    OptimizationsDiagram.tsx
  data/
    slides.ts             ← sections array, starts empty
  store/
    progressStore.ts      ← Zustand + persist
  styles/
    tokens.css            ← all CSS variables
    base.css              ← reset + global rules
  hooks/
    useNavigation.ts      ← next/prev logic
    useKeyboard.ts        ← ArrowLeft/ArrowRight listener
  App.tsx
  main.tsx
```

---

## Data Flow
```
URL params (sectionId, slideIndex)
  → App reads params via preact-router
  → App calls progressStore.markSlideVisited(sectionId, slideIndex)
  → App derives currentSection and currentSlide from sections array
  → App passes currentSlide to CenterPanel and DiagramPanel
  → App passes sections + visitedSlides to Sidebar
  → App passes currentSection slides + slideIndex to BottomBar
```

---

## Component Contracts

### useNavigation(sectionId, slideIndex)
Returns:
- next(): void — navigate to next slide or first slide of next section
- prev(): void — navigate to prev slide or last slide of prev section
- canGoNext: boolean
- canGoPrev: boolean

### useKeyboard(next, prev)
Attaches ArrowRight → next, ArrowLeft → prev on mount.
Cleans up on unmount.
Does not fire when an input element is focused.

### progressStore
- visitedSlides: Record<string, number[]>
- markSlideVisited(sectionId, slideIndex): void — idempotent
- isSectionCompleted(sectionId): boolean — checks against sections array
- isSlideVisited(sectionId, slideIndex): boolean
- Persisted to localStorage key: mfe-progress

### diagramMap
```ts
export const diagramMap: Record<string, ComponentType> = {
  OverviewDiagram,
  MonorepoDiagram,
  StackDiagram,
  UIComponentsDiagram,
  ShellDiagram,
  MockModeDiagram,
  ModuleFederationDiagram,
  InfrastructureDiagram,
  OptimizationsDiagram,
}
```
DiagramPanel renders diagramMap[slide.diagramComponent].
If key not found, render a fallback placeholder.

---

## Design System Tokens
```css
:root {
  /* Surfaces — use shifts, not borders */
  --surface: #0c0e14;
  --surface-low: #11131a;
  --surface-container: #171921;
  --surface-high: #1e2028;
  --surface-highest: #23262e;
  --surface-bright: #2a2d37;

  /* Brand */
  --primary: #6dddff;
  --primary-dim: #4db8d9;
  --secondary: #af88ff;
  --tertiary: #a1ffef;
  --amber: #f59e0b;

  /* Text */
  --on-surface: #e2e8f0;
  --on-surface-muted: #8b909e;
  --on-surface-dim: #4a4f5e;
  --on-primary: #0c0e14;

  /* Ghost border — felt not seen */
  --ghost-border: rgba(70,72,79,0.15);
  --ghost-border-visible: rgba(70,72,79,0.30);

  /* Fonts */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing — Power of 3.5 */
  --space-1: 0.35rem;
  --space-2: 0.70rem;
  --space-3: 1.05rem;
  --space-4: 1.40rem;
  --space-6: 2.10rem;
  --space-8: 2.80rem;
  --space-12: 4.20rem;
}
```

---

## Design Rules (enforced, not negotiable)

| Rule | Value |
|------|-------|
| Border radius | 0px everywhere. No exceptions. |
| Layout borders | None. Background shifts only. |
| Gradients | Forbidden. |
| Shadows | Forbidden. |
| Glow effects | Forbidden. |
| Hover transitions | Instant (0ms). Mechanical feel. |
| Ghost border | rgba(70,72,79,0.30) — felt not seen |
| Min empty space | 40% of center panel on any slide |
| Font for numbers | JetBrains Mono always |
| Spacing unit | 0.35rem base, Power of 3.5 scale |

---

## Transition Behavior

On every slide change:
1. Current content fades out: opacity 0 + translateX(-6px), 100ms
2. New content fades in: opacity 1 + translateX(0), 200ms
3. Triggered by sectionId or slideIndex change in route params

---

## Navigation Logic (pseudocode)
```
NEXT:
  if slideIndex < currentSection.slides.length
    push(/:sectionId/:slideIndex+1)
  else if sectionIndex < sections.length - 1
    push(/sections[sectionIndex+1].id/1)
  else
    noop (canGoNext = false)

PREV:
  if slideIndex > 1
    push(/:sectionId/:slideIndex-1)
  else if sectionIndex > 0
    prev = sections[sectionIndex-1]
    push(/prev.id/prev.slides.length)
  else
    noop (canGoPrev = false)
```

---

## Tasks

See tasks.md