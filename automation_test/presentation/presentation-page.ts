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

	constructor(page: Page) {
		super(page);

		this.app = page.locator('[role="application"][aria-label="Presentation"]');
		this.header = page.locator("header");
		this.headerTitle = page.locator("h1");
		this.sidebar = page.locator('nav[aria-label="Presentation sections"]');
		this.centerPanel = page.locator('main[aria-label="Slide content"]');
		this.bottomBar = page.locator("footer");
		this.prevButton = page.getByRole("button", { name: "Previous slide" });
		this.nextButton = page.getByRole("button", { name: "Next slide" });
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
	}

	// ── Sidebar helpers ──

	getSidebarButton(sectionTitle: string): Locator {
		return this.sidebar.getByRole("button").filter({ hasText: sectionTitle });
	}

	async clickSection(sectionTitle: string): Promise<void> {
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
		return this.bottomBar.locator("span").filter({ hasText: /SLIDE \d/ }).innerText();
	}

	async getSectionCounter(): Promise<string> {
		return this.bottomBar.locator("div").last().innerText();
	}

	// ── Navigation helpers ──

	async clickNext(): Promise<void> {
		await this.nextButton.click();
		await this.page.waitForLoadState("domcontentloaded");
	}

	async clickPrev(): Promise<void> {
		await this.prevButton.click();
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
