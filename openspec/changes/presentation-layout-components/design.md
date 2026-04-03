# Design: Presentation Layout Components

## Technical Approach

Build 8 pure display components in `ui-components` (MF remote) + 1 container in `shell` using the Flat Composition with Named Slot Props pattern. PresentationLayout is a CSS Grid organism that receives pre-rendered zones as `ComponentChildren`. Shell's PresentationContainer reads from hooks/stores, imports all 8 display components individually via Module Federation, and passes data down as props. Zero logic crosses the MF boundary.

---

## Architecture Decisions

### AD-1: Co-located CSS files consuming host custom properties (NOT Tailwind)

**Choice**: Each new component gets a co-located `.css` file (e.g., `NavArrows.css`) that uses CSS custom properties from the host's `tokens.css`.

**Rejected**: Tailwind utility classes (existing Button/Input use them), CSS Modules, CSS-in-JS.

**Rationale**: DESIGN.md is built on precise token-based tonal layering that Tailwind cannot express cleanly (ghost borders at 15% opacity, glassmorphism, tonal surface shifts). Since ui-components renders inside the host DOM via MF, the host's `tokens.css` custom properties are available at runtime without bundling tokens into the remote. CSS Modules add unnecessary complexity for components that don't risk class name collision.

### AD-2: Named slot props on PresentationLayout (NOT compound components)

**Choice**: PresentationLayout receives `header`, `sidebar`, `center`, `diagram`, `bottom` as `ComponentChildren` props. Each slot is rendered into a CSS Grid area wrapper `<div>`.

**Rejected**: Compound components (PresentationLayout.Header, etc.), render props, context-based slot injection.

**Rationale**: Named slot props are the simplest pattern that maintains clear data flow across the MF boundary. Compound components would complicate MF entry discovery (fast-glob picks up individual files, not nested exports). Context injection would hide data flow, violating the shell-owns-logic principle.

### AD-3: CSS class toggle for SlideTransition (NOT FLIP or Web Animations API)

**Choice**: Boolean state that flips when `transitionKey` changes. Toggles `.slide-transition--entering` CSS class which triggers a `@keyframes` fade+translateY animation. `useEffect` watches `transitionKey`, resets the class, then re-applies it on the next frame via double `requestAnimationFrame`.

**Rejected**: Web Animations API (`element.animate()`), FLIP technique, unmount/remount children.

**Rationale**: Pure CSS class toggle is zero-dependency, GPU-composited via `will-change`, and respects `prefers-reduced-motion` via a single CSS media query. Unmount/remount would destroy child state and DOM.

### AD-4: Diagram panel visibility via CSS modifier class (NOT conditional rendering)

**Choice**: PresentationLayout always renders both `center` and `diagram` grid area wrappers. When `showDiagram` is false, `.presentation-layout--no-diagram` modifier changes the grid template from 3 to 2 columns, and hides the diagram wrapper via `display: none`.

