import type { ComponentChildren, FunctionalComponent } from "preact";
import "./BottomBar.css";

interface BottomBarProps {
	currentSlideIndex: number;
	totalSlides: number;
	children?: ComponentChildren;
}

const BottomBar: FunctionalComponent<BottomBarProps> = ({
	currentSlideIndex,
	totalSlides,
	children,
}) => (
	<footer class="bottom-bar">
		{/* biome-ignore lint/a11y/useSemanticElements: <output> causes jsdom hangs in tests */}
		<div
			class="bottom-bar__counter"
			role="status"
			aria-label={`Slide ${currentSlideIndex + 1} of ${totalSlides}`}
		>
			{currentSlideIndex + 1} / {totalSlides}
		</div>
		{children && <div class="bottom-bar__actions">{children}</div>}
	</footer>
);

export default BottomBar;
