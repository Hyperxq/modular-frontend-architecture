# Modular Frontend Architecture — Implementation Guide

A comprehensive guide for implementing a production-ready micro-frontend architecture using Preact, Module Federation, and the Rspack ecosystem.

---

## 1. Problem & Audience

### The Problem

Frontend monoliths become unsustainable as teams and applications grow. A single repository with tightly coupled features creates:

- **Deployment bottlenecks** — one broken feature blocks the entire release pipeline
- **Team coupling** — developers step on each other's code, merge conflicts multiply
- **Technology lock-in** — upgrading a framework means migrating the entire app at once
- **Scaling walls** — build times grow linearly with codebase size
- **Testing fragility** — a change in one area breaks tests in unrelated areas

### Who This Is For

- **Frontend architects** designing systems that need to scale across multiple teams
- **Senior developers** looking for a reference implementation of micro-frontends with Module Federation
- **Teams evaluating** whether micro-frontends are the right choice for their project
- **Developers learning** Clean Architecture, Atomic Design, and modern build tooling in practice

### What This Project Is

A **presentation app that teaches its own architecture** — it's a slide deck built with the exact patterns it explains. Every concept (Module Federation, Atomic Design, Mock Mode, Clean Architecture) is demonstrated in the codebase itself.

---

## 2. Overview

### End-to-End Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        MONOREPO (Bun + Nx)                      │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │      SHELL        │  │  UI-COMPONENTS   │  │    SHARED     │  │
│  │   (Rsbuild Host)  │  │  (Rslib Remote)  │  │ (Source-only) │  │
│  │     :3002         │  │     :3001        │  │  No build     │  │
│  │                   │  │                  │  │               │  │
│  │  Business Logic   │  │  Display Only    │  │  Utilities    │  │
│  │  Zustand Stores   │  │  Atomic Design   │  │  cn()         │  │
│  │  Routing          │  │  Atoms           │  │  isLocalEnv() │  │
│  │  Auth/Security    │  │  Molecules       │  │  Types        │  │
│  │  State Management │  │  Organisms       │  │  Tailwind     │  │
│  │  Clean Arch       │  │                  │  │  Preset       │  │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘  │
│           │    Module Federation  │                    │          │
│           │◄─────────────────────┘    source import   │          │
│           │◄──────────────────────────────────────────┘          │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │      MOCKS        │  │      TESTS       │                     │
│  │  MSW v2 Handlers  │  │  Rstest (Unit)   │                     │
│  │  Browser + Node   │  │  Playwright BDD  │                     │
│  │  Domain-grouped   │  │  (E2E)           │                     │
│  └──────────────────┘  └──────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Interaction → Shell (Router + Hooks + Stores)
                       ↓ props / context
                   UI-Components (render only, return JSX)
                       ↓
                   DOM Update
```

Shell **owns** all intelligence. UI-Components **receive** and **render**. This is the Container/Presentational pattern applied at the micro-frontend boundary.

### Reference vs. Scaled Architecture

The reference implementation contains **two MFEs**: Shell (host) and UI-Components (remote). This is intentional — it's the minimum viable setup to demonstrate the pattern end-to-end.

In a scaled production scenario, the same architecture extends to multiple feature remotes:

```
┌─────────────────────────────────────────────────────────────┐
│                     Shell (Host :3002)                       │
│          Routing · Auth · State · Orchestration              │
│                                                             │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│    │    UI     │  │   Auth   │  │Dashboard │  │ Settings │  │
│    │Components│  │  Remote  │  │  Remote  │  │  Remote  │  │
│    │  :3001   │  │  :3003   │  │  :3004   │  │  :3005   │  │
│    └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│         ▲              ▲             ▲             ▲         │
│         └──── Each remote: independent build + deploy ──────┘│
└─────────────────────────────────────────────────────────────┘
```

Each remote follows the same pattern: Rslib build, MF manifest, auto-discovered component entries. The shell adds a new entry in `remotes` and lazy-loads the components — no structural changes needed.

---

## 3. Monorepo

### Structure

```
modular-frontend-architecture/
├── packages/
│   ├── shell/                          # Rsbuild host app (:3002)
│   │   ├── src/
│   │   │   ├── core/                   # Clean Architecture core
│   │   │   │   ├── domain/             # Business logic, data models
│   │   │   │   ├── hooks/              # Custom hooks (useNavigation, useKeyboard)
│   │   │   │   ├── router/             # React Router config
│   │   │   │   └── store/              # Zustand stores
│   │   │   ├── features/               # Feature modules
│   │   │   └── styles/                 # App-level Tailwind
│   │   ├── rsbuild.config.ts
│   │   └── module-federation.config.ts
│   └── libraries/
│       ├── ui-components/              # Rslib MF remote (:3001)
│       │   ├── lib/
│       │   │   ├── components/
│       │   │   │   ├── atoms/          # Button, Input, NavArrows...
│       │   │   │   ├── molecules/      # Header, Sidebar, CenterPanel...
│       │   │   │   └── organisms/      # PresentationLayout, MockDemo
│       │   │   ├── plugins/            # Auto-discovery (fast-glob)
│       │   │   └── styles/             # Component-level CSS
│       │   └── rslib.config.ts
│       └── shared/                     # Source-only utilities
│           └── src/
│               ├── utils/              # cn(), isLocalEnv()
│               ├── styles/             # Tailwind preset (@theme)
│               └── index.ts
├── mocks/                              # MSW handlers (browser + Node)
│   ├── core/                           # Config, URL handling, types
│   ├── domains/                        # Per-domain handlers
│   ├── handlers.ts                     # Handler aggregator
│   ├── init-mocking.ts                 # Browser worker lifecycle
│   └── setup-test-mocking.ts           # Node test server
├── automation_test/                    # Playwright BDD E2E
│   ├── features/                       # Gherkin .feature files
│   ├── steps/                          # Step definitions
│   └── playwright.config.ts
├── helpers/                            # Build helpers
│   └── envLoaderHelper.ts              # Shared env file loader
├── tests/                              # Integration test config
│   ├── rstest.config.ts
│   └── rstest.setup.ts
├── nx.json                             # Task runner config
├── biome.json                          # Linting + formatting
├── lefthook.yml                        # Git hooks
└── package.json                        # Bun workspaces root
```

### Workspace Configuration

The root `package.json` defines Bun workspaces:

```json
{
  "workspaces": ["packages/**", "packages/libraries/**", "automation_test"]
}
```

Each package is independently versioned with its own `package.json`. Cross-package imports use workspace aliases (`@modular-frontend/shell`, `@modular-frontend/ui-components`, `@modular-frontend/shared`).

### Nx as Task Runner (Not Generator)

Nx is used **only** for task orchestration — no Nx generators, no Nx plugins for code scaffolding:

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint:fix", "format:fix", "test"],
        "parallel": 3
      }
    }
  }
}
```

