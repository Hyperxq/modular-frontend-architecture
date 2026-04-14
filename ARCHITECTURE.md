# Modular Frontend Architecture — A Craftsman's Guide

> This is not a toy. This is not a tutorial project with `TODO` comments and half-baked patterns.
> This is a **production-grade micro-frontend architecture** — built with intention, constraint, and discipline.
> Every decision here was made for a reason. Let me walk you through it.

---

## What Is This?

A **Preact micro-frontend monorepo** that demonstrates how to build a modular, scalable frontend using **Module Federation**, **Atomic Design**, and a strict **separation of concerns** between a smart host and a dumb component library.

The application itself is a slide-based presentation system — but the architecture is the star. The slides just happen to explain the architecture that renders them. Meta? Yes. Working? Absolutely.

---

## The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│                                                             │
│   ┌───────────────────────┐    ┌──────────────────────┐     │
│   │     shell (:3002)     │◄───│  ui-components       │     │
│   │     HOST              │    │  REMOTE (:3001)      │     │
│   │                       │    │                      │     │
│   │  • Business logic     │    │  • Display ONLY      │     │
│   │  • Routing            │    │  • Atomic Design     │     │
│   │  • State (Zustand)    │    │  • Zero logic        │     │
│   │  • Auth, A/B testing  │    │  • Zero dependencies │     │
│   │  • Data orchestration │    │    bundled            │     │
│   └───────┬───────────────┘    └──────────────────────┘     │
│           │                                                 │
│   ┌───────▼───────────────┐                                 │
│   │     shared            │                                 │
│   │  Source-only utils    │                                 │
│   │  (no build step)      │                                 │
│   └───────────────────────┘                                 │
└─────────────────────────────────────────────────────────────┘
```

Three packages. Clear boundaries. No ambiguity about who does what.

---

## The Stack — And Why Each Piece Was Chosen

| Layer | Technology | Why |
| --- | --- | --- |
| **UI Framework** | Preact 10 | 3KB alternative to React. Full compat layer. Same API, fraction of the weight. |
| **Bundler (app)** | Rsbuild + Rspack | Webpack-compatible but Rust-powered. 5-10x faster builds. |
| **Bundler (lib)** | Rslib + Rspack | Purpose-built for library output. Supports MF, ESM, and Web Components from one source. |
| **Package manager** | Bun | Fast installs, native TypeScript execution, workspace support. |
| **Monorepo** | Nx 22 | Task orchestration only — no generators, no magic. It runs things in the right order. |
| **State** | Zustand 5 | Minimal, no boilerplate, no providers. Works beautifully with Preact. |
| **Routing** | React Router 7 | Via preact/compat. Battle-tested routing with URL-driven state. |
| **Forms** | react-hook-form + Zod 4 | Uncontrolled forms (performance) + runtime schema validation. |
| **Styling** | Tailwind CSS 4 + SCSS | Utility-first with a custom design token system. No CSS-in-JS runtime cost. |
| **Testing** | Rstest + Testing Library + MSW 2 | Rust-speed unit tests, real DOM assertions, network-level mocking. |
| **Linting** | Biome 2 | Replaces ESLint + Prettier. One tool, strict rules, zero config drift. |
| **Git hooks** | Lefthook + commitlint | Enforced quality gates. Every commit follows Conventional Commits. |
| **Module Federation** | @module-federation/enhanced 0.24 | Runtime micro-frontend composition. Components loaded on demand. |

> **The philosophy:** Every tool earns its place. Nothing is here because it's trendy — it's here because it solves a specific problem better than the alternatives.

---

## The Three Packages — Responsibilities That Don't Overlap

### `shell` — The Brain

**Path:** `packages/shell/`

This is where ALL the intelligence lives. Routing, state management, business logic, data orchestration, navigation algorithms — everything.

- Owns **Zustand stores**: `AppStore` (theme, locale, sidebar), `ProgressStore` (slide navigation, persistence to localStorage), `MockStore` (runtime MSW toggling)
- Owns **routing**: React Router 7 with URL-driven slide state (`/:sectionId/:slideIndex`)
- Owns **containers**: `PresentationContainer` and `MockDemoContainer` aggregate data from stores, hooks, and domain models, then pass it down as props
- Owns **hooks**: `useNavigation` (next/prev with cross-section boundary handling), `useKeyboard` (arrow keys), `useSwipe` (touch gestures), `useFocusTrap` (accessibility), `useIsMobile` (responsive breakpoint)
- Owns **domain model**: 12 sections, 42 slides, typed content definitions with lazy-loaded components

**The shell consumes `ui-components` as a dumb rendering layer.** It lazy-loads each component individually through Module Federation:

```ts
const Header = lazy(() => import("ui_components/molecules/Header/Header"));
const Sidebar = lazy(() => import("ui_components/atoms/Sidebar/Sidebar"));
```

Only what's needed is loaded. Nothing else.

### `ui-components` — The Hands

**Path:** `packages/libraries/ui-components/`

Pure display. This library knows how to RENDER things. It does NOT know what to render, when to render it, or why.

- Follows **Atomic Design**: atoms → molecules → organisms
- Every component receives data through **props only**
- **Zero bundled dependencies** — Preact, clsx, tailwind-merge are all `peerDependencies` provided by the host at runtime
- **Three output targets** from one source: Module Federation (runtime), Import Maps (ESM), Web Components (any framework)
- **Zero manual registration** — `fast-glob` auto-discovers all `.tsx` files and generates both entry points and MF exposes

```
lib/components/
├── atoms/          ← Primitives: Button, Input, NavArrows, BottomBar, SlideTransition
├── molecules/      ← Composed: Header, Sidebar, CenterPanel, DiagramPanel
└── organisms/      ← Complex: PresentationLayout, MockDemo
```

Each component lives in its own directory: `{Name}/{Name}.tsx` + `{Name}.types.ts` + `{Name}.spec.tsx`. No barrel files. No shared index. Each one is an independent, tree-shakeable entry.

> **This is the key insight:** The component library has NO idea it's part of a presentation app. It just renders layouts, buttons, and panels. You could plug it into a completely different host tomorrow.

### `shared` — The Common Language

**Path:** `packages/libraries/shared/`

No build step. No `dist/`. Consumed directly from source via TypeScript path aliases.

Contains only what BOTH packages need:
- `cn()` — className composition (clsx + tailwind-merge)
- `isLocalEnv()` — Environment mode detection
- `tailwind-preset.css` — The complete design token system (the single source of truth for the visual language)

If it's not needed by both packages, it doesn't belong here.

---

## Module Federation — How the Micro-Frontend Works

```
shell (host :3002)  ◄────── ui_components (remote :3001)
       ↑                           ↑
  rsbuild.config.ts           rslib.config.ts
  module-federation.config     pluginExposes() via fast-glob
