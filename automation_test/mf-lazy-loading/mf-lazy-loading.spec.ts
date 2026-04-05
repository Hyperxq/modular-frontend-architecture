import { test as base, expect } from "@playwright/test";
import { PresentationPage } from "../presentation/presentation-page";
import { MfLazyLoadingPage } from "./mf-lazy-loading-page";

// ---------------------------------------------------------------------------
// Local fixture extension — wires PresentationPage and MfLazyLoadingPage
// without depending on the BDD fixtures.ts (which uses playwright-bdd).
// ---------------------------------------------------------------------------

const test = base.extend<{
	presentation: PresentationPage;
	mfLazyLoading: MfLazyLoadingPage;
}>({
	presentation: async ({ page }, use) => {
		await use(new PresentationPage(page));
	},
	mfLazyLoading: async ({ page }, use) => {
		await use(new MfLazyLoadingPage(page));
	},
});

// ---------------------------------------------------------------------------
// Module Federation Component Loading
//
// Verifies that MF components are served from the remote host (:3001)
// and are NOT bundled into the shell, and that they are not re-fetched
// on subsequent navigations (browser caching via Module Federation).
// ---------------------------------------------------------------------------

test.describe("Module Federation component loading", () => {
	test("MF components are served from the remote, not the shell bundle", async ({
		page,
		mfLazyLoading,
		presentation,
	}) => {
		// Attach listener BEFORE navigation to capture all bootstrap requests
		mfLazyLoading.interceptMFRequests();

		await page.goto("/");
		await presentation.waitForLayout();

		// The MF manifest must be fetched first so the shell can resolve remotes
		expect(mfLazyLoading.hasManifestBeenFetched()).toBe(true);

		// Shell-consumed MF components must arrive from the remote, not the bundle
		expect(mfLazyLoading.hasComponentBeenFetched("BottomBar")).toBe(true);
		expect(mfLazyLoading.hasComponentBeenFetched("Header")).toBe(true);
	});

	test("at least 3 MF component JS files are fetched on initial load", async ({
		page,
		mfLazyLoading,
		presentation,
	}) => {
		// Attach listener BEFORE navigation
		mfLazyLoading.interceptMFRequests();

		await page.goto("/");
		await presentation.waitForLayout();

		// At minimum: manifest + Header + Sidebar + BottomBar → expect >= 3 JS files
		expect(mfLazyLoading.getMFJsRequestCount()).toBeGreaterThanOrEqual(3);
	});

	test("MF components are not re-fetched on section navigation", async ({
		presentation,
		mfLazyLoading,
	}) => {
		// Initial load — MF bootstrap happens here; we don't capture it
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		// Reset — only capture requests triggered after this point
		mfLazyLoading.interceptMFRequests();

		await presentation.clickSection("Overview");
		await presentation.waitForLayout();

		// MF component JS files must be served from browser cache on re-navigation;
		// no new requests to the remote should appear
		expect(mfLazyLoading.getMFJsRequestCount()).toBe(0);
	});

	test("Header and Sidebar are visible and served from MF remote", async ({
		page,
		presentation,
		mfLazyLoading,
	}) => {
		// Attach listener BEFORE navigation
		mfLazyLoading.interceptMFRequests();

		await page.goto("/problem-audience/0");
		await presentation.waitForLayout();

		// Layout chrome must be visible after MF remote components have loaded
		await expect(presentation.header).toBeVisible();
		await expect(presentation.sidebar).toBeVisible();

		// Both components must have been served from the MF remote host (:3001)
		expect(mfLazyLoading.hasComponentBeenFetched("Header")).toBe(true);
		expect(mfLazyLoading.hasComponentBeenFetched("Sidebar")).toBe(true);
	});
});
