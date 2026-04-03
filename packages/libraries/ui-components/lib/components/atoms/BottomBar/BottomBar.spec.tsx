import { describe, expect, it } from "@rstest/core";
import { render } from "@testing-library/preact";
import BottomBar from "./BottomBar";

describe("BottomBar", () => {
	it("renders navigation hint with TO NAVIGATE", () => {
		const { container } = render(
			<BottomBar currentSlideIndex={0} totalSlides={5} currentSectionIndex={0} totalSections={3} />,
		);
		const hint = container.querySelector(".bottom-bar__hint");
		expect(hint?.textContent).toContain("TO NAVIGATE");
	});

	it("renders slide counter in primary color", () => {
		const { container } = render(
			<BottomBar currentSlideIndex={1} totalSlides={5} currentSectionIndex={0} totalSections={3} />,
		);
		const label = container.querySelector(".bottom-bar__slide-label");
		expect(label?.textContent).toContain("SLIDE 2 / 5");
	});

	it("renders slide dots with current position filled", () => {
		const { container } = render(
			<BottomBar currentSlideIndex={1} totalSlides={5} currentSectionIndex={0} totalSections={3} />,
		);
		const dots = container.querySelector(".bottom-bar__dots");
		expect(dots?.textContent).toBe("○●○○○");
	});

	it("renders zero-padded section counter", () => {
		const { container } = render(
			<BottomBar currentSlideIndex={0} totalSlides={5} currentSectionIndex={0} totalSections={9} />,
		);
		const section = container.querySelector(".bottom-bar__section");
		expect(section?.textContent).toContain("SECTION 01 / 09");
	});

	it("renders double-digit sections without extra padding", () => {
		const { container } = render(
			<BottomBar
				currentSlideIndex={0}
				totalSlides={5}
				currentSectionIndex={11}
				totalSections={15}
			/>,
		);
		const section = container.querySelector(".bottom-bar__section");
		expect(section?.textContent).toContain("SECTION 12 / 15");
	});
});
