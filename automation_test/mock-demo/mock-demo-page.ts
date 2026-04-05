import { BasePage } from "../base-page";

export class MockDemoPage extends BasePage {
	async navigateToMockDemo(): Promise<void> {
		await this.goto("/mock/0");
	}
}
