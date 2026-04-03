# Proposal: Microfrontend Architecture Presentation Website — Phase 1 Foundation

## Summary
Build the navigation engine for a read-only slide deck that explains
microfrontend architecture. This proposal covers the complete foundation:
routing, layout, keyboard navigation, progress tracking, and design system.
No real content is included — sections array starts empty.

## Problem
We need a presentation website that explains microfrontend architecture
to developers. The site must feel like a professional developer tool,
not a generic slide deck. Navigation must be instant, bookmarkable,
and keyboard-driven. Progress must persist across sessions.

## Proposed Change
Implement Phase 1: the engine that powers the presentation.
A developer should be able to drop any content into slides.ts
and have it immediately work — correct URL, correct navigation,
correct progress tracking, correct rendering — without touching
any other file.

## Affected Specs
- routing — new
- navigation — new
- progress-tracking — new
- layout — new
- data-model — new
- design-system — new

## Out of Scope
- Real slide content (titles, body, insight, pills)
- Real SVG diagrams
- Mobile layout
- Any feature not listed in the acceptance criteria below

## Acceptance Criteria
- [ ] / redirects to /overview/1
- [ ] /:sectionId redirects to /:sectionId/1
- [ ] Invalid sectionId redirects to /overview/1
- [ ] URL updates on every slide change
- [ ] Browser back/forward navigate correctly
- [ ] Refresh restores exact slide
- [ ] ArrowRight executes Next logic
- [ ] ArrowLeft executes Previous logic
- [ ] Next arrow disabled on last slide of last section
- [ ] Prev arrow disabled on first slide of first section
- [ ] Clicking sidebar section navigates to /:sectionId/1
- [ ] Clicking sidebar dot navigates to /:sectionId/:dotIndex
- [ ] Clicking bottom bar dot navigates to that slide
- [ ] Visited slides persist after page refresh
- [ ] Completed sections render in var(--tertiary) in sidebar
- [ ] Empty sections array renders blank state without crashing
- [ ] No 1px borders between layout regions
- [ ] No rounded corners anywhere
- [ ] No hardcoded hex values in component CSS
- [ ] All 9 placeholder diagrams render without errors
- [ ] Layout works at 1440x900 minimum

## Risks
- preact-router history mode may require server config for direct URL access
  → Mitigation: use hash mode in development, document server config needed for deploy
- Zustand persist may have hydration timing issues on first render
  → Mitigation: handle loading state before rendering navigation dots