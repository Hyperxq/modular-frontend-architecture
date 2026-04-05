/**
 * setup-env.ts
 *
 * Runs automatically on `bun install` (postinstall).
 * Creates each .env.* file from .env.example if it doesn't already exist.
 * Never overwrites existing files — safe to run multiple times.
 *
 * Files created:
 *   .env.development.local  — local dev with MF remote on :3001
 *   .env.development        — CI / staging
 *   .env.production         — production build
 *   .env.mock               — local dev with MSW mocking enabled
 */

import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const EXAMPLE = resolve(ROOT, ".env.example");

if (!existsSync(EXAMPLE)) {
	console.error("setup-env: .env.example not found — skipping");
	process.exit(0);
}

const exampleContent = readFileSync(EXAMPLE, "utf-8");

interface EnvTarget {
	file: string;
	overrides: Record<string, string>;
}

const targets: EnvTarget[] = [
	{
		file: ".env.development.local",
		overrides: {
			PUBLIC_BUCKET_URL: "http://localhost:3001",
			PUBLIC_GATEWAY_BACKEND: "http://localhost:3000",
			PUBLIC_ENABLE_MOCKING: "false",
			PUBLIC_MSW_ON_UNHANDLED: "bypass",
		},
	},
	{
		file: ".env.development",
		overrides: {
			PUBLIC_BUCKET_URL: "http://localhost:3001",
			PUBLIC_GATEWAY_BACKEND: "http://localhost:3000",
			PUBLIC_ENABLE_MOCKING: "false",
			PUBLIC_MSW_ON_UNHANDLED: "warn",
		},
	},
	{
		file: ".env.mock",
		overrides: {
			PUBLIC_BUCKET_URL: "http://localhost:3001",
			PUBLIC_GATEWAY_BACKEND: "http://localhost:3000",
			PUBLIC_ENABLE_MOCKING: "true",
			PUBLIC_MSW_ON_UNHANDLED: "bypass",
		},
	},
	{
		file: ".env.production",
		overrides: {
			// Base URL of the deployment (Cloudflare Pages domain).
			// Used as:
			//   - assetPrefix for all shell static assets
			//   - base for MF remote: rsbuild appends /ui-components/mf at build time
			// The ui-components dist is copied into shell/dist/ui-components/mf/ by the deploy CI step.
			PUBLIC_BUCKET_URL: "https://modular-frontend.pages.dev",
			PUBLIC_GATEWAY_BACKEND: "REPLACE_WITH_YOUR_API_URL",
			PUBLIC_ENABLE_MOCKING: "false",
			PUBLIC_MSW_ON_UNHANDLED: "bypass",
		},
	},
];

function applyOverrides(base: string, overrides: Record<string, string>): string {
	let result = base;
	for (const [key, value] of Object.entries(overrides)) {
		result = result.replace(new RegExp(`^(${key}=).*$`, "m"), `$1${value}`);
	}
	return result;
}

let created = 0;
let skipped = 0;

for (const target of targets) {
	const dest = resolve(ROOT, target.file);
	if (existsSync(dest)) {
		console.log(`setup-env: ✓ ${target.file} already exists — skipped`);
		skipped++;
		continue;
	}
	const content = applyOverrides(exampleContent, target.overrides);
	writeFileSync(dest, content, "utf-8");
	console.log(`setup-env: ✓ created ${target.file}`);
	created++;
}

if (created === 0) {
	console.log("setup-env: all .env files already present — nothing to do");
} else {
	console.log(`setup-env: created ${created} file(s), skipped ${skipped}`);
	if (existsSync(resolve(ROOT, ".env.production"))) {
		const prod = readFileSync(resolve(ROOT, ".env.production"), "utf-8");
		if (prod.includes("REPLACE_WITH_")) {
			console.log(
				"setup-env: ⚠  .env.production contains placeholder values — fill in real URLs before building for production",
			);
		}
	}
}
