import type { FunctionalComponent } from "preact";
import type { DiagramPanelProps } from "./DiagramPanel.types";

const DiagramPanel: FunctionalComponent<DiagramPanelProps> = ({
	panelTitle,
	metadata,
	children,
}) => (
	<aside
		class="flex flex-col bg-surface-container p-4 overflow-auto min-h-0"
		aria-labelledby="diagram-panel-title"
	>
		{panelTitle && (
			<h3
				id="diagram-panel-title"
				class="font-label text-label-md text-fg-muted uppercase mb-4 m-0"
			>
				{panelTitle}
			</h3>
		)}
		<div class="flex-1 min-h-0 overflow-auto">{children}</div>
		{metadata && metadata.length > 0 && (
			<div class="flex gap-4 pt-4 border-t border-border-ghost">
				{metadata.map((item) => (
					<div key={item.label} class="flex flex-col gap-1">
						<span class="font-label text-label-sm text-fg-muted uppercase">{item.label}</span>
						<span class="font-mono text-label-md text-fg-secondary">{item.value}</span>
					</div>
				))}
			</div>
		)}
	</aside>
);

export default DiagramPanel;
