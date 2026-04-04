import { afterAll, afterEach, beforeAll } from "@rstest/core";
import { setupServer } from "msw/node";
import { createHandlers } from "./handlers";

// ---------------------------------------------------------------------------
// Node-side MSW server for unit/integration tests.
// Exported so individual tests can use server.use() for overrides.
// ---------------------------------------------------------------------------

const TEST_BASE_URL = "https://jsonplaceholder.typicode.com";

export const server = setupServer(
	...createHandlers({ ommitedKeys: new Set(), onUnhandled: "error" }, TEST_BASE_URL),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
