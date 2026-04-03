---
name: rslib
description: >
  Rslib library build tool patterns for Rspack-based component libraries.
  Trigger: When configuring rslib.config.ts, library builds, Module Federation remotes, or dynamic entry discovery.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Rslib Skill

## What is Rslib?

Rslib is a library build tool built on top of Rspack (Rust-based bundler). It replaces Rollup/Vite for library authors that need fast builds, Module Federation support, and fine-grained output control.

**Keywords**: rslib, rspack, library, module federation, build, dynamic entries, fast-glob

---

## Critical Rules (NEVER violate these)

- ALWAYS use `defineConfig` from `@rslib/core` — not a plain object export
- NEVER manually register component entries — use `fast-glob` auto-discovery
- ALWAYS exclude test files from source: `exclude: [/\.spec\.(ts|tsx|js|jsx)$/]`
- ALWAYS use `tsconfig.build.json` (not the root `tsconfig.json`) for library builds — avoids pulling in test types and dev-only paths
- `dts` generation MUST be conditional on `isLocalEnv` — skipping it in CI cuts build time significantly
- `format: "mf"` is required for Module Federation remote builds
- **ALL dependencies MUST be `peerDependencies`** — the output bundles ZERO runtime code. Shell provides everything at runtime via MF shared config
- **NEVER create a barrel `index.ts`** that re-exports all components — each component is its own independent entry
- **Output must be fully flat and light** — one file per component, no shared chunks between components

---

## Output Targets (ui-components specific)

`ui-components` has THREE output targets, each for a different consumer:

| Output | Format | Consumer | How |
|--------|--------|----------|-----|
| Module Federation | `mf` | `shell` at runtime | MF remote URL, Preact singleton shared |
| Import Maps | `esm` | Browsers with native import maps | `<script type="importmap">` |
| Web Components | custom | Any framework or vanilla HTML | `@r2wc/react-to-web-component` wrapper |

Each component is its own independent entry — importing ONE component loads NOTHING else:
```ts
// ✅ Only Button is loaded — zero side effects on other components
import Button from "ui_components/atoms/Button/Button"
```

## Output Formats (general)

| Format | Use case |
|--------|----------|
| `esm` | Standard npm package (tree-shakeable) |
| `cjs` | CommonJS consumers (Node, legacy bundlers) |
| `mf` | Module Federation remote (runtime sharing) |

---

## Config Structure

### `rslib.config.ts` — base pattern

```ts
import { defineConfig, type RslibConfig } from "@rslib/core";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginEntries } from "./scripts/plugin-entries";
import { mfConfig } from "./mf.config";

const COMPONENTS_PATH = ["./lib/components/**/*.tsx"];

export default defineConfig(({ envMode = "development.local" }) => {
  const isLocalEnv = envMode === "development.local";

  return {
    lib: [
      {
        format: "mf",
        // Only generate .d.ts locally — CI doesn't need them, skip to save time
        dts: isLocalEnv ? { distPath: "./dist/@mf-types" } : false,
        output: {
          distPath: { root: "./dist/mf" },
          cleanDistPath: true,
          filenameHash: true,
          sourceMap: isLocalEnv ? { js: "cheap-module-source-map" } : false,
        },
      },
    ],
    source: {
      entry: pluginEntries(COMPONENTS_PATH),
      exclude: [/\.spec\.(ts|tsx|js|jsx)$/],
      tsconfigPath: "./tsconfig.build.json",
    },
    output: {
      target: "web",
    },
    plugins: [
      pluginPreact(),
      pluginSass(),
      pluginNodePolyfill(),
      pluginModuleFederation(mfConfig),
    ],
  };
});
```

### Multi-format output (esm + cjs)

```ts
lib: [
  { format: "esm", dts: true },
  { format: "cjs", dts: false },
],
```

---

## Dynamic Entry Discovery

NEVER hardcode component entries. Use `fast-glob` to auto-discover all `.tsx` files and map them to entry names.

### `scripts/plugin-entries.ts`

