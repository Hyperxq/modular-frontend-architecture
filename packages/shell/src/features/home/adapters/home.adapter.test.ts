import { describe, expect, it } from "@rstest/core";
import { toHomeDomain, toHomeDTO } from "./home.adapter";

const validRaw = {
	id: "550e8400-e29b-41d4-a716-446655440000",
	title: "Test Item",
	description: "A description",
	published_at: "2026-01-01T00:00:00.000Z",
	is_active: true,
};

describe("toHomeDomain", () => {
	it("maps a valid raw API response to domain model", () => {
		const result = toHomeDomain(validRaw);
		expect(result).not.toBeNull();
		expect(result?.id).toBe(validRaw.id);
		expect(result?.title).toBe(validRaw.title);
		expect(result?.description).toBe(validRaw.description);
		expect(result?.isActive).toBe(true);
	});

	it("converts published_at string to a Date object", () => {
		const result = toHomeDomain(validRaw);
		expect(result).not.toBeNull();
		expect(result?.publishedAt).toBeInstanceOf(Date);
		expect(result?.publishedAt.getFullYear()).toBe(2026);
	});

	it("returns null for invalid input (missing required fields)", () => {
		const result = toHomeDomain({ id: "bad-id", title: "" });
		expect(result).toBeNull();
	});

	it("returns null for completely invalid input", () => {
		const result = toHomeDomain(null);
		expect(result).toBeNull();
	});

	it("returns null for invalid UUID", () => {
		const result = toHomeDomain({ ...validRaw, id: "not-a-uuid" });
		expect(result).toBeNull();
	});

	it("handles nullable description as empty string", () => {
		const result = toHomeDomain({ ...validRaw, description: null });
		expect(result).not.toBeNull();
		expect(result?.description).toBe("");
	});

	it("handles missing description as empty string", () => {
		const { description: _desc, ...withoutDesc } = validRaw;
		const result = toHomeDomain(withoutDesc);
		expect(result).not.toBeNull();
		expect(result?.description).toBe("");
	});
});

describe("toHomeDTO", () => {
	it("converts domain model to API DTO shape", () => {
		const model = toHomeDomain(validRaw);
		if (!model) throw new Error("model should not be null");

		const dto = toHomeDTO(model);
		expect(dto.id).toBe(validRaw.id);
		expect(dto.title).toBe(validRaw.title);
		expect(dto.is_active).toBe(true);
	});

	it("converts publishedAt Date back to ISO string", () => {
		const model = toHomeDomain(validRaw);
		if (!model) throw new Error("model should not be null");

		const dto = toHomeDTO(model);
		expect(typeof dto.published_at).toBe("string");
		expect(dto.published_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
	});

	it("round-trips: toHomeDomain → toHomeDTO preserves data", () => {
		const model = toHomeDomain(validRaw);
		if (!model) throw new Error("model should not be null");

		const dto = toHomeDTO(model);
		expect(dto.id).toBe(validRaw.id);
		expect(dto.title).toBe(validRaw.title);
		expect(dto.description).toBe(validRaw.description);
	});
});
