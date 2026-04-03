import type { z } from "zod";
import type { homeApiSchema, homeFormSchema } from "./home.schema";

// Inferred from Zod schemas — single source of truth
export type ApiHomeResponse = z.infer<typeof homeApiSchema>;
export type HomeFormData = z.infer<typeof homeFormSchema>;

// Domain model — camelCase, enriched types (Date instead of string)
export interface HomeModel {
	id: string;
	title: string;
	description: string;
	publishedAt: Date;
	isActive: boolean;
}
