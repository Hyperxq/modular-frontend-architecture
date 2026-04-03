# Presentation Layout Components — Specification

## Purpose

This specification defines the component contracts, rendering requirements, CSS expectations, accessibility rules, and Module Federation boundaries for the 9-component presentation layout system. All ui-components are pure display; all business logic lives in the shell's PresentationContainer.

---

## 1. File Locations

| Component | Level | Path |
|---|---|---|
| NavArrows | Atom | `packages/libraries/ui-components/lib/components/atoms/NavArrows/NavArrows.tsx` |
| NavArrows CSS | Atom | `packages/libraries/ui-components/lib/components/atoms/NavArrows/NavArrows.css` |
| BottomBar | Atom | `packages/libraries/ui-components/lib/components/atoms/BottomBar/BottomBar.tsx` |
| BottomBar CSS | Atom | `packages/libraries/ui-components/lib/components/atoms/BottomBar/BottomBar.css` |
| SlideTransition | Atom | `packages/libraries/ui-components/lib/components/atoms/SlideTransition/SlideTransition.tsx` |
| SlideTransition CSS | Atom | `packages/libraries/ui-components/lib/components/atoms/SlideTransition/SlideTransition.css` |
| Header | Molecule | `packages/libraries/ui-components/lib/components/molecules/Header/Header.tsx` |
| Header CSS | Molecule | `packages/libraries/ui-components/lib/components/molecules/Header/Header.css` |
| Sidebar | Molecule | `packages/libraries/ui-components/lib/components/molecules/Sidebar/Sidebar.tsx` |
| Sidebar CSS | Molecule | `packages/libraries/ui-components/lib/components/molecules/Sidebar/Sidebar.css` |
| CenterPanel | Molecule | `packages/libraries/ui-components/lib/components/molecules/CenterPanel/CenterPanel.tsx` |
| CenterPanel CSS | Molecule | `packages/libraries/ui-components/lib/components/molecules/CenterPanel/CenterPanel.css` |
| DiagramPanel | Molecule | `packages/libraries/ui-components/lib/components/molecules/DiagramPanel/DiagramPanel.tsx` |
| DiagramPanel CSS | Molecule | `packages/libraries/ui-components/lib/components/molecules/DiagramPanel/DiagramPanel.css` |
| PresentationLayout | Organism | `packages/libraries/ui-components/lib/components/organisms/PresentationLayout/PresentationLayout.tsx` |
| PresentationLayout CSS | Organism | `packages/libraries/ui-components/lib/components/organisms/PresentationLayout/PresentationLayout.css` |
| PresentationContainer | Shell | `packages/shell/src/features/presentation/PresentationContainer.tsx` |

All ui-components files are auto-discovered by `fast-glob` via `pluginEntries()` — no manual registration needed.

---

## 2. Atoms (ui-components)

### 2.1 NavArrows

#### Props Interface

```typescript
import type { FunctionalComponent } from "preact";

interface NavArrowsProps {
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}
```

#### Requirements

- **REQ-NAV-01**: The component MUST render two `<button>` elements — one for previous, one for next.
- **REQ-NAV-02**: Each button MUST be visually a chevron icon (left `‹` and right `›`) using the monospace font (`--font-mono`).
- **REQ-NAV-03**: When `canGoPrev` is `false`, the previous button MUST have `disabled` attribute set and MUST use `--text-muted` color.
- **REQ-NAV-04**: When `canGoNext` is `false`, the next button MUST have `disabled` attribute set and MUST use `--text-muted` color.
- **REQ-NAV-05**: Enabled buttons MUST use `--text-primary` color and transition to `--primary` on hover with `--duration-fast` timing.
- **REQ-NAV-06**: Buttons MUST have `background: transparent`, `border: none`, `border-radius: var(--radius)` (0px), `cursor: pointer` when enabled.
- **REQ-NAV-07**: The component MUST NOT contain any navigation logic — it only calls the provided callbacks.

#### Scenarios

##### Scenario: User clicks next when navigation is available
- GIVEN NavArrows is rendered with `canGoNext=true`
- WHEN the user clicks the next button
- THEN `onNext` callback MUST be invoked exactly once

##### Scenario: User clicks prev when at first slide
- GIVEN NavArrows is rendered with `canGoPrev=false`
- WHEN the user attempts to click the previous button
- THEN the button MUST be disabled and `onPrev` MUST NOT be invoked

