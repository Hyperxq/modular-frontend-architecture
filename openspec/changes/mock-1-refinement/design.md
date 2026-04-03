# Design: Mock-1 Visual Refinement

## Technical Approach

Refine 6 display components (Header, Sidebar, NavArrows, BottomBar, CenterPanel, DiagramPanel) + 1 layout (PresentationLayout) + 1 container (PresentationContainer) to match Mock-1.jpg. Purely additive: extend prop interfaces, update CSS to consume existing design tokens, rewire the container. No new components, no store changes, no new routes.

Key structural change: NavArrows relocates from inside BottomBar (as children) to overlay slots on PresentationLayout, positioned absolutely over the center/diagram grid cells.

---

## Architecture Decisions

### NavArrows: Two Separate Slots via `display: contents`

**Choice**: Two separate `navPrev`/`navNext` `ComponentChildren` slots on PresentationLayout. PresentationContainer renders inline prev/next buttons directly (no NavArrows component). NavArrows component updated with `display: contents` for backward compat but NOT used in presentation flow.

**Rejected**: (1) Split into NavPrev/NavNext atoms — doubles component count and MF entries for no benefit. (2) CSS `:nth-child` hack on a single nav slot — fragile and hard to test.

### BottomBar Removes `children` Prop

**Choice**: Remove `children`. The 3-zone layout (hint / slide counter+dots / section counter) is fully self-contained. NavArrows relocated to layout overlay slots. Only consumer (PresentationContainer) updated in same change.

### CenterPanel: Structured Props + Children

**Choice**: Add `sectionLabel`, `slideTitle`, `slideBody` optional props. Render structured content ABOVE children. Keep `children` for forward compat (future code/interactive slides).

### Dot Indicators as Unicode with `role="img"`

**Choice**: ● (U+25CF) for visited/current, ○ (U+25CB) for unvisited inside `<span role="img" aria-label="...">`. Trivially testable, accessible, satisfies Biome's `noAriaLabelWithoutRole`.

**Rejected**: SVG circles (overkill), CSS-only `::before` (harder to test, less accessible).

### Static Strings Not Config

**Choice**: Hard-code `appTitle`, `githubLinkText`, `githubLinkUrl`, `sidebarAppName`, `sidebarVersion` as constants in `usePresentationData`. YAGNI — no dynamic behavior justifies store/config ceremony.

---

## Data Flow

