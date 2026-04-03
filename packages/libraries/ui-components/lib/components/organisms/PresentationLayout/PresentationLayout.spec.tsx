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
			/>,
		);
		expect(
			container
				.querySelector(".presentation-layout")
				?.classList.contains("presentation-layout--no-diagram"),
		).toBe(true);
	});

	it("renders navPrev as grid-level sibling", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
				navPrev={
					<button type="button" data-testid="prev">
						‹
					</button>
				}
			/>,
		);
		const grid = container.querySelector(".presentation-layout");
		const wrapper = grid?.querySelector(":scope > .presentation-layout__nav-prev");
		expect(wrapper).not.toBeNull();
		expect(screen.getByTestId("prev")).toBeInTheDocument();
	});

	it("renders navNext without diagram modifier when showDiagram is false", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
				navNext={
					<button type="button" data-testid="next">
						›
					</button>
				}
				showDiagram={false}
			/>,
		);
		const wrapper = container.querySelector(".presentation-layout__nav-next");
		expect(wrapper).not.toBeNull();
		expect(wrapper?.classList.contains("presentation-layout__nav-next--diagram")).toBe(false);
		expect(screen.getByTestId("next")).toBeInTheDocument();
	});

	it("renders navNext with diagram modifier when showDiagram is true", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={<span>diagram</span>}
				bottom={null}
				navNext={
					<button type="button" data-testid="next">
						›
					</button>
				}
				showDiagram
			/>,
		);
		const wrapper = container.querySelector(".presentation-layout__nav-next");
		expect(wrapper?.classList.contains("presentation-layout__nav-next--diagram")).toBe(true);
	});

	it("omits nav wrappers when not provided", () => {
		const { container } = render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
			/>,
		);
		expect(container.querySelector(".presentation-layout__nav-prev")).toBeNull();
		expect(container.querySelector(".presentation-layout__nav-next")).toBeNull();
	});
});
