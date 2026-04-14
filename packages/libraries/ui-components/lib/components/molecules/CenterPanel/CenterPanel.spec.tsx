import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import CenterPanel from "./CenterPanel";

describe("CenterPanel", () => {
	it("renders section label", () => {
		render(<CenterPanel sectionLabel="SECTION 01 · OVERVIEW" />);
		expect(screen.getByText("SECTION 01 · OVERVIEW")).toBeInTheDocument();
	});

	it("renders slide title as h2", () => {
		render(<CenterPanel slideTitle="The Monolith Problem" />);
		const title = screen.getByRole("heading", { level: 2 });
		expect(title.textContent).toBe("The Monolith Problem");
	});

	it("renders body text", () => {
		render(<CenterPanel slideBody="Some body text here." />);
		expect(screen.getByText("Some body text here.")).toBeInTheDocument();
	});

	it("renders children alongside structured props", () => {
		render(
			<CenterPanel slideTitle="Title">
				<span data-testid="extra">extra content</span>
			</CenterPanel>,
		);
		expect(screen.getByTestId("extra")).toBeInTheDocument();
	});

	it("omits structured elements when props are absent", () => {
		const { container } = render(<CenterPanel />);
		expect(container.querySelector("span")).toBeNull();
		expect(container.querySelector("h2")).toBeNull();
		expect(container.querySelector("p")).toBeNull();
	});

	it("applies full-height overflow classes so long content scrolls internally", () => {
		// Regression guard: without `h-full`, `main` expands to its content height,
		// and `overflow-y-auto` becomes a no-op — long slides overflow the grid row
		// silently on mobile, hiding content below the fold.
		const { container } = render(<CenterPanel slideTitle="t" />);
		const main = container.querySelector("main");
		expect(main).not.toBeNull();
		const classes = main?.className ?? "";
		expect(classes).toContain("h-full");
		expect(classes).toContain("overflow-y-auto");
		expect(classes).toContain("min-h-0");
	});
});
