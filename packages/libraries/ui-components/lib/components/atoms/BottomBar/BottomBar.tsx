import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";
import type { BottomBarProps } from "./BottomBar.types";

function pad(n: number): string {
	return String(n).padStart(2, "0");
}

const hasMobileNav = (navPrev: BottomBarProps["navPrev"], navNext: BottomBarProps["navNext"]) =>
	navPrev != null || navNext != null;

const BottomBar: FunctionalComponent<BottomBarProps> = ({
	currentSlideIndex,
	totalSlides,
	currentSectionIndex,
	totalSections,
	navPrev,
	navNext,
	showSwipeHint,
}) => {
	const isMobileLayout = hasMobileNav(navPrev, navNext);

	return (
		<footer
			class={cn(
				"flex flex-col items-center gap-1 px-4 py-2 bg-surface-container-highest/40 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] border border-border-ghost/60 shadow-[0_-1px_20px_rgba(0,0,0,0.3)] z-controls",
				isMobileLayout ? "fixed bottom-0 inset-x-0 rounded-t-[--radius-lg]" : "rounded-[--radius]",
			)}
		>
			{isMobileLayout && (
				<div class="font-label text-label-sm text-fg-muted uppercase">
					<span>{showSwipeHint ? "SWIPE TO NAVIGATE" : "USE ARROWS TO NAVIGATE"}</span>
				</div>
			)}
			{totalSlides > 0 && (
				<span
					class="flex gap-[6px] justify-center"
					role="img"
					aria-label={`Slide ${currentSlideIndex + 1} of ${totalSlides}`}
				>
					{Array.from({ length: totalSlides }, (_, i) => (
						<span
							key={`dot-${i}`}
							class={cn(
								"h-2 rounded-full transition-all duration-normal ease-default",
								i === currentSlideIndex ? "w-4 bg-primary" : "w-2 bg-fg-muted/50",
							)}
						/>
					))}
				</span>
			)}
			<div class="flex items-center gap-4">
				{isMobileLayout && navPrev}
				<span class="font-label text-label-md text-primary uppercase">
					SLIDE {currentSlideIndex + 1} / {totalSlides}
				</span>
				<span class="text-label-sm text-fg-muted">·</span>
				<span class="font-mono text-label-md text-fg-secondary">
					SEC {pad(currentSectionIndex + 1)} / {pad(totalSections)}
				</span>
				{isMobileLayout && navNext}
			</div>
		</footer>
	);
};

export default BottomBar;