##### Scenario: Both directions disabled
- GIVEN NavArrows is rendered with `canGoNext=false` and `canGoPrev=false`
- WHEN the component renders
- THEN both buttons MUST have `disabled` attribute
- AND both MUST display in `--text-muted` color

#### Accessibility

- **REQ-NAV-A11Y-01**: Previous button MUST have `aria-label="Previous slide"`.
- **REQ-NAV-A11Y-02**: Next button MUST have `aria-label="Next slide"`.
- **REQ-NAV-A11Y-03**: Both buttons MUST be keyboard-focusable (native `<button>` behavior).

---

### 2.2 BottomBar

#### Props Interface

```typescript
import type { ComponentChildren, FunctionalComponent } from "preact";

interface BottomBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  children?: ComponentChildren;
}
```

#### Requirements

- **REQ-BAR-01**: The component MUST render a `<footer>` element positioned fixed at the bottom of the viewport, horizontally centered.
- **REQ-BAR-02**: The footer MUST use glassmorphism styling: `background: var(--surface-container-highest)` at 40% opacity, `backdrop-filter: var(--blur-glass)`.
- **REQ-BAR-03**: The component MUST display the slide counter as `"{currentSlideIndex + 1} / {totalSlides}"` using `--font-mono` at `--text-label-md` size in `--text-secondary` color.
- **REQ-BAR-04**: The bar MUST have `border-radius: var(--radius)` (0px), `z-index: var(--z-controls)`.
- **REQ-BAR-05**: Internal padding MUST use `--space-2` vertical and `--space-4` horizontal.
- **REQ-BAR-06**: The bar MUST NOT contain navigation logic or button elements — those are composed externally via PresentationLayout slots.

#### Scenarios

##### Scenario: Render slide counter
- GIVEN BottomBar receives `currentSlideIndex=2` and `totalSlides=15`
- WHEN the component renders
- THEN the displayed text MUST read "3 / 15"
- AND it MUST use monospace font

##### Scenario: First slide
- GIVEN BottomBar receives `currentSlideIndex=0` and `totalSlides=10`
- WHEN the component renders
- THEN the displayed text MUST read "1 / 10"

#### Accessibility

- **REQ-BAR-A11Y-01**: The `<footer>` MUST have `role="contentinfo"`.
- **REQ-BAR-A11Y-02**: The slide counter MUST have `aria-live="polite"` so screen readers announce slide changes.
- **REQ-BAR-A11Y-03**: The slide counter MUST have `aria-label` in format `"Slide {n} of {total}"`.

---

### 2.3 SlideTransition

#### Props Interface

```typescript
import type { ComponentChildren, FunctionalComponent } from "preact";

interface SlideTransitionProps {
  transitionKey: string;
  children: ComponentChildren;
}
```

#### Requirements

- **REQ-TRANS-01**: The component MUST render a `<div>` wrapper around `children`.
- **REQ-TRANS-02**: When `transitionKey` changes, the component MUST toggle a CSS class to trigger a fade + translate-Y animation. It MUST NOT unmount/remount children.
- **REQ-TRANS-03**: The enter animation MUST: start at `opacity: 0` and `translateY(var(--space-2))`, then transition to `opacity: 1` and `translateY(0)`.
- **REQ-TRANS-04**: Transition duration MUST use `--duration-normal` (200ms) with `--ease-out` easing.
- **REQ-TRANS-05**: The CSS class toggle mechanism MUST use a state boolean that flips on `transitionKey` change, triggering a re-render that applies/removes the animation class.
- **REQ-TRANS-06**: The wrapper div MUST have `will-change: opacity, transform` for GPU compositing.

#### Scenarios

##### Scenario: Slide changes trigger animation
- GIVEN SlideTransition is rendered with `transitionKey="intro-0"`
- WHEN `transitionKey` changes to `"intro-1"`
- THEN the wrapper MUST apply the enter animation class
- AND children MUST NOT be unmounted and remounted

##### Scenario: Same key does not re-animate
- GIVEN SlideTransition is rendered with `transitionKey="intro-0"`
- WHEN a re-render occurs with the same `transitionKey="intro-0"`
- THEN no animation class toggle MUST occur

#### Accessibility

