# Exploration: Presentation Layout Components

## Codebase Analysis

### Shell (Smart Layer) - What Exists
- `core/domain/slides.ts`: Section/Slide types with SlideType (concept|diagram|code|interactive), empty sections array, helpers (getTotalSlides, getSectionById, getSlide, getSectionIndex, isFirstSlide, isLastSlide)
- `core/hooks/useNavigation.ts`: Returns goNext, goPrev, canGoNext, canGoPrev, currentSectionId, currentSlideIndex. Uses react-router navigate + URL params.
- `core/hooks/useKeyboard.ts`: ArrowRight/Left global listener, accepts NavigationResult picks
- `core/store/progress.store.ts`: Zustand+persist with currentSectionId, currentSlideIndex, visitedSlides. Actions: navigate, markVisited, resetProgress. Selectors: useCurrentPosition, useVisitedSlides.
- `core/store/app.store.ts`: theme (dark default), locale, isInitialized
- `core/router/SlideRoute.tsx`: Syncs URL params to progress store. Currently renders placeholder div.
- `styles/tokens.css`: Full DESIGN.md tokens - surfaces, colors, spacing (0.35rem power), typography, ghost borders, glassmorphism vars

### UI-Components (MF Remote) - What Exists
- atoms/Button and atoms/Input exist (Tailwind inline classes)
- Auto-discovery via fast-glob in pluginEntries.ts
- LEVEL_MODE env var for atomic levels
- No co-located CSS files yet
- No molecules or organisms folders yet

### Architecture Rules
- shell owns ALL business logic, Zustand stores, routing
- ui-components is display only, receives everything via props
- All ui-components deps are peerDependencies
- Preact singleton in MF config
- FunctionalComponent from 'preact', hooks from 'preact/hooks'

## Recommended Approach: Flat Composition with Named Slot Props
PresentationLayout is a pure CSS Grid organism receiving each zone as ComponentChildren props. Shell PresentationContainer imports all 8 components individually via MF, wires hooks/stores, passes data as props.

## Component Inventory
- Atoms: NavArrows, BottomBar, SlideTransition
- Molecules: Header, Sidebar, CenterPanel, DiagramPanel
- Organism: PresentationLayout
- Container (shell): PresentationContainer

## CSS Strategy
- Co-located .css per component consuming host CSS custom properties
- NO Tailwind for new components
- Ghost borders, tonal layering, 0px radius per DESIGN.md
