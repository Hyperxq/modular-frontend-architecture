import type { ComponentChildren, FunctionalComponent } from "preact";
import "./DiagramPanel.css";

interface DiagramPanelProps {
	children: ComponentChildren;
}

const DiagramPanel: FunctionalComponent<DiagramPanelProps> = ({ children }) => (
	<aside class="diagram-panel" aria-label="Diagram panel">
		{children}
	</aside>
);

export default DiagramPanel;
