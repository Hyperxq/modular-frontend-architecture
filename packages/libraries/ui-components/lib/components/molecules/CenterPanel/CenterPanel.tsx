import type { ComponentChildren, FunctionalComponent } from "preact";
import "./CenterPanel.css";

interface CenterPanelProps {
	children: ComponentChildren;
}

const CenterPanel: FunctionalComponent<CenterPanelProps> = ({ children }) => (
	<main class="center-panel" aria-label="Slide content">
		{children}
	</main>
);

export default CenterPanel;
