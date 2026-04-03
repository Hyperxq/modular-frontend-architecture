import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import CenterPanel from "./CenterPanel";

describe("CenterPanel", () => {
	it("renders children inside main", () => {
		render(
			<CenterPanel>
				<p>Slide content here</p>
			</CenterPanel>,
		);
		expect(screen.getByText("Slide content here")).toBeInTheDocument();
	});

	it("renders a main element", () => {
		const { container } = render(
			<CenterPanel>
				<p>Content</p>
			</CenterPanel>,
		);
		expect(container.querySelector("main")).not.toBeNull();
	});

	it("has accessible label", () => {
		render(
			<CenterPanel>
				<p>Content</p>
			</CenterPanel>,
		);
		expect(screen.getByLabelText("Slide content")).toBeInTheDocument();
	});
});
