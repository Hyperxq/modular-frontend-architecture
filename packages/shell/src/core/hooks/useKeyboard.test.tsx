import { beforeEach, describe, expect, it } from "@rstest/core";
import { fireEvent, render } from "@testing-library/preact";
import type { FunctionalComponent } from "preact";
import { useKeyboard } from "./useKeyboard";

interface TestProps {
	canGoNext?: boolean;
	canGoPrev?: boolean;
	onNext: () => void;
	onPrev: () => void;
}

const KeyboardHarness: FunctionalComponent<TestProps> = ({
	canGoNext = true,
	canGoPrev = true,
	onNext,
	onPrev,
}) => {
	useKeyboard({ goNext: onNext, goPrev: onPrev, canGoNext, canGoPrev });
	return <div data-testid="harness">Keyboard active</div>;
};

describe("useKeyboard", () => {
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

	it("calls goNext on ArrowRight", () => {
		render(<KeyboardHarness onNext={onNext} onPrev={onPrev} />);
		fireEvent.keyDown(document, { key: "ArrowRight" });
		expect(nextCount).toBe(1);
		expect(prevCount).toBe(0);
	});

	it("calls goPrev on ArrowLeft", () => {
		render(<KeyboardHarness onNext={onNext} onPrev={onPrev} />);
		fireEvent.keyDown(document, { key: "ArrowLeft" });
		expect(prevCount).toBe(1);
		expect(nextCount).toBe(0);
	});

	it("does not call goNext when canGoNext is false", () => {
		render(<KeyboardHarness canGoNext={false} onNext={onNext} onPrev={onPrev} />);
		fireEvent.keyDown(document, { key: "ArrowRight" });
		expect(nextCount).toBe(0);
	});

	it("does not call goPrev when canGoPrev is false", () => {
		render(<KeyboardHarness canGoPrev={false} onNext={onNext} onPrev={onPrev} />);
		fireEvent.keyDown(document, { key: "ArrowLeft" });
		expect(prevCount).toBe(0);
	});

	it("ignores other keys", () => {
		render(<KeyboardHarness onNext={onNext} onPrev={onPrev} />);
		fireEvent.keyDown(document, { key: "Enter" });
		fireEvent.keyDown(document, { key: "Space" });
		fireEvent.keyDown(document, { key: "ArrowUp" });
		expect(nextCount).toBe(0);
		expect(prevCount).toBe(0);
	});
});
