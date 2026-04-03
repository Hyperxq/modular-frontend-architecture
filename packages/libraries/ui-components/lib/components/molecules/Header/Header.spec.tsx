import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import Header from "./Header";

describe("Header", () => {
	it("renders title as h1", () => {
		render(<Header title="Clean Architecture" currentSectionIndex={0} totalSections={5} />);
		const h1 = screen.getByText("Clean Architecture");
		expect(h1.tagName).toBe("H1");
	});

	it("renders 1-indexed section counter", () => {
		render(<Header title="Test" currentSectionIndex={2} totalSections={6} />);
		expect(screen.getByText("3 / 6")).toBeInTheDocument();
	});

	it("renders first section correctly", () => {
		render(<Header title="Test" currentSectionIndex={0} totalSections={1} />);
		expect(screen.getByText("1 / 1")).toBeInTheDocument();
	});

	it("renders a header element", () => {
		const { container } = render(<Header title="Test" currentSectionIndex={0} totalSections={5} />);
		expect(container.querySelector("header")).not.toBeNull();
	});

	it("renders counter in monospace span", () => {
		const { container } = render(<Header title="Test" currentSectionIndex={2} totalSections={6} />);
		const counter = container.querySelector(".header__counter");
		expect(counter).not.toBeNull();
		expect(counter?.textContent).toContain("3 / 6");
	});
});