```
usePresentationData (shell hook)
│  reads from: useNavigation(), useVisitedSlides(), slides domain
│  computes:   appTitle, githubLink*, sidebarApp*, sectionLabel,
│              slideTitle, slideBody, diagramTitle, diagramMetadata
│
└──▶ PresentationContainer (shell)
     ├── PresentationLayout (organism, MF remote)
     │   ├── header ──▶ Header { title, linkText?, linkUrl? }
     │   ├── sidebar ──▶ Sidebar { appName?, version?, sections, activeSectionId, onSectionClick }
     │   ├── center ──▶ SlideTransition ▶ CenterPanel { sectionLabel?, slideTitle?, slideBody?, children? }
     │   ├── diagram ──▶ DiagramPanel { panelTitle?, metadata?, children }
     │   ├── bottom ──▶ BottomBar { currentSlideIndex, totalSlides, currentSectionIndex, totalSections }
     │   ├── navPrev ──▶ <button aria-label="Previous slide">‹</button>
     │   └── navNext ──▶ <button aria-label="Next slide">›</button>
     │
     │   Layout:
     │   ┌─────────────────────────────────────────────────┐
     │   │ sidebar │          header                       │
     │   │  brand  │  ‹ (abs)   center    diagram  › (abs)│
     │   │  nav    │            panel      panel           │
     │   │         │          bottom bar                   │
     │   └─────────────────────────────────────────────────┘
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `ui-components/.../Header/Header.types.ts` | **Create** | Extract HeaderProps |
| `ui-components/.../NavArrows/NavArrows.types.ts` | **Create** | Extract NavArrowsProps |
| `ui-components/.../BottomBar/BottomBar.types.ts` | **Create** | Extract BottomBarProps |
| `ui-components/.../CenterPanel/CenterPanel.types.ts` | **Create** | Extract CenterPanelProps |
| `ui-components/.../DiagramPanel/DiagramPanel.types.ts` | **Create** | Extract DiagramPanelProps, DiagramMetadata |
| `ui-components/.../PresentationLayout/PresentationLayout.types.ts` | **Create** | Extract PresentationLayoutProps |
| `ui-components/.../Header/Header.tsx` | Modify | Remove counter, add centered title + link |
| `ui-components/.../Header/Header.css` | Modify | Centered layout, `.header__link` absolute |
| `ui-components/.../Sidebar/Sidebar.tsx` | Modify | Add brand block, dot indicators |
| `ui-components/.../Sidebar/Sidebar.types.ts` | Modify | Add appName, version |
| `ui-components/.../Sidebar/Sidebar.css` | Modify | Brand styles, dot styles, uppercase, active bg |
| `ui-components/.../NavArrows/NavArrows.tsx` | Modify | `display: contents`, large buttons |
| `ui-components/.../NavArrows/NavArrows.css` | Modify | Contents wrapper, large font, hover color |
| `ui-components/.../BottomBar/BottomBar.tsx` | Modify | 3-zone layout replacing children |
| `ui-components/.../BottomBar/BottomBar.css` | Modify | hint/center/section zones, keep glassmorphism |
| `ui-components/.../CenterPanel/CenterPanel.tsx` | Modify | Structured content above children |
| `ui-components/.../CenterPanel/CenterPanel.css` | Modify | Label, title, body styles |
| `ui-components/.../DiagramPanel/DiagramPanel.tsx` | Modify | Flex column, title, metadata, no border-left |
| `ui-components/.../DiagramPanel/DiagramPanel.css` | Modify | Flex column, metadata with ghost border |
| `ui-components/.../PresentationLayout/PresentationLayout.tsx` | Modify | navPrev/navNext absolute wrappers |
| `ui-components/.../PresentationLayout/PresentationLayout.css` | Modify | Relative cells, nav overlay classes |
| `shell/.../PresentationContainer.tsx` | Modify | Rewire all props, inline nav buttons |
| `shell/.../usePresentationData.ts` | Modify | Add all computed fields |

**Totals**: 6 new (.types.ts), 16 modified, 0 deleted.

---

## Updated Interfaces

```typescript
// Header.types.ts
interface HeaderProps {
  title: string;
  linkText?: string;
  linkUrl?: string;
}

// Sidebar.types.ts (modified)
interface SidebarProps {
  appName?: string;
  version?: string;
  sections: SidebarSection[];
  activeSectionId: string;
  onSectionClick: (sectionId: string) => void;
}

// NavArrows.types.ts
interface NavArrowsProps {
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

// BottomBar.types.ts
interface BottomBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  currentSectionIndex: number;
  totalSections: number;
}

// CenterPanel.types.ts
interface CenterPanelProps {
  sectionLabel?: string;
  slideTitle?: string;
  slideBody?: string;
  children?: ComponentChildren;
}

// DiagramPanel.types.ts
interface DiagramMetadata { label: string; value: string; }
interface DiagramPanelProps {
  panelTitle?: string;
  metadata?: DiagramMetadata[];
  children: ComponentChildren;
}

// PresentationLayout.types.ts
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

