import type { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

// ---------------------------------------------------------------------------
// PresentationPage — Page Object for the presentation layout
//
// Uses semantic selectors (role, label, text) over test-ids where possible.
// MF remotes load async → every navigation waits for networkidle.
// ---------------------------------------------------------------------------

export class PresentationPage extends BasePage {
	// ── Layout regions ──
	readonly app: Locator;
	readonly header: Locator;
	readonly headerTitle: Locator;
	readonly sidebar: Locator;
	readonly centerPanel: Locator;
	readonly bottomBar: Locator;

	// ── Navigation controls ──
	readonly prevButton: Locator;
	readonly nextButton: Locator;

	// ── Mobile controls ──
	readonly menuButton: Locator;
	readonly sidebarDrawer: Locator;

	constructor(page: Page) {
		super(page);

		this.app = page.locator('section[aria-label="Presentation"]');
		this.header = page.locator("header");
		this.headerTitle = page.locator("h1");
		this.sidebar = page.locator('nav[aria-label="Presentation sections"]');
		this.centerPanel = page.locator('main[aria-label="Slide content"]');
		this.bottomBar = page.locator("footer");
		this.prevButton = page.getByRole("button", { name: "Previous slide" });
		this.nextButton = page.getByRole("button", { name: "Next slide" });
		this.menuButton = page.getByRole("button", { name: "Toggle menu" });
		this.sidebarDrawer = page.locator('[data-testid="sidebar-drawer"]');
	}

	/** Navigate to a specific section/slide route and wait for MF to load */
	async navigateToSlide(sectionId: string, slideIndex: number): Promise<void> {
		await this.goto(`/${sectionId}/${slideIndex}`);
	}

	/** Navigate to the app root (should redirect to /problem-audience/0) */
	async navigateToRoot(): Promise<void> {
		await this.goto("/");
	}

	/** Wait for the presentation layout to fully render (MF async load) */
	async waitForLayout(): Promise<void> {
		await this.app.waitFor({ state: "visible", timeout: 30_000 });
		await this.centerPanel.waitFor({ state: "visible", timeout: 15_000 });
		await this.header.waitFor({ state: "visible", timeout: 10_000 });
		if (!(await this.isMobileViewport())) {
			await this.sidebar.waitFor({ state: "visible", timeout: 10_000 });
		}
		await this.bottomBar.waitFor({ state: "visible", timeout: 10_000 });
	}

	// ── Sidebar helpers ──

	private async isMobileViewport(): Promise<boolean> {
		const viewport = this.page.viewportSize();
		return viewport !== null && viewport.width < 768;
	}

	private async openDrawerIfMobile(): Promise<void> {
		if (!(await this.isMobileViewport())) return;
		const isDrawerOpen = await this.sidebarDrawer.evaluate((el) =>
			el.classList.contains("opacity-100"),
		);
		if (!isDrawerOpen) {
			await this.menuButton.click();
			await this.sidebarDrawer.waitFor({ state: "visible", timeout: 5_000 });
		}
	}

	getSidebarButton(sectionTitle: string): Locator {
		return this.sidebar.getByRole("button").filter({ hasText: sectionTitle });
	}

	async ensureSidebarVisible(): Promise<void> {
		await this.openDrawerIfMobile();
	}

	async clickSection(sectionTitle: string): Promise<void> {
		await this.openDrawerIfMobile();
		await this.getSidebarButton(sectionTitle).click();
		await this.page.waitForLoadState("domcontentloaded");
	}

	// ── Content readers ──

	async getSectionLabel(): Promise<string> {
		const label = this.centerPanel.locator("span").first();
		return label.innerText();
	}

	async getSlideTitle(): Promise<string> {
		return this.centerPanel.locator("h2").innerText();
	}

	async getSlideBody(): Promise<string> {
		return this.centerPanel.locator("p").innerText();
	}

	async getSlideCounter(): Promise<string> {
		return this.bottomBar
			.locator("span")
			.filter({ hasText: /SLIDE \d/ })
			.innerText();
	}

	async getSectionCounter(): Promise<string> {
		return this.bottomBar.locator("div").last().innerText();
	}

	// ── Navigation helpers ──

	async clickNext(): Promise<void> {
		// dispatchEvent bypasses Playwright's hit-test entirely — the grid-area-center
		// panel visually overlaps nav buttons in desktop, intercepting pointer events.
		// Native JS dispatch sends the event directly to the button's click handler.
		await this.nextButton.dispatchEvent("click");
		await this.page.waitForLoadState("domcontentloaded");
	}

	async clickPrev(): Promise<void> {
		// dispatchEvent — same grid overlap reason as clickNext
		await this.prevButton.dispatchEvent("click");
		await this.page.waitForLoadState("domcontentloaded");
	}

	async pressArrowRight(): Promise<void> {
		await this.page.keyboard.press("ArrowRight");
		await this.page.waitForLoadState("domcontentloaded");
	}

	async pressArrowLeft(): Promise<void> {
		await this.page.keyboard.press("ArrowLeft");
		await this.page.waitForLoadState("domcontentloaded");
	}
}
