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

const mockSections: Section[] = [
	{
		id: "intro",
		title: "Introduction",
		description: "Getting started",
		slides: [
			{ title: "Welcome", type: "concept", content: "Hello" },
			{ title: "Overview", type: "diagram", content: "Architecture", diagram: "overview-diagram" },
		],
	},
	{
		id: "architecture",
		title: "Architecture",
		description: "Deep dive",
		slides: [
			{ title: "Clean Arch", type: "concept", content: "Layers" },
			{ title: "Code Example", type: "code", content: "const x = 1" },
			{ title: "Try It", type: "interactive", content: "Exercise" },
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
		const result = getSectionById(mockSections, "architecture");
		expect(result?.title).toBe("Architecture");
	});

	it("returns undefined for unknown id", () => {
		expect(getSectionById(mockSections, "nope")).toBeUndefined();
	});

	it("returns undefined for empty data", () => {
		expect(getSectionById([], "intro")).toBeUndefined();
	});
});

describe("getSlide", () => {
	it("returns the correct slide", () => {
		const slide = getSlide(mockSections, "intro", 1);
		expect(slide?.title).toBe("Overview");
		expect(slide?.diagram).toBe("overview-diagram");
	});

	it("returns undefined for out-of-bounds index", () => {
		expect(getSlide(mockSections, "intro", 99)).toBeUndefined();
	});

	it("returns undefined for unknown section", () => {
		expect(getSlide(mockSections, "nope", 0)).toBeUndefined();
	});
});

describe("getSectionIndex", () => {
	it("returns the correct index", () => {
		expect(getSectionIndex(mockSections, "architecture")).toBe(1);
	});

	it("returns -1 for unknown section", () => {
		expect(getSectionIndex(mockSections, "nope")).toBe(-1);
	});
});

describe("getGlobalSlideIndex", () => {
	it("returns 0 for first section, first slide", () => {
		expect(getGlobalSlideIndex(mockSections, "intro", 0)).toBe(0);
	});

	it("returns local index for first section", () => {
		expect(getGlobalSlideIndex(mockSections, "intro", 1)).toBe(1);
	});

	it("sums previous sections slides", () => {
		// intro has 2 slides, so architecture slide 0 = global index 2
		expect(getGlobalSlideIndex(mockSections, "architecture", 0)).toBe(2);
		expect(getGlobalSlideIndex(mockSections, "architecture", 2)).toBe(4);
	});

	it("returns 0 for unknown section", () => {
		expect(getGlobalSlideIndex(mockSections, "nope", 0)).toBe(0);
	});
});

describe("isFirstSlide", () => {
	it("returns true for first section, first slide", () => {
		expect(isFirstSlide(mockSections, "intro", 0)).toBe(true);
	});

	it("returns false for first section, second slide", () => {
		expect(isFirstSlide(mockSections, "intro", 1)).toBe(false);
	});

	it("returns false for second section, first slide", () => {
		expect(isFirstSlide(mockSections, "architecture", 0)).toBe(false);
	});
});

describe("isLastSlide", () => {
	it("returns true for last section, last slide", () => {
		expect(isLastSlide(mockSections, "architecture", 2)).toBe(true);
	});

	it("returns false for last section, not-last slide", () => {
		expect(isLastSlide(mockSections, "architecture", 1)).toBe(false);
	});

	it("returns false for first section, last slide of that section", () => {
		expect(isLastSlide(mockSections, "intro", 1)).toBe(false);
	});

	it("returns false for unknown section", () => {
		expect(isLastSlide(mockSections, "nope", 0)).toBe(false);
	});
});
