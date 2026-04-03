import { z } from "zod";

// Schema for validating raw API response (toHomeDomain input)
export const homeApiSchema = z.object({
	id: z.uuid(),
	title: z.string().min(1),
	description: z.string().nullable().optional(),
	published_at: z.string().datetime(), // ISO 8601 string from API
	is_active: z.boolean(),
});

// Array schema for list responses
export const homeListApiSchema = z.array(homeApiSchema);

// Schema for form validation (used with zodResolver in Container)
export const homeFormSchema = z.object({
	email: z.email({ error: "Please enter a valid email address" }),
	name: z.string().min(2, { error: "Name must be at least 2 characters" }),
});
