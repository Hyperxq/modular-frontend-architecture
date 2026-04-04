import { describe, expect, it } from "@rstest/core";
import {
	getGlobalSlideIndex,
	getSectionById,
	getSectionIndex,
	getSlide,
	getTotalSlides,
	isFirstSlide,
	isLastSlide,
} from "./helpers";
import type { Section } from "./types";

const Noop = () => null;

const mockSections: Section[] = [
	{
		id: "problem-audience",
		title: "Problem & Audience",
		description: "The pain points and target audience",
		slides: [
			{ title: "The Pain", type: "concept", Content: Noop },
			{ title: "Who This Is For", type: "diagram", Content: Noop, diagram: "audience-diagram" },
		],
	},
	{
		id: "overview",
		title: "Overview",
		description: "High-level architecture overview",
		slides: [
			{ title: "The Big Picture", type: "concept", Content: Noop },
			{ title: "Data Flow", type: "code", Content: Noop },
			{ title: "This Website", type: "interactive", Content: Noop },
		],
	},
];

describe("getTotalSlides", () => {
	it("returns 0 for empty sections", () => {
		expect(getTotalSlides([])).toBe(0);
	});

	it("sums all slides across sections", () => {
		expect(getTotalSlides(mockSections)).toBe(5);
	});
});

describe("getSectionById", () => {
	it("returns the matching section", () => {
		const result = getSectionById(mockSections, "overview");
		expect(result?.title).toBe("Overview");
	});

	it("returns undefined for unknown id", () => {
		expect(getSectionById(mockSections, "nope")).toBeUndefined();
	});

	it("returns undefined for empty data", () => {
		expect(getSectionById([], "problem-audience")).toBeUndefined();
	});
});

describe("getSlide", () => {
	it("returns the correct slide", () => {
		const slide = getSlide(mockSections, "problem-audience", 1);
		expect(slide?.title).toBe("Who This Is For");
		expect(slide?.diagram).toBe("audience-diagram");
	});

	it("returns undefined for out-of-bounds index", () => {
		expect(getSlide(mockSections, "problem-audience", 99)).toBeUndefined();
	});

	it("returns undefined for unknown section", () => {
		expect(getSlide(mockSections, "nope", 0)).toBeUndefined();
	});
});

describe("getSectionIndex", () => {
	it("returns the correct index", () => {
		expect(getSectionIndex(mockSections, "overview")).toBe(1);
	});

	it("returns -1 for unknown section", () => {
		expect(getSectionIndex(mockSections, "nope")).toBe(-1);
	});
});

describe("getGlobalSlideIndex", () => {
	it("returns 0 for first section, first slide", () => {
		expect(getGlobalSlideIndex(mockSections, "problem-audience", 0)).toBe(0);
	});

	it("returns local index for first section", () => {
		expect(getGlobalSlideIndex(mockSections, "problem-audience", 1)).toBe(1);
	});

	it("sums previous sections slides", () => {
		// problem-audience has 2 slides, so overview slide 0 = global index 2
		expect(getGlobalSlideIndex(mockSections, "overview", 0)).toBe(2);
		expect(getGlobalSlideIndex(mockSections, "overview", 2)).toBe(4);
	});

	it("returns 0 for unknown section", () => {
		expect(getGlobalSlideIndex(mockSections, "nope", 0)).toBe(0);
	});
});

describe("isFirstSlide", () => {
	it("returns true for first section, first slide", () => {
		expect(isFirstSlide(mockSections, "problem-audience", 0)).toBe(true);
	});

	it("returns false for first section, second slide", () => {
		expect(isFirstSlide(mockSections, "problem-audience", 1)).toBe(false);
	});

	it("returns false for second section, first slide", () => {
		expect(isFirstSlide(mockSections, "overview", 0)).toBe(false);
	});
});

describe("isLastSlide", () => {
	it("returns true for last section, last slide", () => {
		expect(isLastSlide(mockSections, "overview", 2)).toBe(true);
	});

	it("returns false for last section, not-last slide", () => {
		expect(isLastSlide(mockSections, "overview", 1)).toBe(false);
	});

	it("returns false for first section, last slide of that section", () => {
		expect(isLastSlide(mockSections, "problem-audience", 1)).toBe(false);
	});

	it("returns false for unknown section", () => {
		expect(isLastSlide(mockSections, "nope", 0)).toBe(false);
	});
});
