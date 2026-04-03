import type { FunctionalComponent } from "preact";
import "./DiagramPanel.css";
import type { DiagramPanelProps } from "./DiagramPanel.types";

const DiagramPanel: FunctionalComponent<DiagramPanelProps> = ({
	panelTitle,
	metadata,
	children,
}) => (
	<aside class="diagram-panel" aria-label="Diagram panel">
		{panelTitle && <div class="diagram-panel__title">{panelTitle}</div>}
		<div class="diagram-panel__content">{children}</div>
		{metadata && metadata.length > 0 && (
			<div class="diagram-panel__metadata">
				{metadata.map((item) => (
					<div key={item.label} class="diagram-panel__meta-item">
						<span class="diagram-panel__meta-label">{item.label}</span>
						<span class="diagram-panel__meta-value">{item.value}</span>
					</div>
				))}
			</div>
		)}
	</aside>
);

export default DiagramPanel;
