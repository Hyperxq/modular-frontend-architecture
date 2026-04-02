---
name: preact
description: >
  Preact 10 patterns with React-compat and Module Federation singleton setup.
  Trigger: When writing Preact components, hooks, types, or configuring Preact in Rsbuild/Rslib/Rstest.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Writing Preact functional components or custom hooks
- Importing hooks, types, or JSX utilities
- Configuring Rsbuild / Rslib / Rstest for Preact
- Setting up Module Federation shared config
- Using `forwardRef` or any compat bridge
- Reviewing or fixing JSX transform issues

## Architecture Rules (READ BEFORE WRITING ANY COMPONENT)

This project has a strict separation between `shell` (smart) and `ui-components` (dumb).

### `ui-components` — display only
- **NEVER** import or create Zustand stores
- **NEVER** add business logic, auth, routing, or A/B testing
- **MAY** consume React Context — but the Provider ALWAYS lives in `shell`
- Receives ALL data and callbacks via **props** or **context from shell**
- All dependencies are `peerDependencies` — the component output bundles NOTHING

### `shell` — smart layer
- Owns Zustand stores, Context providers, auth, routing, business logic
- Reads from Zustand, passes data DOWN to `ui-components` via props or context
- Never lets `ui-components` reach back up for data

### State decision tree
```
Need global app state?          → Zustand store in shell, passed as prop to component
Need to share across subtree?   → Context provider in shell, useContext in component
Need local UI state?            → useState / useReducer inside the component (fine in ui-components)
Need to trigger app logic?      → Callback prop passed from shell to component
```

---

## Critical Patterns

### 1. tsconfig — ALWAYS `jsxImportSource: preact`

Every `tsconfig.json` in the monorepo must include:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

**Never** use `"jsxImportSource": "react"`. This project does NOT import the React namespace.

---

### 2. Imports — source of truth

```ts
// ✅ Hooks → preact/hooks
import { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, createContext } from "preact/hooks";

// ✅ Core types and primitives → preact
import { h, Fragment, createRef, cloneElement } from "preact";
import type { FunctionalComponent, ComponentChildren, VNode, RefObject } from "preact";

// ✅ forwardRef, memo, lazy, Suspense → preact/compat
import { forwardRef, memo, lazy, Suspense } from "preact/compat";

// ❌ NEVER — even though react is aliased, don't import it directly
import React from "react";
import { useState } from "react";
import type { FC } from "react";
```

---

### 3. Functional Component pattern

```tsx
import type { FunctionalComponent, ComponentChildren } from "preact";
import { useState } from "preact/hooks";

interface CardProps {
  title: string;
  children: ComponentChildren;
  onClose?: () => void;
}

export const Card: FunctionalComponent<CardProps> = ({ title, children, onClose }) => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
      {onClose && (
        <button type="button" onClick={() => { setOpen(false); onClose(); }}>
          Close
        </button>
      )}
    </div>
  );
};
```

---

### 4. Hooks pattern

```tsx
import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import type { RefObject } from "preact";

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// useRef with type
const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
```

---

### 5. forwardRef pattern

```tsx
import { forwardRef } from "preact/compat";
import type { Ref } from "preact";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, onChange }, ref) => (
    <label>
      {label}
      <input
        ref={ref}
        value={value}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
      />
    </label>
  )
);
```

---

### 6. Signals (optional, if @preact/signals is installed)

```ts
import { signal, computed, effect } from "@preact/signals";

const count = signal(0);
const doubled = computed(() => count.value * 2);

effect(() => {
  console.log("count changed:", count.value);
});

// In component — signal auto-subscribes on read
export const Counter: FunctionalComponent = () => (
  <button type="button" onClick={() => count.value++}>
    {count} × 2 = {doubled}
  </button>
);
```

---

## Types Reference

| Type | From | Usage |
|------|------|-------|
| `FunctionalComponent<P>` | `preact` | Function components (replaces `React.FC`) |
| `ComponentChildren` | `preact` | `children` prop type (replaces `React.ReactNode`) |
| `VNode` | `preact` | JSX element return type |
| `RefObject<T>` | `preact` | Return type of `useRef<T>()` |
| `JSX.CSSProperties` | `preact` | Inline style object (replaces `React.CSSProperties`) |
| `Ref<T>` | `preact` | Accepts both callback refs and `RefObject<T>` |
| `ComponentType<P>` | `preact` | Union of FC and class component types |

---

## Key Differences from React

| React | Preact equivalent |
|-------|-------------------|
| `React.FC<P>` | `FunctionalComponent<P>` from `preact` |
| `React.ReactNode` | `ComponentChildren` from `preact` |
| `React.CSSProperties` | `JSX.CSSProperties` from `preact` |
| `import { useState } from "react"` | `import { useState } from "preact/hooks"` |
| `import { forwardRef } from "react"` | `import { forwardRef } from "preact/compat"` |
| `class` attribute | Both `class` and `className` work (compat normalizes) |
| `React.createElement` | `h` from `preact` (but rarely needed directly) |
| `React.Fragment` | `Fragment` from `preact` or `<>...</>` shorthand |

---

## Module Federation — Singleton (CRITICAL)

Preact **must** be configured as singleton in all MF hosts and remotes. Duplicate Preact runtimes cause hooks to silently break.

```ts
// rsbuild.config.ts / rslib.config.ts
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default {
  plugins: [
    pluginModuleFederation({
      name: "my_app",
      shared: {
        preact: {
          singleton: true,
          requiredVersion: "^10.0.0",
        },
        "preact/hooks": {
          singleton: true,
          requiredVersion: "^10.0.0",
        },
        "preact/compat": {
          singleton: true,
          requiredVersion: "^10.0.0",
        },
        "preact/jsx-runtime": {
          singleton: true,
          requiredVersion: "^10.0.0",
        },
      },
    }),
  ],
};
```

---

## Build Config — pluginPreact() is mandatory

`pluginPreact()` must be present in **every** `rsbuild.config.ts`, `rslib.config.ts`, and `rstest.config.ts`. Without it, JSX transform breaks and HMR won't work correctly.

```ts
// rsbuild.config.ts
import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";

export default defineConfig({
  plugins: [pluginPreact()],
});
```

```ts
// rstest.config.ts
import { defineConfig } from "@rstest/core";
import { pluginPreact } from "@rsbuild/plugin-preact";

export default defineConfig({
  plugins: [pluginPreact()],
  // ... test config
});
```

---

## Commands

```bash
bun run dev      # dev server with Preact HMR
bun run test     # runs rstest with pluginPreact()
bun run build    # rslib/rsbuild build with Preact
bun run typecheck  # tsc --noEmit — validates jsxImportSource
```

---

## Common Mistakes to Avoid

- **Importing hooks from `"react"`** — fails silently or throws; always use `"preact/hooks"`
- **Missing `pluginPreact()` in rstest** — tests can't parse JSX
- **Duplicate Preact in MF** — hooks state is lost across remote boundary; always `singleton: true`
- **Using `React.FC`** — use `FunctionalComponent<P>` from `preact` instead
- **`jsxImportSource: "react"` in any tsconfig** — breaks the entire JSX transform for that package
