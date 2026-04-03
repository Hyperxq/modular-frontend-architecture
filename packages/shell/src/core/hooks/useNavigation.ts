import { useCallback } from "preact/hooks";
import { useNavigate, useParams } from "react-router";
import { sections as defaultSections, getSectionIndex, type Section } from "../domain/slides";

interface NavigationResult {
	goNext: () => void;
	goPrev: () => void;
	canGoNext: boolean;
	canGoPrev: boolean;
	currentSectionId: string;
	currentSlideIndex: number;
}

function useNavigation(data: Section[] = defaultSections): NavigationResult {
	const navigate = useNavigate();
	const { sectionId = "intro", slideIndex: slideParam = "0" } = useParams();
	const slideIndex = Number(slideParam);
	const sectionIdx = getSectionIndex(data, sectionId);

	const canGoPrev = !(sectionIdx === 0 && slideIndex === 0);

	const canGoNext = (() => {
		if (sectionIdx === -1 || data.length === 0) return false;
		const isLastSection = sectionIdx === data.length - 1;
		const isLastSlide = slideIndex === data[sectionIdx].slides.length - 1;
		return !(isLastSection && isLastSlide);
	})();

	const goNext = useCallback(() => {
		if (sectionIdx === -1 || data.length === 0) return;

		const currentSection = data[sectionIdx];
		if (slideIndex < currentSection.slides.length - 1) {
			navigate(`/${sectionId}/${slideIndex + 1}`);
		} else if (sectionIdx < data.length - 1) {
			const nextSection = data[sectionIdx + 1];
			navigate(`/${nextSection.id}/0`);
		}
	}, [navigate, sectionId, sectionIdx, slideIndex, data]);

	const goPrev = useCallback(() => {
		if (sectionIdx === -1 || data.length === 0) return;

		if (slideIndex > 0) {
			navigate(`/${sectionId}/${slideIndex - 1}`);
		} else if (sectionIdx > 0) {
			const prevSection = data[sectionIdx - 1];
			navigate(`/${prevSection.id}/${prevSection.slides.length - 1}`);
		}
	}, [navigate, sectionId, sectionIdx, slideIndex, data]);

	return {
		goNext,
		goPrev,
		canGoNext,
		canGoPrev,
		currentSectionId: sectionId,
		currentSlideIndex: slideIndex,
	};
}

export { useNavigation };
export type { NavigationResult };
