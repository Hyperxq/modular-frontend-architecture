/* ─── Slide content types ─── */

const SLIDE_TYPE = {
	CONCEPT: "concept",
	DIAGRAM: "diagram",
	CODE: "code",
	INTERACTIVE: "interactive",
} as const;

type SlideType = (typeof SLIDE_TYPE)[keyof typeof SLIDE_TYPE];

interface Slide {
	title: string;
	type: SlideType;
	content: string;
	diagram?: string;
	notes?: string;
}

interface Section {
	id: string;
	title: string;
	description: string;
	slides: Slide[];
}

/* ─── Data — starts empty, content added in Phase 2 ─── */

const sections: Section[] = [];

/* ─── Helpers ─── */

function getTotalSlides(data: Section[]): number {
	return data.reduce((sum, section) => sum + section.slides.length, 0);
}

function getSectionById(data: Section[], sectionId: string): Section | undefined {
	return data.find((s) => s.id === sectionId);
}

function getSlide(data: Section[], sectionId: string, slideIndex: number): Slide | undefined {
	const section = getSectionById(data, sectionId);
	if (!section) return undefined;
	return section.slides[slideIndex];
}

function getSectionIndex(data: Section[], sectionId: string): number {
	return data.findIndex((s) => s.id === sectionId);
}

function isFirstSlide(data: Section[], sectionId: string, slideIndex: number): boolean {
	const sectionIdx = getSectionIndex(data, sectionId);
	return sectionIdx === 0 && slideIndex === 0;
}

function isLastSlide(data: Section[], sectionId: string, slideIndex: number): boolean {
	const sectionIdx = getSectionIndex(data, sectionId);
	if (sectionIdx === -1) return false;
	const isLastSection = sectionIdx === data.length - 1;
	const isLastInSection = slideIndex === data[sectionIdx].slides.length - 1;
	return isLastSection && isLastInSection;
}

export {
	SLIDE_TYPE,
	sections,
	getSectionById,
	getSectionIndex,
	getSlide,
	getTotalSlides,
	isFirstSlide,
	isLastSlide,
};
export type { Section, Slide, SlideType };