- **REQ-TRANS-A11Y-01**: The wrapper MUST have `aria-atomic="true"` so assistive tech treats it as a whole unit.
- **REQ-TRANS-A11Y-02**: Users with `prefers-reduced-motion: reduce` MUST see `--duration-instant` (0ms) instead.

---

## 3. Molecules (ui-components)

### 3.1 Header

#### Props Interface

```typescript
import type { FunctionalComponent } from "preact";

interface HeaderProps {
  title: string;
  currentSectionIndex: number;
  totalSections: number;
}
```

#### Requirements

- **REQ-HDR-01**: The component MUST render a `<header>` element.
- **REQ-HDR-02**: The section title MUST be rendered as an `<h1>` using `--font-sans` at `--text-xl` size, `--weight-semibold`, in `--text-primary` color.
- **REQ-HDR-03**: The section counter MUST be rendered as a `<span>` displaying `"{currentSectionIndex + 1} / {totalSections}"` in `--font-mono` at `--text-label-md` size, `--text-secondary` color.
- **REQ-HDR-04**: The header MUST have `background: var(--surface-container-low)`, `z-index: var(--z-header)`.
- **REQ-HDR-05**: Padding MUST use `--space-4` horizontal and `--space-3` vertical.
- **REQ-HDR-06**: Title and counter MUST be laid out with `display: flex`, `justify-content: space-between`, `align-items: center`.
- **REQ-HDR-07**: No bottom border — separation from content below MUST be achieved through tonal shift only (surface-container-low vs surface).

#### Scenarios

##### Scenario: Render header with section info
- GIVEN Header receives `title="Clean Architecture"`, `currentSectionIndex=2`, `totalSections=6`
- WHEN the component renders
- THEN the title "Clean Architecture" MUST appear as an h1
- AND the counter "3 / 6" MUST appear in monospace

##### Scenario: First section
- GIVEN Header receives `currentSectionIndex=0`, `totalSections=1`
- WHEN the component renders
- THEN the counter MUST display "1 / 1"

#### Accessibility

- **REQ-HDR-A11Y-01**: The `<header>` MUST have `role="banner"`.
- **REQ-HDR-A11Y-02**: The section counter MUST have `aria-label="Section {n} of {total}"`.

---

### 3.2 Sidebar

#### Props Interface

```typescript
import type { FunctionalComponent } from "preact";

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
```

#### Requirements

- **REQ-SIDE-01**: The component MUST render a `<nav>` element containing an `<ul>` with one `<li>` per section.
- **REQ-SIDE-02**: Each section item MUST be a `<button>` inside the `<li>`, displaying the section `title`.
- **REQ-SIDE-03**: The active section (where `id === activeSectionId`) MUST have `background: var(--surface-container)` and `color: var(--primary)` — tonal shift for active state, NOT a border or underline.
- **REQ-SIDE-04**: Inactive sections MUST have `background: transparent` and `color: var(--text-secondary)`.
- **REQ-SIDE-05**: On hover, inactive sections MUST shift to `background: var(--surface-bright)` with `--duration-fast` transition.
- **REQ-SIDE-06**: Each section item MUST display a progress indicator showing `"{visitedCount}/{slideCount}"` in `--font-mono`, `--text-label-sm`, `--text-muted` color.
- **REQ-SIDE-07**: The sidebar MUST have `background: var(--surface)`, `z-index: var(--z-sidebar)`.
- **REQ-SIDE-08**: Padding MUST use `--space-4` top and bottom, `--space-3` left and right.
- **REQ-SIDE-09**: Section items MUST be separated by `--space-4` gap (no visible dividers — DESIGN.md "Forbid Dividers" rule).
- **REQ-SIDE-10**: Clicking a section button MUST invoke `onSectionClick(section.id)`.

#### Scenarios

##### Scenario: Render sections with active highlight
- GIVEN Sidebar receives 3 sections with `activeSectionId="arch"`
- WHEN the component renders
- THEN the section with `id="arch"` MUST have the active tonal styling
- AND the other sections MUST have inactive styling

##### Scenario: Click a section
- GIVEN Sidebar is rendered with `onSectionClick` callback
- WHEN the user clicks on a section button
- THEN `onSectionClick` MUST be invoked with that section's `id`

##### Scenario: Progress display
- GIVEN a section has `visitedCount=3` and `slideCount=5`
- WHEN the component renders
- THEN the progress indicator MUST show "3/5" in monospace

