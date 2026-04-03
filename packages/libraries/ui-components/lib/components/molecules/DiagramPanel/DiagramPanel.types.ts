import type { ComponentChildren } from "preact";

interface DiagramMetadata {
	label: string;
	value: string;
}

interface DiagramPanelProps {
	panelTitle?: string;
	metadata?: DiagramMetadata[];
	children: ComponentChildren;
}

export type { DiagramMetadata, DiagramPanelProps };
