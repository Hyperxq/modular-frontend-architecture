---
name: rstest
description: >
  Rstest patterns for Rspack-native unit testing with Preact.
  Trigger: When writing tests with @rstest/core, testing-library/preact, or configuring rstest.config.ts.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Rstest Skill

## Critical Rules

- ALWAYS import from `@rstest/core` — NEVER from `vitest` or `jest`
- Use `@testing-library/preact` — NEVER `@testing-library/react`
- JSX runtime is Preact: `"jsxImportSource": "preact"` in tsconfig — NEVER React
- `cleanup()` is called automatically via setup file — but know it must be in `afterEach`
- `vi` is the mock API (same as vitest) — imported from `@rstest/core`
- `globals: true` in config means `describe/it/expect` are available globally, but prefer explicit imports

---

## Config Pattern

```ts
// rstest.config.ts
import { pluginPreact } from "@rsbuild/plugin-preact";
import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig } from "@rstest/core";

export default defineConfig({
  globals: true,
  testEnvironment: "jsdom",
  setupFiles: ["./rstest.setup.ts"],
  plugins: [pluginPreact(), pluginSass()],
  exclude: ["node_modules", "automation_test/**"],
});
```

---

## Setup File Pattern

```ts
// rstest.setup.ts
import { afterEach, expect } from "@rstest/core";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/preact";

afterEach(() => cleanup());
expect.extend(jestDomMatchers);
```

---

## Component Test Pattern

```ts
import { describe, it, expect, beforeEach } from "@rstest/core";
import { render, screen, fireEvent } from "@testing-library/preact";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("renders initial count", () => {
    render(<Counter initialCount={0} />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments on button click", () => {
    render(<Counter initialCount={0} />);
    fireEvent.click(screen.getByRole("button", { name: /increment/i }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

---

## Async Test Pattern

```ts
import { describe, it, expect } from "@rstest/core";
import { render, screen, waitFor } from "@testing-library/preact";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
  it("loads user data asynchronously", async () => {
    render(<UserProfile userId="1" />);

    // findBy* = getBy* + waitFor (auto-retries)
    const name = await screen.findByText("John Doe");
    expect(name).toBeInTheDocument();
  });

  it("shows error state", async () => {
    render(<UserProfile userId="invalid" />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});
```

---

## Mocking Pattern

```ts
import { describe, it, expect, vi, beforeEach } from "@rstest/core";

// Module mock
vi.mock("../services/api", () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: "1", name: "John" }),
}));

// Spy on method
import * as api from "../services/api";

describe("mocking", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls fetchUser with correct id", async () => {
    const spy = vi.spyOn(api, "fetchUser").mockResolvedValue({ id: "1", name: "Jane" });

    await api.fetchUser("1");

    expect(spy).toHaveBeenCalledWith("1");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("uses vi.fn for callbacks", () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);

    fireEvent.input(screen.getByRole("textbox"), { target: { value: "hello" } });

    expect(onChange).toHaveBeenCalledWith("hello");
  });
});
```

---

## Commands

```bash
bun run test             # run all tests
bun run test --watch     # watch mode
bun run test --coverage  # coverage report
```

---

## Keywords

rstest, testing, preact, unit test, jsdom, testing-library, @rstest/core, vitest-compatible, component test, mocking, vi.mock, vi.fn, vi.spyOn, waitFor, findBy, fireEvent, screen
