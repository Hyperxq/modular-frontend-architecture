import { defineConfig, devices } from "@playwright/test";

// ---------------------------------------------------------------------------
// Playwright E2E config
//
// Tests live in: automation_test/
// Structure:
//   automation_test/
//     base-page.ts           ← BasePage class (all pages extend this)
//     helpers.ts             ← shared utilities, data generators
//     {feature}/
//       {feature}-page.ts    ← Page Object Model
//       {feature}.spec.ts    ← tests (one spec file per feature)
//       {feature}.md         ← test documentation
//
// Run against shell dev server (:3002)
// ui-components MF remote must be running (:3001)
// ---------------------------------------------------------------------------

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3002";

export default defineConfig({
	// Test directory — relative to this config file (automation_test/)
	testDir: "./",

	// One spec file per feature — no splitting
	testMatch: "**/*.spec.ts",

	// Fail fast in CI — no point running all tests if one fails
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,

	// Reporters
	reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],

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
