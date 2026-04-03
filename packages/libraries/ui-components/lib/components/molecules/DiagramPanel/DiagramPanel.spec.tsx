import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import DiagramPanel from "./DiagramPanel";

describe("DiagramPanel", () => {
	it("renders children inside aside", () => {
		render(
			<DiagramPanel>
				<svg data-testid="diagram">
					<title>Test diagram</title>
				</svg>
			</DiagramPanel>,
		);
		expect(screen.getByTestId("diagram")).toBeInTheDocument();
	});

	it("renders an aside element", () => {
		const { container } = render(
			<DiagramPanel>
				<p>Content</p>
			</DiagramPanel>,
		);
		expect(container.querySelector("aside")).not.toBeNull();
	});

	it("has accessible label", () => {
		render(
			<DiagramPanel>
				<p>Content</p>
			</DiagramPanel>,
		);
		expect(screen.getByLabelText("Diagram panel")).toBeInTheDocument();
	});

	it("renders empty aside when no children", () => {
		const { container } = render(<DiagramPanel>{null}</DiagramPanel>);
		expect(container.querySelector("aside")).not.toBeNull();
	});
});