**Rejected**: Conditional rendering (don't render diagram div), CSS `:empty` pseudo-class.

**Rationale**: CSS modifier class gives PresentationContainer explicit control via a boolean prop, making layout deterministic and testable. Conditional rendering would require logic inside PresentationLayout. `:empty` is fragile because whitespace nodes can defeat it.

### AD-5: Static imports, not lazy (for v1)

**Choice**: PresentationContainer imports each of the 8 display components as standard static imports. No `lazy()` or Suspense.

**Rejected**: `lazy()` wrappers (deferred to later when route-level code splitting is needed), barrel imports, custom dynamic `import()`.

**Rationale**: All 8 components render simultaneously on every slide — lazy loading adds Suspense complexity with no real benefit when everything loads at once. Barrel imports violate project rules. Migrate to `lazy()` later if individual routes only need subsets.

### AD-6: `features/presentation/` directory in shell (NOT inline in router)

**Choice**: Create `packages/shell/src/features/presentation/PresentationContainer.tsx` as a dedicated feature module.

**Rejected**: Inline in SlideRoute.tsx, put in `core/components/`.

**Rationale**: SlideRoute handles URL-to-store sync and redirects — mixing composition logic there violates single responsibility. A `features/` directory establishes the convention for shell feature modules. `core/` is for domain-agnostic infrastructure.

---

## Data Flow

```
URL /:sectionId/:slideIndex
         │
         ▼
   SlideRoute.tsx ──── validates route, syncs progress store
         │
         ▼
   PresentationContainer.tsx (shell feature)
         │
         ├── useNavigation(sections) → goNext, goPrev, canGoNext, canGoPrev,
         │                              currentSectionId, currentSlideIndex
         ├── useKeyboard({ goNext, goPrev, canGoNext, canGoPrev })
         ├── useVisitedSlides() → visitedSlides (Record<string, number[]>)
         ├── sections (from domain/slides.ts)
         │
         ├── COMPUTES:
         │   ├── sidebarSections: SidebarSection[]
         │   ├── currentSection, currentSlide, sectionIndex, totalSlides
         │   ├── transitionKey: "{sectionId}-{slideIndex}"
         │   ├── showDiagram: boolean (currentSlide.type === "diagram")
         │   └── onSectionClick: (id) => navigate("/{id}/0")
         │
         └── RENDERS (all via MF imports from ui_components):

   PresentationLayout { showDiagram }
     ├── header ───→ Header { title, currentSectionIndex, totalSections }
     ├── sidebar ──→ Sidebar { sections, activeSectionId, onSectionClick }
     ├── center ───→ SlideTransition { transitionKey }
     │                 └── CenterPanel { children: slideContent }
     ├── diagram ──→ DiagramPanel { children } | null
     └── bottom ───→ BottomBar { currentSlideIndex, totalSlides }
                       └── NavArrows { onNext, onPrev, canGoNext, canGoPrev }
```

### CSS Custom Property Flow

```
shell/styles/tokens.css (loaded in <head>)
  → :root { --surface, --primary, --border-ghost, ... }
  → Available globally in DOM
  → ui_components MF remote renders inside host DOM
  → Component .css files reference var(--surface), var(--primary), etc.
  → No tokens bundled into remote — all resolved at runtime from host
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `ui-components/.../atoms/NavArrows/NavArrows.tsx` | Create | Prev/next chevron buttons with disabled states |
| `ui-components/.../atoms/NavArrows/NavArrows.css` | Create | Button styles, hover states, monospace chevrons |
| `ui-components/.../atoms/BottomBar/BottomBar.tsx` | Create | Glassmorphism footer with slide counter + children |
| `ui-components/.../atoms/BottomBar/BottomBar.css` | Create | Backdrop blur, glass surface, flex layout |
| `ui-components/.../atoms/SlideTransition/SlideTransition.tsx` | Create | CSS class toggle animation wrapper |
| `ui-components/.../atoms/SlideTransition/SlideTransition.css` | Create | @keyframes fade+translateY, will-change, reduced-motion |
| `ui-components/.../molecules/Header/Header.tsx` | Create | Section title + counter in flex layout |
| `ui-components/.../molecules/Header/Header.css` | Create | Surface-container-low bg, flex layout, typography |
| `ui-components/.../molecules/Sidebar/Sidebar.tsx` | Create | Section nav list with active tonal highlight |
| `ui-components/.../molecules/Sidebar/Sidebar.css` | Create | Surface bg, button states, progress counters |
| `ui-components/.../molecules/CenterPanel/CenterPanel.tsx` | Create | Main content slot with overflow scroll |
| `ui-components/.../molecules/CenterPanel/CenterPanel.css` | Create | Stage-level bg, padding, overflow-y |
| `ui-components/.../molecules/DiagramPanel/DiagramPanel.tsx` | Create | Aside content slot with ghost border |
| `ui-components/.../molecules/DiagramPanel/DiagramPanel.css` | Create | Panel-level bg, ghost border-left, overflow |
| `ui-components/.../organisms/PresentationLayout/PresentationLayout.tsx` | Create | CSS Grid layout with named areas, 5 slot props |
| `ui-components/.../organisms/PresentationLayout/PresentationLayout.css` | Create | Grid template (3-col + 2-col no-diagram variant) |
| `shell/src/features/presentation/PresentationContainer.tsx` | Create | Container: hooks → computed data → composition |
| `shell/src/core/router/SlideRoute.tsx` | Modify | Replace placeholder with PresentationContainer |

**Totals**: 17 new files, 1 modified file, 0 deleted files.

---

## Interfaces / Contracts

```typescript
// atoms/NavArrows
interface NavArrowsProps {
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

// atoms/BottomBar
interface BottomBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  children?: ComponentChildren;
}

// atoms/SlideTransition
interface SlideTransitionProps {
  transitionKey: string;
  children: ComponentChildren;
}

// molecules/Header
interface HeaderProps {
  title: string;
  currentSectionIndex: number;
  totalSections: number;
}

// molecules/Sidebar
interface SidebarSection {
  id: string;
  title: string;
  isActive: boolean;
  visitedCount: number;
  slideCount: number;
}
interface SidebarProps {
  sections: SidebarSection[];
  activeSectionId: string;
  onSectionClick: (sectionId: string) => void;
}

// molecules/CenterPanel
interface CenterPanelProps {
  children: ComponentChildren;
}

// molecules/DiagramPanel
interface DiagramPanelProps {
  children: ComponentChildren;
}

// organisms/PresentationLayout
interface PresentationLayoutProps {
  header: ComponentChildren;
  sidebar: ComponentChildren;
  center: ComponentChildren;
  diagram: ComponentChildren;
  bottom: ComponentChildren;
  showDiagram?: boolean;
}
```

### MF Import Contract

```typescript
// Shell import pattern (from pluginExposes auto-discovery)
import NavArrows from "ui_components/atoms/NavArrows/NavArrows";
import BottomBar from "ui_components/atoms/BottomBar/BottomBar";
import SlideTransition from "ui_components/atoms/SlideTransition/SlideTransition";
import Header from "ui_components/molecules/Header/Header";
import Sidebar from "ui_components/molecules/Sidebar/Sidebar";
import CenterPanel from "ui_components/molecules/CenterPanel/CenterPanel";
import DiagramPanel from "ui_components/molecules/DiagramPanel/DiagramPanel";
import PresentationLayout from "ui_components/organisms/PresentationLayout/PresentationLayout";
```

---

## CSS Grid Layout Specification

### Default Layout (3-column, with diagram)

```css
.presentation-layout {
  --sidebar-width: 240px;
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header    header"
    "sidebar center    diagram"
    "sidebar bottom    bottom";
  height: 100dvh;
  width: 100%;
  background: var(--surface);
  overflow: hidden;
}
```

### No-Diagram Variant (2-column)

```css
.presentation-layout--no-diagram {
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar center"
    "sidebar bottom";
}

.presentation-layout--no-diagram .presentation-layout__diagram {
  display: none;
}
```

### Grid Area Wrappers

```css
.presentation-layout__header  { grid-area: header; }
.presentation-layout__sidebar { grid-area: sidebar; }
.presentation-layout__center  { grid-area: center; min-height: 0; }
.presentation-layout__diagram { grid-area: diagram; min-height: 0; }
.presentation-layout__bottom  { grid-area: bottom; }
```

Key details:
- `min-height: 0` on center/diagram prevents grid blowout on overflow
- `height: 100dvh` uses dynamic viewport height for mobile
- `overflow: hidden` on root prevents double scrollbars (CenterPanel handles its own scroll)
- Header/bottom rows `auto` — size to content naturally
- Bottom area uses flex layout: BottomBar (counter) + NavArrows (right-aligned) composed inside the `bottom` slot by PresentationContainer

---

## SlideTransition Animation Design

### Mechanism

```
transitionKey changes → useEffect detects → set animating=false (remove class)
  → requestAnimationFrame → requestAnimationFrame → set animating=true (add class)
  → CSS animation plays: opacity 0→1, translateY(space-2)→0
```

Double `requestAnimationFrame` ensures the browser commits class removal before re-adding.

### CSS

```css
.slide-transition { will-change: opacity, transform; }
.slide-transition--entering {
  animation: slide-enter var(--duration-normal) var(--ease-out) forwards;
}
@keyframes slide-enter {
  from { opacity: 0; transform: translateY(var(--space-2)); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .slide-transition--entering { animation-duration: var(--duration-instant); }
}
```

---

## PresentationContainer Wiring Summary

PresentationContainer is the single smart component that:
1. Calls `useNavigation(sections)` for nav state
2. Calls `useKeyboard(...)` for keyboard listeners
3. Calls `useVisitedSlides()` for progress data
4. Computes derived data: `sidebarSections`, `currentSection`, `currentSlide`, `sectionIndex`, `totalSlides`, `showDiagram`, `transitionKey`
5. Creates `handleSectionClick` via `useCallback` (navigates to `/{id}/0`)
6. Renders `PresentationLayout` with 5 named slots populated by the 8 display components
7. Bottom slot composes `<BottomBar><NavArrows/></BottomBar>`
8. Center slot composes `<SlideTransition><CenterPanel>...</CenterPanel></SlideTransition>`
9. Diagram slot is conditional on `showDiagram`

SlideRoute.tsx modification is minimal: replace placeholder `<div>` with `<PresentationContainer />`. Validation and store sync logic stays unchanged.

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit (atoms) | NavArrows: click handlers, disabled states | Render + fireEvent.click, inline counter pattern (`let called = 0`) |
| Unit (atoms) | BottomBar: counter display, role, aria-live | Render + getByText, getByRole |
| Unit (atoms) | SlideTransition: class toggle on key change | Render, rerender with new key, assert class |
| Unit (molecules) | Header: title h1, counter format | Render + assert text content |
| Unit (molecules) | Sidebar: active state, click handler, progress | Render + aria-current, fireEvent.click |
| Unit (molecules) | CenterPanel: children render, semantic main | Render + getByRole("main") |
| Unit (molecules) | DiagramPanel: children render, aside role | Render + getByRole("complementary") |
| Unit (organism) | PresentationLayout: grid areas, no-diagram variant | Render + assert modifier class presence |
| Unit (shell) | usePresentationData: computed data correctness | renderHook with mock sections — isolated from MF |
| Integration | PresentationContainer composition | Deferred — requires MF mock or E2E |

**Test constraints**: rstest does NOT support `vi.mock()` or `vi.fn()` at module scope. All callbacks tested via inline counter pattern. PresentationContainer logic extracted to `usePresentationData` hook for isolated testing without MF mocks.

---

## Dependency Changes

**None.** All components use existing dependencies:
- `preact` + `preact/hooks` (already peerDependency)
- Native CSS (no additional CSS libraries)
- Existing shell hooks/stores (useNavigation, useKeyboard, useProgressStore)
- Existing domain helpers (getTotalSlides, getSectionById, etc.)

---

## Open Questions

- [x] BottomBar: resolved as container accepting `children` for NavArrows composition
- [x] MF import paths: confirmed via `pluginExposes` — pattern is `ui_components/atoms/NavArrows/NavArrows`
- [ ] PresentationContainer test strategy: recommended extracting `usePresentationData` hook — needs confirmation during implementation