Key commands:
- `bun run dev` → `nx run web:dev` (starts ui-components:3001 then shell:3002)
- `bun run dev:mock` → `nx run web:mock` (same, with MSW enabled)
- `bun run test` → `rstest` (unit tests)
- `bun run e2e` → Playwright BDD (end-to-end)

---

## 4. Stack & Tooling

### Why Each Tool

| Tool | Role | Why This Over Alternatives |
|------|------|---------------------------|
| **Preact 10** | UI framework | 3KB vs React's 40KB+. Full React API via `preact/compat`. Ideal for MFEs where bundle size matters per-remote. |
| **Rspack / Rsbuild / Rslib** | Bundler ecosystem | Rust-based Webpack-compatible bundler. 5-10x faster than Webpack. Rsbuild = app builder (shell), Rslib = library builder (ui-components). Native Module Federation support. |
| **Rstest** | Unit test runner | Rspack-native test runner. Uses the same build pipeline as production — no separate Babel/esbuild config for tests. API similar to Vitest/Jest. |
| **Module Federation** | Micro-frontend runtime | Components loaded at runtime, not build time. Independent deployment per remote. Shared dependencies (Preact singleton) avoid duplication. |
| **Tailwind CSS 4** | Styling | Utility-first CSS with `@theme` for design tokens. Shared preset ensures consistency across shell and ui-components. |
| **Zustand 5** | State management | Minimal API, no boilerplate, no providers needed. DevTools + persist middleware built-in. Perfect for shell-only state that flows down via props. |
| **MSW v2** | API mocking | Service Worker intercepts at the network level — components don't know they're mocked. Same handlers work in browser (dev) and Node (tests). |
| **Playwright + BDD** | E2E testing | Cross-browser testing with Cucumber/Gherkin scenarios. Business-readable test specifications. |
| **Bun** | Package manager | Fast installs, native workspace support, compatible with npm ecosystem. |
| **Nx 22** | Task runner | Parallel execution, dependency-aware task ordering, build caching. Used as orchestrator only, not as framework. |
| **Biome** | Lint + format | Single tool replaces ESLint + Prettier. Enforces `noExplicitAny`, `noCommonJs`, `useComponentExportOnlyModules`. |

### Version Matrix

| Package | Version |
|---------|---------|
| Preact | 10.28.1 |
| Rspack (via Rsbuild) | 1.7.5 |
| Rslib | Latest |
| Module Federation | 0.24.1 |
| Zustand | 5.0.9 |
| React Router | 7.11.0 |
| MSW | 2.12.7 |
| Tailwind CSS | 4.1.18 |
| TypeScript | 5.9.3 |
| Biome | 2.3.10 |
| Playwright | 1.59.1 |
| Rstest | 0.7.7 |
| Nx | 22.0.1 |

---

## 5. Shell & Communication

### Clean Architecture in the Shell

The shell follows a layered architecture inspired by Clean Architecture / Screaming Architecture:

