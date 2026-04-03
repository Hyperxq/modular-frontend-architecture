# Tasks: Presentation Layout Components

## Phase A: Atoms in ui-components (NavArrows, BottomBar, SlideTransition)

**Commit**: `feat(ui-components): add NavArrows, BottomBar, SlideTransition atoms`

### A.1 — Create NavArrows atom

- **Files**:
  - `packages/libraries/ui-components/lib/components/atoms/NavArrows/NavArrows.tsx`
  - `packages/libraries/ui-components/lib/components/atoms/NavArrows/NavArrows.css`
- **What**: Create `NavArrows` component with two `<button>` elements (prev `‹` / next `›`). Props: `onNext`, `onPrev`, `canGoNext`, `canGoPrev`. Disabled state uses `--text-muted`, enabled uses `--text-primary` with hover transition to `--primary`. Import co-located CSS. Buttons use `background: transparent`, `border: none`, monospace font.
- **Acceptance**:
  - Renders two `<button>` elements with `aria-label="Previous slide"` and `aria-label="Next slide"`
  - Disabled attribute set when `canGoPrev`/`canGoNext` is `false`
  - No navigation logic inside component — only calls callbacks
  - CSS uses only custom properties from tokens.css (no Tailwind)

### A.2 — Create NavArrows unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/atoms/NavArrows/NavArrows.spec.tsx`
- **What**: Test scenarios from spec: (1) click next calls `onNext` once, (2) click prev calls `onPrev` once, (3) prev button disabled when `canGoPrev=false`, (4) next button disabled when `canGoNext=false`, (5) both disabled simultaneously. Use inline counter pattern (`let called = 0`) — NO `vi.fn()`.
- **Acceptance**:
  - All 5 test cases pass
  - Uses `@rstest/core` for `describe/it/expect`, `@testing-library/preact` for `render/screen/fireEvent`
  - No `vi.mock` or `vi.fn` at module scope

### A.3 — Create BottomBar atom

- **Files**:
  - `packages/libraries/ui-components/lib/components/atoms/BottomBar/BottomBar.tsx`
  - `packages/libraries/ui-components/lib/components/atoms/BottomBar/BottomBar.css`
- **What**: Create `BottomBar` component. Props: `currentSlideIndex: number`, `totalSlides: number`, `children?: ComponentChildren`. Renders a `<footer role="contentinfo">` with glassmorphism styling (`backdrop-filter: var(--blur-glass)`, surface-container-highest at 40% opacity). Displays slide counter as `"{currentSlideIndex + 1} / {totalSlides}"` in monospace with `aria-live="polite"` and `aria-label="Slide {n} of {total}"`. Uses flex layout: counter centered/left, `children` (NavArrows) aligned right.
- **Acceptance**:
  - Counter displays 1-indexed format (e.g., `currentSlideIndex=2, totalSlides=15` → "3 / 15")
  - `<footer>` has `role="contentinfo"`
  - Counter has `aria-live="polite"`
  - `children` render alongside the counter (for NavArrows composition)
  - CSS uses tokens only — no Tailwind

### A.4 — Create BottomBar unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/atoms/BottomBar/BottomBar.spec.tsx`
- **What**: Test scenarios: (1) renders "3 / 15" for `currentSlideIndex=2, totalSlides=15`, (2) renders "1 / 10" for `currentSlideIndex=0, totalSlides=10`, (3) footer has `role="contentinfo"`, (4) counter has `aria-live="polite"`, (5) children render inside the footer.
- **Acceptance**:
  - All 5 test cases pass
  - Uses inline counter pattern, no `vi.fn`

### A.5 — Create SlideTransition atom

- **Files**:
  - `packages/libraries/ui-components/lib/components/atoms/SlideTransition/SlideTransition.tsx`
  - `packages/libraries/ui-components/lib/components/atoms/SlideTransition/SlideTransition.css`
- **What**: Create `SlideTransition` wrapper. Props: `transitionKey: string`, `children: ComponentChildren`. Uses `useEffect` + `useRef` to detect `transitionKey` changes, toggles `.slide-transition--entering` class via double `requestAnimationFrame`. CSS `@keyframes slide-enter`: opacity 0→1, translateY(space-2)→0 with `--duration-normal` and `--ease-out`. `will-change: opacity, transform`. `prefers-reduced-motion: reduce` sets `--duration-instant`. Wrapper has `aria-atomic="true"`.
- **Acceptance**:
  - Class `.slide-transition--entering` applied when `transitionKey` changes
  - Same `transitionKey` does NOT re-trigger animation
  - Children are NOT unmounted/remounted
  - Reduced motion media query present in CSS
  - `aria-atomic="true"` on wrapper div

