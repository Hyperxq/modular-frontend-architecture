import type { FunctionalComponent } from "preact";
import "./PresentationLayout.css";
import type { PresentationLayoutProps } from "./PresentationLayout.types";

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
		class={`presentation-layout${showDiagram ? "" : " presentation-layout--no-diagram"}`}
		role="application"
		aria-label="Presentation"
	>
		<div class="presentation-layout__header">{header}</div>
		<div class="presentation-layout__sidebar">{sidebar}</div>
		<div class="presentation-layout__center">
			{navPrev && <div class="presentation-layout__nav-prev">{navPrev}</div>}
			{center}
			{!showDiagram && navNext && <div class="presentation-layout__nav-next">{navNext}</div>}
		</div>
		{showDiagram && (
			<div class="presentation-layout__diagram">
				{diagram}
				{navNext && <div class="presentation-layout__nav-next">{navNext}</div>}
			</div>
		)}
		<div class="presentation-layout__bottom">{bottom}</div>
	</div>
);

export default PresentationLayout;
