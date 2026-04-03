# Proposal: Mock-1 Visual Refinement

## Intent

Refine existing presentation layout components to visually match Mock-1.jpg design mockup.

## Scope

Modify 6 display components + 1 layout + 1 container. No new components, no store changes. This is a prop extension + CSS refinement pass.

### In Scope
- **Header**: Remove section counter, add centered app title + right-aligned external link
- **Sidebar**: Add branding block (app name + version), change progress to dot indicators
- **NavArrows**: Reposition as large overlay chevrons on center/diagram edges
- **BottomBar**: Remove children slot, add 3-zone layout (hint / slide counter+dots / section counter)
- **CenterPanel**: Add structured content props (sectionLabel, slideTitle, slideBody)
- **DiagramPanel**: Add panel title + metadata section, remove border-left
- **PresentationLayout**: Add navPrev/navNext overlay slots
- **PresentationContainer**: Rewire all props per new interfaces

### Out of Scope
- New components
- Store changes
- Route changes
- Slide content population

## Approach

Purely additive prop extensions on existing components + CSS refinement using existing design tokens. Key structural change: NavArrows relocates from inside BottomBar to overlay slots on PresentationLayout.

## Risks
- Breaking change on BottomBar (children removed) — only consumer is PresentationContainer, updated in same change
- NavArrows positioning with absolute overlays may have z-index issues

## Status: IN PROGRESS — specs and design complete, tasks pending
