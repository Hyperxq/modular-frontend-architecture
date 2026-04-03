import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import PresentationLayout from "./PresentationLayout";

describe("PresentationLayout", () => {
	it("renders all slot contents", () => {
		render(
			<PresentationLayout
				header={<span data-testid="h">header</span>}
				sidebar={<span data-testid="s">sidebar</span>}
				center={<span data-testid="c">center</span>}
				diagram={<span data-testid="d">diagram</span>}
				bottom={<span data-testid="b">bottom</span>}
				showDiagram
			/>,
		);
		expect(screen.getByTestId("h")).toBeInTheDocument();
		expect(screen.getByTestId("s")).toBeInTheDocument();
		expect(screen.getByTestId("c")).toBeInTheDocument();
		expect(screen.getByTestId("d")).toBeInTheDocument();
		expect(screen.getByTestId("b")).toBeInTheDocument();
	});

	it("has presentation aria-label", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
			/>,
		);
		const root = container.querySelector(".presentation-layout");
		expect(root?.getAttribute("aria-label")).toBe("Presentation");
	});

	it("applies no-diagram class when showDiagram is false", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
				showDiagram={false}
			/>,
		);
		const root = container.querySelector(".presentation-layout");
		expect(root?.classList.contains("presentation-layout--no-diagram")).toBe(true);
	});

	it("does not apply no-diagram class when showDiagram is true", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={<span>diagram</span>}
				bottom={null}
				showDiagram
			/>,
		);
		const root = container.querySelector(".presentation-layout");
		expect(root?.classList.contains("presentation-layout--no-diagram")).toBe(false);
	});

	it("hides diagram wrapper when showDiagram is false", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={<span data-testid="d">diagram</span>}
				bottom={null}
				showDiagram={false}
			/>,
		);
		expect(container.querySelector(".presentation-layout__diagram")).toBeNull();
	});

	it("shows diagram wrapper when showDiagram is true", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={<span>diagram</span>}
				bottom={null}
				showDiagram
			/>,
		);
		expect(container.querySelector(".presentation-layout__diagram")).not.toBeNull();
	});
});
