import { expect, test } from "@playwright/test";
import { PresentationPage } from "./presentation-page";

// ---------------------------------------------------------------------------
// E2E — Presentation App (post-Tailwind CSS 4 migration)
//
// Validates layout structure, navigation (arrows, sidebar, keyboard),
// and basic visual integrity after the TW4 migration.
//
// Requires:  ui-components MF remote (:3001)  +  shell host (:3002)
// ---------------------------------------------------------------------------

let presentation: PresentationPage;

test.beforeEach(async ({ page }) => {
	presentation = new PresentationPage(page);
});

// ─── Page Load ───────────────────────────────────────────────────────────────

test.describe("Page Load", () => {
	test("redirects root to /intro/0", async ({ page }) => {
		await presentation.navigateToRoot();
		await presentation.waitForLayout();

		expect(page.url()).toContain("/intro/0");
	});

	test("loads /intro/0 directly", async () => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();

		await expect(presentation.app).toBeVisible();
	});
});

// ─── Layout Structure ────────────────────────────────────────────────────────

test.describe("Layout Structure", () => {
	test.beforeEach(async () => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();
	});

	test("renders header with app title", async () => {
		await expect(presentation.header).toBeVisible();
		await expect(presentation.headerTitle).toHaveText("MICROFRONTEND ARCHITECTURE");
	});

	test("renders sidebar with all section buttons", async () => {
		await expect(presentation.sidebar).toBeVisible();

		for (const title of ["Overview", "Architecture", "Stack & Tooling"]) {
			await expect(presentation.getSidebarButton(title)).toBeVisible();
		}
	});

	test("renders center panel with slide content", async () => {
		await expect(presentation.centerPanel).toBeVisible();

		const title = await presentation.getSlideTitle();
		expect(title).toBe("The Monolith Problem");
	});

	test("renders bottom bar with slide counter", async () => {
		await expect(presentation.bottomBar).toBeVisible();

		const slideCounter = await presentation.getSlideCounter();
		expect(slideCounter).toContain("SLIDE 1 / 3");
	});

	test("renders nav arrows — prev disabled, next enabled on first slide", async () => {
		await expect(presentation.prevButton).toBeVisible();
		await expect(presentation.nextButton).toBeVisible();

		await expect(presentation.prevButton).toBeDisabled();
		await expect(presentation.nextButton).toBeEnabled();
	});
});

// ─── Slide Navigation via Arrows ─────────────────────────────────────────────

test.describe("Slide Navigation via Arrows", () => {
	test.beforeEach(async () => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();
	});

	test("next arrow advances to slide 2", async ({ page }) => {
		await presentation.clickNext();

		expect(page.url()).toContain("/intro/1");

		const title = await presentation.getSlideTitle();
		expect(title).toBe("Structural Analysis");

		const counter = await presentation.getSlideCounter();
		expect(counter).toContain("SLIDE 2 / 3");

		await expect(presentation.prevButton).toBeEnabled();
	});

	test("prev arrow goes back after advancing", async ({ page }) => {
		await presentation.clickNext();
		expect(page.url()).toContain("/intro/1");

		await presentation.clickPrev();
		expect(page.url()).toContain("/intro/0");

		const title = await presentation.getSlideTitle();
		expect(title).toBe("The Monolith Problem");
	});

	test("next arrow crosses section boundary", async ({ page }) => {
		// Navigate to the last slide of intro (slide 2)
		await presentation.navigateToSlide("intro", 2);
		await presentation.waitForLayout();

		await presentation.clickNext();
		expect(page.url()).toContain("/architecture/0");

		const title = await presentation.getSlideTitle();
		expect(title).toBe("Module Federation");
	});

	test("prev arrow crosses section boundary backwards", async ({ page }) => {
		await presentation.navigateToSlide("architecture", 0);
		await presentation.waitForLayout();

		await presentation.clickPrev();
		expect(page.url()).toContain("/intro/2");

		const title = await presentation.getSlideTitle();
		expect(title).toBe("Why Micro-Frontends?");
	});
});

// ─── Section Navigation via Sidebar ──────────────────────────────────────────

test.describe("Section Navigation via Sidebar", () => {
	test.beforeEach(async () => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();
	});

	test("clicking Architecture navigates to /architecture/0", async ({ page }) => {
		await presentation.clickSection("Architecture");

		expect(page.url()).toContain("/architecture/0");

		const sectionLabel = await presentation.getSectionLabel();
		expect(sectionLabel).toContain("ARCHITECTURE");

		const title = await presentation.getSlideTitle();
		expect(title).toBe("Module Federation");
	});

	test("clicking Stack & Tooling navigates to /stack/0", async ({ page }) => {
		await presentation.clickSection("Stack & Tooling");

		expect(page.url()).toContain("/stack/0");

		const title = await presentation.getSlideTitle();
		expect(title).toBe("Rspack Ecosystem");
	});

	test("active section is highlighted", async () => {
		const overviewBtn = presentation.getSidebarButton("Overview");
		await expect(overviewBtn).toHaveAttribute("aria-current", "true");

		await presentation.clickSection("Architecture");

		const archBtn = presentation.getSidebarButton("Architecture");
		await expect(archBtn).toHaveAttribute("aria-current", "true");

		// Overview should no longer be current
		await expect(overviewBtn).not.toHaveAttribute("aria-current", "true");
	});
});