```

### The Contract

- **Remote name:** `ui_components` (underscore — it's a JS identifier)
- **Preact is a singleton** on both sides. This is NON-NEGOTIABLE. Two copies of Preact means broken hooks, broken context, broken everything.
- **The host provides ALL shared dependencies at runtime.** The remote bundles NOTHING. This keeps the remote output tiny and ensures a single dependency graph.
- **DTS generation** is gated on local development only — skipped in CI to avoid flaky builds.

### Auto-Discovery (Zero-Config Registration)

When you add a new component at `lib/components/atoms/Toggle/Toggle.tsx`, it's automatically:
1. Discovered by `fast-glob`
2. Added as an entry point by `pluginEntries()`
3. Exposed via MF by `pluginExposes()` as `./atoms/Toggle/Toggle`
4. Importable in shell as `import Toggle from "ui_components/atoms/Toggle/Toggle"`

No config file to update. No registration step. You write the component, and the system finds it.

---

## State Management — Three Layers, Zero Confusion

| Layer | Technology | Where | Example |
| --- | --- | --- | --- |
| **Global app state** | Zustand 5 | `shell` only | Theme, locale, sidebar, progress |
| **UI local state** | `useState` / `useReducer` | `ui-components` | Hover states, input focus |
| **Cross-component state** | Context API | Provider in `shell`, consumer in `ui-components` | Shared data that flows through the MF boundary |

**The rule is simple:** `ui-components` NEVER creates or imports Zustand stores. Shell reads from stores and passes data DOWN. This works because Preact is a singleton across the MF boundary — context providers in shell are visible to remote components.

### The Stores

- **AppStore** — Theme (light/dark), locale, sidebar open/close. Pure UI state with devtools middleware.
- **ProgressStore** — Current section, current slide, visited slides tracking. Persisted to localStorage with migration support (v0 → v1).
- **MockStore** — MSW runtime toggling. Async actions that dynamically import the mock worker.

All stores use `useShallow` for optimized re-renders — only the slice you subscribe to triggers updates.

---

## The Design Token System

The entire visual language lives in one file: `packages/libraries/shared/src/styles/tailwind-preset.css`.

This is a Tailwind CSS 4 `@theme` definition that both packages import. It defines:

- **6 surface levels** — Tonal layering from darkest (`#0c0e14`) to lightest (`#2a2d36`)
- **Brand colors** — Primary (cyan), secondary (purple), tertiary (mint), amber (warnings)
- **Glow effects** — Box shadows for interactive hover states
- **Typography scale** — 3 font families (Inter, Space Grotesk, JetBrains Mono), 7 sizes, 3 line heights
- **Spacing system** — Power-of-3.5 scale (0.35rem unit) from level 0 to 20
- **Animation library** — slide-enter, fade-up, shimmer, drawer-enter with keyframes
- **Layout system** — Custom CSS Grid utilities for the presentation layout (full, no-diagram, mobile variants)
- **Z-index layers** — Named layers from base(0) through modal(50)

