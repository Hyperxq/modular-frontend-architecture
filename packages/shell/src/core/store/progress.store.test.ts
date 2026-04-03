import { afterEach, describe, expect, it } from "@rstest/core";
import { act } from "@testing-library/preact";
import { addVisited, visitUpTo, useProgressStore } from "./progress.store";

const getState = () => useProgressStore.getState();
const resetStore = () => getState().resetProgress();

afterEach(() => {
	resetStore();
});

describe("addVisited (pure helper)", () => {
	it("adds a new section + slide", () => {
		const result = addVisited({}, "intro", 0);
		expect(result).toEqual({ intro: [0] });
	});

	it("appends to existing section", () => {
		const result = addVisited({ intro: [0] }, "intro", 1);
		expect(result).toEqual({ intro: [0, 1] });
	});

	it("returns same reference if already visited", () => {
		const visited = { intro: [0, 1] };
		const result = addVisited(visited, "intro", 0);
		expect(result).toBe(visited);
	});
});

describe("visitUpTo (pure helper)", () => {
	it("adds slide to empty section", () => {
		expect(visitUpTo({}, "intro", 0)).toEqual({ intro: [0] });
	});

	it("keeps slides up to index and removes later ones", () => {
		const result = visitUpTo({ intro: [0, 1, 2] }, "intro", 1);
		expect(result).toEqual({ intro: [0, 1] });
	});

	it("adds current slide if not yet present", () => {
		const result = visitUpTo({ intro: [0, 2] }, "intro", 1);
		expect(result).toEqual({ intro: [0, 1] });
	});

	it("returns same reference if nothing changes", () => {
		const visited = { intro: [0, 1] };
		expect(visitUpTo(visited, "intro", 1)).toBe(visited);
	});

	it("does not affect other sections", () => {
		const result = visitUpTo({ intro: [0, 1, 2], arch: [0, 1] }, "intro", 0);
		expect(result).toEqual({ intro: [0], arch: [0, 1] });
	});
});

describe("useProgressStore", () => {
	it("has correct initial state", () => {
		const state = getState();
		expect(state.currentSectionId).toBe("intro");
		expect(state.currentSlideIndex).toBe(0);
		expect(state.visitedSlides).toEqual({});
	});

	it("navigates to a new position", () => {
		act(() => {
			getState().navigate("architecture", 2);
		});

		const state = getState();
		expect(state.currentSectionId).toBe("architecture");
		expect(state.currentSlideIndex).toBe(2);
		expect(state.visitedSlides).toEqual({ architecture: [2] });
	});

	it("marks a slide as visited without changing position", () => {
		act(() => {
			getState().markVisited("intro", 0);
		});

		const state = getState();
		expect(state.currentSectionId).toBe("intro");
		expect(state.currentSlideIndex).toBe(0);
		expect(state.visitedSlides).toEqual({ intro: [0] });
	});

	it("accumulates visited slides across navigations", () => {
		act(() => {
			getState().navigate("intro", 0);
			getState().navigate("intro", 1);
			getState().navigate("architecture", 0);
		});

		expect(getState().visitedSlides).toEqual({
			intro: [0, 1],
			architecture: [0],
		});
	});

	it("truncates visited slides after current when navigating back", () => {
		act(() => {
			getState().navigate("intro", 0);
			getState().navigate("intro", 1);
			getState().navigate("intro", 2);
		});
		expect(getState().visitedSlides).toEqual({ intro: [0, 1, 2] });

		act(() => {
			getState().navigate("intro", 1);
		});
		expect(getState().visitedSlides).toEqual({ intro: [0, 1] });
	});

	it("does not duplicate visited entries", () => {
		act(() => {
			getState().navigate("intro", 0);
			getState().navigate("intro", 0);
		});

		expect(getState().visitedSlides).toEqual({ intro: [0] });
	});

	it("resets to initial state", () => {
		act(() => {
			getState().navigate("architecture", 2);
			getState().resetProgress();
		});

		const state = getState();
		expect(state.currentSectionId).toBe("intro");
		expect(state.currentSlideIndex).toBe(0);
		expect(state.visitedSlides).toEqual({});
	});
});
