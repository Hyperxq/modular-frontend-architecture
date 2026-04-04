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
		render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
			/>,
		);
		const root = screen.getByRole("application");
		expect(root.getAttribute("aria-label")).toBe("Presentation");
	});

	it("applies no-diagram layout class when showDiagram is false", () => {
		render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
			/>,
		);
		const root = screen.getByRole("application");
		expect(root.classList.contains("layout-grid-no-diagram")).toBe(true);
		expect(root.classList.contains("layout-grid-full")).toBe(false);
	});

	it("applies full layout class when showDiagram is true", () => {
		render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={<span>diagram</span>}
				bottom={null}
				showDiagram
			/>,
		);
		const root = screen.getByRole("application");
		expect(root.classList.contains("layout-grid-full")).toBe(true);
		expect(root.classList.contains("layout-grid-no-diagram")).toBe(false);
	});

	it("renders navPrev as grid-level sibling", () => {
		render(
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
		const root = screen.getByRole("application");
		const wrapper = root.querySelector(':scope > [data-testid="nav-prev-wrapper"]');
		expect(wrapper).not.toBeNull();
		expect(screen.getByTestId("prev")).toBeInTheDocument();
	});

	it("renders navNext with col-[2] when showDiagram is false", () => {
		render(
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
		const wrapper = screen.getByTestId("nav-next-wrapper");
		expect(wrapper).not.toBeNull();
		expect(wrapper.classList.contains("col-[3]")).toBe(false);
		expect(wrapper.classList.contains("col-[2]")).toBe(true);
		expect(screen.getByTestId("next")).toBeInTheDocument();
	});

	it("renders navNext with col-[3] when showDiagram is true", () => {
		render(
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
		const wrapper = screen.getByTestId("nav-next-wrapper");
		expect(wrapper.classList.contains("col-[3]")).toBe(true);
	});

	it("omits nav wrappers when not provided", () => {
		render(
			<PresentationLayout
				header={null}
				sidebar={null}
				center={null}
				diagram={null}
				bottom={null}
			/>,
		);
		expect(screen.queryByTestId("nav-prev-wrapper")).toBeNull();
		expect(screen.queryByTestId("nav-next-wrapper")).toBeNull();
	});
});