#### Accessibility

- **REQ-SIDE-A11Y-01**: The `<nav>` MUST have `aria-label="Presentation sections"`.
- **REQ-SIDE-A11Y-02**: Each section button MUST have `aria-current="true"` when active, absent otherwise.
- **REQ-SIDE-A11Y-03**: Each progress indicator MUST have `aria-label="{visitedCount} of {slideCount} slides visited"`.

---

### 3.3 CenterPanel

#### Props Interface

```typescript
import type { ComponentChildren, FunctionalComponent } from "preact";

interface CenterPanelProps {
  children: ComponentChildren;
}
```

#### Requirements

- **REQ-CENTER-01**: The component MUST render a `<main>` element wrapping `children`.
- **REQ-CENTER-02**: Background MUST be `var(--surface-container-low)` — the "Stage" level per DESIGN.md.
- **REQ-CENTER-03**: Padding MUST use `--space-8` to provide the "Luxury of Space" (40% unoccupied area rule).
- **REQ-CENTER-04**: The panel MUST use `overflow-y: auto` for content that exceeds viewport height.
- **REQ-CENTER-05**: The component MUST NOT impose any layout constraints on children — it is a pure content slot.

#### Scenarios

##### Scenario: Render children
- GIVEN CenterPanel receives children elements
- WHEN the component renders
- THEN the children MUST appear inside the `<main>` element
- AND the main MUST have the Stage background color

##### Scenario: Overflow content
- GIVEN CenterPanel children exceed the panel height
- WHEN the component renders
- THEN a vertical scrollbar MUST appear (overflow-y: auto)

#### Accessibility

- **REQ-CENTER-A11Y-01**: The `<main>` MUST have `role="main"`.
- **REQ-CENTER-A11Y-02**: The `<main>` MUST have `aria-label="Slide content"`.

---

### 3.4 DiagramPanel

#### Props Interface

```typescript
import type { ComponentChildren, FunctionalComponent } from "preact";

interface DiagramPanelProps {
  children: ComponentChildren;
}
```

#### Requirements

- **REQ-DIAG-01**: The component MUST render an `<aside>` element wrapping `children`.
- **REQ-DIAG-02**: Background MUST be `var(--surface-container)` — one level above the Stage to create tonal separation.
- **REQ-DIAG-03**: A ghost border MUST separate it from CenterPanel: `border-left: 1px solid var(--border-ghost)`.
- **REQ-DIAG-04**: Padding MUST use `--space-4`.
- **REQ-DIAG-05**: The panel MUST use `overflow: auto` for both axes (diagrams may be wide).
- **REQ-DIAG-06**: The component MUST NOT impose layout constraints on children.

#### Scenarios

##### Scenario: Render diagram content
- GIVEN DiagramPanel receives an SVG diagram as children
- WHEN the component renders
- THEN the children MUST appear inside the `<aside>`
- AND the aside MUST have the Panel-level background

##### Scenario: Empty state (no diagram)
- GIVEN DiagramPanel receives no children (null/undefined)
- WHEN the component renders
- THEN the `<aside>` MUST still render but MAY be visually empty

#### Accessibility

- **REQ-DIAG-A11Y-01**: The `<aside>` MUST have `role="complementary"`.
- **REQ-DIAG-A11Y-02**: The `<aside>` MUST have `aria-label="Diagram panel"`.

---

## 4. Organism (ui-components)

### 4.1 PresentationLayout

#### Props Interface

```typescript
import type { ComponentChildren, FunctionalComponent } from "preact";

interface PresentationLayoutProps {
  header: ComponentChildren;
  sidebar: ComponentChildren;
  center: ComponentChildren;
  diagram: ComponentChildren;
  bottom: ComponentChildren;
  showDiagram?: boolean;
}
```

#### Requirements

- **REQ-LAYOUT-01**: The component MUST render a `<div>` with CSS Grid using named template areas.
- **REQ-LAYOUT-02**: The grid template MUST define these areas:

```css
.presentation-layout {
  display: grid;
  grid-template-columns: 240px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header    header"
    "sidebar center    diagram"
    "sidebar bottom    bottom";
  height: 100vh;
  width: 100vw;
  background: var(--surface);
}
```

