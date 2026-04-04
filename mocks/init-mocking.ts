import type { SetupWorker } from "msw/browser";
import { createHandlers } from "./handlers";
import { resolveMockConfig } from "./core/mock.config";

// ---------------------------------------------------------------------------
// Browser MSW worker — singleton with start/stop for runtime toggle
// ---------------------------------------------------------------------------

let worker: SetupWorker | null = null;

export async function initMocking(): Promise<void> {
	const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
	if (!isBrowser) return;

	const { setupWorker } = await import("msw/browser");

	const config = resolveMockConfig();
	worker = setupWorker(...createHandlers(config));

	await worker.start({
		onUnhandledRequest: config.onUnhandled,
		serviceWorker: { url: "/mockServiceWorker.js" },
	});
}

export async function stopMocking(): Promise<void> {
	if (worker) await worker.stop();
}

export async function startMocking(): Promise<void> {
	if (worker) {
		await worker.start({
			onUnhandledRequest: resolveMockConfig().onUnhandled,
			serviceWorker: { url: "/mockServiceWorker.js" },
		});
	}
}

export function isWorkerActive(): boolean {
	return worker !== null;
}
