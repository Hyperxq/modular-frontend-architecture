import type { FunctionalComponent } from "preact";
import type { CenterPanelProps } from "./CenterPanel.types";

const CenterPanel: FunctionalComponent<CenterPanelProps> = ({
	sectionLabel,
	slideTitle,
	slideBody,
	children,
}) => (
	<main class="bg-surface-container-low p-8 overflow-y-auto min-h-0" aria-label="Slide content">
		<div class="max-w-3xl stagger-children">
			{sectionLabel && (
				<span class="block font-label text-label-md text-primary uppercase mb-3">
					{sectionLabel}
				</span>
			)}
			{slideTitle && (
				<h2 class="font-sans text-display-lg font-bold tracking-display text-fg-primary leading-tight m-0 mb-5">
					{slideTitle}
				</h2>
			)}
			{slideBody && (
				<p class="font-sans text-body-md text-fg-secondary leading-relaxed m-0">{slideBody}</p>
			)}
			{children}
		</div>
	</main>
);

export default CenterPanel;