- **REQ-LAYOUT-03**: When `showDiagram` is false/undefined, center MUST span the full content width. This MUST be handled via a CSS modifier class (`.presentation-layout--no-diagram`) that changes the grid template to:

```css
.presentation-layout--no-diagram {
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar center"
    "sidebar bottom";
}
```

- **REQ-LAYOUT-04**: Each named slot MUST be rendered in a `<div>` with the corresponding `grid-area` CSS property.
- **REQ-LAYOUT-05**: The layout MUST NOT contain any business logic, state, or event handlers — it is a pure CSS Grid orchestrator.
- **REQ-LAYOUT-06**: The sidebar column width (240px) MUST be a CSS custom property `--sidebar-width` for future configurability.
- **REQ-LAYOUT-07**: Background MUST be `var(--surface)` — Level 0 (base void).

#### Scenarios

##### Scenario: Full layout with all slots
- GIVEN PresentationLayout receives all slot props with content
- WHEN the component renders
- THEN a CSS Grid with 3 columns and 3 rows MUST be rendered
- AND each slot MUST appear in its designated grid area

##### Scenario: Layout without diagram
- GIVEN PresentationLayout receives `showDiagram={false}`
- WHEN the component renders
- THEN the grid MUST collapse to 2 columns
- AND center content MUST span the full content width

##### Scenario: No business logic
- GIVEN PresentationLayout is rendered
- WHEN any user interaction occurs within a slot
- THEN the layout component itself MUST NOT handle or intercept any events

#### Accessibility

- **REQ-LAYOUT-A11Y-01**: The root `<div>` MUST have `role="application"` and `aria-label="Presentation"`.
- **REQ-LAYOUT-A11Y-02**: Grid area wrapper divs SHOULD NOT introduce extra ARIA roles — the semantic elements inside each slot handle that.

---

## 5. Container (shell)

### 5.1 PresentationContainer

#### Location

`packages/shell/src/features/presentation/PresentationContainer.tsx`

#### Requirements

- **REQ-CONT-01**: The component MUST import display components from the `ui_components` Module Federation remote.
- **REQ-CONT-02**: The component MUST call `useNavigation()` to obtain `goNext`, `goPrev`, `canGoNext`, `canGoPrev`, `currentSectionId`, `currentSlideIndex`.
- **REQ-CONT-03**: The component MUST call `useKeyboard({ goNext, goPrev, canGoNext, canGoPrev })` to enable keyboard navigation.
- **REQ-CONT-04**: The component MUST read from `useProgressStore` (via `useVisitedSlides`) to compute visited counts per section.
- **REQ-CONT-05**: The component MUST read the `sections` array from `core/domain/slides.ts` and compute the `SidebarSection[]` shape for the Sidebar component:

```typescript
// Derived data — computed in PresentationContainer
const sidebarSections: SidebarSection[] = sections.map((section) => ({
  id: section.id,
  title: section.title,
  isActive: section.id === currentSectionId,
  visitedCount: (visitedSlides[section.id] ?? []).length,
  slideCount: section.slides.length,
}));
```

- **REQ-CONT-06**: The `onSectionClick` handler MUST navigate to the clicked section's first slide (`/{sectionId}/0`).
- **REQ-CONT-07**: The component MUST compute `transitionKey` as `"{currentSectionId}-{currentSlideIndex}"` for SlideTransition.
- **REQ-CONT-08**: The component MUST compute `totalSlides` using `getTotalSlides(sections)`.
- **REQ-CONT-09**: The component MUST determine whether to show the diagram panel based on the current slide's `type` field — show only when `slide.type === "diagram"`.
- **REQ-CONT-10**: The component MUST compose all display components into PresentationLayout's named slots.

#### Scenarios

##### Scenario: Full composition
- GIVEN sections data exists and the route resolves to a valid slide
- WHEN PresentationContainer renders
- THEN it MUST render PresentationLayout with all slots populated
- AND NavArrows MUST receive navigation callbacks from useNavigation
- AND Header MUST receive the current section title and indices
- AND Sidebar MUST receive computed SidebarSection array

##### Scenario: Keyboard navigation
- GIVEN PresentationContainer is rendered
- WHEN the user presses ArrowRight
- THEN useKeyboard MUST trigger goNext (handled by the hook, not the container)

