import { beforeEach, describe, expect, it } from "@rstest/core";
import { fireEvent, render, screen } from "@testing-library/preact";
import Sidebar from "./Sidebar";
import type { SidebarSection } from "./Sidebar.types";

const mockSections: SidebarSection[] = [
	{ id: "intro", title: "Introduction", isActive: true, visitedCount: 2, slideCount: 3 },
	{ id: "arch", title: "Architecture", isActive: false, visitedCount: 0, slideCount: 5 },
	{ id: "patterns", title: "Patterns", isActive: false, visitedCount: 1, slideCount: 4 },
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

	it("renders all sections as buttons", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		expect(screen.getByText("Introduction")).toBeInTheDocument();
		expect(screen.getByText("Architecture")).toBeInTheDocument();
		expect(screen.getByText("Patterns")).toBeInTheDocument();
	});

	it("marks active section with aria-current", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		const activeBtn = screen.getByText("Introduction").closest("button");
		expect(activeBtn?.getAttribute("aria-current")).toBe("true");
	});

	it("inactive sections do not have aria-current", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
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

	it("shows progress in visitedCount/slideCount format", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		expect(screen.getByText("2/3")).toBeInTheDocument();
		expect(screen.getByText("0/5")).toBeInTheDocument();
	});

	it("has accessible label on nav", () => {
		render(
			<Sidebar sections={mockSections} activeSectionId="intro" onSectionClick={onSectionClick} />,
		);
		expect(screen.getByLabelText("Presentation sections")).toBeInTheDocument();
	});
});
