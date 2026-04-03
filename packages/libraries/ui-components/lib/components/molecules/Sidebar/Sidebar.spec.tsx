import { beforeEach, describe, expect, it } from "@rstest/core";
import { fireEvent, render, screen } from "@testing-library/preact";
import Sidebar from "./Sidebar";
import type { SidebarSection } from "./Sidebar.types";

const mockSections: SidebarSection[] = [
	{ id: "intro", title: "Introduction", isActive: true, visitedCount: 2, slideCount: 3 },
	{ id: "arch", title: "Architecture", isActive: false, visitedCount: 0, slideCount: 5 },
];

describe("Sidebar", () => {
	let clickedId: string;
	let onSectionClick: (id: string) => void;

	beforeEach(() => {
		clickedId = "";
		onSectionClick = (id: string) => {
			clickedId = id;
		};
	});

	it("renders branding block with appName and version", () => {
		render(
			<Sidebar
				sections={mockSections}
				activeSectionId="intro"
				onSectionClick={onSectionClick}
				appName="SYSTEM DESIGN"
				version="v2.4.0-stable"
			/>,
		);
		expect(screen.getByText("SYSTEM DESIGN")).toBeInTheDocument();
		expect(screen.getByText("v2.4.0-stable")).toBeInTheDocument();
	});

	it("omits branding when appName is absent", () => {
		const { container } = render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		// nav > ul only (no brand div)
		const nav = container.querySelector("nav");
		expect(nav?.children).toHaveLength(1);
	});

	it("renders dot indicators with visited/unvisited states", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		// First section: 3 dots, 2 visited
		const dotContainers = screen.getAllByRole("img");
		const firstDots = dotContainers[0]?.querySelectorAll("span");
		expect(firstDots).toHaveLength(3);
		// Visited dots have bg-primary class
		const firstVisited = dotContainers[0]?.querySelectorAll("[class*='bg-primary']");
		expect(firstVisited).toHaveLength(2);
		// Second section: 5 dots, 0 visited
		const secondDots = dotContainers[1]?.querySelectorAll("span");
		expect(secondDots).toHaveLength(5);
		const secondVisited = dotContainers[1]?.querySelectorAll("[class*='bg-primary']");
		expect(secondVisited).toHaveLength(0);
	});

	it("marks active section with aria-current", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		const activeBtn = screen.getByText("Introduction").closest("button");
		expect(activeBtn?.getAttribute("aria-current")).toBe("true");
		const inactiveBtn = screen.getByText("Architecture").closest("button");
		expect(inactiveBtn?.getAttribute("aria-current")).toBeNull();
	});

	it("calls onSectionClick with correct id", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		fireEvent.click(screen.getByText("Architecture"));
		expect(clickedId).toBe("arch");
	});

	it("renders section titles", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		expect(screen.getByText("Introduction")).toBeInTheDocument();
		expect(screen.getByText("Architecture")).toBeInTheDocument();
	});
});
