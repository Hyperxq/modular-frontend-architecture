import type { FunctionalComponent } from "preact";
import type { NavArrowsProps } from "./NavArrows.types";

const NAV_BTN_CLASSES =
	"flex items-center justify-center w-12 h-12 font-sans text-[2rem] font-normal leading-none text-fg-secondary bg-surface-container border border-border-ghost rounded-full cursor-pointer transition-[color,background] duration-fast ease-default hover:enabled:text-primary hover:enabled:bg-surface-container-high disabled:text-fg-muted disabled:opacity-40 disabled:cursor-default";

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
