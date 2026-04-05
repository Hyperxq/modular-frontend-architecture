# AGENTS.md

You are working on **modular-frontend-architecture** — a Preact micro-frontend monorepo using Module Federation, the Rspack toolchain, Atomic Design, and Nx as the task orchestrator.

## Stack

| Layer | Technology |
| --- | --- |
| UI Framework | Preact 10 (`jsxImportSource: preact` everywhere) |
| Bundler (app) | Rsbuild + Rspack |
| Bundler (lib) | Rslib + Rspack |
| Package manager | Bun |
| Monorepo | Nx 22 (task runner only — no generators) |
| State | Zustand 5 |
| Data fetching | TanStack Query 5 |
| Routing | React Router 7 (via preact/compat) |
| Forms | react-hook-form + Zod 4 |
| Styling | Tailwind CSS 4 + SCSS |
| Testing | Rstest + @testing-library/preact + MSW 2 |
| Linting | Biome 2 (strict) |
| Git hooks | Lefthook + commitlint (Conventional Commits) |
| MF | @module-federation/enhanced 0.24 |
| Preact plugin | @rsbuild/plugin-preact 1.7.2 + @swc/plugin-prefresh 12.7.0 |

## Packages

| Name | Path | Role |
| --- | --- | --- |
| `shell` | `packages/shell/` | Rsbuild app — MF host (:3002) — business logic, auth, routing, A/B testing |
| `ui-components` | `packages/libraries/ui-components/` | Rslib MF remote (:3001) — Atomic Design, display only |
| `shared` | `packages/libraries/shared/` | Source-only utilities — no build step, imported directly |

## Package Responsibilities

### `shell` — the smart layer
- Owns ALL business logic, security, auth, A/B testing, routing
- Manages state via **Zustand** stores and **Context API** providers
- Consumes `ui-components` as a dumb rendering layer
- Passes data and callbacks DOWN to components via props or context
- Never delegates logic decisions to `ui-components`

### `ui-components` — the display layer
- **Display only** — no business logic, no auth, no routing, no state stores
- Receives everything it needs via **props** or **context provided by shell**
- Assumes shell will provide ALL runtime dependencies (Preact, Zustand, etc.)
- Three outputs: **Module Federation**, **Import Maps**, **Web Components**
- Every component is an **independent entry** — flat, tree-shakeable, no shared barrel
- Output must be **fully flat and light** — zero bundled dependencies, all are peerDependencies

### `shared` — source-level utilities
- No build step, no `dist/` — consumed directly from source
- Only contains what is needed by BOTH `shell` AND `ui-components`
- Pure utilities, shared interfaces/types, constants
- Imported as: `import { x } from "../libraries/shared/src"`

## State Management Architecture

| Layer | Technology | Where |
| --- | --- | --- |
| Global app state | Zustand 5 | `shell` only |
| UI local state | `useState` / `useReducer` | `ui-components` components |
| Cross-component state | Context API | Provider in `shell`, consumer in `ui-components` |

**Rules:**
- `ui-components` components NEVER create or import Zustand stores
- `ui-components` components MAY consume React Context — but the **Provider always lives in shell**
- Shell reads from Zustand and passes data to components via props or context values
- This works safely because Preact is singleton across the MF boundary

## Git Workflow

- ALWAYS create a feature branch before starting any work: `git checkout -b feat/<change-name>` or `fix/<change-name>`
- NEVER commit directly to `main` — branch protection is enforced, direct pushes will be rejected
- One branch per SDD change or logical unit of work
- Branch naming: `feat/`, `fix/`, `chore/`, `refactor/` — matching the commit type

## Pull Request Convention

Every PR must answer two questions clearly in its description:

**Why** — What problem does this PR solve? What was broken, missing, or needed?
**What** — What was achieved? What changed and what is the outcome?

### PR Description Template

```
## Why
[One paragraph explaining the motivation. What was the problem or need? Why does this matter?]

## What was achieved
[Bullet list of concrete outcomes — what works now that didn't before, what was fixed, added, or improved]

## Changes
[Brief summary of files/areas touched — not a git diff, just context]
```

### Rules
- NEVER open a PR without a description — empty PRs will be rejected
- The "Why" must be written for someone who has no context — assume they haven't read the issue or Slack thread
- The "What" must list outcomes, not just files changed ("users can now navigate with keyboard" not "added tabIndex to Sidebar")

