# design-system Specification

## Purpose
Enforce the Architect's Terminal visual language across all components.

## Requirements

### Requirement: Color tokens
The system SHALL use only CSS variables defined in src/styles/tokens.css.
No hardcoded hex values in component CSS.

### Requirement: Typography
The system SHALL use Inter for titles and body text.
The system SHALL use JetBrains Mono for all labels, metadata, counters, and code.

### Requirement: Spacing
The system SHALL use the Power of 3.5 spacing scale (0.35rem base unit).

### Requirement: Luxury of space
The system SHALL leave at least 40% of the center panel area unoccupied on any slide.
```

---

**Step 4 — Verify the structure exists:**
```
openspec/specs/
  routing/spec.md
  navigation/spec.md
  progress-tracking/spec.md
  layout/spec.md
  data-model/spec.md
  design-system/spec.md
```

**Step 5 — When ready to implement a change**, use the OpenSpec proposal command inside Claude Code:
```
/openspec:proposal Add routing with preact-router for /:sectionId/:slideIndex
/openspec:proposal Add keyboard navigation with ArrowLeft and ArrowRight
/openspec:proposal Add progress store with Zustand persisted to localStorage