```
shell/src/
├── core/                    # Framework-agnostic business logic
│   ├── domain/              # Entities, value objects, pure functions
│   │   └── slides.ts        # Section/Slide data model + helpers
│   ├── hooks/               # Application hooks (adapters)
│   │   ├── useNavigation.ts # Navigation logic + boundary detection
│   │   └── useKeyboard.ts   # Keyboard shortcuts
│   ├── router/              # Routing configuration
│   │   └── routes.tsx       # Route definitions + guards
│   └── store/               # State management (ports)
│       ├── app.store.ts     # Theme, locale, initialization
│       ├── progress.store.ts # Slide position, visited tracking
│       └── mock.store.ts    # MSW toggle state
├── features/                # Feature modules (vertical slices)
│   ├── presentation/        # Main presentation feature
│   │   ├── PresentationContainer.tsx  # Container component
│   │   └── usePresentationData.ts     # Feature-specific data composition
│   └── mock-demo/           # MSW demo feature
└── styles/                  # App-level styling
```

### How Shell Talks to UI-Components

Communication is **unidirectional** — shell passes data DOWN, ui-components never reach UP:

```
Shell (PresentationContainer)
  │
  ├─ useNavigation()      → goNext, goPrev, canGoNext, canGoPrev
  ├─ useProgressStore()   → visitedSlides, currentPosition
  ├─ usePresentationData() → composed slide data, sidebar items
  │
  ▼ ALL data passed as props
  │
  ├─ <Header title={...} />
  ├─ <Sidebar sections={...} onSelect={...} />
  ├─ <CenterPanel content={...} />
  ├─ <BottomBar current={...} total={...} />
  └─ <NavArrows onNext={...} onPrev={...} canNext={...} canPrev={...} />
```

**Rules:**
1. UI-Components NEVER import from shell
2. UI-Components NEVER create Zustand stores
3. UI-Components NEVER access routing directly
4. All event handlers are callback props passed from shell
5. All data is serializable props — no store references

### State Management Pattern

Zustand stores live exclusively in shell:

```typescript
// shell/src/core/store/progress.store.ts
export const useProgressStore = create<ProgressStore>()(
  devtools(
    persist(progressStoreCreator, {
      name: "mfe-progress",
      partialize: (state) => ({
        currentSectionId: state.currentSectionId,
        currentSlideIndex: state.currentSlideIndex,
        visitedSlides: state.visitedSlides,
      }),
    }),
    { name: "ProgressStore" },
  ),
);

// Optimized selectors with useShallow
export function useCurrentPosition() {
  return useProgressStore(
    useShallow((s) => ({
      sectionId: s.currentSectionId,
      slideIndex: s.currentSlideIndex,
    })),
  );
}
```

**Patterns used:**
- `devtools` middleware → Redux DevTools integration
- `persist` middleware → localStorage persistence
- `useShallow` → prevents unnecessary re-renders
- `partialize` → controls what gets persisted
- Pure helper functions (e.g., `addVisited`, `visitUpTo`) for testable business logic outside the store

---

## 6. UI-Components

### Atomic Design Levels

Components follow Brad Frost's Atomic Design methodology:

```
lib/components/
├── atoms/              # Smallest building blocks
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── Button.spec.tsx
│   ├── Input/
│   ├── BottomBar/
│   ├── NavArrows/
│   └── SlideTransition/
├── molecules/          # Compositions of atoms
│   ├── Header/
│   ├── Sidebar/
│   ├── CenterPanel/
│   └── DiagramPanel/
└── organisms/          # Complex compositions
    ├── PresentationLayout/
    └── MockDemo/
```

### Component Conventions

Every component follows this structure:

```typescript
// Button.types.ts — Props interface
import type { ComponentChildren } from "preact";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  children: ComponentChildren;
}
```

```typescript
// Button.tsx — Pure display component
import type { FunctionalComponent } from "preact";
import { cn } from "@modular-frontend/shared";
import type { ButtonProps } from "./Button.types";

const Button: FunctionalComponent<ButtonProps> = ({
  variant = "primary",
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      type="button"
      class={cn(
        "px-4 py-2 font-label text-label-md transition-colors",
        variant === "primary" && "bg-primary text-on-primary hover:bg-primary-dim",
        variant === "secondary" && "border border-border-ghost text-primary hover:border-border-ghost-hover",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Key Rules

- **No business logic** — components receive everything via props
- **No stores** — Zustand never appears in ui-components
- **No bundled dependencies** — all deps are `peerDependencies` (clsx, preact, tailwind-merge)
- **No barrel exports** — each component is an independent Module Federation entry point
- **Auto-discovery** — `fast-glob` finds all `.tsx` files and registers them as MF exposes

### Auto-Discovery System

```typescript
// lib/plugins/pluginEntries.ts
import { sync } from "fast-glob";

