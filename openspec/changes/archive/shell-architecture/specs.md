# Shell Architecture Specification

## Purpose

This specification defines the full structural, behavioral, and quality requirements for the `packages/shell/` package architecture. Shell is the SMART layer of the micro-frontend system: it owns ALL business logic, global state, routing, and data orchestration. It consumes `ui-components` as a dumb rendering layer.

---

## Domain 1: Folder Structure

### Requirement STRUCT-1: Feature-first top-level split
The `src/` directory MUST be organized into exactly two top-level categories: `core/` for global cross-feature concerns and `features/` for bounded feature contexts.

### Requirement STRUCT-2: Core directory layout
The `core/` directory MUST contain: `providers/`, `router/`, `store/`, `hooks/`, `services/`, `adapters/`, `domain/`.

### Requirement STRUCT-3: Feature directory layout
Each feature under `features/{name}/` MUST contain: `{FeatureName}Container.tsx`, `components/`, `hooks/`, `services/`, `adapters/`, `domain/`.

### Requirement STRUCT-4: Test setup file placement
The test setup MUST be at `packages/shell/src/__tests__/rstest.setup.ts`.

### Requirement STRUCT-5: Naming conventions
- Container: `{FeatureName}Container.tsx`
- Service: `{name}.service.ts`
- Adapter: `{name}.adapter.ts`
- Schema: `{name}.schema.ts`
- Store: `{name}.store.ts`
- Hook: `use{Name}.ts`

## Domain 2: Container Pattern

### Requirement CONTAINER-1: Container is the smart boundary
Each feature MUST have exactly one `{FeatureName}Container.tsx` as the sole orchestrator of business logic.

### Requirement CONTAINER-2: Container MUST NOT contain layout markup
The Container MUST NOT render HTML structure or Tailwind layout classes directly.

### Requirement CONTAINER-3: Container export constraint
A Container file MUST export ONLY the Container component as its default export.

### Requirement CONTAINER-4: Containers MUST NOT be imported by other features
Only consumed by `core/router/routes.tsx`.

### Requirement CONTAINER-5: Container component signature
Accepts only routing-level props. Uses `useParams()` for route params.

## Domain 3: Zustand Store

### Requirement STORE-1: Stores live exclusively in core/store/
### Requirement STORE-2: Store file structure (state interface + actions interface + create)
### Requirement STORE-3: Custom hook for store access via core/hooks/
### Requirement STORE-4: Zustand 5 API compliance

## Domain 4: Tailwind CSS 4 Integration

### Requirement TAILWIND-1: PostCSS config at package root
### Requirement TAILWIND-2: CSS entry `@import "tailwindcss"`
### Requirement TAILWIND-3: Tailwind classes MUST be in component files only

## Domain 5: Zod Schema

### Requirement ZOD-1: Schema placement in features/{name}/domain/
### Requirement ZOD-2: Zod 4 import pattern `import { z } from "zod"`
### Requirement ZOD-3: Schema export and naming (camelCase + "Schema")
### Requirement ZOD-4: Dual-purpose schemas (API validation + form zodResolver)

## Domain 6: Test Requirements

### Requirement TEST-1: rstest.config.ts at shell package root
### Requirement TEST-2: Test setup file (jest-dom + cleanup)
### Requirement TEST-3: Test file co-location with .test.ts/.test.tsx
### Requirement TEST-4: Test imports from @rstest/core
### Requirement TEST-5: Render imports from @testing-library/preact
### Requirement TEST-6: What to test (container, hooks, stores, adapters)

## Domain 7: Scope Rule

### Requirement SCOPE-1: core/ is for global cross-feature concerns
### Requirement SCOPE-2: features/ is for feature-bounded code
### Requirement SCOPE-3: ui-components boundary enforcement (display only)

## Domain 8: Adapter Pattern

### Requirement ADAPTER-1: Adapter maps API response to domain model
### Requirement ADAPTER-2: Adapter function signature (unknown input, typed output)
### Requirement ADAPTER-3: Adapter error handling (safeParse, no throw)
### Requirement ADAPTER-4: DTO types are local to adapters

## Domain 9: App Entry Point Wiring

### Requirement ENTRY-1: App.tsx providers hierarchy
### Requirement ENTRY-2: React Router 7 route definitions in core/router/
### Requirement ENTRY-3: index.tsx stays minimal

## Non-Negotiable Constraints
- PREACT-1: NEVER import from "react" — ALWAYS from "preact/hooks", "preact/compat", or "preact"
- BIOME-1: NEVER use `any`
- BIOME-2: NEVER use `require()` or `module.exports`
- BIOME-3: Component files export ONLY components
- TEST-1/TEST-2: @rstest/core and @testing-library/preact only
- ARCH-1/2/3: Stores in shell only, providers in shell, ui-components display-only

## Status: COMPLETE — All requirements verified 2026-04-03
