import { afterAll, afterEach, beforeAll } from "@rstest/core";
import { setupServer } from "msw/node";
import { createHandlers } from "./handlers";

const server = setupServer(
  ...createHandlers({
    ommitedKeys: new Set(),
    onUnhandled: "error"
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