// usePresentationData return additions
interface PresentationDataExtensions {
  appTitle: string;
  githubLinkText: string;
  githubLinkUrl: string;
  sidebarAppName: string;
  sidebarVersion: string;
  sectionLabel: string;
  slideTitle: string;
  slideBody: string;
  diagramTitle: string;
  diagramMetadata: DiagramMetadata[];
}
```

---

## Component Design Summary

### Header
- **HTML**: `<header>` → `<h1.header__title>` + `[<a.header__link>]`. Remove `.header__counter`.
- **CSS**: `justify-content: center; position: relative;` on header. Title: `--font-label`, `--text-label-md`, uppercase. Link: absolute right, `--text-label-sm`, `--text-secondary`.

### Sidebar
- **HTML**: Add `<div.sidebar__brand>` before `<ul>`. Progress `<span.sidebar__dots role="img">` with `●`/`○`.
- **CSS**: Brand block with `--primary` name + `--font-mono` version. Titles: `--font-label`, uppercase. Active: `--surface-container-high` bg.

### NavArrows
- **HTML**: No change. **CSS**: Wrapper `display: contents`. Buttons: `--text-display-lg` (3.5rem), `--text-muted` default, `--primary` hover. Disabled: `opacity: 0.3`.

### BottomBar
- **HTML**: `<footer>` → `.hint` + `.center` (slide label + dots) + `.section`. Remove `.actions`/children.
- **CSS**: Keep glassmorphism. Hint: `--font-label`, `--text-muted`. Slide label: `--primary`. Section: `--font-mono`, zero-padded.

### CenterPanel
- **HTML**: Add `[<span.label>]` + `[<h2.title>]` + `[<p.body>]` before `{children}`.
- **CSS**: Label: `--font-label`, `--primary`, uppercase. Title: `--text-display-lg`, `--weight-bold`. Body: `--text-body-md`, `--text-secondary`.

### DiagramPanel
- **HTML**: Flex column → `[.title]` + `.content{children}` + `[.metadata]`. **Remove** `border-left`.
- **CSS**: Title: `--font-label`, `--text-muted`. Metadata: ghost border separator, `--font-mono` values.

### PresentationLayout
- **HTML**: Add absolute `.nav-prev`/`.nav-next` wrappers inside center/diagram cells.
- **CSS**: Center + diagram cells: `position: relative`. Nav wrappers: absolute, `top: 50%; transform: translateY(-50%); z-index: var(--z-controls)`. navNext placement conditional on `showDiagram`.

---

## CSS Token Usage Map

| Element | Tokens |
|---------|--------|
| ALL CAPS labels | `--font-label` + `text-transform: uppercase` |
| Active items | `--primary` (#6dddff) |
| Muted info | `--text-muted` (#6b6e80) |
| Secondary text | `--text-secondary` (#a0a3b5) |
| Display title | `--font-sans` + `--text-display-lg` + `--tracking-display` + `--weight-bold` |
| Monospace numbers | `--font-mono` (JetBrains Mono) |
| Surface nesting | `--surface` → `--surface-container-low` → `--surface-container` → `--surface-container-high` |
| Glassmorphism | `rgba(35,38,46,0.4)` + `--blur-glass` |
| Ghost borders | `--border-ghost` |
| All radii | `--radius` (0px) |

---

## Testing Strategy

- **Framework**: `@rstest/core` (describe, expect, it) + `@testing-library/preact` (render, fireEvent)
- **Query strategy**: Use `container.querySelector(".class")` for structural elements. Use `getByLabelText` for buttons with aria-label. Avoid `getByRole("status")`/`getByRole("contentinfo")` (jsdom hangs).
- **Dot indicators**: Assert `textContent` matches `●`/`○` pattern on `.sidebar__dots` / `.bottom-bar__dots`.
- **NavArrows**: `getByLabelText("Previous slide")` / `getByLabelText("Next slide")` + `fireEvent.click`.
- **PresentationLayout**: Assert `.nav-prev`/`.nav-next` wrappers exist, verify navNext parent is `__diagram` vs `__center` based on `showDiagram`.
- **Biome compliance**: All `<span>` with `aria-label` MUST have explicit `role="img"`.
- **32 test scenarios** across 7 components + hook.

---

## Open Questions

- [ ] `diagramMetadata` is empty — `Slide` type has no `diagramMetadata` field. Defer to future change, add TODO comment.
- [ ] `githubLinkUrl` hardcoded as placeholder. Update when real URL known.
- [ ] NavArrows component: keep as reusable atom (not deprecated) even though PresentationContainer uses inline buttons instead.
