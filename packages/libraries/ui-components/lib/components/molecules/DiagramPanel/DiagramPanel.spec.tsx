import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import DiagramPanel from "./DiagramPanel";

describe("DiagramPanel", () => {
	it("renders panel title", () => {
		const { container } = render(
			<DiagramPanel panelTitle="DIAGRAM :: STRUCTURAL ANALYSIS">
				<p>content</p>
			</DiagramPanel>,
		);
		const title = container.querySelector(".diagram-panel__title");
		expect(title?.textContent).toBe("DIAGRAM :: STRUCTURAL ANALYSIS");
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
		const { container } = render(
			<DiagramPanel
				metadata={[
					{ label: "IMPACT RADIUS", value: "Global System Outage" },
					{ label: "VELOCITY", value: "-45% Efficiency" },
				]}
			>
				<p>content</p>
			</DiagramPanel>,
		);
		const labels = container.querySelectorAll(".diagram-panel__meta-label");
		const values = container.querySelectorAll(".diagram-panel__meta-value");
		expect(labels).toHaveLength(2);
		expect(labels[0]?.textContent).toBe("IMPACT RADIUS");
		expect(values[0]?.textContent).toBe("Global System Outage");
	});

	it("omits metadata when not provided", () => {
		const { container } = render(
			<DiagramPanel>
				<p>content</p>
			</DiagramPanel>,
		);
		expect(container.querySelector(".diagram-panel__metadata")).toBeNull();
	});

	it("omits title when not provided", () => {
		const { container } = render(
			<DiagramPanel>
				<p>content</p>
			</DiagramPanel>,
		);
		expect(container.querySelector(".diagram-panel__title")).toBeNull();
	});
});
