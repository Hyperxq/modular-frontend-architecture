import type { ComponentChildren, FunctionalComponent } from "preact";
import "./PresentationLayout.css";

interface PresentationLayoutProps {
	header: ComponentChildren;
	sidebar: ComponentChildren;
	center: ComponentChildren;
	diagram: ComponentChildren;
	bottom: ComponentChildren;
	showDiagram?: boolean;
}

const PresentationLayout: FunctionalComponent<PresentationLayoutProps> = ({
	header,
	sidebar,
	center,
	diagram,
	bottom,
	showDiagram = false,
}) => (
	<div
		class={`presentation-layout${showDiagram ? "" : " presentation-layout--no-diagram"}`}
		role="application"
		aria-label="Presentation"
	>
		<div class="presentation-layout__header">{header}</div>
		<div class="presentation-layout__sidebar">{sidebar}</div>
		<div class="presentation-layout__center">{center}</div>
		{showDiagram && <div class="presentation-layout__diagram">{diagram}</div>}
		<div class="presentation-layout__bottom">{bottom}</div>
	</div>
);

export default PresentationLayout;
