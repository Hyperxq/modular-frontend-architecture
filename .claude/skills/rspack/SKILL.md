---
name: rspack
description: >
  Rspack bundler patterns for Rsbuild/Rslib config customization.
  Trigger: When customizing rspack config via tools.rspack, adding plugins, aliases, or Module Federation setup.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Rspack Skill

## Context7 — Live Docs

Before implementing, fetch current docs via Context7 MCP to avoid stale APIs:
1. `resolve-library-id` → `"rspack"` or `"rsbuild"`
2. `get-library-docs` with resolved ID + your specific topic

---

## Critical Rules

- **NEVER** create a standalone `rspack.config.ts` in this project. All Rspack config lives inside `tools.rspack` callbacks within `rsbuild.config.ts` or `rslib.config.ts`.
- **Always** use `??=` or `||=` to safely initialize nested objects before mutating them.
- **Module Federation remote names MUST use underscores**, not hyphens: `ui_components` (NOT `ui-components`). MF uses the name as a JS identifier — hyphens break it.
- **Preact MUST be shared as `singleton: true`** across MF boundary to prevent duplicate Preact runtimes and hooks state corruption.
- Access built-in Rspack plugins (e.g. `IgnorePlugin`) via the **second argument** `{ rspack }` of the `tools.rspack` callback, NOT from a direct import.

---

## Decision Tree

```
Need to add an alias?        → tools.rspack → config.resolve.alias
Need to exclude files?       → tools.rspack → rspack.IgnorePlugin
Need Module Federation?      → pluginModuleFederation (Rsbuild plugin)
Need custom loader?          → tools.rspack → config.module.rules
```

---

## Patterns

### 1. Alias Override

Use `resolve.alias` to redirect imports — e.g., swap real modules for mocks in test configs.

```ts
// rstest.config.ts or rsbuild.config.ts
import { resolve } from "path";

export default {
  tools: {
    rspack: (config) => {
      config.resolve   ||= {};
      config.resolve.alias ||= {};
      config.resolve.alias["some/path"] = resolve(__dirname, "mocks/mock.tsx");
      return config;
    },
  },
};
```

> `||=` guards against overwriting an existing object reference. Always do this before mutating nested fields.

---

### 2. Plugin — IgnorePlugin (exclude test files from bundle)

Access built-in plugins from the second callback argument `{ rspack }`.

```ts
// rslib.config.ts
export default {
  lib: [ /* ... */ ],
  tools: {
    rspack: (config, { rspack }) => {
      config.plugins ??= [];
      config.plugins.push(
        new rspack.IgnorePlugin({
          resourceRegExp: /\.(spec|test)\.(ts|tsx|js|jsx)$/,
        })
      );
      return config;
    },
  },
};
```

> `??=` only initializes if `undefined` or `null` — safer than `||=` for arrays (avoids replacing an empty array `[]`).

---

### 3. Module Federation

Use `pluginModuleFederation` from `@module-federation/rsbuild-plugin`. This is a Rsbuild-level plugin, NOT a `tools.rspack` plugin.

```ts
// rsbuild.config.ts
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default {
  plugins: [
    pluginModuleFederation({
      name: "ui_components",         // MUST be underscore — this becomes a JS global
      exposes: {
        "./Button": "./src/components/Button/index.tsx",
        "./Input":  "./src/components/Input/index.tsx",
      },
      shared: {
        preact: {
          singleton: true,           // REQUIRED — one Preact instance across MF boundary
          requiredVersion: "^10.0.0",
        },
        "preact/hooks": {
          singleton: true,
          requiredVersion: "^10.0.0",
        },
      },
    }),
  ],
};
```

**Why singleton for Preact?**  
If two MF modules load their own Preact, hooks (useState, useEffect) will throw or silently misbehave. `singleton: true` forces all remotes to share the host's Preact instance.

---

### 4. Custom Loader

```ts
tools: {
  rspack: (config) => {
    config.module      ??= {};
    config.module.rules ??= [];
    config.module.rules.push({
      test: /\.svg$/,
      type: "asset/inline",
    });
    return config;
  },
},
```

---

## Initialization Order

Always initialize nested config paths from outermost to innermost before pushing or assigning:

```ts
// Correct
config.module        ??= {};
config.module.rules  ??= [];
config.module.rules.push({ /* rule */ });

// Wrong — will throw if config.module is undefined
config.module.rules.push({ /* rule */ });
```

---

## Commands

```bash
rsbuild build             # triggers rspack compilation under the hood
rsbuild dev               # dev server with HMR via rspack
rslib build               # library build via rslib → rspack
rslib inspect --verbose   # print the final resolved rspack config (great for debugging)
```

---

## Keywords

rspack, webpack, bundler, module federation, alias, plugins, rsbuild, rslib, IgnorePlugin, tools.rspack, resolve.alias, singleton, preact, jsxImportSource
