import type { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class MockDemoPage extends BasePage {
	readonly toggle: Locator;
	readonly sourceLabel: Locator;
	readonly userList: Locator;
	readonly loadingIndicator: Locator;

	constructor(page: Page) {
		super(page);
		this.toggle = page.getByRole("button", { name: /mock mode/i });
		this.sourceLabel = page.getByTestId("source-label");
		this.userList = page.getByTestId("user-list");
		this.loadingIndicator = page.getByTestId("loading-indicator");
	}

	async navigateToMockDemo(): Promise<void> {
		await this.goto("/mock/0");
	}
}
