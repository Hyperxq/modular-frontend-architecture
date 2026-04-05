import { defineConfig, devices } from "@playwright/test";
import { cucumberReporter, defineBddConfig } from "playwright-bdd";

// ---------------------------------------------------------------------------
// Playwright + BDD config
//
// Feature files:  features/**/*.feature
// Step defs:      steps/**/*.steps.ts
// Page Objects:   {feature}/{feature}-page.ts
//
// Run against shell dev server (:3002)
// ui-components MF remote must be running (:3001)
// ---------------------------------------------------------------------------

const testDir = defineBddConfig({
	features: "features/**/*.feature",
	steps: ["steps/**/*.steps.ts", "fixtures.ts"],
});

// If PLAYWRIGHT_BASE_URL is set, run against that URL (CI post-deploy mode).
// Otherwise spin up local dev servers automatically.
const EXTERNAL_URL = process.env.PLAYWRIGHT_BASE_URL;
const BASE_URL = EXTERNAL_URL ?? "http://127.0.0.1:3002";

export default defineConfig({
	testDir,

	// Fail fast in CI — no point running all tests if one fails
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,

	// Reporters
	reporter: [
		["list"],
		["html", { outputFolder: "playwright-report", open: "never" }],
		cucumberReporter("html", { outputFile: "cucumber-report/index.html" }),
	],

	use: {
		baseURL: BASE_URL,

		// Collect traces on failure for debugging
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "on-first-retry",
	},

	projects: [
		// BDD feature tests (playwright-bdd generated)
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "mobile-chrome",
			use: { ...devices["Pixel 5"] },
		},
		// Plain *.spec.ts tests — lazy loading verification
		{
			name: "chromium-specs",
			testDir: ".",
			testMatch: "**/*.spec.ts",
			use: { ...devices["Desktop Chrome"] },
		},
	],

	// Local dev only — skipped when PLAYWRIGHT_BASE_URL points to an external URL
	webServer: EXTERNAL_URL
		? undefined
		: [
				{
					// ui-components MF remote must be ready first
					command: "bunx rslib mf-dev --env-mode development.local",
					cwd: "../packages/libraries/ui-components",
					url: "http://127.0.0.1:3001/mf-manifest.json",
					reuseExistingServer: true,
					timeout: 120_000,
				},
				{
					// Shell host — starts after ui-components is serving
					command: "bunx rsbuild dev --env-mode development.local",
					cwd: "../packages/shell",
					url: "http://127.0.0.1:3002",
					reuseExistingServer: true,
					timeout: 120_000,
				},
			],
});
