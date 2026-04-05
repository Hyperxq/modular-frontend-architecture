import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import BottomBar from "./BottomBar";

describe("BottomBar", () => {
	it("does not render navigation hint on desktop (no navPrev/navNext)", () => {
		render(
			<BottomBar currentSlideIndex={0} totalSlides={5} currentSectionIndex={0} totalSections={3} />,
		);
		expect(screen.queryByText(/navigate/i)).toBeNull();
	});

	it("renders swipe hint on mobile when showSwipeHint is true", () => {
		render(
			<BottomBar
				currentSlideIndex={0}
				totalSlides={5}
				currentSectionIndex={0}
				totalSections={3}
				navPrev={<button type="button">prev</button>}
				navNext={<button type="button">next</button>}
				showSwipeHint
			/>,
		);
		expect(screen.getByText("SWIPE TO NAVIGATE")).toBeInTheDocument();
	});

	it("renders arrows hint on mobile when showSwipeHint is false", () => {
		render(
			<BottomBar
				currentSlideIndex={0}
				totalSlides={5}
				currentSectionIndex={0}
				totalSections={3}
				navPrev={<button type="button">prev</button>}
				navNext={<button type="button">next</button>}
			/>,
		);
		expect(screen.getByText("USE ARROWS TO NAVIGATE")).toBeInTheDocument();
	});

	it("renders slide counter with correct numbers", () => {
		render(
			<BottomBar currentSlideIndex={1} totalSlides={5} currentSectionIndex={0} totalSections={3} />,
		);
		expect(screen.getByText(/SLIDE 2 \/ 5/)).toBeInTheDocument();
	});

	it("renders slide dots with correct count", () => {
		render(
			<BottomBar currentSlideIndex={1} totalSlides={5} currentSectionIndex={0} totalSections={3} />,
		);
		const dotsContainer = screen.getByRole("img", { name: /Slide 2 of 5/ });
		const dots = dotsContainer.querySelectorAll("span");
		expect(dots).toHaveLength(5);
	});

	it("highlights active dot with primary color class", () => {
		render(
			<BottomBar currentSlideIndex={1} totalSlides={5} currentSectionIndex={0} totalSections={3} />,
		);
		const dotsContainer = screen.getByRole("img", { name: /Slide 2 of 5/ });
		const dots = dotsContainer.querySelectorAll("span");
		expect(dots[1]?.className).toContain("bg-primary");
		expect(dots[0]?.className).toContain("bg-fg-muted");
	});

	it("renders zero-padded section counter", () => {
		render(
			<BottomBar currentSlideIndex={0} totalSlides={5} currentSectionIndex={0} totalSections={9} />,
		);
		expect(screen.getByText(/SEC 01 \/ 09/)).toBeInTheDocument();
	});

	it("renders double-digit sections without extra padding", () => {
		render(
			<BottomBar
				currentSlideIndex={0}
				totalSlides={5}
				currentSectionIndex={11}
				totalSections={15}
			/>,
		);
		expect(screen.getByText(/SEC 12 \/ 15/)).toBeInTheDocument();
	});
});