// ─── Keyboard Navigation ─────────────────────────────────────────────────────

test.describe("Keyboard Navigation", () => {
	test.beforeEach(async () => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();
	});

	test("ArrowRight advances slide", async ({ page }) => {
		await presentation.pressArrowRight();

		expect(page.url()).toContain("/intro/1");

		const title = await presentation.getSlideTitle();
		expect(title).toBe("Structural Analysis");
	});

	test("ArrowLeft goes back", async ({ page }) => {
		await presentation.navigateToSlide("intro", 1);
		await presentation.waitForLayout();

		await presentation.pressArrowLeft();

		expect(page.url()).toContain("/intro/0");
	});

	test("ArrowLeft is no-op on first slide", async ({ page }) => {
		await presentation.pressArrowLeft();

		expect(page.url()).toContain("/intro/0");
	});

	test("ArrowRight is no-op on last slide", async ({ page }) => {
		await presentation.navigateToSlide("stack", 1);
		await presentation.waitForLayout();

		await presentation.pressArrowRight();

		expect(page.url()).toContain("/stack/1");
	});

	test("ArrowLeft crosses section boundary backwards", async ({ page }) => {
		await presentation.navigateToSlide("architecture", 0);
		await presentation.waitForLayout();

		await presentation.pressArrowLeft();

		expect(page.url()).toContain("/intro/2");
	});
});

// ─── Last Slide Boundary ────────────────────────────────────────────────────

test.describe("Last Slide Boundary", () => {
	test.beforeEach(async () => {
		await presentation.navigateToSlide("stack", 1);
		await presentation.waitForLayout();
	});

	test("next disabled, prev enabled on last slide", async () => {
		await expect(presentation.nextButton).toBeDisabled();
		await expect(presentation.prevButton).toBeEnabled();
	});

	test("clicking next is no-op on last slide", async ({ page }) => {
		await presentation.nextButton.click({ force: true });

		expect(page.url()).toContain("/stack/1");
	});
});

// ─── Route Validation ───────────────────────────────────────────────────────

test.describe("Route Validation", () => {
	test("invalid slide index redirects to first slide", async ({ page }) => {
		await presentation.navigateToSlide("intro", 999);

		expect(page.url()).toContain("/intro/0");
	});

	test("invalid section redirects to first slide", async ({ page }) => {
		await presentation.goto("/nonexistent/0");

		expect(page.url()).toContain("/intro/0");
	});

	test("negative slide index redirects to first slide", async ({ page }) => {
		await presentation.goto("/intro/-1");

		expect(page.url()).toContain("/intro/0");
	});
});

// ─── Browser History ────────────────────────────────────────────────────────

test.describe("Browser History", () => {
	test("browser back returns to previous slide", async ({ page }) => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();

		await presentation.clickNext();
		expect(page.url()).toContain("/intro/1");

		await page.goBack();
		await page.waitForLoadState("networkidle");
		expect(page.url()).toContain("/intro/0");
	});

	test("browser forward restores after back", async ({ page }) => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();

		await presentation.clickNext();
		expect(page.url()).toContain("/intro/1");

		await page.goBack();
		await page.waitForLoadState("networkidle");
		expect(page.url()).toContain("/intro/0");

		await page.goForward();
		await page.waitForLoadState("networkidle");
		expect(page.url()).toContain("/intro/1");
	});
});

// ─── Visual Integrity (post-migration sanity) ────────────────────────────────

test.describe("Visual Integrity", () => {
	test("no console errors on load (filter known noise)", async ({ page }) => {
		const errors: string[] = [];

		// Known noise patterns to ignore
		const IGNORED_PATTERNS = [
			/favicon/i,
			/devtools/i,
			/hot-update/i,
			/\[HMR\]/i,
			/Download the React DevTools/i,
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

	test("all major layout sections have non-zero dimensions", async () => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();

		for (const locator of [
			presentation.header,
			presentation.sidebar,
			presentation.centerPanel,
			presentation.bottomBar,
		]) {
			const box = await locator.boundingBox();
			expect(box).not.toBeNull();
			expect(box!.width).toBeGreaterThan(0);
			expect(box!.height).toBeGreaterThan(0);
		}
	});

	test("nav arrow buttons have non-zero dimensions", async () => {
		await presentation.navigateToSlide("intro", 0);
		await presentation.waitForLayout();

		for (const locator of [presentation.prevButton, presentation.nextButton]) {
			const box = await locator.boundingBox();
			expect(box).not.toBeNull();
			expect(box!.width).toBeGreaterThan(0);
			expect(box!.height).toBeGreaterThan(0);
		}
	});
});
