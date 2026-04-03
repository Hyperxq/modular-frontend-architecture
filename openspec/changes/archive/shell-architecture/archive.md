# Archive: Shell Architecture — Clean Architecture + Full Stack Setup
**Date Archived**: 2026-04-03
**Status**: COMPLETE — Verified & Archived
**Test Coverage**: 36/36 tests passing | 0 Biome errors | 0 TypeScript errors

## What Was Built

### Folder Structure
```
packages/shell/src/
├── core/
│   ├── domain/types.ts
│   ├── services/http.service.ts
│   ├── adapters/api.adapter.ts
│   ├── store/ (auth.store.ts, app.store.ts, index.ts)
│   ├── hooks/useAppStore.ts
│   ├── providers/AppProviders.tsx
│   └── router/ (routes.tsx, ProtectedRoute.tsx)
├── features/
│   └── home/ (CANONICAL REFERENCE PATTERN)
│       ├── HomeContainer.tsx
│       ├── domain/ (home.schema.ts, home.types.ts, home.schema.test.ts)
│       ├── adapters/ (home.adapter.ts, home.adapter.test.ts)
│       ├── services/home.service.ts
│       ├── hooks/useHomeQuery.ts
│       └── components/ (HomeWelcome, HomeLayout, HomeLoading, HomeError, HomeEmpty, HomeSearchForm)
├── App.tsx, index.tsx, index.css
└── postcss.config.js, rstest.config.ts
```

### Stack Decisions
| Technology | Version | Decision |
|---|---|---|
| Zustand 5 | 5.0.9 | Global state — only in core/store/ |
| TanStack Query 5 | 5.90.15 | Server state + caching |
| React Router 7 | 7.11.0 | BrowserRouter as outermost provider |
| react-hook-form + zodResolver | latest | Form state in Containers |
| Zod 4 | ^4.0.0 | Dual-purpose: API adapters + form schemas |
| Tailwind CSS 4 | 4.1.18 | Utility classes ONLY in component files |

### Key Patterns Established
1. **Container Pattern**: ZERO markup, ZERO Tailwind in containers
2. **Scope Rule**: core/ = global, features/ = bounded, ui-components = display only
3. **Adapter Pattern**: toXDomain(unknown) with safeParse, toXDTO for reverse
4. **Zustand Selector Rule**: Scalar selectors or useShallow (object selectors cause infinite loops in jsdom)
5. **Provider Tree**: BrowserRouter > AppProviders(QueryClient) > AppRoutes

### Key Gotchas
1. Zustand object selectors = infinite loop in jsdom — use scalar or useShallow
2. `vi` is NOT exported from @rstest/core with globals:true — explicit import needed
3. Tailwind 4: `@import "tailwindcss"` replaces three directives
4. postcss.config.js must be at PACKAGE root, not src/
5. Zod 4: `z.string().uuid()` not `z.uuid()`

### Test Coverage (36 tests)
| Test File | Tests | Coverage |
|---|---|---|
| home.schema.test.ts | ~9 | Schema validation |
| home.adapter.test.ts | ~8 | Adapter mapping |
| app.store.test.ts | ~8 | Store actions |
| HomeContainer.test.tsx | ~11 | Integration |

### Spec Compliance: ALL PASS
STRUCT-1..5, CONTAINER-1..5, STORE-1..4, TAILWIND-1..3, ZOD-1..4, TEST-1..6, SCOPE-1..3, ADAPTER-1..4, ENTRY-1..3, PREACT, BIOME, ARCH
