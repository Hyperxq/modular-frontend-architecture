import { http, HttpResponse, passthrough } from "msw";
import type { MockConfig } from "../core/mock.config";
import type { MockRouteKey } from "../core/types";

// ---------------------------------------------------------------------------
// Mock data — mirrors JSONPlaceholder /posts structure
// ---------------------------------------------------------------------------

export interface MockPost {
	id: number;
	userId: number;
	title: string;
	body: string;
}

const posts: MockPost[] = [
	{
		id: 1,
		userId: 1,
		title: "Module Federation in Practice",
		body: "Runtime module sharing enables independent deployment of micro-frontends.",
	},
	{
		id: 2,
		userId: 1,
		title: "Why Rspack over Webpack",
		body: "Rust-based bundler delivers 10x faster builds with webpack-compatible API.",
	},
	{
		id: 3,
		userId: 2,
		title: "Preact vs React",
		body: "3KB runtime with full React compatibility via compat layer.",
	},
];

// ---------------------------------------------------------------------------
// Handlers — only PATHS, domain comes from baseUrl (PUBLIC_GATEWAY_BACKEND)
// ---------------------------------------------------------------------------

function shouldMock(config: MockConfig, key: MockRouteKey): boolean {
	return !config.ommitedKeys.has(key);
}

export function postHandlers(config: MockConfig, baseUrl: string) {
	const url = (path: string) => `${baseUrl}${path}`;

	return [
		// GET /posts — list all
		http.get(url("/posts"), () => {
			if (!shouldMock(config, "GET_POSTS")) return passthrough();
			return HttpResponse.json(posts);
		}),
	];
}
