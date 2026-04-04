import type { ComponentChildren } from "preact";

interface PresentationLayoutProps {
	header: ComponentChildren;
	sidebar: ComponentChildren;
	center: ComponentChildren;
	diagram: ComponentChildren;
	bottom: ComponentChildren;
	navPrev?: ComponentChildren;
	navNext?: ComponentChildren;
	showDiagram?: boolean;
	isMobile?: boolean;
	sidebarDrawer?: ComponentChildren;
}

export type { PresentationLayoutProps };
