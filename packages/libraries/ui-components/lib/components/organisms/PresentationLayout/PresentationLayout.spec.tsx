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

	it("renders navPrev in overlay wrapper inside center", () => {
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
		const wrapper = container.querySelector(".presentation-layout__nav-prev");
		expect(wrapper).not.toBeNull();
		expect(screen.getByTestId("prev")).toBeInTheDocument();
	});

	it("renders navNext inside center when showDiagram is false", () => {
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
		const centerCell = container.querySelector(".presentation-layout__center");
		const nextWrapper = centerCell?.querySelector(".presentation-layout__nav-next");
		expect(nextWrapper).not.toBeNull();
		expect(screen.getByTestId("next")).toBeInTheDocument();
	});

	it("renders navNext inside diagram when showDiagram is true", () => {
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
		const diagramCell = container.querySelector(".presentation-layout__diagram");
		const nextWrapper = diagramCell?.querySelector(".presentation-layout__nav-next");
		expect(nextWrapper).not.toBeNull();
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
