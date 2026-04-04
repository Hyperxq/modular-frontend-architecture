import { http, HttpResponse, passthrough } from "msw";
import type { MockConfig } from "../core/mock.config";
import type { MockRouteKey } from "../core/types";

// ---------------------------------------------------------------------------
// Mock data — mirrors JSONPlaceholder /users structure
// ---------------------------------------------------------------------------

export interface MockUser {
	id: number;
	name: string;
	email: string;
	username: string;
}

const users: MockUser[] = [
	{ id: 1, name: "Leanne Graham", email: "sincere@april.biz", username: "Bret" },
	{ id: 2, name: "Ervin Howell", email: "shanna@melissa.tv", username: "Antonette" },
	{ id: 3, name: "Clementine Bauch", email: "nathan@yesenia.net", username: "Samantha" },
];

let nextId = users.length + 1;

// ---------------------------------------------------------------------------
// Handlers — only PATHS, domain comes from baseUrl (PUBLIC_GATEWAY_BACKEND)
// ---------------------------------------------------------------------------

function shouldMock(config: MockConfig, key: MockRouteKey): boolean {
	return !config.ommitedKeys.has(key);
}

const MAX_STRING = 200;

function sanitizeString(value: unknown, fallback: string): string {
	return typeof value === "string" ? value.slice(0, MAX_STRING) : fallback;
}

function parseUserBody(body: Record<string, unknown>): Partial<MockUser> {
	return {
		name: sanitizeString(body.name, "New User"),
		email: sanitizeString(body.email, "new@example.com"),
		username: sanitizeString(body.username, "newuser"),
	};
}

export function userHandlers(config: MockConfig, baseUrl: string) {
	const url = (path: string) => `${baseUrl}${path}`;

	return [
		// GET /users — list all
		http.get(url("/users"), () => {
			if (!shouldMock(config, "GET_USERS")) return passthrough();
			return HttpResponse.json(users);
		}),

		// GET /users/:id — get by id
		http.get(url("/users/:id"), ({ params }) => {
			if (!shouldMock(config, "GET_USER")) return passthrough();
			const user = users.find((u) => u.id === Number(params.id));
			if (!user) return HttpResponse.json({ error: "User not found" }, { status: 404 });
			return HttpResponse.json(user);
		}),

		// POST /users — create
		http.post(url("/users"), async ({ request }) => {
			if (!shouldMock(config, "POST_USER")) return passthrough();
			const body = (await request.json()) as Record<string, unknown>;
			const parsed = parseUserBody(body);
			const newUser: MockUser = {
				id: nextId++,
				name: parsed.name ?? "New User",
				email: parsed.email ?? "new@example.com",
				username: parsed.username ?? "newuser",
			};
			users.push(newUser);
			return HttpResponse.json(newUser, { status: 201 });
		}),

		// PUT /users/:id — update
		http.put(url("/users/:id"), async ({ request, params }) => {
			if (!shouldMock(config, "PUT_USER")) return passthrough();
			const index = users.findIndex((u) => u.id === Number(params.id));
			if (index === -1) return HttpResponse.json({ error: "User not found" }, { status: 404 });
			const body = (await request.json()) as Record<string, unknown>;
			const parsed = parseUserBody(body);
			users[index] = { ...users[index], ...parsed };
			return HttpResponse.json(users[index]);
		}),

		// DELETE /users/:id — delete
		http.delete(url("/users/:id"), ({ params }) => {
			if (!shouldMock(config, "DELETE_USER")) return passthrough();
			const index = users.findIndex((u) => u.id === Number(params.id));
			if (index === -1) return HttpResponse.json({ error: "User not found" }, { status: 404 });
			const [deleted] = users.splice(index, 1);
			return HttpResponse.json(deleted);
		}),
	];
}
