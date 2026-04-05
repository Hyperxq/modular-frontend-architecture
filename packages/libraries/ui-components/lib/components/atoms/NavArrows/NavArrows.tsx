import type { FunctionalComponent } from "preact";
import type { NavArrowsProps } from "./NavArrows.types";

const NAV_BTN_CLASSES =
	"flex items-center justify-center w-14 h-14 bg-surface-container border border-border-ghost rounded-full cursor-pointer transition-[color,border-color,background,box-shadow,transform] duration-fast ease-default hover:enabled:border-primary hover:enabled:bg-surface-container-high hover:enabled:shadow-[0_0_20px_var(--color-primary-glow-strong)] hover:enabled:scale-[1.04] active:enabled:scale-[0.97] disabled:opacity-30 disabled:cursor-default";

const CHEVRON_CLASSES = "w-6 h-6 text-primary";

const ChevronLeft: FunctionalComponent = () => (
	<svg
		class={CHEVRON_CLASSES}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M15 18l-6-6 6-6" />
	</svg>
);

const ChevronRight: FunctionalComponent = () => (
	<svg
		class={CHEVRON_CLASSES}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M9 18l6-6-6-6" />
	</svg>
);

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
			<ChevronLeft />
		</button>
		<button
			type="button"
			class={NAV_BTN_CLASSES}
			onClick={onNext}
			disabled={!canGoNext}
			aria-label="Next slide"
		>
			<ChevronRight />
		</button>
	</div>
);

export default NavArrows;
