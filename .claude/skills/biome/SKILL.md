---
name: biome
description: >
  Biome 2 linting and formatting patterns for this monorepo.
  Trigger: When linting, formatting, fixing Biome errors, configuring biome.json, or understanding code style rules.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Fixing Biome lint errors or warnings
- Configuring `biome.json` for a new package
- Understanding why a rule is flagging your code
- Deciding how to suppress a rule (escape hatch)
- Running lint/format commands across the monorepo

## Critical Rules

These are the rules that bite most often. Know them cold.

### `noExplicitAny` — ERROR

**Never** use `any`. There is no exception without a documented reason.

```ts
// WRONG
function parse(data: any) { ... }

// RIGHT
function parse(data: unknown) { ... }
function parse(data: Record<string, string>) { ... }
```

### `noCommonJs` — ERROR

ESM only. No `require()`, no `module.exports`. This is a hard project rule.

```ts
// WRONG
const fs = require('fs')
module.exports = { foo }

// RIGHT
import fs from 'fs'
export { foo }
```

### `useComponentExportOnlyModules` — ERROR

A file that exports a React component must export **only** components. No utility functions, no constants, no helpers alongside a component.

```ts
// WRONG — helper lives in the same file as the component
export function formatDate(d: Date) { ... }       // utility
export function UserCard({ name }: Props) { ... } // component

// RIGHT — move the helper to its own file
// utils/formatDate.ts
export function formatDate(d: Date) { ... }

// components/UserCard.tsx
export function UserCard({ name }: Props) { ... }
```

### `useConst` — ERROR

Use `const` by default. Only use `let` if the variable is actually reassigned.

```ts
// WRONG
let config = { timeout: 3000 }

// RIGHT
const config = { timeout: 3000 }

// let is OK here — it IS reassigned
let count = 0
count++
```

### `organizeImports` — ON (auto)

Biome auto-sorts imports on `--write`. Do not manually fight the order — it will be overwritten on the next format pass.

### `useExhaustiveDependencies` — WARN

Missing hook dependencies trigger a warning. Either add the dep or suppress with a documented reason (see escape hatch section).

### `useHookAtTopLevel` — ERROR

Hooks must be called unconditionally at the top level of a component or custom hook. No hooks inside `if`, loops, or nested functions.

## Common Errors and Fixes

| Error | Rule | Fix |
|-------|------|-----|
| `any` type | `noExplicitAny` | Replace with specific type or `unknown` |
| `require()` call | `noCommonJs` | Use `import` instead |
| `let x = 1` (never reassigned) | `useConst` | Use `const x = 1` |
| Component file exports a helper | `useComponentExportOnlyModules` | Move helper to a separate util file |
| Unused variable | `noUnusedVariables` | Remove it, or prefix with `_` to signal intentional |
| Missing hook deps | `useExhaustiveDependencies` | Add the dep or use `biome-ignore` with reason |
| Hook inside `if` | `useHookAtTopLevel` | Move hook to top level unconditionally |

## Per-Package Config

Every package has a minimal `biome.json` that inherits **all** root rules:

```json
{
  "root": false,
  "extends": "//"
}
```

`"extends": "//"` means "root of the monorepo". This pulls in the full root `biome.json`.

**Never duplicate rules in the per-package config.** If you need a package-level override, add only the delta — but prefer fixing the code instead.

## Escape Hatch — Suppressing a Rule

Only suppress when there is genuinely no better option. Always include a reason — Biome will error if the comment is empty.

```ts
// biome-ignore lint/suspicious/noExplicitAny: external lib returns untyped data
const data: any = externalLib.getData()

// biome-ignore lint/correctness/useExhaustiveDependencies: intentional — effect must run only on mount
useEffect(() => {
  fetchData()
}, [])
```

Rule identifiers follow the pattern `lint/{category}/{ruleName}`. Find the exact identifier in the Biome error output.

## Commands

### Per-package (run from within the package)

```bash
bun run lint          # biome check . — report errors
bun run lint:fix      # biome check --write . — auto-fix
bun run format        # biome format . — report formatting issues
bun run format:fix    # biome format --write . — auto-format
```

### Monorepo root (via Nx, excludes `web`)

```bash
bun run lint          # nx run-many --target=lint --all --exclude=web
bun run lint:fix      # nx run-many --target=lint:fix --all --exclude=web
bun run format        # nx run-many --target=format --all --exclude=web
bun run format:fix    # nx run-many --target=format:fix --all --exclude=web
```

## Excluded Paths

These paths are excluded from linting (configured at root):

- `mocks/` — test mocks
- `packages/shell/@mf-types/**` — auto-generated Module Federation types
- `commitlint.config.js` — uses CJS intentionally
- `node_modules`, `dist`, `coverage`

Do not add `biome-ignore` comments to files in these paths — they are already excluded.

## Formatting Defaults (root)

| Setting | Value |
|---------|-------|
| Indentation | Tabs |
| Line width | 100 |
| Quote style (JS/TS) | Double |
| Import organization | Auto (on save/write) |

These apply everywhere via inheritance. Do not override formatting per-package without a strong reason.