export const pluginEntries = (patterns: string[]): Record<string, string> => {
  const files = sync(patterns, { onlyFiles: true });
  return files
    .map((filePath) => createComponentEntry(filePath))
    .filter(Boolean)
    .reduce((acc, entry) => Object.assign(acc, entry), {});
};
```

Controlled by `LEVEL_MODE` environment variable:
- `LEVEL_MODE=1` → atoms only
- `LEVEL_MODE=2` → atoms + molecules
- `LEVEL_MODE=3` → atoms + molecules + organisms (default)

### How Shell Consumes Components

Shell lazy-loads MF remotes — each component is fetched independently at runtime:

```typescript
// shell/src/features/presentation/PresentationContainer.tsx
import { lazy } from "preact/compat";

const Header = lazy(() => import("ui_components/molecules/Header/Header"));
const Sidebar = lazy(() => import("ui_components/molecules/Sidebar/Sidebar"));
const CenterPanel = lazy(() => import("ui_components/molecules/CenterPanel/CenterPanel"));
const PresentationLayout = lazy(
  () => import("ui_components/organisms/PresentationLayout/PresentationLayout"),
);
```

### Three Distribution Outputs

The component library is designed to produce **three independent outputs** from the same source code. Each serves a different consumption model:

```
                    ┌─────────────────────────────────┐
                    │     ui-components source         │
                    │  (atoms, molecules, organisms)   │
                    └──────────┬──────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
     ┌────────────────┐ ┌───────────┐ ┌────────────────┐
     │ Module Fed (MF) │ │Import Maps│ │ Web Components │
     │ rslib format:mf │ │ ESM + map │ │ @r2wc wrapper  │
     │ Runtime loading │ │ CDN-based │ │ Framework-free │
     │ ✅ ACTIVE       │ │ 🔧 READY  │ │ 🔧 READY       │
     └────────────────┘ └───────────┘ └────────────────┘
```

| Output | Config | Command | Use Case |
|--------|--------|---------|----------|
| **Module Federation** | `rslib/outputs/mf.ts` | `bun run dev` / `rslib build` | Shell consumes components at runtime via MF manifest. Primary output. |
| **Import Maps** | `lib/plugins/pluginImportMaps.ts` | — | Native browser ESM imports via `<script type="importmap">`. Components served from CDN with explicit URL mappings. No bundler required by consumer. |
| **Web Components** | `rslib.config.wc.ts` | `bun run build:wc` | Framework-agnostic custom elements via `@r2wc/react-to-web-component`. Any HTML page can use `<my-button>` without Preact. |

**Why this matters:** The same Atomic Design components can be consumed by a Module Federation host (this project), a vanilla HTML page (Import Maps), or any framework (Web Components). Write once, distribute three ways.

---

## 7. Module Federation

### Host/Remote Architecture

```
                    ┌─────────────────────────┐
                    │    Shell (Host :3002)     │
                    │                          │
                    │  lazy(() => import(       │
                    │    "ui_components/..."    │──── HTTP fetch at runtime
                    │  ))                       │         │
                    └──────────────────────────┘         │
                                                         ▼
                    ┌──────────────────────────┐
                    │ UI-Components (Remote)    │
                    │         :3001             │
                    │                          │
                    │  mf-manifest.json         │ ◄── manifest tells host
                    │  atoms/Button.js          │     where each chunk lives
                    │  molecules/Header.js      │
                    │  organisms/Layout.js      │
                    └──────────────────────────┘
```

### Host Configuration (Shell)

```typescript
// packages/shell/module-federation.config.ts
import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export const getMFConfig = (remoteUrl: string, _isLocalEnv: boolean) => {
  return createModuleFederationConfig({
    name: "host",
    manifest: false,
    remotes: {
      ui_components: `ui_components@${remoteUrl}/mf-manifest.json`,
    },
    dts: false,
    shared: {
      preact: { singleton: true, eager: true, requiredVersion: false },
      "preact/hooks": { singleton: true, eager: true, requiredVersion: false },
      "preact/compat": { singleton: true, eager: true, requiredVersion: false },
      "preact/jsx-runtime": { singleton: true, eager: true, requiredVersion: false },
    },
  });
};
```

### Remote Configuration (UI-Components)

There is NO separate `module-federation.config.ts` in ui-components. The MF configuration is declarative — Rslib's `format: "mf"` handles everything. Each component discovered by `fast-glob` becomes an independent MF expose entry automatically.

```typescript
// rslib/outputs/mf.ts — complete Module Federation output config
import { pluginEntries } from "../../lib/plugins/pluginEntries";
import { COMPONENTS_PATH, DIST_ROOT } from "../env";

