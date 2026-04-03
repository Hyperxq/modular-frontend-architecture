import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import DiagramPanel from "./DiagramPanel";

describe("DiagramPanel", () => {
	it("renders panel title", () => {
		render(
			<DiagramPanel panelTitle="DIAGRAM :: STRUCTURAL ANALYSIS">
				<p>content</p>
			</DiagramPanel>,
		);
		expect(screen.getByText("DIAGRAM :: STRUCTURAL ANALYSIS")).toBeInTheDocument();
	});

	it("renders children inside content area", () => {
		render(
			<DiagramPanel>
				<span data-testid="diagram">diagram here</span>
			</DiagramPanel>,
		);
		expect(screen.getByTestId("diagram")).toBeInTheDocument();
	});

	it("renders metadata with labels and values", () => {
		render(
			<DiagramPanel
				metadata={[
					{ label: "IMPACT RADIUS", value: "Global System Outage" },
					{ label: "VELOCITY", value: "-45% Efficiency" },
				]}
			>
				<p>content</p>
			</DiagramPanel>,
		);
		expect(screen.getByText("IMPACT RADIUS")).toBeInTheDocument();
		expect(screen.getByText("Global System Outage")).toBeInTheDocument();
		expect(screen.getByText("VELOCITY")).toBeInTheDocument();
		expect(screen.getByText("-45% Efficiency")).toBeInTheDocument();
	});

	it("omits metadata when not provided", () => {
		const { container } = render(
			<DiagramPanel>
				<p>content</p>
			</DiagramPanel>,
		);
		// Only the aside > content div should exist (no metadata border-t div)
		expect(container.querySelector("[class*='border-t']")).toBeNull();
	});

	it("omits title when not provided", () => {
		const { container } = render(
			<DiagramPanel>
				<p>content</p>
			</DiagramPanel>,
		);
		// aside has 1 child: the content div only
		const aside = container.querySelector("aside");
		expect(aside?.children).toHaveLength(1);
	});
});
