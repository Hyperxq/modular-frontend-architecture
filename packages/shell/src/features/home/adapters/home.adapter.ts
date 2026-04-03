import { homeApiSchema } from "../domain/home.schema";
import type { HomeModel } from "../domain/home.types";

// Parse and validate raw API response → domain model
// Returns null if validation fails (safeParse — no throw)
export function toHomeDomain(raw: unknown): HomeModel | null {
	const result = homeApiSchema.safeParse(raw);
	if (!result.success) {
		console.error("[home.adapter] Invalid API response:", result.error);
		return null;
	}
	const parsed = result.data;
	return {
		id: parsed.id,
		title: parsed.title,
		description: parsed.description ?? "",
		publishedAt: new Date(parsed.published_at),
		isActive: parsed.is_active,
	};
}

// Convert domain model → DTO for API mutations (POST/PUT)
export function toHomeDTO(model: HomeModel): {
	id: string;
	title: string;
	description: string;
	published_at: string;
	is_active: boolean;
} {
	return {
		id: model.id,
		title: model.title,
		description: model.description,
		published_at: model.publishedAt.toISOString(),
		is_active: model.isActive,
	};
}
