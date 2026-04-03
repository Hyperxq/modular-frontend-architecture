import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";
import type { PresentationLayoutProps } from "./PresentationLayout.types";

const NAV_WRAPPER_BASE = "grid-row-[2] self-center z-controls pointer-events-none";

const NAV_BUTTON_CLASSES = [
	"[&>button]:pointer-events-auto",
	"[&>button]:flex",
	"[&>button]:items-center",
	"[&>button]:justify-center",
	"[&>button]:w-12",
	"[&>button]:h-12",
	"[&>button]:font-sans",
	"[&>button]:text-[2rem]",
	"[&>button]:font-normal",
	"[&>button]:leading-none",
	"[&>button]:text-fg-secondary",
	"[&>button]:bg-surface-container",
	"[&>button]:border",
	"[&>button]:border-border-ghost",
	"[&>button]:rounded-full",
	"[&>button]:cursor-pointer",
	"[&>button]:transition-[color,background]",
	"[&>button]:duration-fast",
	"[&>button]:ease-default",
	"[&>button]:hover:not-disabled:text-primary",
	"[&>button]:hover:not-disabled:bg-surface-container-high",
	"[&>button]:disabled:text-fg-muted",
	"[&>button]:disabled:opacity-40",
	"[&>button]:disabled:cursor-default",
].join(" ");

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
				class={cn(NAV_WRAPPER_BASE, "grid-col-[2] justify-self-start pl-4", NAV_BUTTON_CLASSES)}
				data-testid="nav-prev-wrapper"
			>
				{navPrev}
			</div>
		)}
		{navNext && (
			<div
				class={cn(
					NAV_WRAPPER_BASE,
					"justify-self-end pr-4",
					showDiagram ? "grid-col-[3]" : "grid-col-[2]",
					NAV_BUTTON_CLASSES,
				)}
				data-testid="nav-next-wrapper"
			>
				{navNext}
			</div>
		)}
		<div class="grid-area-bottom">{bottom}</div>
	</div>
);

export default PresentationLayout;
