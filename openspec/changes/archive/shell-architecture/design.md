# Design: Shell Architecture — Clean Architecture + Full Stack Setup

## Architecture Decisions

### AD-1: Clean Architecture + Container Pattern
Shell follows a two-tier `src/` split: `core/` for global cross-cutting concerns and `features/` for bounded feature contexts. Each feature has exactly one Container component as the smart boundary — containers orchestrate hooks, stores, and services but render ZERO markup. All layout and Tailwind classes live in presentational components under `components/`.

### AD-2: Provider Hierarchy
The app entry point wraps components in this exact order (outermost first):
1. `BrowserRouter` (React Router 7) — must be outermost for `useNavigate` availability
2. `QueryClientProvider` (TanStack Query 5) — server state caching
3. `AppRoutes` — route definitions consuming lazy-loaded Containers

`AppProviders.tsx` encapsulates QueryClientProvider setup. `App.tsx` composes BrowserRouter > AppProviders > AppRoutes.

### AD-3: Zustand 5 Store Pattern
Stores live exclusively in `core/store/`. Each store file exports: state interface, actions interface, and the `create()` call. Access is via custom hooks in `core/hooks/` using scalar selectors (NOT object selectors — those cause infinite re-render loops in jsdom).

### AD-4: Adapter Pattern with Zod Validation
Adapters in `{feature}/adapters/` map raw API responses (`unknown`) to typed domain models using Zod `safeParse`. DTO types are local to the adapter file. Adapter functions: `toXDomain(data: unknown): X | null` for inbound, `toXDTO(domain: X): XDTO` for outbound.

### AD-5: Tailwind CSS 4 via PostCSS
`postcss.config.js` at package root (`packages/shell/`) with `@tailwindcss/postcss` plugin. CSS entry uses `@import "tailwindcss"` (replaces the three v3 directives). Rsbuild picks it up automatically via PostCSS loader.

### AD-6: Test Stack
`rstest.config.ts` at shell package root with jsdom environment, `pluginPreact()`, and setup file at `src/__tests__/rstest.setup.ts`. Setup imports `@testing-library/jest-dom` and runs `cleanup()` after each test. All test imports from `@rstest/core`, render from `@testing-library/preact`.

---

## Folder Structure

```
packages/shell/src/
├── index.tsx                          # render(App) — minimal
├── App.tsx                            # BrowserRouter > AppProviders > AppRoutes
├── index.css                          # @import "tailwindcss"
├── core/
│   ├── domain/types.ts                # Global domain types
│   ├── services/http.service.ts       # Fetch wrapper with base URL + error handling
│   ├── adapters/api.adapter.ts        # Global adapter utilities
│   ├── store/
│   │   ├── app.store.ts               # UI state (sidebar, theme)
│   │   ├── auth.store.ts              # Auth state (token, user)
│   │   └── index.ts                   # Re-exports
│   ├── hooks/useAppStore.ts           # Typed store access hooks
│   ├── providers/AppProviders.tsx     # QueryClientProvider wrapper
│   └── router/
│       ├── routes.tsx                 # Route definitions with lazy imports
│       └── ProtectedRoute.tsx         # Auth guard (placeholder)
├── features/
│   └── home/                          # CANONICAL REFERENCE FEATURE
│       ├── HomeContainer.tsx          # Smart boundary — hooks + delegation
│       ├── domain/
│       │   ├── home.schema.ts         # Zod 4 schemas (search + slides)
│       │   └── home.types.ts          # Inferred types from schemas
│       ├── adapters/home.adapter.ts   # toSlideDomain / toSlideDTO
│       ├── services/home.service.ts   # API calls via http.service
│       ├── hooks/useHomeQuery.ts      # TanStack Query wrapper
│       └── components/               # Presentational only
│           ├── HomeLayout.tsx
│           ├── HomeWelcome.tsx
│           ├── HomeSearchForm.tsx
│           ├── HomeLoading.tsx
│           ├── HomeError.tsx
│           └── HomeEmpty.tsx
└── __tests__/rstest.setup.ts         # jest-dom + cleanup
```

---

## Data Flow

```
Route hit → Container (smart)
  → useHomeQuery (TanStack Query hook)
    → home.service.fetchSlides() (HTTP call)
    → home.adapter.toSlideDomain() (Zod safeParse)
  → useAppStore (Zustand selector)
  → react-hook-form + zodResolver (form state)
  → Renders presentational components with props
```

Containers NEVER touch the network directly. Services handle HTTP, adapters handle mapping, hooks compose them, and containers wire hooks to components.

---

## Files Changed

### New Config Files
- `packages/shell/postcss.config.js` — Tailwind 4 PostCSS plugin
- `packages/shell/rstest.config.ts` — Test runner config

### Modified Config Files
- `packages/shell/package.json` — Added devDependencies

### New Source Files (core/)
- `src/core/domain/types.ts`
- `src/core/services/http.service.ts`
- `src/core/adapters/api.adapter.ts`
- `src/core/store/app.store.ts`
- `src/core/store/auth.store.ts`
- `src/core/store/index.ts`
- `src/core/hooks/useAppStore.ts`
- `src/core/providers/AppProviders.tsx`
- `src/core/router/routes.tsx`
- `src/core/router/ProtectedRoute.tsx`

### New Source Files (features/home/)
- `src/features/home/HomeContainer.tsx`
- `src/features/home/domain/home.schema.ts`
- `src/features/home/domain/home.types.ts`
- `src/features/home/adapters/home.adapter.ts`
- `src/features/home/services/home.service.ts`
- `src/features/home/hooks/useHomeQuery.ts`
- `src/features/home/components/HomeLayout.tsx`
- `src/features/home/components/HomeWelcome.tsx`
- `src/features/home/components/HomeSearchForm.tsx`
- `src/features/home/components/HomeLoading.tsx`
- `src/features/home/components/HomeError.tsx`
- `src/features/home/components/HomeEmpty.tsx`

### Modified Source Files
- `src/App.tsx` — Rewired to provider hierarchy
- `src/index.tsx` — Minimal render call
- `src/index.css` — Replaced with `@import "tailwindcss"`

### New Test Files
- `src/__tests__/rstest.setup.ts`
- `src/features/home/domain/home.schema.test.ts`
- `src/features/home/adapters/home.adapter.test.ts`
- `src/core/store/app.store.test.ts`
- `src/features/home/HomeContainer.test.tsx`

## Status: COMPLETE — Archived 2026-04-03
