import { test as base, expect } from "@playwright/test";
import { PresentationPage } from "../presentation/presentation-page";
import { LazyLoadingPage } from "./lazy-loading-page";

// ---------------------------------------------------------------------------
// Local fixture extension — wires PresentationPage and LazyLoadingPage
// without depending on the BDD fixtures.ts (which uses playwright-bdd).
// ---------------------------------------------------------------------------

const test = base.extend<{
	presentation: PresentationPage;
	lazyLoading: LazyLoadingPage;
}>({
	presentation: async ({ page }, use) => {
		await use(new PresentationPage(page));
	},
	lazyLoading: async ({ page }, use) => {
		await use(new LazyLoadingPage(page));
	},
});

// ---------------------------------------------------------------------------
// Section Chunk Lazy Loading
//
// Verifies that Rsbuild's code-splitting produces per-section JS chunks
// and that those chunks are fetched on-demand (lazy), not up-front.
// ---------------------------------------------------------------------------

test.describe("Section chunk lazy loading", () => {
	test("initial load only fetches the active section chunk", async ({
		page,
		lazyLoading,
		presentation,
	}) => {
		// Attach listener BEFORE any navigation so we capture every request
		lazyLoading.interceptChunkRequests();

		await page.goto("/");
		await presentation.waitForLayout();

		// The default route lands on problem-audience → its chunk must be fetched
		expect(lazyLoading.hasFetchedChunk("section-problem-audience")).toBe(true);

		// Other section chunks must NOT be eagerly fetched on initial load
		expect(lazyLoading.hasFetchedChunk("section-overview")).toBe(false);
		expect(lazyLoading.hasFetchedChunk("section-module-federation")).toBe(false);
	});

	test("navigating to a new section fetches exactly its chunk", async ({
		presentation,
		lazyLoading,
	}) => {
		// Land on problem-audience first; let the initial load complete
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		// Reset — only capture requests triggered by the upcoming navigation
		lazyLoading.interceptChunkRequests();

		await presentation.clickSection("Overview");
		await presentation.waitForLayout();

		// Exactly one new chunk must have been fetched: the overview section
		expect(lazyLoading.hasFetchedChunk("section-overview")).toBe(true);
		expect(lazyLoading.chunkRequestCount()).toBe(1);
	});

	test("revisiting a section does not re-fetch its chunk", async ({
		presentation,
		lazyLoading,
	}) => {
		// Navigate to problem-audience/0, then visit Overview (first load)
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		await presentation.clickSection("Overview");
		await presentation.waitForLayout();

		// Go back to problem-audience
		await presentation.clickSection("Problem & Audience");
		await presentation.waitForLayout();

		// Reset listener — only new requests from here on count
		lazyLoading.interceptChunkRequests();

		// Re-visit Overview; browser should serve from cache, no new chunk fetch
		await presentation.clickSection("Overview");
		await presentation.waitForLayout();

		expect(lazyLoading.hasFetchedChunk("section-overview")).toBe(false);
		expect(lazyLoading.chunkRequestCount()).toBe(0);
	});

	test("header and sidebar stay visible during section chunk load", async ({
		presentation,
		lazyLoading,
	}) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		lazyLoading.interceptChunkRequests();

		// Click but do NOT await waitForLayout — inspect layout immediately during
		// the transition while the new chunk may still be in-flight
		await presentation.clickSection("Overview");

		// Layout chrome must remain visible throughout the lazy-load transition
		await expect(presentation.header).toBeVisible();
		await expect(presentation.sidebar).toBeVisible();
	});
});
