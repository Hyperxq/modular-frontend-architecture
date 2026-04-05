import { test as base, expect } from "@playwright/test";
import { PresentationPage } from "./presentation-page";

// ---------------------------------------------------------------------------
// Local fixture extension — wires PresentationPage for arrow navigation tests
// ---------------------------------------------------------------------------

const test = base.extend<{ presentation: PresentationPage }>({
	presentation: async ({ page }, use) => {
		await use(new PresentationPage(page));
	},
});

// ---------------------------------------------------------------------------
// Navigation Arrow Visibility
//
// Arrows are visible when navigation is possible in that direction.
// When at the first/last slide, the corresponding arrow is hidden.
// Pressing the keyboard arrow at a boundary flashes the disabled button
// for a short duration then hides it again.
// ---------------------------------------------------------------------------

test.describe("Navigation arrow visibility", () => {
	test("next arrow is visible and prev arrow is hidden on first slide", async ({
		presentation,
	}) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		await expect(presentation.nextButton).toBeVisible();
		await expect(presentation.nextButton).toBeEnabled();
		await expect(presentation.prevButton).toBeHidden();
	});

	test("prev arrow is visible and next arrow is hidden on last slide", async ({ presentation }) => {
		await presentation.navigateToSlide("get-started", 2);
		await presentation.waitForLayout();

		await expect(presentation.prevButton).toBeVisible();
		await expect(presentation.prevButton).toBeEnabled();
		await expect(presentation.nextButton).toBeHidden();
	});

	test("both arrows are visible on a middle slide", async ({ presentation }) => {
		await presentation.navigateToSlide("overview", 1);
		await presentation.waitForLayout();

		await expect(presentation.prevButton).toBeVisible();
		await expect(presentation.prevButton).toBeEnabled();
		await expect(presentation.nextButton).toBeVisible();
		await expect(presentation.nextButton).toBeEnabled();
	});

	test("both arrows are visible at a section boundary", async ({ presentation }) => {
		// Last slide of problem-audience — still has a next section
		await presentation.navigateToSlide("problem-audience", 2);
		await presentation.waitForLayout();

		await expect(presentation.prevButton).toBeVisible();
		await expect(presentation.prevButton).toBeEnabled();
		await expect(presentation.nextButton).toBeVisible();
		await expect(presentation.nextButton).toBeEnabled();
	});

	test("prev arrow appears after navigating forward from first slide", async ({ presentation }) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		// Initially hidden
		await expect(presentation.prevButton).toBeHidden();

		// Navigate forward
		await presentation.clickNext();

		// Now prev should appear
		await expect(presentation.prevButton).toBeVisible();
		await expect(presentation.prevButton).toBeEnabled();
	});

	test("next arrow disappears on reaching last slide", async ({ presentation }) => {
		// Second-to-last slide of the presentation
		await presentation.navigateToSlide("get-started", 1);
		await presentation.waitForLayout();

		await expect(presentation.nextButton).toBeVisible();

		// Navigate to the last slide
		await presentation.clickNext();

		await expect(presentation.nextButton).toBeHidden();
	});
});

test.describe("Keyboard boundary flash behavior", () => {
	test("ArrowLeft on first slide flashes disabled prev then hides it", async ({
		page,
		presentation,
	}) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		// Prev should be hidden initially
		await expect(presentation.prevButton).toBeHidden();

		// Press ArrowLeft — should flash the disabled button
		await presentation.pressArrowLeft();

		// Button should appear immediately, disabled, with flash attribute
		await expect(presentation.prevButton).toBeVisible();
		await expect(presentation.prevButton).toBeDisabled();
		await expect(presentation.prevButton).toHaveAttribute("data-flash", "true");

		// URL should NOT change
		expect(page.url()).toContain("/problem-audience/0");

		// After the flash duration, button should disappear again
		await expect(presentation.prevButton).toBeHidden({ timeout: 3_000 });
	});

	test("ArrowRight on last slide flashes disabled next then hides it", async ({
		page,
		presentation,
	}) => {
		await presentation.navigateToSlide("get-started", 2);
		await presentation.waitForLayout();

		// Next should be hidden initially
		await expect(presentation.nextButton).toBeHidden();

		// Press ArrowRight — should flash the disabled button
		await presentation.pressArrowRight();

		// Button should appear immediately, disabled, with flash attribute
		await expect(presentation.nextButton).toBeVisible();
		await expect(presentation.nextButton).toBeDisabled();
		await expect(presentation.nextButton).toHaveAttribute("data-flash", "true");

		// URL should NOT change
		expect(page.url()).toContain("/get-started/2");

		// After the flash duration, button should disappear again
		await expect(presentation.nextButton).toBeHidden({ timeout: 3_000 });
	});

	test("rapid ArrowLeft presses on first slide extend the flash", async ({
		page,
		presentation,
	}) => {
		await presentation.navigateToSlide("problem-audience", 0);
		await presentation.waitForLayout();

		// Press multiple times rapidly
		await presentation.pressArrowLeft();
		await page.waitForTimeout(500);
		await presentation.pressArrowLeft();

		// Button should still be visible (timer restarted)
		await expect(presentation.prevButton).toBeVisible();
		await expect(presentation.prevButton).toBeDisabled();

		// Eventually hides
		await expect(presentation.prevButton).toBeHidden({ timeout: 3_000 });
	});
});
