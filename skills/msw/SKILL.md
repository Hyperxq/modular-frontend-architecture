---
name: msw
description: >
  Mock Service Worker v2 patterns for browser and Node test environments.
  Trigger: When mocking HTTP requests with MSW, adding handlers, setting up test servers, or configuring service workers.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# MSW v2 — Mock Service Worker

## CRITICAL: MSW v2 vs v1 — NEVER mix them

```ts
// ❌ DEAD — MSW v1 API, do NOT use
res(ctx.json({ data: "value" }))
res(ctx.status(401))

// ✅ MSW v2 — the ONLY correct way
HttpResponse.json({ data: "value" })
HttpResponse.json({ error: "Unauthorized" }, { status: 401 })
```

If you see `res(ctx.*)` anywhere, it is v1 legacy code. Rewrite it.

---

## Decision Tree

```
Need mocks in the browser (dev mode)?   → setupWorker from msw/browser (LAZY import)
Need mocks in tests (Node)?             → setupServer from msw/node
Need a one-off override in a test?      → server.use() inside the test body
Route should hit the real network?      → return passthrough()
Route is not relevant for this test?    → omit it or return passthrough()
```

---

## Browser Setup — ALWAYS lazy import

```ts
// src/mocks/init-mocking.ts
import { createHandlers } from "./handlers";
import { resolveMockConfig } from "./mock.config";

export async function initMocking() {
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) return null;

  // CRITICAL: dynamic import — msw/browser must NEVER be statically imported
  // Static import breaks SSR, Node tests, and build tools that don't expect browser APIs
  const { setupWorker } = await import("msw/browser");

  const config = resolveMockConfig();
  const worker = setupWorker(...createHandlers(config));

  await worker.start({
    onUnhandledRequest: config.onUnhandled,
    serviceWorker: { url: "/mockServiceWorker.js" },
  });

  return worker;
}
```

**Why lazy import?** `msw/browser` registers a Service Worker — that API does not exist in Node. A static import will crash your test runner and SSR builds.

Initialize the service worker file once:

```bash
npx msw init public/
# generates public/mockServiceWorker.js — commit this file
```

---

## Node / Test Setup

```ts
// src/mocks/setup-test-mocking.ts
import { afterAll, afterEach, beforeAll } from "@rstest/core"; // or vitest/jest
import { setupServer } from "msw/node"; // NEVER from msw/browser
import { createHandlers } from "./handlers";

const server = setupServer(
  ...createHandlers({ ommitedKeys: new Set(), onUnhandled: "error" })
);

// lifecycle — all three are REQUIRED
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers()); // ← prevents test pollution
afterAll(() => server.close());

export { server };
```

**Why `resetHandlers()` in `afterEach`?** Any `server.use()` override added during a test survives into the next test if you don't reset. This causes flaky, order-dependent tests.

**Why `onUnhandledRequest: "error"`?** It fails the test immediately when a request has no handler. This forces you to be explicit about every HTTP call and catches missing mocks early.

---

## Handler Factory Pattern

Wrap `http.*` in a factory to centralize config logic (passthrough, omit keys, resolvers):

```ts
// src/mocks/create-handler.ts
import { http, passthrough } from "msw";
import type { ApiRouteKey, MockConfig } from "./types";

export function createHandler(
  method: "get" | "post" | "put" | "patch" | "delete",
  key: ApiRouteKey,
  config: MockConfig,
  baseUrl: string = BACKEND_BASE_URL,
) {
  const url = joinUrl(baseUrl, routePath(key));
  const resolver = routeResultMap[key];

  return http[method](url, ({ request, params }) => {
    // skip this route — let it hit the real network
    if (config.ommitedKeys.has(key)) return passthrough();
    // no resolver registered — passthrough instead of 500
    if (!resolver) return passthrough();

    return resolver({ request, params: params as Record<string, string> });
  });
}
```

Compose all handlers in one place:

```ts
// src/mocks/handlers.ts
import { createHandler } from "./create-handler";
import type { MockConfig } from "./types";

export function createHandlers(config: MockConfig) {
  return [
    createHandler("get", "GET_USER", config),
    createHandler("post", "POST_AUTH", config),
    createHandler("put", "PUT_PROFILE", config),
    createHandler("delete", "DELETE_SESSION", config),
  ];
}
```

---

## Response Patterns

```ts
import { HttpResponse } from "msw";

// JSON response (most common)
HttpResponse.json({ token: "mock-token" })
HttpResponse.json({ token: "mock-token" }, { status: 201 })

// Error responses
HttpResponse.json({ error: "Unauthorized" }, { status: 401 })
HttpResponse.json({ error: "Not Found" }, { status: 404 })
HttpResponse.json({ error: "Internal Server Error" }, { status: 500 })

// Plain text
HttpResponse.text("OK")
HttpResponse.text("error message", { status: 400 })

// Empty body (204 No Content)
new HttpResponse(null, { status: 204 })

// Passthrough — let the real network handle it
import { passthrough } from "msw";
return passthrough();
```

---

## Response Resolver

```ts
// src/mocks/resolvers/auth.resolver.ts
import { HttpResponse } from "msw";
import type { ResolverArgs } from "../types";

export const authResolver = ({ request }: ResolverArgs) => {
  return HttpResponse.json({ token: "mock-token" }, { status: 200 });
};

// Resolver with dynamic params
export const userResolver = ({ params }: ResolverArgs) => {
  const { id } = params;
  return HttpResponse.json({ id, name: "Mock User" });
};

// Resolver reading request body
export const createPostResolver = async ({ request }: ResolverArgs) => {
  const body = await request.json();
  return HttpResponse.json({ id: "new-id", ...body }, { status: 201 });
};
```

---

## Runtime Handler Override (per-test)

Use `server.use()` inside a test to override a handler for that test only.
It is automatically reverted by `server.resetHandlers()` in `afterEach`.

```ts
import { http, HttpResponse } from "msw";
import { server } from "../mocks/setup-test-mocking";

describe("when auth fails", () => {
  it("shows error message", async () => {
    // override just for this test
    server.use(
      http.get("/api/user", () =>
        HttpResponse.json({ error: "Unauthorized" }, { status: 401 })
      )
    );

    // ... render component, assert error UI
  });
});
```

For a permanent override (survives `resetHandlers`), use `server.use()` with `{ once: false }` — but prefer per-test overrides to keep tests independent.

---

## TypeScript Types

```ts
// src/mocks/types.ts
import type { HttpResponseResolver } from "msw";

export interface MockConfig {
  ommitedKeys: Set<ApiRouteKey>;
  onUnhandled: "error" | "bypass" | "warn";
}

export type ResolverArgs = {
  request: Request;
  params: Record<string, string>;
};

export type RouteResolver = (args: ResolverArgs) => Response | Promise<Response>;

export type RouteResultMap = Partial<Record<ApiRouteKey, RouteResolver>>;
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| `res(ctx.json(...))` | Use `HttpResponse.json(...)` |
| `import { setupWorker } from "msw/browser"` (static) | Use dynamic `await import("msw/browser")` |
| `import { setupServer } from "msw/browser"` | Import from `msw/node` in tests |
| No `server.resetHandlers()` in `afterEach` | Add it — test pollution is subtle and brutal |
| No `onUnhandledRequest: "error"` | Add it — silent pass-through hides missing mocks |
| Forgetting to commit `mockServiceWorker.js` | Run `npx msw init public/` and commit the output |

---

## Keywords

msw, mock service worker, http, mocking, handlers, setupServer, setupWorker, HttpResponse, passthrough, testing, request interception, browser mocks, node mocks, service worker, test mocking
