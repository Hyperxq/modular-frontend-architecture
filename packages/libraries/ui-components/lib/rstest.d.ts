import "@rstest/core";

declare module "@rstest/core" {
	interface Assertion<_T = unknown> {
		toBeInTheDocument(): void;
		toBeDisabled(): void;
		toBeEnabled(): void;
		toBeEmptyDOMElement(): void;
		toBeVisible(): void;
		toContainElement(element: HTMLElement | SVGElement | null): void;
		toContainHTML(htmlText: string): void;
		toHaveAttribute(attr: string, value?: unknown): void;
		toHaveClass(...classNames: string[]): void;
		toHaveStyle(css: string | Record<string, unknown>): void;
		toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): void;
		toHaveValue(value: string | string[] | number | null): void;
		toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): void;
		toBeChecked(): void;
		toHaveDescription(text?: string | RegExp): void;
		toHaveErrorMessage(text?: string | RegExp): void;
		toHaveFocus(): void;
		toHaveFormValues(expectedValues: Record<string, unknown>): void;
		toBeRequired(): void;
		toBeValid(): void;
		toBeInvalid(): void;
		toHaveAccessibleName(text?: string | RegExp): void;
		toHaveAccessibleDescription(text?: string | RegExp): void;
		toHaveRole(role: string): void;
	}
}
