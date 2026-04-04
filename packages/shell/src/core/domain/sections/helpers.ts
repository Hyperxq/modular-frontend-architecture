import type { Section, Slide } from "./types";

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

function getGlobalSlideIndex(data: Section[], sectionId: string, slideIndex: number): number {
	const sectionIdx = getSectionIndex(data, sectionId);
	if (sectionIdx === -1) return 0;
	let global = 0;
	for (let i = 0; i < sectionIdx; i++) {
		global += data[i].slides.length;
	}
	return global + slideIndex;
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
	getGlobalSlideIndex,
	getSectionById,
	getSectionIndex,
	getSlide,
	getTotalSlides,
	isFirstSlide,
	isLastSlide,
};
