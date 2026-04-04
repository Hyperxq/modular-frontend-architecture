import type { RequestHandler } from "msw";
import { BACKEND_BASE_URL } from "./core/backend";
import type { MockConfig } from "./core/mock.config";
import { normalizeBaseUrl } from "./core/url";
import { postHandlers } from "./domains/posts.mock";
import { userHandlers } from "./domains/users.mock";

// ---------------------------------------------------------------------------
// Collects all domain handlers into a single array.
// Add new domains here — one import + one spread per domain.
// ---------------------------------------------------------------------------

export function createHandlers(
	config: MockConfig,
	baseUrl: string = BACKEND_BASE_URL,
): RequestHandler[] {
	const base = normalizeBaseUrl(baseUrl);

	return [...userHandlers(config, base), ...postHandlers(config, base)];
}