export const mfOutput = (isLocal: boolean, sourceMap: boolean | SourceMap): LibConfig => ({
  format: "mf",
  dts: false,
  source: {
    entry: {
      ...pluginEntries(COMPONENTS_PATH),           // auto-discovered components
      "styles/tailwind": "./lib/styles/entry.css",  // shared Tailwind styles
    },
    exclude: [/\.spec\.(ts|tsx|js|jsx)$/],          // exclude test files from bundle
    tsconfigPath: "./tsconfig.build.json",
  },
  output: {
    distPath: { root: `${DIST_ROOT}/mf` },
    cleanDistPath: true,
    filenameHash: !isLocal,    // hash only in prod builds
    sourceMap,
  },
});
```

```typescript
// lib/plugins/pluginEntries.ts — auto-discovery engine
import { dirname, relative } from "node:path";
import { sync } from "fast-glob";

export const createComponentEntry = (filePath: string): ComponentEntry | null => {
  const base = "./lib";
  const relativeDir = relative(base, dirname(filePath)).replace(/\\/g, "/");
  const componentFile = filePath.replace(/\\/g, "/");
  return { [`./${relativeDir}`]: componentFile };
};

export const pluginEntries = (patterns: string[]): ComponentEntry => {
  const files = sync(patterns, { onlyFiles: true });
  return files
    .map((filePath) => createComponentEntry(filePath))
    .filter((entry): entry is ComponentEntry => entry !== null)
    .reduce((acc, entry) => Object.assign(acc, entry), {});
};
```

This means adding a new component is zero-config: create `lib/components/atoms/MyComponent/MyComponent.tsx` → it's automatically exposed as `ui_components/atoms/MyComponent/MyComponent` in the MF manifest.

### Shared Dependencies — The Singleton Rule

Preact MUST be `singleton: true` on BOTH host and remote. Without this:
- Two Preact instances load → hooks break (different hook state trees)
- `useContext` returns undefined across boundaries
- Event handlers silently fail

```typescript
// BOTH configs must match:
shared: {
  preact: { singleton: true, eager: true },
  "preact/hooks": { singleton: true, eager: true },
  "preact/compat": { singleton: true, eager: true },
  "preact/jsx-runtime": { singleton: true, eager: true },
}
```

### Remote URL Resolution

The remote URL changes based on environment:

```typescript
const remoteUrl = isLocalEnvMode
  ? PUBLIC_BUCKET_URL                          // localhost:3001 in dev
  : `${PUBLIC_BUCKET_URL}/ui-components/mf`;   // CDN path in prod
```

### Dev Tooling

- **DTS generation** — auto-generates TypeScript types for remote modules (local dev only)
- **mf-manifest.json** — runtime manifest that maps expose names to chunk URLs
- **Dev server** — ui-components runs Rslib `mf-dev` mode with hot reload

---

## 8. Mock Mode

### Overview

Mock mode uses **MSW (Mock Service Worker) v2** to intercept HTTP requests at the network level. The app doesn't know it's mocked — the service worker sits between `fetch()` and the network, returning mock responses.

### Three Use Cases

1. **Frontend development without backend** — develop UI features against mock data while the API team builds the real endpoints
2. **Deterministic E2E testing** — run Playwright tests against consistent mock data, no flaky external APIs
3. **Interactive demos** — show the app working with realistic data without needing a deployed backend

### Architecture

```
┌─────────────────────────────────────────────┐
│                 Browser                      │
│                                             │
│  App Code                                   │
│    fetch("/api/users")                      │
│         │                                   │
│         ▼                                   │
│  ┌─────────────────┐                        │
│  │  Service Worker  │  ◄── MSW intercepts   │
│  │  (MSW v2)       │                        │
│  └────────┬────────┘                        │
│           │                                 │
│     ┌─────┴──────┐                          │
│     │            │                          │
│  Mock handler  Pass through                 │
│  (return fake) (hit real API)               │
│                                             │
└─────────────────────────────────────────────┘
```

### Domain-Grouped Handlers

Mock handlers are organized by API domain, not by HTTP method:

```
mocks/
├── core/
│   ├── mock.config.ts       # Config parser (omit keys, unhandled behavior)
│   ├── backend.ts           # PUBLIC_GATEWAY_BACKEND — single source of truth
│   ├── types.ts             # MockRouteKey, MockConfig types
│   └── url.ts               # URL normalization
├── domains/
│   ├── users.mock.ts        # GET/POST/PUT/DELETE /users
│   └── posts.mock.ts        # GET/POST/PUT/DELETE /posts
├── handlers.ts              # Aggregates all domain handlers
├── init-mocking.ts          # Browser worker singleton (start/stop lifecycle)
└── setup-test-mocking.ts    # Node server for unit/integration tests
```

### Key Design Decisions

- **`PUBLIC_GATEWAY_BACKEND`** is the ONLY backend URL (single source of truth). Mock handlers define ONLY paths, never full domains. This makes handlers work in any environment.
- **Selective passthrough** via `PUBLIC_MSW_OMIT_KEYS` — comma-separated list of route keys to skip mocking (hit real API instead).
- **Tree-shaking** — mocking code is gated by `PUBLIC_ENABLE_MOCKING` env var. In production builds, the entire mock infrastructure is dead-code eliminated.
- **Runtime toggle** — Zustand store controls `worker.start()` / `worker.stop()` for live demo toggling.

### How to Enable

```bash
# Start dev server with mock mode
bun run dev:mock

