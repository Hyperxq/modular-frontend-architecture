import type { ComponentChildren } from "preact";

interface BottomBarProps {
	currentSlideIndex: number;
	totalSlides: number;
	currentSectionIndex: number;
	totalSections: number;
	navPrev?: ComponentChildren;
	navNext?: ComponentChildren;
	showSwipeHint?: boolean;
}

export type { BottomBarProps };
