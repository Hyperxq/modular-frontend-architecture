import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import Header from "./Header";

describe("Header", () => {
	it("renders centered title as h1", () => {
		const { container } = render(<Header title="MICROFRONTEND ARCHITECTURE" />);
		const h1 = container.querySelector(".header__title");
		expect(h1).not.toBeNull();
		expect(h1?.textContent).toBe("MICROFRONTEND ARCHITECTURE");
		expect(h1?.tagName).toBe("H1");
	});

	it("renders external link when linkText and linkUrl are provided", () => {
		const { container } = render(
			<Header title="Test" linkText="GITHUB ↗" linkUrl="https://github.com/example" />,
		);
		const link = container.querySelector(".header__link");
		expect(link).not.toBeNull();
		expect(link?.textContent).toBe("GITHUB ↗");
		expect(link?.getAttribute("href")).toBe("https://github.com/example");
		expect(link?.getAttribute("target")).toBe("_blank");
		expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
	});

	it("omits link when props are absent", () => {
		const { container } = render(<Header title="Test" />);
		expect(container.querySelector(".header__link")).toBeNull();
	});

	it("does not render a counter element", () => {
		const { container } = render(<Header title="Test" />);
		expect(container.querySelector(".header__counter")).toBeNull();
	});
});
