interface SidebarSection {
	id: string;
	title: string;
	isActive: boolean;
	visitedCount: number;
	slideCount: number;
}

interface SidebarProps {
	sections: SidebarSection[];
	activeSectionId: string;
	onSectionClick: (sectionId: string) => void;
	appName?: string;
	version?: string;
}

export type { SidebarProps, SidebarSection };
