import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import CenterPanel from "./CenterPanel";

describe("CenterPanel", () => {
	it("renders section label", () => {
		const { container } = render(<CenterPanel sectionLabel="SECTION 01 · OVERVIEW" />);
		const label = container.querySelector(".center-panel__label");
		expect(label?.textContent).toBe("SECTION 01 · OVERVIEW");
	});

	it("renders slide title as h2", () => {
		const { container } = render(<CenterPanel slideTitle="The Monolith Problem" />);
		const title = container.querySelector(".center-panel__title");
		expect(title?.tagName).toBe("H2");
		expect(title?.textContent).toBe("The Monolith Problem");
	});

	it("renders body text", () => {
		const { container } = render(<CenterPanel slideBody="Some body text here." />);
		const body = container.querySelector(".center-panel__body");
		expect(body?.textContent).toBe("Some body text here.");
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
		expect(container.querySelector(".center-panel__label")).toBeNull();
		expect(container.querySelector(".center-panel__title")).toBeNull();
		expect(container.querySelector(".center-panel__body")).toBeNull();
	});
});
