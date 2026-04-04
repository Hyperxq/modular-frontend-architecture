import { test as base, createBdd } from "playwright-bdd";
import { MockDemoPage } from "./mock-demo/mock-demo-page";
import { PresentationPage } from "./presentation/presentation-page";

// ---------------------------------------------------------------------------
// Custom fixtures — Page Objects registered as Playwright fixtures
// Step definitions receive these via destructuring: ({ presentation }) => ...
// ---------------------------------------------------------------------------

export const test = base.extend<{
	presentation: PresentationPage;
	mockDemo: MockDemoPage;
}>({
	presentation: async ({ page }, use) => {
		await use(new PresentationPage(page));
	},
	mockDemo: async ({ page }, use) => {
		await use(new MockDemoPage(page));
	},
});

export const { Given, When, Then } = createBdd(test);