# Environment variables (.env.mock)
PUBLIC_ENABLE_MOCKING=true
PUBLIC_GATEWAY_BACKEND=https://jsonplaceholder.typicode.com
PUBLIC_MSW_ON_UNHANDLED=bypass
PUBLIC_MSW_OMIT_KEYS=               # empty = mock everything
```

### Async Bootstrap Pattern

MSW MUST finish registering the service worker BEFORE the app renders. Otherwise, early HTTP requests bypass the mock:

```typescript
// packages/shell/src/index.tsx
async function bootstrap() {
  if (import.meta.env.PUBLIC_ENABLE_MOCKING === "true") {
    const { initMocking } = await import("../../../mocks/init-mocking");
    await initMocking();  // MUST await — worker must register before render
  }
  render(<App />, document.getElementById("root")!);
}

bootstrap();
```

### Runtime Toggle via Zustand

The mock store in the shell controls the worker lifecycle, enabling live toggling in demos:

```typescript
// shell/src/core/store/mock.store.ts
interface MockState {
  isActive: boolean;
  isEnabled: boolean;
}

interface MockActions {
  toggle: () => Promise<void>;  // calls worker.start() or worker.stop()
  setEnabled: (enabled: boolean) => void;
}
```

This means you can show the audience: "here's the app hitting the real API" → toggle → "now it's hitting mock data" — without reloading the page.

### Dual Environment — Same Handlers

The same handler definitions work in both environments:

| Environment | Setup | Use Case |
|-------------|-------|----------|
| **Browser** (Service Worker) | `setupWorker(...handlers)` via `init-mocking.ts` | Dev mode, demos |
| **Node** (Request Interceptor) | `setupServer(...handlers)` via `setup-test-mocking.ts` | Unit tests, integration tests |

```typescript
// mocks/setup-test-mocking.ts — Node environment
import { setupServer } from "msw/node";

