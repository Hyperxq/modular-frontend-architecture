import { expect } from "@playwright/test";
import { Given, Then } from "../fixtures";

// ---------------------------------------------------------------------------
// Navigation — Given steps
// ---------------------------------------------------------------------------

Given("I am on the mock demo slide", async ({ mockDemo, presentation }) => {
	await mockDemo.navigateToMockDemo();
	await presentation.waitForLayout();
});

// ---------------------------------------------------------------------------
// Assertions — Then steps
// ---------------------------------------------------------------------------

Then("the mock demo area should have content", async ({ page }) => {
	const main = page.locator('main[aria-label="Slide content"]');
	await expect(main).toBeVisible();
	const text = await main.innerText();
	expect(text.length).toBeGreaterThan(0);
});
