import type { Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// BasePage — parent class for ALL page objects
// Add shared behaviour here: navigation, notifications, modals, screenshots
// ---------------------------------------------------------------------------

export class BasePage {
	constructor(protected page: Page) {}

	async goto(path: string): Promise<void> {
		await this.page.goto(path);
		await this.page.waitForLoadState("networkidle");
	}

	async getCurrentUrl(): Promise<string> {
		return this.page.url();
	}

	async waitForNotification(): Promise<void> {
		await this.page.waitForSelector('[role="status"]');
	}

	async getNotificationText(): Promise<string> {
		const notification = this.page.locator('[role="status"]');
		return notification.innerText();
	}

	async takeScreenshot(name: string): Promise<void> {
		await this.page.screenshot({ path: `playwright-report/screenshots/${name}.png` });
	}
}