export const server = setupServer(
  ...createHandlers({ ommitedKeys: new Set(), onUnhandled: "error" }, TEST_BASE_URL),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## 9. Testing

### Testing Pyramid

```
        ┌──────────┐
        │   E2E    │  Playwright + Cucumber BDD
        │  (slow)  │  29 scenarios × 3 browsers
        ├──────────┤
        │Component │  Rstest + @testing-library/preact
        │  (mid)   │  Render components with mock data
        ├──────────┤
        │  Unit    │  Rstest + pure function testing
        │  (fast)  │  Stores, helpers, domain logic
        └──────────┘
```

### Unit Tests (Rstest)

**Config:** `tests/rstest.config.ts`

```typescript
import { defineConfig } from "@rstest/core";

export default defineConfig({
  globals: true,
  testEnvironment: "jsdom",
  setupFiles: ["./rstest.setup.ts", "../mocks/setup.ts"],
  plugins: [pluginPreact()],
});
```

**Key patterns:**
- Import from `@rstest/core`, NEVER from `vitest` or `jest`
- Render with `@testing-library/preact`, NEVER `@testing-library/react`
- Use `act()` wrapper for Zustand state updates
- Test pure helpers separately from store (better isolation)
- MSW `setupServer()` for API mocking in Node

**Example — Store test:**

```typescript
import { afterEach, describe, expect, it } from "@rstest/core";
import { act } from "@testing-library/preact";
import { useProgressStore, addVisited } from "./progress.store";

describe("addVisited (pure helper)", () => {
  it("adds a new section + slide", () => {
    const result = addVisited({}, "intro", 0);
    expect(result).toEqual({ intro: [0] });
  });
});

describe("useProgressStore", () => {
  afterEach(() => useProgressStore.getState().resetProgress());

  it("navigates to a new position", () => {
    act(() => useProgressStore.getState().navigate("architecture", 2));
    expect(useProgressStore.getState().currentSectionId).toBe("architecture");
  });
});
```

### E2E Tests (Playwright + Cucumber BDD)

**Config:** `automation_test/playwright.config.ts`

Tests are written in Gherkin (`.feature` files) and run across 3 browsers:

```gherkin
# automation_test/features/presentation.feature

Scenario: Next arrow advances to slide 2
  Given I am on slide "intro" at index 0
  When I click the next arrow
  Then the URL should contain "/intro/1"
  And the slide title should be "Structural Analysis"
  And the slide counter should contain "SLIDE 2 / 3"
  And the previous button should be enabled
```

**Browser matrix:**
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- Mobile Chrome (Pixel 5)

**Features:**
- Automatic web server startup (ui-components → shell, in order)
- HTML + Cucumber reporters
- Screenshots on failure, video on retry
- 30+ scenarios covering navigation, routing, keyboard, visual integrity

### What Gets Tested Where

| Layer | What | Tool |
|-------|------|------|
| Domain logic | Pure functions (`addVisited`, `getSectionById`) | Rstest |
| Stores | Zustand state transitions, selectors | Rstest + act() |
| Components | Render output, prop handling, interactions | Rstest + testing-library/preact |
| API mocking | Handler responses, config parsing | Rstest + MSW node server |
| Full app | Navigation flows, routing, visual layout | Playwright + Cucumber BDD |

---

## 10. Infrastructure

### Deployment Architecture

The project deploys to **Cloudflare Pages** via GitHub Actions. Both shell and MF remote are served from a single Pages project:

- **Production URL**: `modular-frontend.pages.dev`
- **Shell assets**: served from root (`/`)
- **MF remote**: served from `/ui-components/mf/` (includes `mf-manifest.json` + all chunks)

The CI workflow (`.github/workflows/deploy.yml`) builds both packages and copies the MF remote output into the shell's `dist/` directory before deploying as a single unit.

**Build order in CI:**
1. Build ui-components with `--env-mode production`
2. Create `.env.production` with `PUBLIC_BUCKET_URL=https://modular-frontend.pages.dev`
3. Build shell with `build:prod`
4. Copy `ui-components/dist/ui-components/mf/*` into `shell/dist/ui-components/mf/`
5. Deploy `shell/dist/` to Cloudflare Pages via `bunx wrangler`

### Environment Strategy

| `--env-mode` | Purpose | DTS | Source Maps | Asset Hashing |
|--------------|---------|-----|-------------|---------------|
| `development.local` | Local dev | ON | cheap-module | OFF |
| `mock` | Local dev + MSW | ON | cheap-module | OFF |
| `development` | CI/staging | OFF | OFF | ON |
| `production` | Production | OFF | OFF | ON |

**Environment detection:**

```typescript
// packages/libraries/shared/src/utils/isLocalEnv.ts
export function isLocalEnv(envMode: string | undefined): boolean {
  return envMode === "development.local" || envMode === "mock" || !envMode;
}
```

This single function controls: source maps, DTS generation, style injection, asset hashing, CORS headers, cache-control behavior.

### CI/CD Pipeline

The GitHub Actions workflow handles the full build-deploy cycle on every push to `main`. PRs to `main` get **preview deploys** automatically at `{branch}.modular-frontend.pages.dev`.

Key implementation details:
- Uses `bunx wrangler` directly instead of `cloudflare/wrangler-action` — the action uses npm internally which conflicts with Bun workspace peer dependencies
- Project creation is idempotent: `wrangler pages project create ... || true`
- `--commit-dirty=true` flag needed because CI working directory has uncommitted build artifacts

**Required GitHub secrets:**
- `CLOUDFLARE_API_TOKEN` — API token with Pages permissions
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account identifier

### Asset Configuration

```typescript
// Shell output config (rsbuild.config.ts)
output: {
  assetPrefix: isLocalEnvMode
    ? "http://localhost:3002"     // Dev: absolute local URL
    : PUBLIC_BUCKET_URL,          // Prod: CDN URL
  filenameHash: !isLocalEnvMode,  // Hash only in prod builds
  injectStyles: !isLocalEnvMode,  // Inline CSS in prod
}

// MF Remote output config (rslib/outputs/mf.ts)
output: {
  assetPrefix: isLocal
    ? "http://localhost:3001"      // Dev: local remote server
    : "/ui-components/mf",        // Prod: subpath on same domain
  filenameHash: !isLocal,
}
```

**Critical**: The MF remote's `assetPrefix` in production MUST match the subpath where its chunks are served. Without this, Module Federation resolves chunk URLs against the root domain, causing 404s that return HTML — which triggers "MIME type not executable" errors.

---

## 11. Claude Code & Spec-Driven Development

### How This Project Was Built

This entire architecture was designed and implemented using **Claude Code** with a methodology called **Spec-Driven Development (SDD)**.

### What is SDD?

SDD is a structured workflow where every significant change goes through a planning pipeline before code is written:

```
Proposal → Specs → Design → Tasks → Apply → Verify → Archive
```

Each phase produces an artifact:
- **Proposal** — intent, scope, and approach for a change
- **Specs** — requirements and acceptance scenarios
- **Design** — technical architecture decisions and approach
- **Tasks** — implementation checklist broken into phases
- **Apply** — actual code implementation following the tasks
- **Verify** — validation that implementation matches specs
- **Archive** — sync specs to main documentation

### SDD in Practice

Example: implementing the shell's Clean Architecture required:

1. **Proposal** — defined what "Clean Architecture in a Preact shell" means: domain layer for business logic, hooks as adapters, stores as ports
2. **Specs** — defined scenarios: "domain functions must be pure", "hooks must not import from features", "stores must use devtools + persist"
3. **Design** — folder structure, naming conventions, data flow patterns
4. **Tasks** — 10 files across 3 phases: domain → stores → features
5. **Implementation** — code written following task checklist
6. **Verification** — 36/36 tests passing, 0 Biome errors, 0 `any` usage

### Claude Code Workflow

The project uses Claude Code with:
- **CLAUDE.md** — project-level instructions that define rules, conventions, and skill auto-loading
- **Skills** — specialized instruction files for each technology (Preact, Rstest, MSW, etc.)
- **Engram** — persistent memory across sessions for decisions, bugfixes, and architecture knowledge
- **SDD Orchestrator** — coordinates multi-phase changes by launching specialized sub-agents

### Lessons Learned

- AI is a **force multiplier**, not a replacement for understanding. You must know the architecture to direct the AI effectively.
- **Spec-first** prevents the AI from making assumptions — it follows the spec, not its training data.
- **Skills** keep the AI updated on latest patterns (e.g., Zustand 5 API, Tailwind CSS 4 `@theme` syntax).
- **Persistent memory** (Engram) eliminates "context loss" across long sessions and multiple conversations.

---

## 12. Considerations & Tradeoffs

### When TO Use This Architecture

- Multiple teams working on independent features that need to deploy separately
- Applications that benefit from runtime composition (different parts update at different cadences)
- Projects where bundle size per-feature matters (Preact's 3KB helps)
- Teams that want a reference implementation to learn from

### When NOT To Use This Architecture

- **Small teams (1-3 devs)** — the overhead of Module Federation, separate builds, and monorepo tooling isn't justified. A single Rsbuild app is simpler and faster.
- **Simple applications** — if your app has 5-10 pages and one team, micro-frontends add complexity with no benefit.
- **Tight deadlines** — setting up this infrastructure takes time upfront. If you need to ship in 2 weeks, use a monolith.
- **Teams without bundler knowledge** — Module Federation requires understanding Rspack/Webpack internals. Misconfigured singleton sharing will produce cryptic runtime errors.

### Operational Complexity

This architecture adds real operational overhead:

| Concern | Monolith | This Architecture |
|---------|----------|-------------------|
| Build pipeline | 1 build | N builds (1 per MFE) |
| Deployment | 1 deploy | 1 monolithic deploy (current) or N deploys + manifest coordination (scaled) |
| Version compatibility | Implicit | Must manage shared dep versions |
| Debugging | Single source map | Cross-origin source maps |
| Local dev | `npm start` | Multiple dev servers (Nx orchestrates) |
| Type safety across boundaries | Automatic | Requires DTS generation or manual types |

### Honest Assessment

**This architecture is worth it when the organizational benefit of independent deployment and team autonomy outweighs the technical complexity.** For most projects, a well-structured monolith with good folder conventions achieves 80% of the benefits with 20% of the complexity.

The value proposition is strongest when:
- You have 3+ teams that need to deploy independently
- Your app has clear domain boundaries (e.g., dashboard vs. settings vs. admin)
- You're willing to invest in tooling and developer experience upfront
- You need to experiment with different technologies in different parts of the app

### Key Lessons from Building This

1. **Preact singleton sharing is non-negotiable** — misconfigure it and everything breaks silently
2. **`writeToDisk: false`** in dev — Rsbuild's default is correct, overriding it causes HMR infinite loops
3. **Async bootstrap for MSW** — the service worker MUST register before the first render
4. **`127.0.0.1` over `localhost`** — IPv6 resolution issues in WSL2 cause phantom connection failures
5. **Domain-grouped mock handlers** — organize by API domain, not HTTP method, for maintainability
6. **Auto-discovery over manual registration** — fast-glob eliminates a class of "forgot to register" bugs
7. **Source-only shared packages** — no build step, no dist folder, just import from source
8. **`assetPrefix` on MF remote is mandatory for subpath deployment** — without it, chunk URLs resolve to the root domain, returning 404 HTML pages that trigger MIME type errors
9. **`bunx wrangler` over `wrangler-action`** — when using Bun workspaces, the Wrangler GitHub Action's internal npm install conflicts with peer dependencies
10. **Phantom dependencies break CI** — packages that work locally via hoisting (e.g., `@rsbuild/plugin-node-polyfill` used in ui-components but declared only in shell) will fail in CI with strict resolution

---

## Appendix: Quick Start

```bash
# Clone and install
git clone <repo-url>
cd modular-frontend-architecture
bun install

# Development (normal)
bun run dev

# Development (with mock API)
bun run dev:mock

# Run unit tests
bun run test

# Run E2E tests
bun run e2e

# Lint + format
bun run lint:fix

# Production build
bun run build:prod
```

### Port Map

| Service | Port |
|---------|------|
| UI-Components (MF Remote) | 3001 |
| Shell (Host App) | 3002 |

---

*This document was generated from the actual codebase, Engram persistent memory, and SDD artifacts. It reflects the architecture as of April 2026.*
