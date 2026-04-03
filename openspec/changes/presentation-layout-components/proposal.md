# Proposal: Presentation Layout Components

## Intent

Build the presentation layout component system that transforms the current placeholder slide route into a full editorial-grade presentation UI following "The Architect's Terminal" design system.

## Scope

8 display components in `ui-components` (MF remote) + 1 container component in `shell` (smart layer).

### In Scope

**ui-components — Atoms:**
- **NavArrows**: Left/right chevron buttons. Props: `onPrev`, `onNext`, `canGoPrev`, `canGoNext`. Pure display.
- **BottomBar**: Glassmorphism floating bar per DESIGN.md Presentation Controls. Props: `children` (ComponentChildren).
- **SlideTransition**: CSS-only enter/exit animation wrapper. Props: `direction`, `children` (ComponentChildren).

**ui-components — Molecules:**
- **Header**: Section title + slide counter (label-md monospace) + progress indicator.
- **Sidebar**: Vertical section list with active state highlighting via tonal shift.
- **CenterPanel**: Main content area for the current slide.
- **DiagramPanel**: Secondary panel for diagram content (shown only for diagram slide types).

**ui-components — Organism:**
- **PresentationLayout**: CSS Grid layout using named areas. Receives each zone as ComponentChildren props (`header`, `sidebar`, `center`, `diagram`, `bottomBar`). Pure layout — ZERO logic.

**shell:**
- **PresentationContainer**: Container component that wires `useNavigation` + `useKeyboard` + `useProgressStore` + sections data. Imports all 8 display components from ui-components via Module Federation. Passes all data down as props. Replaces placeholder in `SlideRoute.tsx`.

### Out of Scope

- Slide content rendering / data population
- Animations beyond basic CSS transitions
- Presenter notes view
- Export / print functionality
- Touch gestures / swipe navigation

## Approach: Flat Composition with Named Slot Props

`PresentationLayout` is a pure CSS Grid organism that receives each panel as `ComponentChildren` via named props. Shell's `PresentationContainer` imports all components individually via Module Federation and composes them, passing store data as props. No logic lives in ui-components.

### Component Wiring Flow

```
shell/PresentationContainer (smart)
  ├── reads: useNavigation(), useKeyboard(), useProgressStore(), sections[]
  ├── imports via MF: all 8 ui-components
  └── renders:
      PresentationLayout
        ├── header → <Header sectionTitle={...} slideIndex={...} totalSlides={...} />
        ├── sidebar → <Sidebar sections={...} activeSectionId={...} />
        ├── center → <SlideTransition direction={...}><CenterPanel>{slideContent}</CenterPanel></SlideTransition>
        ├── diagram → <DiagramPanel>{diagramContent}</DiagramPanel>  (conditional)
        └── bottomBar → <BottomBar><NavArrows onPrev={...} onNext={...} ... /></BottomBar>
```

## CSS Strategy

- Co-located `.css` files per component in ui-components (e.g., `NavArrows.css`)
- Components consume CSS custom properties from host (`--surface`, `--primary`, etc.)
- NO Tailwind in new components — use design tokens from `tokens.css`
- Ghost borders: `outline-variant` at 15% opacity
- Tonal layering for depth (no shadows, no gradients)
- 0px border-radius everywhere
- Glassmorphism for BottomBar: `surface-container-high` + `backdrop-filter: blur(12px)`

## Affected Areas

- `packages/libraries/ui-components/lib/components/atoms/NavArrows/`
- `packages/libraries/ui-components/lib/components/atoms/BottomBar/`
- `packages/libraries/ui-components/lib/components/atoms/SlideTransition/`
- `packages/libraries/ui-components/lib/components/molecules/Header/`
- `packages/libraries/ui-components/lib/components/molecules/Sidebar/`
- `packages/libraries/ui-components/lib/components/molecules/CenterPanel/`
- `packages/libraries/ui-components/lib/components/molecules/DiagramPanel/`
- `packages/libraries/ui-components/lib/components/organisms/PresentationLayout/`
- `packages/shell/src/core/router/SlideRoute.tsx`
- `packages/shell/src/features/presentation/PresentationContainer.tsx` (new)

## Risks

1. **MF boundary for CSS custom properties**: Components in the remote need the host's CSS custom properties to be available at runtime. Mitigation: tokens.css is loaded by shell, and MF remotes render within the host DOM.
2. **CSS Grid browser support**: Named grid areas have broad support but need verification for target browsers. Mitigation: Standard CSS Grid, no subgrid.
3. **Component count in single change**: 9 components is substantial. Mitigation: Clear atomic design separation, each component is small and focused.

## Rollback Strategy

- Revert `SlideRoute.tsx` to placeholder `<div>`
- Remove new component directories from ui-components
- Remove `features/presentation/` from shell
- No database or state migrations to revert

## Success Criteria

1. `PresentationLayout` renders all zones via CSS Grid named areas
2. Navigation works via keyboard (ArrowLeft/Right) + NavArrows click
3. Progress store updates correctly on slide changes
4. All components render using DESIGN.md design tokens (0px radius, ghost borders, tonal layering)
5. ZERO business logic in ui-components — all components are pure display
6. SlideRoute renders PresentationContainer instead of placeholder

## Dependencies (all satisfied)

- ✅ `tokens.css` aligned with DESIGN.md
- ✅ `Section`/`Slide` types with `SlideType` enum in `domain/slides.ts`
- ✅ `useNavigation` + `useKeyboard` hooks
- ✅ `progress.store.ts` (Zustand + persist)
- ✅ Router with `/:sectionId/:slideIndex` route
