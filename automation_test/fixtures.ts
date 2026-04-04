import { test as base, createBdd } from "playwright-bdd";
import { PresentationPage } from "./presentation/presentation-page";

// ---------------------------------------------------------------------------
// Custom fixtures — Page Objects registered as Playwright fixtures
// Step definitions receive these via destructuring: ({ presentation }) => ...
// ---------------------------------------------------------------------------

export const test = base.extend<{ presentation: PresentationPage }>({
	presentation: async ({ page }, use) => {
		await use(new PresentationPage(page));
	},
});

export const { Given, When, Then } = createBdd(test);
