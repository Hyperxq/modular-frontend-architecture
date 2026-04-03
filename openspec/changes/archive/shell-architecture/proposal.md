# Proposal: Shell Architecture — Clean Architecture + Full Stack Setup

## Intent

The `packages/shell/` package is currently a blank slate: four files (`App.tsx`, `App.css`, `index.tsx`, `env.d.ts`) with no structure, no routing, no global state wiring, and no styling system. Three critical runtime dependencies are already declared in `package.json` (Zustand 5, TanStack Query 5, React Router 7) but **none of them are used**. Tailwind CSS 4, Zod 4, and the test stack (`@rstest/core` + `@testing-library/preact`) are present at the root workspace level but **not wired into the shell package** itself.

This proposal defines: the missing package-level installs, the folder scaffolding strategy (Clean Architecture + Container Pattern + Scope Rule from Gentleman Programming), and the integration contracts for each layer.

## Scope

### In Scope
- Install missing shell-level devDependencies: `@rstest/core`, `@testing-library/preact`, `@testing-library/jest-dom`, `zod`, `tailwind-merge`
- Add `@tailwindcss/postcss` plugin wiring to `rsbuild.config.ts` (Tailwind 4 via PostCSS — same approach already used in `ui-components`)
- Create `rstest.config.ts` for shell with jsdom + pluginPreact + MSW setup file
- Scaffold the full `src/` folder structure following Clean Architecture + Container Pattern
- Wire React Router 7 entry point in `src/index.tsx` / `src/App.tsx`
- Wire TanStack Query 5 `QueryClientProvider` at the app root
- Wire Zustand 5 stores in `src/core/store/`
- Define the feature scaffold template: each feature gets Container + components/ + hooks/ + services/ + adapters/ + domain/
- Create a `home` feature as the reference implementation demonstrating the full pattern

### Out of Scope
- Implementing actual business features (auth, A/B testing, analytics) — those are separate changes
- `ui-components` modifications — this change is shell-only
- MSW handler authoring — existing root-level mocks/ remain unchanged
- Routing guard / auth protection logic — deferred to a dedicated auth change
- CI pipeline changes

## Approach

### Folder Scaffolding — Clean Architecture + Container Pattern

```
packages/shell/src/
├── index.tsx
├── App.tsx
├── App.css
├── env.d.ts
├── core/
│   ├── providers/AppProviders.tsx
│   ├── router/
│   │   ├── routes.tsx
│   │   └── ProtectedRoute.tsx
│   ├── store/
│   │   ├── app.store.ts
│   │   └── index.ts
│   ├── hooks/useAppStore.ts
│   ├── services/http.service.ts
│   ├── adapters/api.adapter.ts
│   └── domain/types.ts
├── features/
│   └── home/
│       ├── HomeContainer.tsx
│       ├── components/HeroSection.tsx
│       ├── hooks/useHome.ts
│       ├── services/home.service.ts
│       ├── adapters/home.adapter.ts
│       └── domain/
│           ├── home.schema.ts
│           └── home.types.ts
└── __tests__/rstest.setup.ts
```

## Risks
- Tailwind 4 PostCSS not picked up by Rsbuild
- `zod` import version conflict with `zod/v4` subpath
- React Router 7 + Preact compat types

## Rollback Plan
This change is additive-only (new files + config additions). Rollback: delete new directories, revert package.json/App.tsx/App.css.

## Status: COMPLETE — Archived 2026-04-03
