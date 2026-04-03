import type { FunctionalComponent } from "preact";
import type { NavArrowsProps } from "./NavArrows.types";

const NAV_BTN_CLASSES =
	"font-mono text-display-lg leading-none text-fg-muted bg-transparent border-none rounded-[--radius] p-2 cursor-pointer transition-colors duration-fast ease-default hover:enabled:text-primary disabled:opacity-30 disabled:cursor-default";

const NavArrows: FunctionalComponent<NavArrowsProps> = ({
	onNext,
	onPrev,
	canGoNext,
	canGoPrev,
}) => (
	<div class="contents">
		<button
			type="button"
			class={NAV_BTN_CLASSES}
			onClick={onPrev}
			disabled={!canGoPrev}
			aria-label="Previous slide"
		>
			‹
		</button>
		<button
			type="button"
			class={NAV_BTN_CLASSES}
			onClick={onNext}
			disabled={!canGoNext}
			aria-label="Next slide"
		>
			›
		</button>
	</div>
);

export default NavArrows;