##### Scenario: Section click navigation
- GIVEN PresentationContainer is rendered with multiple sections
- WHEN `onSectionClick("architecture")` is invoked
- THEN the router MUST navigate to `/architecture/0`

##### Scenario: Diagram slide type
- GIVEN the current slide has `type: "diagram"`
- WHEN PresentationContainer renders
- THEN the diagram slot MUST receive DiagramPanel with content
- AND PresentationLayout MUST use the 3-column grid

##### Scenario: Non-diagram slide type
- GIVEN the current slide has `type: "concept"`
- WHEN PresentationContainer renders
- THEN the diagram slot MUST be null
- AND PresentationLayout MUST use the 2-column grid (no-diagram variant)

---

## 6. Module Federation Boundary

### Import Pattern

Shell imports display components from the `ui_components` MF remote. The import path convention follows the auto-discovered entry pattern:

```typescript
// In PresentationContainer.tsx (shell)
import NavArrows from "ui_components/atoms/NavArrows/NavArrows";
import BottomBar from "ui_components/atoms/BottomBar/BottomBar";
import SlideTransition from "ui_components/atoms/SlideTransition/SlideTransition";
import Header from "ui_components/molecules/Header/Header";
import Sidebar from "ui_components/molecules/Sidebar/Sidebar";
import CenterPanel from "ui_components/molecules/CenterPanel/CenterPanel";
import DiagramPanel from "ui_components/molecules/DiagramPanel/DiagramPanel";
import PresentationLayout from "ui_components/organisms/PresentationLayout/PresentationLayout";
```

### Rules

- **REQ-MF-01**: The MF remote name is `ui_components` (underscore — JS identifier).
- **REQ-MF-02**: Import paths follow the pattern `ui_components/{level}/{ComponentName}/{ComponentName}` matching the auto-discovered entry keys from `pluginEntries()`.
- **REQ-MF-03**: Preact MUST remain `singleton: true` in both host and remote MF shared config.
- **REQ-MF-04**: All dependencies used by ui-components MUST be declared as `peerDependencies` — nothing is bundled into the remote output.
- **REQ-MF-05**: CSS custom properties used by ui-components are provided by the host's `tokens.css` — no token files are bundled into the remote.

---

## 7. CSS Token Usage Summary

| Component | Background | Text | Border | Font | Z-index |
|---|---|---|---|---|---|
| NavArrows | transparent | --text-primary / --text-muted | none | --font-mono | — |
| BottomBar | --surface-container-highest @40% | --text-secondary | none | --font-mono | --z-controls |
| SlideTransition | transparent | — | none | — | — |
| Header | --surface-container-low | --text-primary, --text-secondary | none | --font-sans, --font-mono | --z-header |
| Sidebar | --surface | --text-secondary, --primary (active) | none | --font-sans, --font-mono | --z-sidebar |
| CenterPanel | --surface-container-low | — | none | — | — |
| DiagramPanel | --surface-container | — | --border-ghost (left) | — | — |
| PresentationLayout | --surface | — | none | — | — |

---

## Specs Summary

**Change**: presentation-layout-components

### Specs Written
| Domain | Type | Requirements | Scenarios |
|--------|------|-------------|-----------|
| atoms/NavArrows | New | 7 functional + 3 a11y | 3 |
| atoms/BottomBar | New | 6 functional + 3 a11y | 2 |
| atoms/SlideTransition | New | 6 functional + 2 a11y | 2 |
| molecules/Header | New | 7 functional + 2 a11y | 2 |
| molecules/Sidebar | New | 10 functional + 3 a11y | 3 |
| molecules/CenterPanel | New | 5 functional + 2 a11y | 2 |
| molecules/DiagramPanel | New | 6 functional + 2 a11y | 2 |
| organisms/PresentationLayout | New | 7 functional + 2 a11y | 3 |
| shell/PresentationContainer | New | 10 functional | 5 |
| Module Federation | New | 5 boundary rules | — |

**Totals**: 70 functional requirements, 19 accessibility requirements, 24 scenarios

### Coverage
- Happy paths: Covered (all components have primary rendering scenarios)
- Edge cases: Covered (disabled states, empty diagram, overflow, reduced motion)
- Error states: Partial (invalid route handled by existing SlideRoute redirect — not in scope of these display components)

### Next Step
Ready for design (sdd-design) or tasks (sdd-tasks).
