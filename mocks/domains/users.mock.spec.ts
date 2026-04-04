import { afterAll, afterEach, beforeAll, describe, expect, it } from "@rstest/core";
import { setupServer } from "msw/node";
import { userHandlers } from "./users.mock";
import type { MockConfig } from "../core/mock.config";

const BASE_URL = "https://api.test.local";

function createConfig(omittedKeys: string[] = []): MockConfig {
	return {
		ommitedKeys: new Set(omittedKeys) as MockConfig["ommitedKeys"],
		onUnhandled: "error",
	};
}

const server = setupServer(...userHandlers(createConfig(), BASE_URL));

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("userHandlers", () => {
	it("GET /users returns mock user list", async () => {
		const response = await fetch(`${BASE_URL}/users`);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data).toHaveLength(3);
		expect(data[0]).toMatchObject({ id: 1, name: "Leanne Graham" });
	});

	it("GET /users/:id returns a single user", async () => {
		const response = await fetch(`${BASE_URL}/users/2`);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data).toMatchObject({ id: 2, name: "Ervin Howell" });
	});

	it("GET /users/:id returns 404 for unknown id", async () => {
		const response = await fetch(`${BASE_URL}/users/999`);
		const data = await response.json();

		expect(response.status).toBe(404);
		expect(data).toMatchObject({ error: "User not found" });
	});

	it("POST /users creates a new user", async () => {
		const response = await fetch(`${BASE_URL}/users`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "Test User", email: "test@test.com", username: "tester" }),
		});
		const data = await response.json();

		expect(response.status).toBe(201);
		expect(data).toMatchObject({ name: "Test User", email: "test@test.com" });
		expect(data.id).toBeGreaterThan(0);
	});

	it("DELETE /users/:id returns 404 for unknown id", async () => {
		const response = await fetch(`${BASE_URL}/users/999`, { method: "DELETE" });

		expect(response.status).toBe(404);
	});
});

describe("userHandlers with omitted keys", () => {
	it("returns handler count matching CRUD operations", () => {
		const handlers = userHandlers(createConfig(), BASE_URL);
		expect(handlers).toHaveLength(5);
	});
});
