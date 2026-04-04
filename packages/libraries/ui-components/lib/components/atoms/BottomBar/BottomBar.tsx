import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";
import type { BottomBarProps } from "./BottomBar.types";

function pad(n: number): string {
	return String(n).padStart(2, "0");
}

const BottomBar: FunctionalComponent<BottomBarProps> = ({
	currentSlideIndex,
	totalSlides,
	currentSectionIndex,
	totalSections,
}) => (
	<footer class="flex items-center justify-between px-4 py-2 bg-surface-container-highest/40 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] rounded-[--radius] z-controls">
		<div class="flex items-center gap-2 font-label text-label-sm text-fg-muted uppercase">
			<span class="inline-flex gap-1">
				<span class="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container border border-border-ghost font-mono text-label-sm">←</span>
				<span class="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container border border-border-ghost font-mono text-label-sm">→</span>
			</span>
			<span>TO NAVIGATE</span>
		</div>
		<div class="flex flex-col items-center gap-1">
			<span class="font-label text-label-md text-primary uppercase">
				SLIDE {currentSlideIndex + 1} / {totalSlides}
			</span>
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
								"w-2 h-2 rounded-full",
								i === currentSlideIndex ? "bg-primary" : "bg-fg-muted",
							)}
						/>
					))}
				</span>
			)}
		</div>
		<div class="font-mono text-label-md text-fg-secondary">
			SECTION {pad(currentSectionIndex + 1)} / {pad(totalSections)}
		</div>
	</footer>
);

export default BottomBar;
