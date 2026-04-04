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
		const result = addVisited({}, "problem-audience", 0);
		expect(result).toEqual({ "problem-audience": [0] });
	});

	it("appends to existing section", () => {
		const result = addVisited({ "problem-audience": [0] }, "problem-audience", 1);
		expect(result).toEqual({ "problem-audience": [0, 1] });
	});

	it("returns same reference if already visited", () => {
		const visited = { "problem-audience": [0, 1] };
		const result = addVisited(visited, "problem-audience", 0);
		expect(result).toBe(visited);
	});
});

describe("visitUpTo (pure helper)", () => {
	it("adds slide to empty section", () => {
		expect(visitUpTo({}, "problem-audience", 0)).toEqual({ "problem-audience": [0] });
	});

	it("keeps slides up to index and removes later ones", () => {
		const result = visitUpTo({ "problem-audience": [0, 1, 2] }, "problem-audience", 1);
		expect(result).toEqual({ "problem-audience": [0, 1] });
	});

	it("adds current slide if not yet present", () => {
		const result = visitUpTo({ "problem-audience": [0, 2] }, "problem-audience", 1);
		expect(result).toEqual({ "problem-audience": [0, 1] });
	});

	it("returns same reference if nothing changes", () => {
		const visited = { "problem-audience": [0, 1] };
		expect(visitUpTo(visited, "problem-audience", 1)).toBe(visited);
	});

	it("does not affect other sections", () => {
		const result = visitUpTo({ "problem-audience": [0, 1, 2], arch: [0, 1] }, "problem-audience", 0);
		expect(result).toEqual({ "problem-audience": [0], arch: [0, 1] });
	});
});

describe("useProgressStore", () => {
	it("has correct initial state", () => {
		const state = getState();
		expect(state.currentSectionId).toBe("problem-audience");
		expect(state.currentSlideIndex).toBe(0);
		expect(state.visitedSlides).toEqual({});
	});

	it("navigates to a new position", () => {
		act(() => {
			getState().navigate("overview", 2);
		});

		const state = getState();
		expect(state.currentSectionId).toBe("overview");
		expect(state.currentSlideIndex).toBe(2);
		expect(state.visitedSlides).toEqual({ overview: [2] });
	});

	it("marks a slide as visited without changing position", () => {
		act(() => {
			getState().markVisited("problem-audience", 0);
		});

		const state = getState();
		expect(state.currentSectionId).toBe("problem-audience");
		expect(state.currentSlideIndex).toBe(0);
		expect(state.visitedSlides).toEqual({ "problem-audience": [0] });
	});

	it("accumulates visited slides across navigations", () => {
		act(() => {
			getState().navigate("problem-audience", 0);
			getState().navigate("problem-audience", 1);
			getState().navigate("overview", 0);
		});

		expect(getState().visitedSlides).toEqual({
			"problem-audience": [0, 1],
			overview: [0],
		});
	});

	it("truncates visited slides after current when navigating back", () => {
		act(() => {
			getState().navigate("problem-audience", 0);
			getState().navigate("problem-audience", 1);
			getState().navigate("problem-audience", 2);
		});
		expect(getState().visitedSlides).toEqual({ "problem-audience": [0, 1, 2] });

		act(() => {
			getState().navigate("problem-audience", 1);
		});
		expect(getState().visitedSlides).toEqual({ "problem-audience": [0, 1] });
	});

	it("does not duplicate visited entries", () => {
		act(() => {
			getState().navigate("problem-audience", 0);
			getState().navigate("problem-audience", 0);
		});

		expect(getState().visitedSlides).toEqual({ "problem-audience": [0] });
	});

	it("resets to initial state", () => {
		act(() => {
			getState().navigate("overview", 2);
			getState().resetProgress();
		});

		const state = getState();
		expect(state.currentSectionId).toBe("problem-audience");
		expect(state.currentSlideIndex).toBe(0);
		expect(state.visitedSlides).toEqual({});
	});
});
