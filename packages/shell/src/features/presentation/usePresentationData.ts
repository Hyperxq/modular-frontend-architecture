import { useCallback } from "preact/hooks";
import { useNavigate } from "react-router";
import {
	getSectionById,
	getSectionIndex,
	getSlide,
	getTotalSlides,
	sections,
} from "../../core/domain/slides";
import { useNavigation } from "../../core/hooks/useNavigation";
import { useVisitedSlides } from "../../core/store/progress.store";

interface SidebarSectionData {
	id: string;
	title: string;
	isActive: boolean;
	visitedCount: number;
	slideCount: number;
}

function usePresentationData() {
	const nav = useNavigation();
	const visitedSlides = useVisitedSlides();
	const navigate = useNavigate();

	const currentSection = getSectionById(sections, nav.currentSectionId);
	const currentSlide = currentSection
		? getSlide(sections, nav.currentSectionId, nav.currentSlideIndex)
		: undefined;
	const sectionIndex = getSectionIndex(sections, nav.currentSectionId);
	const totalSlides = getTotalSlides(sections);
	const showDiagram = currentSlide?.type === "diagram";
	const transitionKey = `${nav.currentSectionId}-${nav.currentSlideIndex}`;

	const sidebarSections: SidebarSectionData[] = sections.map((section) => ({
		id: section.id,
		title: section.title,
		isActive: section.id === nav.currentSectionId,
		visitedCount: (visitedSlides[section.id] ?? []).length,
		slideCount: section.slides.length,
	}));

	const handleSectionClick = useCallback(
		(sectionId: string) => {
			navigate(`/${sectionId}/0`);
		},
		[navigate],
	);

	return {
		...nav,
		currentSection,
		currentSlide,
		sectionIndex,
		totalSlides,
		totalSections: sections.length,
		showDiagram,
		transitionKey,
		sidebarSections,
		handleSectionClick,
	};
}

export { usePresentationData };
export type { SidebarSectionData };
