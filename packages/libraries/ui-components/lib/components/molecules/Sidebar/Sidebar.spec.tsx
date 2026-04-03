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
		const { container } = render(
			<Sidebar
				sections={mockSections}
				activeSectionId="intro"
				onSectionClick={onSectionClick}
				appName="SYSTEM DESIGN"
				version="v2.4.0-stable"
			/>,
		);
		expect(container.querySelector(".sidebar__app-name")?.textContent).toBe("SYSTEM DESIGN");
		expect(container.querySelector(".sidebar__version")?.textContent).toBe("v2.4.0-stable");
	});

	it("omits branding when appName is absent", () => {
		const { container } = render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		expect(container.querySelector(".sidebar__brand")).toBeNull();
	});

	it("renders dot indicators instead of numbers", () => {
		const { container } = render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		const dots = container.querySelectorAll(".sidebar__dots");
		expect(dots[0]?.textContent).toBe("●●○");
		expect(dots[1]?.textContent).toBe("○○○○○");
	});

	it("marks active section with aria-current and active class", () => {
		const { container } = render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		const activeBtn = container.querySelector(".sidebar__btn--active");
		expect(activeBtn).not.toBeNull();
		expect(activeBtn?.getAttribute("aria-current")).toBe("true");
	});

	it("calls onSectionClick with correct id", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		fireEvent.click(screen.getByText("Architecture"));
		expect(clickedId).toBe("arch");
	});

	it("section titles use sidebar__title class", () => {
		const { container } = render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		const titles = container.querySelectorAll(".sidebar__title");
		expect(titles).toHaveLength(2);
		expect(titles[0]?.textContent).toBe("Introduction");
	});
});
