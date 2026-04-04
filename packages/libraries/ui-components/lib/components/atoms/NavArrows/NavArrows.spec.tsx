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

	it("renders two buttons with chevron SVGs", () => {
		render(<NavArrows onNext={onNext} onPrev={onPrev} canGoNext canGoPrev />);
		const prev = screen.getByLabelText("Previous slide");
		const next = screen.getByLabelText("Next slide");
		expect(prev.querySelector("svg")).not.toBeNull();
		expect(next.querySelector("svg")).not.toBeNull();
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

	it("disables buttons when navigation is not available", () => {
		render(<NavArrows onNext={onNext} onPrev={onPrev} canGoNext={false} canGoPrev={false} />);
		expect(screen.getByLabelText("Previous slide")).toBeDisabled();
		expect(screen.getByLabelText("Next slide")).toBeDisabled();
	});
});
