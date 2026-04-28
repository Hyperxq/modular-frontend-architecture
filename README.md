# Modular Frontend Architecture

A Preact micro-frontend monorepo using Module Federation, Rspack toolchain, Atomic Design, and Nx as the task orchestrator.

## Prerequisites

- **Node.js >= 24** — use a version manager:
  - `nvm use` (if using [nvm](https://github.com/nvm-sh/nvm))
  - `fnm use` (if using [fnm](https://github.com/Schniz/fnm))
- **Bun >= 1.3.11** — install from [bun.sh](https://bun.sh)

## Getting Started

```bash
# 1. Install dependencies
bun install

# 2. Copy environment file
cp .env.example .env.development.local
# Default values work for local dev with mocks — no changes needed for dev:mock

# 3. Start dev server with MSW mocking
bun run dev:mock

# 4. Or start without mocking (requires real backend)
bun run dev
```

## Stack

| Layer | Technology |
| --- | --- |
| UI Framework | Preact 10 |
| Bundler (app) | Rsbuild + Rspack |
| Bundler (lib) | Rslib + Rspack |
| Package manager | Bun |
| Monorepo | Nx 22 |
| State | Zustand 5 |
| Data fetching | TanStack Query 5 |
| Routing | React Router 7 (via preact/compat) |
| Forms | react-hook-form + Zod 4 |
| Styling | Tailwind CSS 4 + SCSS |
| Testing | Rstest + @testing-library/preact + MSW 2 |

## Packages

| Name | Path | Role |
| --- | --- | --- |
| `shell` | `packages/shell/` | Rsbuild app — MF host (:3002) |
| `ui-components` | `packages/libraries/ui-components/` | Rslib MF remote (:3001) |
| `shared` | `packages/libraries/shared/` | Source-only utilities |

## Commands

```bash
bun run dev           # Start all packages in dev mode
bun run dev:mock      # Start with MSW browser mocking enabled
bun run build         # Build all packages
bun run test          # Run all tests
bun run lint          # Lint all packages
bun run lint:fix      # Auto-fix lint errors
bun run format:fix    # Auto-format all packages
```