> **One file. Two packages. Complete visual consistency.** Change a token here, and it ripples everywhere.

---

## Testing Strategy — Three Levels

### Unit Tests (Rstest + Testing Library)

- **Framework:** `@rstest/core` — Rust-powered, Vitest-compatible API, significantly faster than Jest
- **DOM:** happy-dom (lightweight, fast)
- **Rendering:** `@testing-library/preact` (NOT react — this is a Preact project)
- **Coverage thresholds:** 80% across statements, branches, functions, and lines for ui-components

Every component has a co-located `.spec.tsx` file. Tests verify behavior, not implementation:

```
atoms/Button/
├── Button.tsx
├── Button.types.ts
└── Button.spec.tsx
```

### Network Mocking (MSW 2)

MSW intercepts at the network level — your code doesn't know it's being mocked.

- **Browser mode:** `setupWorker` — lazy-loaded, togglable at runtime via MockStore
- **Test mode:** `setupServer` — lifecycle hooks wire up in beforeAll/afterEach/afterAll
- **Handler factory:** Domain-based handlers (users CRUD, posts read) with selective passthrough via `PUBLIC_MSW_OMIT_KEYS`
- **Config-driven:** Omit specific routes, configure unhandled request behavior (warn/bypass/error)

### E2E Tests (Playwright + BDD)

- **BDD layer:** Cucumber-style `.feature` files with Given/When/Then
- **Page Objects:** `PresentationPage`, `MockDemoPage` — encapsulate selectors and interactions
- **Coverage:** 26 scenarios covering page load, layout, arrow navigation, keyboard navigation, sidebar, boundary conditions, route validation, browser history, and visual integrity
- **Multi-browser:** Chromium, Firefox, mobile Chrome
- **CI integration:** Runs against the deployed URL after Cloudflare Pages deployment, posts results as PR comments

---

## Build Pipeline — Deterministic and Reproducible

```
bun install
    │
    ▼
scripts/setup-env.ts  ← Auto-generates .env.* files from .env.example
    │
    ▼
rslib build (ui-components)  ← Must build FIRST — shell needs MF manifest
    │
    ▼
rsbuild build (shell)  ← Consumes MF remote, produces final app
    │
    ▼
dist/  ← MF assets from ui-components merged into shell's output
```

Nx orchestrates the order. `shell` has an `implicitDependency` on `ui-components`, so Nx always builds the library first.

### The Rspack Toolchain Coupling Problem (And How It's Solved)

Three tools share `@rspack/core` internally: Rsbuild (shell), Rslib (ui-components), Rstest (tests). If they resolve to **different versions**, you get native binary mismatches and cryptic crashes.

**The solution:** Root-level `overrides` in `package.json` force a single copy:

```json
"overrides": {
  "@rsbuild/core": "1.7.5",
  "@rspack/core": "1.7.11"
}
```

After any toolchain upgrade: delete ALL `node_modules`, reinstall, verify ONE copy exists with `ls node_modules/.bun/ | grep rspack+core`.

> **This is the kind of thing that separates a project that works from one that works until it doesn't.** Version coupling in native toolchains is a real constraint. You either manage it deliberately or you suffer randomly.

---

## Environment Management

Four modes, each with a clear purpose:

| Mode | Purpose |
| --- | --- |
| `development.local` | Local dev — DTS generation, source maps, full debugging |
| `mock` | Local dev with MSW browser mocking active |
| `development` | CI / staging — no DTS, no source maps |
| `production` | Production — minified, hashed, compressed |

Environment files are auto-generated from `.env.example` during `postinstall`. No manual setup. No "it works on my machine." Every developer gets the same starting point.

