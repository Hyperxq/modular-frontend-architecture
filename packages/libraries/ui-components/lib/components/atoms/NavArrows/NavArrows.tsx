import type { FunctionalComponent } from "preact";
import "./NavArrows.css";

interface NavArrowsProps {
	onNext: () => void;
	onPrev: () => void;
	canGoNext: boolean;
	canGoPrev: boolean;
}

const NavArrows: FunctionalComponent<NavArrowsProps> = ({
	onNext,
	onPrev,
	canGoNext,
	canGoPrev,
}) => (
	<div class="nav-arrows">
		<button
			type="button"
			class="nav-arrows__btn"
			onClick={onPrev}
			disabled={!canGoPrev}
			aria-label="Previous slide"
		>
			‹
		</button>
		<button
			type="button"
			class="nav-arrows__btn"
			onClick={onNext}
			disabled={!canGoNext}
			aria-label="Next slide"
		>
			›
		</button>
	</div>
);

export default NavArrows;
