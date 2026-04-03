import type { FunctionalComponent } from "preact";
import "./CenterPanel.css";
import type { CenterPanelProps } from "./CenterPanel.types";

const CenterPanel: FunctionalComponent<CenterPanelProps> = ({
	sectionLabel,
	slideTitle,
	slideBody,
	children,
}) => (
	<main class="center-panel" aria-label="Slide content">
		{sectionLabel && <span class="center-panel__label">{sectionLabel}</span>}
		{slideTitle && <h2 class="center-panel__title">{slideTitle}</h2>}
		{slideBody && <p class="center-panel__body">{slideBody}</p>}
		{children}
	</main>
);

export default CenterPanel;