## Non-Negotiable Rules

- NEVER use `any` — `noExplicitAny` is a Biome **error**
- NEVER use `require()` or `module.exports` — `noCommonJs` is a Biome **error**
- NEVER import hooks from `"react"` — always from `"preact/hooks"`
- NEVER use `React.FC` or `React.ReactNode` — use `FunctionalComponent` / `ComponentChildren` from `"preact"`
- Component files export ONLY components — `useComponentExportOnlyModules` is a Biome **error**
- Preact MUST be `singleton: true` in ALL Module Federation shared configs
- NEVER manually register entries in rslib — `fast-glob` auto-discovers all `.tsx` components
- NEVER edit `packages/shell/@mf-types/**` — auto-generated by MF type sharing
- Test imports ALWAYS from `@rstest/core`, NEVER from `vitest` or `jest`
- Test rendering ALWAYS from `@testing-library/preact`, NEVER from `@testing-library/react`
- NEVER build after making changes
- NEVER add business logic, state stores, or auth to `ui-components`
- NEVER bundle dependencies into `ui-components` output — all deps are peerDependencies
- NEVER create barrel `index.ts` that re-exports all components — each component is its own entry

## Skills

Load the relevant skill BEFORE writing any code for that context:

| Context | Skill |
| --- | --- |
| Preact components, hooks, JSX, types | `skills/preact/SKILL.md` |
| Unit tests, @rstest/core, testing-library | `skills/rstest/SKILL.md` |
| MSW handlers, HTTP mocking | `skills/msw/SKILL.md` |
| rslib.config.ts, library builds, MF remote | `skills/rslib/SKILL.md` |
| rsbuild.config.ts, tools.rspack, plugins | `skills/rspack/SKILL.md` |
| nx.json, project.json, nx run | `skills/nx/SKILL.md` |
| biome.json, lint errors, formatting | `skills/biome/SKILL.md` |
| lefthook.yml, commit messages, git hooks | `skills/lefthook/SKILL.md` |
| E2E tests, Playwright, automation_test/ | `skills/playwright/SKILL.md` |
| TypeScript types, interfaces, generics | `~/.claude/skills/typescript/SKILL.md` |
| Tailwind classes, styling | `~/.claude/skills/tailwind-4/SKILL.md` |
| Zod schemas, validation | `~/.claude/skills/zod-4/SKILL.md` |
| Zustand stores, state management | `~/.claude/skills/zustand-5/SKILL.md` |

## Commands

```bash
# Dev
bun run dev           # ui-components MF dev + shell dev (streamed output)
bun run dev:mock      # same but with MSW browser mocking

# Build
bun run build         # ui-components build → shell build
bun run build:prod    # production build

# Test
bun run test          # rstest (all packages)

# Lint / Format
bun run lint          # lint all packages (via Nx)
bun run lint:fix      # auto-fix lint all packages
bun run format:fix    # auto-format all packages

# Nx
nx run shell:dev                        # shell only
nx run ui-components:build              # library only
nx run-many --target=test --all         # test all
nx reset                                # clear Nx cache
nx graph                                # visualize task dependencies

# E2E
bun run e2e           # Nx: start servers → bddgen → playwright test (all browsers)
bun run e2e:chromium  # Nx: same but chromium only

# Docker (local dev only — CLI only, no Docker Desktop required)
bun run docker:dev          # compose up ui-components + shell (foreground)
bun run docker:dev:detach   # same but detached
bun run docker:prod         # production preview on :8080 (nginx)
bun run docker:build        # build production image only
bun run docker:e2e          # compose up + run E2E + compose down
bun run docker:down         # stop all services
bun run docker:clean        # stop + remove volumes + remove images

# Dependency troubleshooting — full clean reinstall
rm -rf node_modules packages/shell/node_modules packages/libraries/ui-components/node_modules
bun install
ls node_modules/.bun/ | grep rspack+core  # must show exactly one entry
```

## Architecture

### Module Federation

```
shell (host :3002)  ←──── ui_components (remote :3001)
       ↑                        ↑
  rsbuild.config.ts        rslib.config.ts
  module-federation.config  module-federation.config
```

- Remote name: `ui_components` (underscore — JS identifier)
- DTS generation gated on `isLocalEnv(envMode)` — skipped in CI
- Preact shared as singleton on both sides
- Shell provides ALL shared dependencies at runtime — `ui-components` bundles nothing