### A.6 — Create SlideTransition unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/atoms/SlideTransition/SlideTransition.spec.tsx`
- **What**: Test scenarios: (1) renders children, (2) wrapper has `aria-atomic="true"`, (3) after rerender with new `transitionKey`, the `.slide-transition--entering` class is applied (may need to `await` rAF), (4) same key does not re-apply entering class.
- **Acceptance**:
  - All test cases pass
  - No `vi.mock`/`vi.fn`

### A.7 — Lint and verify Phase A

- **What**: Run `bun biome check --fix` on all new atom files. Run `bun nx test ui-components` to verify all atom tests pass.
- **Acceptance**: Zero lint errors, all tests green

---

## Phase B: Molecules in ui-components (Header, Sidebar, CenterPanel, DiagramPanel)

**Commit**: `feat(ui-components): add Header, Sidebar, CenterPanel, DiagramPanel molecules`

### B.1 — Create Header molecule

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/Header/Header.tsx`
  - `packages/libraries/ui-components/lib/components/molecules/Header/Header.css`
- **What**: Create `Header` component. Props: `title: string`, `currentSectionIndex: number`, `totalSections: number`. Renders `<header role="banner">` with flex layout: `<h1>` for title (sans font, xl, semibold, text-primary) and `<span>` for counter `"{currentSectionIndex + 1} / {totalSections}"` (mono font, label-md, text-secondary). Background: `var(--surface-container-low)`. Padding: `--space-4` horizontal, `--space-3` vertical. No bottom border (tonal shift only).
- **Acceptance**:
  - `<header>` has `role="banner"`
  - Title in `<h1>`, counter in `<span>` with `aria-label="Section {n} of {total}"`
  - CSS tokens only, no Tailwind

### B.2 — Create Header unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/Header/Header.spec.tsx`
- **What**: Test: (1) renders title as h1, (2) counter shows "3 / 6" for `currentSectionIndex=2, totalSections=6`, (3) counter shows "1 / 1" for `currentSectionIndex=0, totalSections=1`, (4) header has `role="banner"`, (5) counter has correct `aria-label`.
- **Acceptance**: All pass, no `vi.fn`

### B.3 — Create Sidebar molecule

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/Sidebar/Sidebar.tsx`
  - `packages/libraries/ui-components/lib/components/molecules/Sidebar/Sidebar.css`
- **What**: Create `Sidebar` component. Props: `sections: SidebarSection[]`, `activeSectionId: string`, `onSectionClick: (sectionId: string) => void`. Renders `<nav aria-label="Presentation sections">` with `<ul>/<li>/<button>` per section. Active section: `background: var(--surface-container)`, `color: var(--primary)`, `aria-current="true"`. Inactive: transparent bg, text-secondary, hover → surface-bright. Each item shows progress `"{visitedCount}/{slideCount}"` in mono label-sm text-muted with `aria-label="{visitedCount} of {slideCount} slides visited"`. Background: `var(--surface)`. Items separated by `--space-4` gap (no dividers).
- **Acceptance**:
  - `<nav>` has `aria-label="Presentation sections"`
  - Active section has `aria-current="true"`, tonal bg
  - Button click calls `onSectionClick(section.id)`
  - Progress indicator visible per section
  - CSS tokens only

### B.4 — Create Sidebar unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/Sidebar/Sidebar.spec.tsx`
- **What**: Test: (1) renders all sections as buttons, (2) active section has `aria-current="true"`, (3) inactive sections do NOT have `aria-current`, (4) clicking a section calls `onSectionClick` with correct id, (5) progress shows "3/5" format, (6) nav has correct `aria-label`.
- **Acceptance**: All pass, inline counter pattern for callback testing

### B.5 — Create CenterPanel molecule

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/CenterPanel/CenterPanel.tsx`
  - `packages/libraries/ui-components/lib/components/molecules/CenterPanel/CenterPanel.css`
- **What**: Create `CenterPanel` component. Props: `children: ComponentChildren`. Renders `<main role="main" aria-label="Slide content">` wrapping children. Background: `var(--surface-container-low)`. Padding: `--space-8`. `overflow-y: auto`. No layout constraints on children.
- **Acceptance**:
  - `<main>` with `role="main"` and `aria-label="Slide content"`
  - Children render inside main
  - CSS has overflow-y: auto

### B.6 — Create CenterPanel unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/CenterPanel/CenterPanel.spec.tsx`
- **What**: Test: (1) renders children inside `<main>`, (2) main has `role="main"`, (3) main has `aria-label="Slide content"`.
- **Acceptance**: All pass