```ts
import fg from "fast-glob";

/**
 * Auto-discovers all .tsx component files and maps them to rslib entries.
 * Input:  "./lib/components/atoms/Button/Button.tsx"
 * Output: { "atoms/Button/Button": "./lib/components/atoms/Button/Button.tsx" }
 */
export function pluginEntries(patterns: string[]): Record<string, string> {
  const files = fg.sync(patterns);

  return Object.fromEntries(
    files.map((file) => [
      file
        .replace(/^\.\/lib\/components\//, "")
        .replace(/\.tsx$/, ""),
      file,
    ])
  );
}
```

**Why**: Manual entry registration creates drift — someone adds a component, forgets to register it, and the build silently omits it. Auto-discovery eliminates that class of bug.

---

## LEVEL_MODE Pattern

`LEVEL_MODE` is an environment variable (values: `1`, `2`, `3`) that controls which Atomic Design levels are included in the build output. This allows partial builds for performance or incremental delivery.

```ts
// scripts/plugin-entries.ts
const LEVEL_MODE = Number(process.env.LEVEL_MODE ?? 3);

const LEVEL_PATHS: Record<number, string[]> = {
  1: ["./lib/components/atoms/**/*.tsx"],
  2: ["./lib/components/atoms/**/*.tsx", "./lib/components/molecules/**/*.tsx"],
  3: [
    "./lib/components/atoms/**/*.tsx",
    "./lib/components/molecules/**/*.tsx",
    "./lib/components/organisms/**/*.tsx",
  ],
};

export function pluginEntries(
  patterns: string[] = LEVEL_PATHS[LEVEL_MODE] ?? LEVEL_PATHS[3]
): Record<string, string> {
  const files = fg.sync(patterns);
  return Object.fromEntries(
    files.map((file) => [
      file.replace(/^\.\/lib\/components\//, "").replace(/\.tsx$/, ""),
      file,
    ])
  );
}
```

| `LEVEL_MODE` | Includes |
|---|---|
| `1` | Atoms only |
| `2` | Atoms + Molecules |
| `3` | Atoms + Molecules + Organisms (default) |

---

## DTS Generation

Type declarations are expensive at build time. Gate them on environment:

```ts
// Local dev: generate types for MF type-sharing
dts: isLocalEnv ? { distPath: "./dist/@mf-types" } : false,

// npm package: always ship types
dts: { distPath: "./dist/types" },

// CI pipeline: skip if types are pre-built or not needed
dts: false,
```

---

## tsconfig.build.json

Library builds require a dedicated tsconfig that excludes test files and dev paths:

```json
{
  "extends": "./tsconfig.json",
  "exclude": [
    "node_modules",
    "dist",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.test.ts",
    "**/*.test.tsx"
  ],
  "compilerOptions": {
    "rootDir": "./lib"
  }
}
```

Always point `source.tsconfigPath` to this file, not the root `tsconfig.json`.

---

## Commands

```bash
# Production build
rslib build

# MF dev server (local env mode)
rslib mf-dev --env-mode development.local

# Watch mode (development)
rslib build --watch

# Debug: inspect final resolved config
rslib inspect --verbose

# Partial builds via LEVEL_MODE
LEVEL_MODE=1 rslib build        # atoms only
LEVEL_MODE=2 rslib build        # atoms + molecules
LEVEL_MODE=3 rslib build        # full build (default)
```

---

## Module Federation Config (`mf.config.ts`)

Keep MF config in a separate file for clarity:

```ts
import type { ModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export const mfConfig: ModuleFederationConfig = {
  name: "my_remote",
  exposes: {
    // entries are auto-discovered — this is populated dynamically
  },
  shared: {
    preact: { singleton: true, requiredVersion: "^10" },
    "preact/hooks": { singleton: true },
  },
};
```

**Note**: When using dynamic entry discovery, `exposes` can be derived from `pluginEntries()` output to keep them in sync automatically.

---

## Common Gotchas

- `filenameHash: true` in production prevents browser caching issues; disable it for local MF dev if the host app uses a static remote URL
- `cleanDistPath: true` wipes `dist/` before each build — do NOT write custom files there between builds
- `pluginNodePolyfill()` is needed when library code uses Node builtins (`Buffer`, `process.env`, etc.) and targets the browser
- `sourceMap: false` in CI reduces artifact size; only enable locally for debugging
- The `--env-mode` flag sets `envMode` in the `defineConfig` callback — always default it (`envMode = "development.local"`) to avoid undefined crashes