### `ui-components` Output Targets

| Output | Format | Consumer |
| --- | --- | --- |
| Module Federation | `mf` | shell at runtime via MF remote |
| Import Maps | `esm` | browsers using native import maps |
| Web Components | custom build | any framework or vanilla HTML |

Each component is its own independent entry — consumers import only what they need:
```ts
// ✅ imports ONLY Button — nothing else loaded
import Button from "ui_components/atoms/Button/Button"
```

### Atomic Design

```
lib/components/
  atoms/       (LEVEL_MODE=1)
  molecules/   (LEVEL_MODE=2)
  organisms/   (LEVEL_MODE=3)
```

Component path: `lib/components/{level}/{Name}/{Name}.tsx`
Auto-exposed via `fast-glob` — zero manual registration.

### Nx Output Style

`bun run dev` and `bun run dev:mock` use `--output-style=stream` so each process streams stdout directly — no buffering, no truncation. This is intentional for debugging in terminals like WezTerm.

If you need to run a single package instead of both in parallel:
```bash
nx run @modular-frontend/ui-components:dev
nx run @modular-frontend/shell:dev
```

### Environment Modes

| `--env-mode` | Meaning |
| --- | --- |
| `development.local` | Local dev — DTS + source maps enabled |
| `mock` | Local dev — MSW browser mocking active |
| `development` | CI / staging |
| `production` | Production |

### MSW Mocking

- Browser: `mocks/init-mocking.ts` → `setupWorker` (lazy import from `msw/browser`)
- Tests: `mocks/setup-test-mocking.ts` → `setupServer` from `msw/node`
- Handler factory: `mocks/create-handler.ts` — wraps `http.*` with passthrough logic

## Dependency Management

### The Rspack toolchain version coupling problem

This monorepo uses three tools that all depend on `@rspack/core` internally:

| Tool | Declared in |
| --- | --- |
| `@rsbuild/core` | `packages/shell/` |
| `@rslib/core` | `packages/libraries/ui-components/` |
| `@rstest/core` | root `package.json` |

Each tool pins its own version of `@rspack/core`. If they resolve to **different versions**, Bun installs multiple copies in `node_modules/.bun/`. This causes two classes of runtime crash:

**1. `@rspack/binding` version mismatch**
`@rspack/core` ships a native binding (`@rspack/binding`) that must match exactly. If two copies of `@rspack/core` with different versions exist in the same process, you get:
```
Unmatched version @rspack/core@X and @rspack/binding@Y.
The expected version of @rspack/core to the current binding is Y.
```

**2. SWC Wasm plugin ABI mismatch**
SWC plugins (e.g. `@swc/plugin-prefresh`) are native Wasm binaries compiled against a specific version of `swc_core`. If the plugin's compiled `swc_core` doesn't match the one embedded in `@rspack/binding`, you get:
```
failed to invoke plugin on 'Some(...)'
The version of the SWC Wasm plugin you're using might not be compatible with builtin:swc-loader.
The swc_core version of the current rspack_core is X.
```
This is a **binary ABI contract** — no JS shim can fix it.

### How to fix version mismatches

**Step 1 — Align all tools to the same `@rsbuild/core` version.**
`@rslib/core` and `@rstest/core` declare a specific `@rsbuild/core` range internally. Pick the highest stable `@rsbuild/core` that satisfies all of them and set it everywhere.

**Step 2 — Add `overrides` in root `package.json` to enforce deduplication.**
Bun respects `overrides` across the entire workspace tree:
```json
"overrides": {
  "@rsbuild/core": "1.7.5",
  "@rspack/core": "1.7.11"
}
```
This collapses all nested copies into a single instance.

**Step 3 — Align `@rslib/core` version across all workspace packages.**
If `ui-components` declares `^0.17.x` but `shared` declares `^0.19.x`, Bun installs two copies of `@rslib/core` each dragging its own `@rsbuild/core`. Pin both to the same range.

**Step 4 — Fix SWC plugin compatibility.**
After changing `@rspack/core`, check which `swc_core` version it embeds:
```
The swc_core version of the current rspack_core is X.
```
Then find the `@swc/plugin-prefresh` (or any other SWC plugin) major version compiled against that `swc_core`. This is done by upgrading the plugin's parent — in this project `@rsbuild/plugin-preact` — to a version that declares a compatible `@swc/plugin-prefresh` range.

