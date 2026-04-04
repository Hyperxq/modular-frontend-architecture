import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";

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

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3002";

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
	],

	// Start dev servers automatically before running tests
	webServer: [
		{
			// ui-components MF remote must be ready first
			command: "bun run nx run ui-components:dev",
			url: "http://localhost:3001/mf-manifest.json",
			reuseExistingServer: !process.env.CI,
			timeout: 120_000,
		},
		{
			// Shell host — depends on ui-components being up
			command: "bun run nx run shell:dev",
			url: BASE_URL,
			reuseExistingServer: !process.env.CI,
			timeout: 120_000,
		},
	],
});
