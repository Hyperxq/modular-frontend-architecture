import { describe, expect, it } from "@rstest/core";
import { homeApiSchema, homeFormSchema, homeListApiSchema } from "./home.schema";

const validApiItem = {
	id: "550e8400-e29b-41d4-a716-446655440000",
	title: "Test Item",
	description: "A description",
	published_at: "2026-01-01T00:00:00.000Z",
	is_active: true,
};

describe("homeApiSchema", () => {
	it("parses a valid API response", () => {
		const result = homeApiSchema.safeParse(validApiItem);
		expect(result.success).toBe(true);
	});

	it("parses without optional description field", () => {
		const { description: _desc, ...withoutDesc } = validApiItem;
		const result = homeApiSchema.safeParse(withoutDesc);
		expect(result.success).toBe(true);
	});

	it("accepts null for description", () => {
		const result = homeApiSchema.safeParse({
			...validApiItem,
			description: null,
		});
		expect(result.success).toBe(true);
	});

	it("fails when id is not a UUID", () => {
		const result = homeApiSchema.safeParse({ ...validApiItem, id: "not-a-uuid" });
		expect(result.success).toBe(false);
	});

	it("fails when title is empty string", () => {
		const result = homeApiSchema.safeParse({ ...validApiItem, title: "" });
		expect(result.success).toBe(false);
	});

	it("fails when published_at is not a valid ISO datetime", () => {
		const result = homeApiSchema.safeParse({
			...validApiItem,
			published_at: "not-a-date",
		});
		expect(result.success).toBe(false);
	});

	it("fails when is_active is missing", () => {
		const { is_active: _active, ...withoutActive } = validApiItem;
		const result = homeApiSchema.safeParse(withoutActive);
		expect(result.success).toBe(false);
	});

	it("fails when id field is missing", () => {
		const { id: _id, ...withoutId } = validApiItem;
		const result = homeApiSchema.safeParse(withoutId);
		expect(result.success).toBe(false);
	});
});

describe("homeListApiSchema", () => {
	it("parses an array of valid items", () => {
		const result = homeListApiSchema.safeParse([validApiItem]);
		expect(result.success).toBe(true);
	});

	it("parses an empty array", () => {
		const result = homeListApiSchema.safeParse([]);
		expect(result.success).toBe(true);
	});

	it("fails when array contains an invalid item", () => {
		const result = homeListApiSchema.safeParse([validApiItem, { id: "bad", title: "" }]);
		expect(result.success).toBe(false);
	});
});

describe("homeFormSchema", () => {
	it("validates a valid email and name", () => {
		const result = homeFormSchema.safeParse({ email: "user@example.com", name: "Jo" });
		expect(result.success).toBe(true);
	});

	it("fails on invalid email format", () => {
		const result = homeFormSchema.safeParse({ email: "not-an-email", name: "Jo" });
		expect(result.success).toBe(false);
	});

	it("fails when name is too short (less than 2 chars)", () => {
		const result = homeFormSchema.safeParse({ email: "user@example.com", name: "J" });
		expect(result.success).toBe(false);
	});

	it("fails when email is missing", () => {
		const result = homeFormSchema.safeParse({ name: "Jo" });
		expect(result.success).toBe(false);
	});

	it("fails when name is missing", () => {
		const result = homeFormSchema.safeParse({ email: "user@example.com" });
		expect(result.success).toBe(false);
	});
});