`PUBLIC_*` variables are injected at build time via Rsbuild's `source.define` — they become compile-time constants, not runtime lookups.

---

## Docker — Local Development Only

Docker is here for local reproducibility, NOT for deployment (that's Cloudflare Pages via GitHub Actions).

```
docker-compose.yml
├── ui-components  (:3001) — MF remote, starts FIRST with healthcheck
├── shell          (:3002) — Host, waits for ui-components to be healthy
└── prod           (:8080) — Nginx serving the merged production build
```

### Key Design Decisions

1. **`--host 0.0.0.0`** — Dev servers inside Docker must listen on all interfaces. `localhost` inside a container means "this container only."
2. **Named volumes for `node_modules`** — Host node_modules have wrong-platform native binaries (macOS/Windows). Container gets its own Linux-native copies.
3. **Browser accesses `localhost`** — `PUBLIC_BUCKET_URL=http://localhost:3001` because the browser runs on YOUR machine, not inside the container.
4. **Production image is multi-stage** — base → deps → build → serve. Final image is nginx:alpine with just the static files.

---

## CI/CD Pipeline

```
Pull Request to main
    │
    ├─► ci.yml ──► Unit tests + coverage ──► GitHub Pages (coverage report)
    │
    └─► deploy.yml ──► Build ──► Cloudflare Pages
                                      │
                                      └─► e2e-deployed.yml ──► Playwright against live URL
                                                                    │
                                                                    └─► PR comment with results
```

Quality gates are automated. Tests run. Coverage is published. E2E validates the deployed version. Results are posted back to the PR. No human in the loop for verification.

---

## Code Quality Enforcement

### Biome 2 (Linting + Formatting)

One tool replaces ESLint + Prettier. Strict rules, zero ambiguity:

- **`noExplicitAny: "error"`** — You NEVER use `any`. Period.
- **`noCommonJs: "error"`** — No `require()`, no `module.exports`. It's 2026.
- **`useComponentExportOnlyModules: "error"`** — Component files export components. Nothing else.
- **`useHookAtTopLevel: "error"`** — Hooks at the top. Always.

### Lefthook + Commitlint

- **Pre-commit:** Biome auto-fixes staged files
- **Commit-msg:** Validates Conventional Commits format (`feat(scope): message`)

You physically cannot commit code that breaks the rules or a message that doesn't follow the convention.

---

## Security

Not an afterthought. Baked in:

- **Security headers** at both dev server and nginx levels (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- **CORS** restricted to localhost origins in dev, properly configured in production nginx
- **URL validation** in both build config (`assertValidRemoteUrl`) and components (`isSafeUrl`)
- **Non-root user** in Docker
- **No secrets in code** — env files auto-generated from templates, never committed

---

## Spec-Driven Development (OpenSpec)

Changes to the architecture follow a structured process:

```
openspec/
├── specs/              ← Living specs — source of truth
│   └── <domain>/
│       └── spec.md
└── changes/            ← In-progress changes
    └── <change-name>/
        ├── proposal.md
        ├── design.md
        ├── tasks.md
        └── specs/      ← Delta specs (what changes)
```

Before code is written, there's a proposal. Before implementation, there's a spec. Before merging, there's verification. Specs are committed alongside code — they're not a separate artifact, they're part of the deliverable.

---

## The Architecture Principles — The Why Behind Everything

1. **Smart host, dumb components.** Shell makes decisions. UI-components render pixels. The boundary is absolute.

2. **Zero-config by convention.** Add a component file, it's auto-discovered and exposed. No registration, no barrel files, no config updates.

3. **One source of truth for design.** The token system in `tailwind-preset.css` defines the visual language once. Both packages consume it.

4. **Dependencies flow one way.** Shell depends on ui-components. UI-components depend on nothing (peers provided at runtime). Shared is consumed by both but owns no runtime behavior.

5. **Every tool earns its place.** If it doesn't solve a real problem better than the alternatives, it's not in the stack.

6. **Quality is automated, not aspirational.** Biome errors, commitlint, coverage thresholds, E2E on deploy — the system enforces the standards. You can't merge without passing.

7. **The toolchain is a first-class concern.** Rspack version coupling, SWC plugin ABI compatibility, singleton Preact across MF boundaries — these are documented, managed, and enforced. Not discovered in production.

---

> *This architecture works because every piece has a clear job, every boundary is enforced, and every decision is documented. It's not perfect — no architecture is. But it's intentional, and that's what makes it maintainable.*
