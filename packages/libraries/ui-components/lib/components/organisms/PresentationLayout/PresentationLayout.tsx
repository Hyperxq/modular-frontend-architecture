import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";
import type { PresentationLayoutProps } from "./PresentationLayout.types";

const NAV_WRAPPER =
	"row-[2/3] self-center z-controls pointer-events-none [&>div]:pointer-events-auto";

const PresentationLayout: FunctionalComponent<PresentationLayoutProps> = ({
	header,
	sidebar,
	center,
	diagram,
	bottom,
	navPrev,
	navNext,
	showDiagram = false,
}) => (
	<div
		class={cn(
			"grid h-dvh w-full overflow-hidden bg-surface",
			showDiagram ? "layout-grid-full" : "layout-grid-no-diagram",
		)}
		role="application"
		aria-label="Presentation"
	>
		<div class="grid-area-header">{header}</div>
		<div class="grid-area-sidebar overflow-y-auto">{sidebar}</div>
		<div class="grid-area-center min-h-0 overflow-hidden">{center}</div>
		{showDiagram && <div class="grid-area-diagram min-h-0 overflow-hidden">{diagram}</div>}
		{navPrev && (
			<div
				class={cn(NAV_WRAPPER, "col-[2] justify-self-start pl-4")}
				data-testid="nav-prev-wrapper"
			>
				{navPrev}
			</div>
		)}
		{navNext && (
			<div
				class={cn(NAV_WRAPPER, "justify-self-end pr-4", showDiagram ? "col-[3]" : "col-[2]")}
				data-testid="nav-next-wrapper"
			>
				{navNext}
			</div>
		)}
		<div class="grid-area-bottom">{bottom}</div>
	</div>
);

export default PresentationLayout;
