---
name: nx
description: >
  Nx monorepo task orchestration patterns for running, caching, and coordinating builds.
  Trigger: When running nx commands, adding targets to project.json, configuring nx.json, or understanding task dependencies.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Running tasks across packages in this monorepo
- Adding a new target to any `project.json`
- Configuring task dependencies with `dependsOn`
- Understanding why a task was skipped (cache hit)
- Debugging task orchestration order

---

## Critical Rules

- **Nx is ONLY a task runner here** — no Nx generators, no Nx code-gen plugins. Never suggest `nx generate` or `nx g`.
- **Never run `nx run web:dev` directly** — always use `bun run dev`. The root `package.json` script handles full orchestration and is the source of truth.
- **`dependsOn` controls order** — if a target needs another target to finish first, declare it. Missing `dependsOn` = race condition.
- **`cacheableOperations`** — `build`, `lint:fix`, `format:fix`, `test` are cached. If inputs haven't changed, Nx skips execution entirely. This is intentional — don't fight it.
- **`readyWhen`** — for long-running dev servers, Nx uses this string in stdout to know when the task is "ready" before unblocking dependents. Only applies to `nx:run-commands` executor with persistent processes.

---

## Package Names in This Project

| Package | Role |
|---------|------|
| `web` | Root orchestrator (project.json at repo root) |
| `shell` | Rsbuild app — MF host |
| `ui-components` | Rslib MF remote library |
| `shared` | Utility library |

---

## Common Commands

| Command | What it does |
|---------|-------------|
| `bun run dev` | ui-components MF dev + shell dev (full orchestration) |
| `bun run dev:mock` | Same but in mock mode |
| `bun run build` | ui-components build → shell build |
| `nx run web:dev` | Same as `bun run dev` (raw Nx — use for debugging only) |
| `nx run shell:dev` | Shell only — no MF remote, fast iteration |
| `nx run ui-components:build` | Library build only |
| `nx run-many --target=lint --all --exclude=web` | Lint all packages except root |
| `nx run-many --target=format:fix --all --exclude=web` | Format fix all packages except root |
| `nx reset` | Clear Nx cache (use when cache is stale or behavior is unexpected) |
| `nx graph` | Visualize task dependency graph in browser |

---

## Task Dependency Pattern

Use `dependsOn` in `project.json` to declare that a target must wait for another target to complete first.

```json
// project.json
{
  "name": "web",
  "targets": {
    "prebuild": {
      "executor": "nx:run-commands",
      "options": {
        "command": "nx run ui-components:build"
      }
    },
    "build": {
      "command": "nx run shell:build",
      "dependsOn": ["prebuild"]
    }
  }
}
```

`build` will NOT start until `prebuild` completes successfully.

For dev servers that need another server "ready" (not just started), combine `dependsOn` with `readyWhen` on the dependency:

```json
{
  "prebuild:dev": {
    "executor": "nx:run-commands",
    "options": {
      "command": "nx run ui-components:dev",
      "readyWhen": "Federated types created correctly"
    }
  },
  "dev": {
    "command": "nx run shell:dev",
    "dependsOn": ["prebuild:dev"]
  }
}
```

Nx watches stdout from `ui-components:dev`. When it sees `"Federated types created correctly"`, it marks `prebuild:dev` as ready and starts `shell:dev`.

---

## Adding a New Target

To add a target that runs a shell command:

```json
// project.json — inside "targets"
"my-target": {
  "executor": "nx:run-commands",
  "options": {
    "command": "some-cli --flag value",
    "cwd": "{projectRoot}"
  }
}
```

To add a target that depends on another:

```json
"my-target": {
  "command": "some-cli",
  "dependsOn": ["other-target"]
}
```

To make a target cacheable, add its name to `cacheableOperations` in `nx.json`:

```json
// nx.json
"tasksRunnerOptions": {
  "default": {
    "options": {
      "cacheableOperations": ["build", "lint:fix", "format:fix", "test", "my-target"]
    }
  }
}
```

---

## Cache Behavior

Nx caches the output of `cacheableOperations` based on the `namedInputs` hash (all files in `{projectRoot}/**/*` excluding `dist/` and `build/`).

**Cache hit** = task is skipped, output is replayed from cache. This is correct behavior — not a bug.

**When to bust the cache:**
- Dependency config changed (e.g., `tsconfig`, `rsbuild.config`) but Nx doesn't detect it
- Cache is corrupted or stale after a big refactor
- Unexpected skips that don't match current state

```bash
nx reset   # clears the local Nx cache
```

---

## readyWhen Pattern

`readyWhen` is only meaningful for long-running processes (dev servers, watchers). It tells Nx:

> "Don't unblock dependents until you see THIS string in stdout."

Without it, Nx would either:
- Start the dependent immediately (race condition — server not ready yet)
- Or treat the task as done when the process exits (which it never does for dev servers)

```json
{
  "executor": "nx:run-commands",
  "options": {
    "command": "nx run ui-components:dev",
    "readyWhen": "Federated types created correctly"
  }
}
```

This string must match exactly what the process prints to stdout.

---

## Parallel Execution

`nx run-many` runs targets across all packages in parallel, bounded by `parallel: 3` in `nx.json`.

```bash
# Run lint across all packages except web, up to 3 in parallel
nx run-many --target=lint --all --exclude=web

# Run build for specific projects
nx run-many --target=build --projects=shell,ui-components
```

Increase `parallel` in `nx.json` to allow more concurrent tasks (limited by CPU/memory).

---

## Debugging Task Order

When orchestration seems wrong:

1. `nx graph` — visualize the dependency graph
2. Check `dependsOn` in the relevant `project.json`
3. Check if a cache hit is skipping a stale task → `nx reset`
4. Run the target directly to isolate: `nx run <project>:<target> --skip-nx-cache`
