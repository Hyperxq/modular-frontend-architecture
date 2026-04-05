import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import Header from "./Header";

describe("Header", () => {
	it("renders centered title as h1", () => {
		render(<Header title="MICROFRONTEND ARCHITECTURE" />);
		const h1 = screen.getByRole("heading", { level: 1 });
		expect(h1).not.toBeNull();
		expect(h1.textContent).toBe("MICROFRONTEND ARCHITECTURE");
	});

	it("renders external link when linkText and linkUrl are provided", () => {
		render(<Header title="Test" linkText="GITHUB ↗" linkUrl="https://github.com/example" />);
		const link = screen.getByRole("link");
		expect(link).not.toBeNull();
		expect(link.textContent).toBe("GITHUB ↗");
		expect(link.getAttribute("href")).toBe("https://github.com/example");
		expect(link.getAttribute("target")).toBe("_blank");
		expect(link.getAttribute("rel")).toBe("noopener noreferrer");
	});

	it("omits link when props are absent", () => {
		const { container } = render(<Header title="Test" />);
		expect(container.querySelector("a")).toBeNull();
	});

	it("does not render a counter element", () => {
		const { container } = render(<Header title="Test" />);
		expect(container.querySelector("[role='timer']")).toBeNull();
		expect(container.querySelector("[data-counter]")).toBeNull();
	});
});
