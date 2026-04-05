import { test as base, devices, expect } from "@playwright/test";
import { PresentationPage } from "./presentation-page";

// ---------------------------------------------------------------------------
// Local fixture extension — wires PresentationPage for swipe navigation tests
// ---------------------------------------------------------------------------

const test = base.extend<{ presentation: PresentationPage }>({
	presentation: async ({ page }, use) => {
		await use(new PresentationPage(page));
	},
});

// Force mobile viewport + touch support — swipe is gated on useIsMobile (max-width: 767px)
test.use({ ...devices["Pixel 5"] });

// ---------------------------------------------------------------------------
// Swipe Navigation
//
// The useSwipe hook attaches touch listeners to the center panel wrapper.
// Swipe left → goNext, swipe right → goPrev.
// Only active when useIsMobile() returns true (viewport < 768px).
// Threshold: 50px horizontal distance, direction lock: dx > 10 && dx > dy * 1.5.
// ---------------------------------------------------------------------------

test.describe("Swipe navigation on mobile viewport", () => {
	test("swipe left advances to the next slide", async ({ page, presentation }) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		await presentation.swipeLeft();

		await page.waitForURL(/\/problem-audience\/1/);
		expect(page.url()).toContain("/problem-audience/1");
	});

	test("swipe right goes back to the previous slide", async ({ page, presentation }) => {
		await presentation.navigateToSlide("problem-audience", 1);
		await presentation.waitForLayout();

		await presentation.swipeRight();

		await page.waitForURL(/\/problem-audience\/0/);
		expect(page.url()).toContain("/problem-audience/0");
	});

	test("swipe left crosses section boundary forward", async ({ page, presentation }) => {
		// Last slide of problem-audience section
		await presentation.navigateToSlide("problem-audience", 2);
		await presentation.waitForLayout();

		await presentation.swipeLeft();

		await page.waitForURL(/\/overview\/0/);
		expect(page.url()).toContain("/overview/0");
	});

	test("swipe right crosses section boundary backward", async ({ page, presentation }) => {
		// First slide of overview section
		await presentation.navigateToSlide("overview", 0);
		await presentation.waitForLayout();

		await presentation.swipeRight();

		await page.waitForURL(/\/problem-audience\/2/);
		expect(page.url()).toContain("/problem-audience/2");
	});

	test("swipe left does nothing on the last slide", async ({ page, presentation }) => {
		await presentation.navigateToSlide("get-started", 2);
		await presentation.waitForLayout();

		const urlBefore = page.url();
		await presentation.swipeLeft();

		// URL should remain unchanged — wait a beat to confirm no navigation happened
		await page.waitForTimeout(500);
		expect(page.url()).toBe(urlBefore);
	});

	test("swipe right does nothing on the first slide", async ({ page, presentation }) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		const urlBefore = page.url();
		await presentation.swipeRight();

		// URL should remain unchanged — wait a beat to confirm no navigation happened
		await page.waitForTimeout(500);
		expect(page.url()).toBe(urlBefore);
	});

	test("consecutive swipes navigate multiple slides", async ({ page, presentation }) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		await presentation.swipeLeft();
		await page.waitForURL(/\/problem-audience\/1/);
		expect(page.url()).toContain("/problem-audience/1");

		await presentation.swipeLeft();
		await page.waitForURL(/\/problem-audience\/2/);
		expect(page.url()).toContain("/problem-audience/2");

		await presentation.swipeRight();
		await page.waitForURL(/\/problem-audience\/1/);
		expect(page.url()).toContain("/problem-audience/1");
	});

	test("slide content updates after swipe", async ({ presentation }) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		const titleBefore = await presentation.getSlideTitle();

		await presentation.swipeLeft();

		const titleAfter = await presentation.getSlideTitle();
		expect(titleAfter).not.toBe(titleBefore);
	});
});
