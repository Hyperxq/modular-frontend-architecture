import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import BottomBar from "./BottomBar";

describe("BottomBar", () => {
	it("renders 1-indexed slide counter", () => {
		render(<BottomBar currentSlideIndex={2} totalSlides={15} />);
		expect(screen.getByText("3 / 15")).toBeInTheDocument();
	});

	it("renders first slide correctly", () => {
		render(<BottomBar currentSlideIndex={0} totalSlides={10} />);
		expect(screen.getByText("1 / 10")).toBeInTheDocument();
	});

	it("renders a footer element", () => {
		const { container } = render(<BottomBar currentSlideIndex={0} totalSlides={5} />);
		const footer = container.querySelector("footer");
		expect(footer).not.toBeNull();
	});

	it("has accessible label on counter", () => {
		const { container } = render(<BottomBar currentSlideIndex={0} totalSlides={5} />);
		const counter = container.querySelector(".bottom-bar__counter");
		expect(counter?.getAttribute("aria-label")).toBe("Slide 1 of 5");
	});

	it("renders children inside footer", () => {
		render(
			<BottomBar currentSlideIndex={0} totalSlides={5}>
				<span data-testid="child">arrows</span>
			</BottomBar>,
		);
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});
