import { createHandlers } from "./handlers";
import { resolveMockConfig } from "./mock.config";

export async function initMocking() {
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

  if(!isBrowser) return null;

  const { setupWorker } = await import("msw/browser");

  const config = resolveMockConfig();
  const worker = setupWorker(...createHandlers(config));

  await worker.start({
    onUnhandledRequest: config.onUnhandled,
    serviceWorker: {
      url: "/mockServiceWorker.js"
    }
  })
}