**Step 5 — Delete all `node_modules` and reinstall.**
Bun's `node_modules/.bun/` directory caches symlinks. Old versioned copies survive a plain `bun install` because the lockfile entries were removed but the physical directories remain. Always do a full clean when resolving toolchain version conflicts:
```bash
rm -rf node_modules packages/shell/node_modules packages/libraries/ui-components/node_modules
bun install
```
Verify only one copy exists after install:
```bash
ls node_modules/.bun/ | grep rspack+core
# must show exactly one entry
```

### Current pinned versions

| Package | Version | Reason |
| --- | --- | --- |
| `@rsbuild/core` | `1.7.5` | Latest stable; satisfies `@rslib/core@0.19.x` (`~1.7.0`) |
| `@rspack/core` | `1.7.11` | Bundled by `@rsbuild/core@1.7.5` (`~1.7.10`) |
| `@rslib/core` | `0.19.1` | Requires `@rsbuild/core ~1.7.0` — must be aligned across ui-components AND shared |
| `@module-federation/enhanced` | `0.24.1` | Last version before the 2.x breaking rewrite |
| `@rsbuild/plugin-preact` | `1.7.2` | Brings `@swc/plugin-prefresh@^12.7.0` compatible with `swc_core@59.x` |

> **Rule:** when upgrading any tool in this chain, always upgrade ALL of them together and verify with `ls node_modules/.bun/ | grep rspack+core` that a single copy exists.

## Docker (Local Development Only)

Docker is for local development ONLY — it does NOT replace CI/CD (GitHub Actions) or production deployment (Cloudflare Pages). All commands use `docker compose` CLI — no Docker Desktop required.

### Architecture

```
docker-compose.yml
├── ui-components   (:3001)  — MF remote, starts FIRST
├── shell           (:3002)  — host app, depends_on ui-components healthy
└── prod            (:8080)  — nginx serving production build (profile: production)
```

### Files

| File | Purpose |
| --- | --- |
| `Dockerfile` | Multi-stage: base (bun:1.3) → deps → build → serve (nginx:alpine) |
| `docker-compose.yml` | 3 services with healthchecks and dependency ordering |
| `docker/nginx.conf` | SPA routing, MF asset caching, security headers, /health endpoint |
| `.dockerignore` | Excludes node_modules, dist, .git, IDE, Nx cache, test artifacts |

### Key Design Decisions

1. **`--host 0.0.0.0` in compose commands** — Rsbuild v2 defaults to `localhost`. Inside Docker, `localhost` = container only. Dev servers MUST listen on `0.0.0.0` for port mapping to work.
2. **Named volumes for `node_modules`** — Host `node_modules/` has wrong-platform native binaries (Rspack, SWC). NEVER mount host modules into Linux container.
3. **Browser accesses `localhost`** — `PUBLIC_BUCKET_URL=http://localhost:3001` because the browser runs on the HOST, not inside a container. Docker port mapping exposes container ports to host.
4. **E2E runs on HOST** — Playwright runs on the host machine against Docker services. Not inside a container.
5. **`postinstall` creates `.env` files** — `bun install` inside the container triggers `scripts/setup-env.ts` automatically.

### Troubleshooting

```bash
# Ports already in use — kill everything first
kill $(lsof -t -i :3001 -i :3002 -i :8080) 2>/dev/null

# Full clean (removes volumes + images)
bun run docker:clean

# Rebuild from scratch (no cache)
docker compose build --no-cache
```

## E2E Testing

### How `bun run e2e` Works

`bun run e2e` → `nx run web:e2e` → Nx orchestrates:
1. Starts `ui-components` dev server (:3001)
2. Starts `shell` dev server (:3002)
3. Runs `bunx bddgen && bunx playwright test`

**CRITICAL**: Kill any existing servers on :3001/:3002 BEFORE running `bun run e2e`. If ports are occupied, Nx tries alternative ports (3004) and crashes with `EADDRINUSE`.

```bash
# Always do this before bun run e2e:
kill $(lsof -t -i :3001 -i :3002) 2>/dev/null
```

### Cache Problems

When the app shows infinite skeleton/shimmer and MF components never load:

