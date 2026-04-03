import { beforeEach, describe, expect, it } from "@rstest/core";
import { fireEvent, render, screen } from "@testing-library/preact";
import NavArrows from "./NavArrows";

describe("NavArrows", () => {
	let nextCount: number;
	let prevCount: number;
	let onNext: () => void;
	let onPrev: () => void;

	beforeEach(() => {
		nextCount = 0;
		prevCount = 0;
		onNext = () => {
			nextCount++;
		};
		onPrev = () => {
			prevCount++;
		};
	});

	it("calls onNext when next button is clicked", () => {
		render(<NavArrows onNext={onNext} onPrev={onPrev} canGoNext canGoPrev />);
		fireEvent.click(screen.getByLabelText("Next slide"));
		expect(nextCount).toBe(1);
	});

	it("calls onPrev when prev button is clicked", () => {
		render(<NavArrows onNext={onNext} onPrev={onPrev} canGoNext canGoPrev />);
		fireEvent.click(screen.getByLabelText("Previous slide"));
		expect(prevCount).toBe(1);
	});

	it("disables prev button when canGoPrev is false", () => {
		render(<NavArrows onNext={onNext} onPrev={onPrev} canGoNext canGoPrev={false} />);
		expect(screen.getByLabelText("Previous slide")).toBeDisabled();
	});

	it("disables next button when canGoNext is false", () => {
		render(<NavArrows onNext={onNext} onPrev={onPrev} canGoNext={false} canGoPrev />);
		expect(screen.getByLabelText("Next slide")).toBeDisabled();
	});

	it("disables both buttons when at boundaries", () => {
		render(<NavArrows onNext={onNext} onPrev={onPrev} canGoNext={false} canGoPrev={false} />);
		expect(screen.getByLabelText("Previous slide")).toBeDisabled();
		expect(screen.getByLabelText("Next slide")).toBeDisabled();
	});
});