### B.7 — Create DiagramPanel molecule

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/DiagramPanel/DiagramPanel.tsx`
  - `packages/libraries/ui-components/lib/components/molecules/DiagramPanel/DiagramPanel.css`
- **What**: Create `DiagramPanel` component. Props: `children: ComponentChildren`. Renders `<aside role="complementary" aria-label="Diagram panel">` wrapping children. Background: `var(--surface-container)`. Ghost border left: `1px solid var(--border-ghost)`. Padding: `--space-4`. `overflow: auto` both axes.
- **Acceptance**:
  - `<aside>` with correct role and aria-label
  - Children render inside aside
  - Ghost border left in CSS

### B.8 — Create DiagramPanel unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/molecules/DiagramPanel/DiagramPanel.spec.tsx`
- **What**: Test: (1) renders children inside `<aside>`, (2) aside has `role="complementary"`, (3) aside has `aria-label="Diagram panel"`, (4) renders empty aside when no children.
- **Acceptance**: All pass

### B.9 — Lint and verify Phase B

- **What**: Run `bun biome check --fix` on all new molecule files. Run `bun nx test ui-components` to verify all molecule tests pass (atoms tests still green too).
- **Acceptance**: Zero lint errors, all tests green

---

## Phase C: Organism in ui-components (PresentationLayout)

**Commit**: `feat(ui-components): add PresentationLayout CSS Grid organism`

### C.1 — Create PresentationLayout organism

- **Files**:
  - `packages/libraries/ui-components/lib/components/organisms/PresentationLayout/PresentationLayout.tsx`
  - `packages/libraries/ui-components/lib/components/organisms/PresentationLayout/PresentationLayout.css`
- **What**: Create `PresentationLayout` component. Props: `header`, `sidebar`, `center`, `diagram`, `bottom` (all `ComponentChildren`), `showDiagram?: boolean`. Renders a root `<div role="application" aria-label="Presentation">` with CSS Grid named areas. 5 inner wrapper `<div>`s with `grid-area` assignments (header, sidebar, center, diagram, bottom). When `showDiagram` is false/undefined, applies `.presentation-layout--no-diagram` modifier class that switches to 2-column grid and hides diagram wrapper. CSS custom property `--sidebar-width: 240px`. Grid: `100dvh` height, `100%` width, `overflow: hidden`. `min-height: 0` on center/diagram wrappers.
- **Acceptance**:
  - Root div has `role="application"` and `aria-label="Presentation"`
  - All 5 slot contents render in their respective grid areas
  - `showDiagram=false` triggers 2-column layout variant
  - `showDiagram=true` shows 3-column layout with diagram
  - ZERO business logic — pure layout orchestrator
  - CSS uses tokens only

### C.2 — Create PresentationLayout unit tests

- **Files**:
  - `packages/libraries/ui-components/lib/components/organisms/PresentationLayout/PresentationLayout.spec.tsx`
- **What**: Test: (1) renders all 5 slots' content, (2) root has `role="application"`, (3) root has `aria-label="Presentation"`, (4) with `showDiagram=true` the `.presentation-layout--no-diagram` class is NOT present, (5) with `showDiagram=false` the `.presentation-layout--no-diagram` class IS present, (6) slot content is accessible (e.g., pass `<span>header-test</span>` and assert it renders).
- **Acceptance**: All pass

### C.3 — Lint and verify Phase C

- **What**: Run `bun biome check --fix` on organism files. Run `bun nx test ui-components` to verify all tests pass.
- **Acceptance**: Zero lint errors, all tests green

---

## Phase D: PresentationContainer in shell + SlideRoute wiring

**Commit**: `feat(shell): add PresentationContainer and wire into SlideRoute`

### D.1 — Create features/presentation directory and PresentationContainer

- **Files**:
  - `packages/shell/src/features/presentation/PresentationContainer.tsx`
- **What**: Create `PresentationContainer` smart component. Imports all 8 display components from `ui_components` MF remote (static imports, no lazy). Calls `useNavigation(sections)` for goNext/goPrev/canGoNext/canGoPrev/currentSectionId/currentSlideIndex. Calls `useKeyboard(...)` for keyboard nav. Calls `useVisitedSlides()` for visited data. Calls `useNavigate()` for section click handler. Computes: `sidebarSections` (map sections with visited data), `currentSection` (getSectionById), `currentSlide` (getSlide), `sectionIndex` (getSectionIndex), `totalSlides` (getTotalSlides), `showDiagram` (slide.type === "diagram"), `transitionKey` ("{sectionId}-{slideIndex}"), `handleSectionClick` (navigate to /{id}/0 via `useCallback`). Renders `PresentationLayout` with all 5 named slots populated. Bottom slot: `<BottomBar currentSlideIndex totalSlides><NavArrows .../></BottomBar>`. Center slot: `<SlideTransition transitionKey><CenterPanel><p>{slide.title}</p></CenterPanel></SlideTransition>`. Diagram slot: conditional on `showDiagram`.
- **Acceptance**:
  - All 8 MF imports present
  - All hooks called correctly
  - All computed data derived correctly
  - PresentationLayout receives all 5 slots
  - `showDiagram` prop passed to PresentationLayout
  - handleSectionClick uses `useCallback` with navigate dependency
  - ZERO state in this component — all data from hooks/stores

