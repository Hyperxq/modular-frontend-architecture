import type { FunctionalComponent } from "preact";
import "./BottomBar.css";
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
	<footer class="bottom-bar">
		<div class="bottom-bar__hint">
			<span class="bottom-bar__keys">←→</span>
			<span>TO NAVIGATE</span>
		</div>
		<div class="bottom-bar__center">
			<span class="bottom-bar__slide-label">
				SLIDE {currentSlideIndex + 1} / {totalSlides}
			</span>
			{totalSlides > 0 && (
				<span
					class="bottom-bar__dots"
					role="img"
					aria-label={`Slide ${currentSlideIndex + 1} of ${totalSlides}`}
				>
					{Array.from({ length: totalSlides }, (_, i) => (
						<span
							key={i}
							class={`bottom-bar__dot${i === currentSlideIndex ? " bottom-bar__dot--active" : ""}`}
						/>
					))}
				</span>
			)}
		</div>
		<div class="bottom-bar__section">
			SECTION {pad(currentSectionIndex + 1)} / {pad(totalSections)}
		</div>
	</footer>
);

export default BottomBar;
