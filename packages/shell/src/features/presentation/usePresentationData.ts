import type { FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import { useNavigate } from "react-router";
import { getSectionById, getSectionIndex, getSlide, sections } from "../../core/domain/sections";
import { useNavigation } from "../../core/hooks/useNavigation";
import { useVisitedSlides } from "../../core/store/progress.store";

interface SidebarSectionData {
	id: string;
	title: string;
	isActive: boolean;
	visitedCount: number;
	slideCount: number;
}

function pad(n: number): string {
	return String(n).padStart(2, "0");
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
	const sectionSlideCount = currentSection?.slides.length ?? 0;
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

	/* ─── Mock-1 display fields ─── */
	const appTitle = "MICROFRONTEND ARCHITECTURE";
	const githubLinkText = "GITHUB ↗";
	const githubLinkUrl = "https://github.com/Hyperxq/modular-frontend-architecture";
	const sidebarAppName = "SYSTEM DESIGN";
	const sidebarVersion = "v2.4.0-stable";
	const sectionLabel = currentSection
		? `SECTION ${pad(sectionIndex + 1)} · ${currentSection.title.toUpperCase()}`
		: "";
	const slideTitle = currentSlide?.title ?? "";
	const SlideContent = currentSlide?.Content as FunctionalComponent | undefined;
	const diagramTitle = "DIAGRAM :: STRUCTURAL ANALYSIS";

	return {
		...nav,
		currentSection,
		currentSlide,
		sectionIndex,
		sectionSlideCount,
		totalSections: sections.length,
		showDiagram,
		transitionKey,
		sidebarSections,
		handleSectionClick,
		appTitle,
		githubLinkText,
		githubLinkUrl,
		sidebarAppName,
		sidebarVersion,
		sectionLabel,
		slideTitle,
		SlideContent,
		diagramTitle,
	};
}

export { usePresentationData };
export type { SidebarSectionData };