### D.2 — Modify SlideRoute to render PresentationContainer

- **Files**:
  - `packages/shell/src/core/router/SlideRoute.tsx` (modify)
- **What**: Replace the placeholder `<div data-testid="slide-route">` block with `<PresentationContainer />`. Import PresentationContainer from `../../features/presentation/PresentationContainer`. Keep all existing validation logic and redirect intact. Only the valid-route render path changes.
- **Acceptance**:
  - Invalid route still redirects to `/intro/0`
  - Valid route renders `<PresentationContainer />`
  - Route validation and progress store sync logic unchanged
  - `data-testid="slide-route"` wrapper can be removed (it was a placeholder artifact)

### D.3 — Create usePresentationData hook for testable logic extraction

- **Files**:
  - `packages/shell/src/features/presentation/usePresentationData.ts`
- **What**: Extract the data computation logic from PresentationContainer into a custom hook `usePresentationData(sections)`. Returns: `{ sidebarSections, currentSection, currentSlide, sectionIndex, totalSlides, showDiagram, transitionKey, goNext, goPrev, canGoNext, canGoPrev, currentSlideIndex, handleSectionClick }`. PresentationContainer calls this hook and passes results to display components. This enables unit testing the business logic without MF mocks.
- **Acceptance**:
  - Hook returns all computed data
  - PresentationContainer becomes a thin composition layer
  - Hook is independently importable and testable

### D.4 — Create usePresentationData unit tests

- **Files**:
  - `packages/shell/src/features/presentation/usePresentationData.test.ts`
- **What**: Test the extracted hook using `renderHook` from `@testing-library/preact`. Provide mock sections data. Test: (1) sidebarSections computed correctly with visited counts, (2) totalSlides sums all section slides, (3) showDiagram is true when current slide type is "diagram", (4) showDiagram is false for other types, (5) transitionKey format is "{sectionId}-{slideIndex}". Note: Will need a router context wrapper for `useNavigate`/`useParams`.
- **Acceptance**: All pass, tests verify business logic in isolation

### D.5 — Lint and verify Phase D

- **What**: Run `bun biome check --fix` on all new/modified shell files. Run `bun nx test shell` to verify tests pass.
- **Acceptance**: Zero lint errors, all tests green

---

## Dependency Order

```
Phase A (atoms) → no dependencies, foundational building blocks
Phase B (molecules) → no dependency on Phase A (molecules don't import atoms)
Phase C (organism) → no dependency on A or B (receives ComponentChildren, not typed components)
Phase D (container + wiring) → depends on A+B+C existing as MF remote entries

A and B CAN run in parallel. C can run after either A or B.
D MUST be last (it imports all ui-components via MF).
```

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| Phase A | 7 | Atoms: NavArrows, BottomBar, SlideTransition + tests + lint |
| Phase B | 9 | Molecules: Header, Sidebar, CenterPanel, DiagramPanel + tests + lint |
| Phase C | 3 | Organism: PresentationLayout + tests + lint |
| Phase D | 5 | Container: PresentationContainer, usePresentationData, SlideRoute + tests + lint |
| **Total** | **24** | |

## Key Design Notes (spec/design mismatches resolved)

1. **BottomBar accepts `children`**: Design reconciled that BottomBar takes `children?: ComponentChildren` so NavArrows can be composed inside it. PresentationLayout has 5 slots (not 6) — `navArrows` is NOT a separate slot.
2. **`showDiagram` boolean prop**: PresentationLayout receives `showDiagram?: boolean` to control the CSS Grid variant. This avoids logic inside the layout component (checking if diagram is null).
3. **MF import paths**: Pattern is `ui_components/atoms/NavArrows/NavArrows` (confirmed from `pluginExposes` — strips `./lib/components/` prefix and `.tsx` extension).
4. **Static imports (no lazy)**: All 8 components render simultaneously on every slide — lazy loading adds Suspense overhead with no benefit in v1.
5. **usePresentationData extraction**: Business logic extracted to a testable hook, PresentationContainer is a thin composition shell. This avoids the MF mock problem in unit tests.

## Next Step

Ready for implementation (`sdd-apply`). Recommend executing Phase A first, then B (or A+B in parallel), then C, then D.