```bash
# Nuclear cache clean
bunx nx reset
rm -rf .nx/cache packages/shell/node_modules/.cache packages/libraries/ui-components/node_modules/.cache
```

### Known Playwright Patterns for This Project

| Pattern | Problem | Solution |
| --- | --- | --- |
| `[role="application"]` not found | `<section>` has implicit role `region`, not `application` | Use `section[aria-label="..."]` |
| `waitForLayout()` timeout | Lazy MF components not yet rendered | Wait for ALL elements: app, centerPanel, header, sidebar, bottomBar, nextButton |
| `intercepts pointer events` | Grid layout overlap — center panel covers nav buttons | Use `dispatchEvent("click")` instead of `.click()` |
| `aria-current` mismatch | Sidebar uses `"step"` not `"true"` | Check actual component implementation |
| `toBeHidden()` on disabled button | `disabled:opacity-30` is still visible to Playwright | Use `toBeDisabled()` instead |
| Console error double-navigation | Then step re-navigates after Given already loaded | Don't navigate in Then if Given already did |
| `getByRole("switch")` not matching | `<button role="switch">` doesn't expose `switch` role reliably | Use `locator('[aria-label="..."]')` |
| TYPE-001 DTS error | MF type generation fails | Cosmetic — does NOT affect runtime. Ignore. |
| Prefresh error in Firefox | `can't access property "key"` | HMR cosmetic error. Ignore. |
| Swipe/touch simulation | Playwright `dispatchEvent` creates plain Events, not real TouchEvents — `e.touches[0]` is undefined | Use `page.evaluate` with `new Touch()` + `new TouchEvent()` for native touch simulation |
| Ref null inside Suspense | `useEffect` depending on a ref to an element inside `<Suspense>` — ref is null on mount, listeners never attached | Move the ref target element OUTSIDE the `<Suspense>` boundary |

## Spec-Driven Development (OpenSpec)

This project uses [OpenSpec](https://openspec.dev/) for spec-driven development.

### Artifact Store

| Mode | Location |
| --- | --- |
| **openspec** | `openspec/` directory in repo (checked in) |

> Artifacts live in the codebase. Commit them alongside code changes.

### Directory Structure

```
openspec/
├── specs/                  # Living specs — source of truth for system behavior
│   └── <domain>/
│       └── spec.md
└── changes/                # One folder per in-progress change
    └── <change-name>/
        ├── proposal.md     # Intent + scope
        ├── design.md       # Technical approach
        ├── tasks.md        # Implementation checklist
        └── specs/          # Delta specs (what changes in this PR)
            └── <domain>/
                └── spec.md
```

### Slash Commands (OpenCode)

| Command | Action |
| --- | --- |
| `/opsx:propose <name>` | Create proposal + full artifacts in one shot |
| `/opsx:new <name>` | Start a new change (proposal only) |
| `/opsx:ff <name>` | Fast-forward: create specs, design, tasks from proposal |
| `/opsx:continue <name>` | Create next artifact in the chain |
| `/opsx:apply` | Implement tasks from the current change |
| `/opsx:verify` | Validate implementation against specs and tasks |
| `/opsx:archive` | Merge delta specs into `openspec/specs/` and archive change |
| `/opsx:explore <topic>` | Research a topic before committing to a change |
| `/opsx:sync` | Sync all pending delta specs into main specs |
| `/opsx:bulk-archive` | Archive multiple completed changes at once |
| `/opsx:onboard` | Generate onboarding context from existing specs |

### Workflow

```
/opsx:propose ──► /opsx:apply ──► /opsx:archive        (quick path)

/opsx:new ──► /opsx:ff ──► /opsx:apply ──► /opsx:verify ──► /opsx:archive  (full path)
```

### Rules

- ALWAYS commit `openspec/` changes alongside implementation code
- Delta specs in `openspec/changes/<name>/specs/` are NOT the main specs — they are merged on archive
- NEVER manually edit `openspec/specs/` directly — only `/opsx:archive` or `/opsx:sync` should do that
- When starting a new feature, check `openspec list` first to see active changes

## Commit Convention

```
feat(ui-components): add Button atom with CVA variants
fix(shell): resolve MF remote URL in production
chore(deps): upgrade rspack to 1.3.0
test(ui-components): add Input atom unit tests
refactor(shared): extract env helpers to dedicated module
```

Enforced by Lefthook + commitlint. Never skip hooks without a critical reason.
