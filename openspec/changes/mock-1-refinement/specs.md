# Delta Specs: mock-1-refinement

## Change Summary

Refine 6 display components + 1 layout + 1 container to visually match Mock-1.jpg. This is a prop extension + CSS refinement pass. No new components, no store changes.

---

## COMPONENT 1: Header

### MODIFIED Requirement: Header Display

The Header MUST render a centered app title and a right-aligned external link instead of a section counter.

#### Props Delta

```typescript
// REMOVE: currentSectionIndex, totalSections
// ADD: linkText, linkUrl
interface HeaderProps {
  title: string;
  linkText?: string;
  linkUrl?: string;
}
```

#### Rendering Requirements

- The `<h1>` MUST render the title in ALL CAPS, centered in the header bar.
- Title uses `--font-label` (Space Grotesk), `--text-label-md`, `--weight-semibold`, `text-transform: uppercase`, `--text-primary`.
- If `linkText` and `linkUrl` are provided, render an `<a>` with `target="_blank"` and `rel="noopener noreferrer"`, right-aligned.
- Link uses `--font-label`, `--text-label-sm`, `--text-secondary`, `text-transform: uppercase`.
- Remove old `.header__counter` span.

#### Test Scenarios
1. Renders centered title
2. Renders external link when provided
3. Omits link when props absent
4. No section counter rendered

---

## COMPONENT 2: Sidebar

### MODIFIED Requirement: Sidebar Display

The Sidebar MUST render a top branding block and display section progress as dot indicators instead of numeric fractions.

#### Props Delta

```typescript
interface SidebarProps {
  appName?: string;
  version?: string;
  sections: SidebarSection[];
  activeSectionId: string;
  onSectionClick: (sectionId: string) => void;
}
```

#### Rendering Requirements
- Branding block at top: appName in `--primary`, version in `--font-mono`/`--text-muted`
- Section titles in `--font-label`, `text-transform: uppercase`
- Progress as dot indicators: ● for visited, ○ for unvisited
- Active section: `--surface-container-high` bg + `--primary` text

#### Test Scenarios
1. Renders branding block
2. Omits branding when appName absent
3. Renders dot progress indicators
4. Active section styling
5. Section titles uppercase

---

## COMPONENT 3: NavArrows

### MODIFIED Requirement: NavArrows Positioning

NavArrows MUST render as two SEPARATE large chevron buttons for LEFT and RIGHT edge overlay positioning.

#### Props: No changes

#### Rendering Requirements
- Wrapper uses `display: contents`
- Button font size: `--text-display-lg` (3.5rem)
- Default color: `--text-muted`, hover: `--primary`
- Disabled: `opacity: 0.3`

#### Test Scenarios
1. Renders chevron characters
2. Calls callbacks on click
3. Disabled state

---

## COMPONENT 4: BottomBar

### MODIFIED Requirement: BottomBar Three-Section Layout

The BottomBar MUST render a 3-section layout: left hint, center slide counter with dots, right section counter.

#### Props Delta

```typescript
// REMOVE: children
// ADD: currentSectionIndex, totalSections
interface BottomBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  currentSectionIndex: number;
  totalSections: number;
}
```

#### Rendering Requirements
- LEFT: keyboard hint ("←→" + "TO NAVIGATE")
- CENTER: "SLIDE {N} / {M}" in `--primary` + dot indicators
- RIGHT: "SECTION {NN} / {MM}" zero-padded in `--font-mono`
- Keep glassmorphism styling

#### Test Scenarios
1. Renders navigation hint
2. Renders slide counter
3. Renders slide dot indicators
4. Renders zero-padded section counter
5. Double-digit sections not zero-padded beyond 2 digits

---

## COMPONENT 5: CenterPanel

### MODIFIED Requirement: CenterPanel Structured Content

#### Props Delta

```typescript
interface CenterPanelProps {
  sectionLabel?: string;
  slideTitle?: string;
  slideBody?: string;
  children?: ComponentChildren;
}
```

#### Rendering Requirements
- sectionLabel: `--font-label`, `--text-label-md`, `--primary`, uppercase
- slideTitle: `<h2>` in `--font-sans`, `--text-display-lg`, `--weight-bold`
- slideBody: `<p>` in `--font-sans`, `--text-body-md`, `--text-secondary`
- children render after structured content

#### Test Scenarios
1. Renders section label
2. Renders slide title as h2
3. Renders body text
4. Still renders children
5. Omits structured elements when props absent

---

## COMPONENT 6: DiagramPanel

### MODIFIED Requirement: DiagramPanel Structured Content

#### Props Delta

```typescript
interface DiagramMetadata {
  label: string;
  value: string;
}

interface DiagramPanelProps {
  panelTitle?: string;
  metadata?: DiagramMetadata[];
  children: ComponentChildren;
}
```

#### Rendering Requirements
- panelTitle at top: `--font-label`, `--text-muted`, uppercase
- children in flex-grow middle area
- metadata at bottom as label/value pairs with ghost border separator
- REMOVE border-left (No-Line Rule)

#### Test Scenarios
1. Renders panel title
2. Renders children in content area
3. Renders metadata
4. Omits metadata when not provided
5. Omits title when not provided

---

## COMPONENT 7: PresentationLayout

### MODIFIED Requirement: NavArrow Slots

#### Props Delta

```typescript
interface PresentationLayoutProps {
  header: ComponentChildren;
  sidebar: ComponentChildren;
  center: ComponentChildren;
  diagram: ComponentChildren;
  bottom: ComponentChildren;
  navPrev?: ComponentChildren;
  navNext?: ComponentChildren;
  showDiagram?: boolean;
}
```

#### Rendering Requirements
- navPrev: absolute left edge of center row
- navNext: absolute right edge of center (or diagram if showDiagram)
- Center and diagram cells gain `position: relative`
- z-index: `--z-controls`

#### Test Scenarios
1. Renders navPrev overlay
2. Renders navNext overlay
3. navNext moves to diagram when showDiagram=true
4. Omits nav wrappers when not provided
5. All existing slots still render

---

## COMPONENT 8: PresentationContainer (shell)

### MODIFIED: Rewire all props per new interfaces

- Header: title=appTitle, linkText, linkUrl (no more section counter)
- Sidebar: add appName, version
- CenterPanel: add sectionLabel, slideTitle, slideBody
- DiagramPanel: add panelTitle, metadata
- BottomBar: add currentSectionIndex, totalSections; remove children
- PresentationLayout: add navPrev/navNext slots with inline buttons
- usePresentationData: add computed fields for all new props

---

## Totals
| Component | Type | Scenarios |
|-----------|------|-----------|
| Header | Modified | 4 |
| Sidebar | Modified | 5 |
| NavArrows | Modified | 3 |
| BottomBar | Modified | 5 |
| CenterPanel | Modified | 5 |
| DiagramPanel | Modified | 5 |
| PresentationLayout | Modified | 5 |
| PresentationContainer | Modified | 0 (integration) |
| **Total** | **8 modified** | **32 scenarios** |
