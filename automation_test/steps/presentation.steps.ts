import { expect } from "@playwright/test";
import { Given, When, Then } from "../fixtures";

// ---------------------------------------------------------------------------
// Navigation — Given steps
// ---------------------------------------------------------------------------

Given("I am on slide {string} at index {int}", async ({ presentation }, section: string, index: number) => {
	await presentation.navigateToSlide(section, index);
	await presentation.waitForLayout();
});

// ---------------------------------------------------------------------------
// Navigation — When steps
// ---------------------------------------------------------------------------

When("I navigate to the root", async ({ presentation }) => {
	await presentation.navigateToRoot();
	await presentation.waitForLayout();
});

When("I navigate to slide {string} at index {int}", async ({ presentation }, section: string, index: number) => {
	await presentation.navigateToSlide(section, index);
});

When("I navigate to path {string}", async ({ presentation }, path: string) => {
	await presentation.goto(path);
});

When("I click the next arrow", async ({ presentation }) => {
	await presentation.clickNext();
});

When("I click the previous arrow", async ({ presentation }) => {
	await presentation.clickPrev();
});

When("I force click the next arrow", async ({ presentation }) => {
	await presentation.nextButton.click({ force: true });
});

When("I click the {string} section in the sidebar", async ({ presentation }, sectionTitle: string) => {
	await presentation.clickSection(sectionTitle);
});

When("I press ArrowRight", async ({ presentation }) => {
	await presentation.pressArrowRight();
});

When("I press ArrowLeft", async ({ presentation }) => {
	await presentation.pressArrowLeft();
});

When("I go back in the browser", async ({ page }) => {
	await page.goBack();
	await page.waitForLoadState("domcontentloaded");
});

When("I go forward in the browser", async ({ page }) => {
	await page.goForward();
	await page.waitForLoadState("domcontentloaded");
});

// ---------------------------------------------------------------------------
// Assertions — Then steps (URL)
// ---------------------------------------------------------------------------

Then("the URL should contain {string}", async ({ page }, path: string) => {
	await page.waitForURL(`**${path}*`, { timeout: 5_000 });
	expect(page.url()).toContain(path);
});

// ---------------------------------------------------------------------------
// Assertions — Then steps (visibility)
// ---------------------------------------------------------------------------

Then("the presentation layout should be visible", async ({ presentation }) => {
	await expect(presentation.app).toBeVisible();
});

Then("the header should be visible", async ({ presentation }) => {
	await expect(presentation.header).toBeVisible();
});

Then("the sidebar should be visible", async ({ presentation }) => {
	await expect(presentation.sidebar).toBeVisible();
});

Then("the center panel should be visible", async ({ presentation }) => {
	await expect(presentation.centerPanel).toBeVisible();
});

Then("the bottom bar should be visible", async ({ presentation }) => {
	await expect(presentation.bottomBar).toBeVisible();
});

Then("the previous button should be visible", async ({ presentation }) => {
	await expect(presentation.prevButton).toBeVisible();
});

Then("the next button should be visible", async ({ presentation }) => {
	await expect(presentation.nextButton).toBeVisible();
});

// ---------------------------------------------------------------------------
// Assertions — Then steps (content)
// ---------------------------------------------------------------------------

Then("the header title should be {string}", async ({ presentation }, text: string) => {
	await expect(presentation.headerTitle).toHaveText(text);
});

Then("the slide title should be {string}", async ({ presentation }, title: string) => {
	const slideTitle = await presentation.getSlideTitle();
	expect(slideTitle).toBe(title);
});

Then("the slide counter should contain {string}", async ({ presentation }, text: string) => {
	const counter = await presentation.getSlideCounter();
	expect(counter).toContain(text);
});

// ---------------------------------------------------------------------------
// Assertions — Then steps (sidebar)
// ---------------------------------------------------------------------------

Then("the sidebar should have a button {string}", async ({ presentation }, title: string) => {
	await expect(presentation.getSidebarButton(title)).toBeVisible();
});

Then(
	"the {string} sidebar button should have aria-current {string}",
	async ({ presentation }, title: string, value: string) => {
		await expect(presentation.getSidebarButton(title)).toHaveAttribute("aria-current", value);
	},
);

Then(
	"the {string} sidebar button should not have aria-current {string}",
	async ({ presentation }, title: string, value: string) => {
		await expect(presentation.getSidebarButton(title)).not.toHaveAttribute("aria-current", value);
	},
);

// ---------------------------------------------------------------------------
// Assertions — Then steps (button state)
// ---------------------------------------------------------------------------

Then("the previous button should be disabled", async ({ presentation }) => {
	await expect(presentation.prevButton).toBeDisabled();
});

Then("the next button should be disabled", async ({ presentation }) => {
	await expect(presentation.nextButton).toBeDisabled();
});

Then("the previous button should be enabled", async ({ presentation }) => {
	await expect(presentation.prevButton).toBeEnabled();
});

Then("the next button should be enabled", async ({ presentation }) => {
	await expect(presentation.nextButton).toBeEnabled();
});

// ---------------------------------------------------------------------------
// Assertions — Then steps (dimensions)
// ---------------------------------------------------------------------------

Then("the header should have non-zero dimensions", async ({ presentation }) => {
	const box = await presentation.header.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.width).toBeGreaterThan(0);
	expect(box!.height).toBeGreaterThan(0);
});

Then("the sidebar should have non-zero dimensions", async ({ presentation }) => {
	const box = await presentation.sidebar.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.width).toBeGreaterThan(0);
	expect(box!.height).toBeGreaterThan(0);
});

Then("the center panel should have non-zero dimensions", async ({ presentation }) => {
	const box = await presentation.centerPanel.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.width).toBeGreaterThan(0);
	expect(box!.height).toBeGreaterThan(0);
});

Then("the bottom bar should have non-zero dimensions", async ({ presentation }) => {
	const box = await presentation.bottomBar.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.width).toBeGreaterThan(0);
	expect(box!.height).toBeGreaterThan(0);
});

Then("the previous button should have non-zero dimensions", async ({ presentation }) => {
	const box = await presentation.prevButton.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.width).toBeGreaterThan(0);
	expect(box!.height).toBeGreaterThan(0);
});

Then("the next button should have non-zero dimensions", async ({ presentation }) => {
	const box = await presentation.nextButton.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.width).toBeGreaterThan(0);
	expect(box!.height).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// Assertions — Then steps (console errors)
// ---------------------------------------------------------------------------

Then("there should be no console errors", async ({ page, presentation }) => {
	const errors: string[] = [];

	const IGNORED_PATTERNS = [
		/favicon/i,
		/devtools/i,
		/hot-update/i,
		/\[HMR\]/i,
		/Download the React DevTools/i,
		/WebSocket connection to/i,
		/dynamic-remote-type-hints-plugin/i,
	];

	page.on("console", (msg) => {
		if (msg.type() === "error") {
			const text = msg.text();
			const isNoise = IGNORED_PATTERNS.some((pattern) => pattern.test(text));
			if (!isNoise) {
				errors.push(text);
			}
		}
	});

	await presentation.navigateToSlide("intro", 0);
	await presentation.waitForLayout();

	expect(errors).toEqual([]);
});
