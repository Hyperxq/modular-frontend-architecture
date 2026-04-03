import { describe, expect, it } from "@rstest/core";
import { fireEvent, render, screen } from "@testing-library/preact";
import type { FunctionalComponent } from "preact";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import type { Section } from "../domain/slides";
import { useNavigation } from "./useNavigation";

const testSections: Section[] = [
	{
		id: "intro",
		title: "Introduction",
		description: "Getting started",
		slides: [
			{ title: "Welcome", type: "concept", content: "Hello" },
			{ title: "Overview", type: "concept", content: "Overview" },
		],
	},
	{
		id: "architecture",
		title: "Architecture",
		description: "Deep dive",
		slides: [
			{ title: "Clean Arch", type: "concept", content: "Layers" },
			{ title: "Patterns", type: "code", content: "Code" },
		],
	},
];

const LocationDisplay: FunctionalComponent = () => {
	const location = useLocation();
	return <span data-testid="location">{location.pathname}</span>;
};

const NavTestHarness: FunctionalComponent = () => {
	const { goNext, goPrev, canGoNext, canGoPrev, currentSectionId, currentSlideIndex } =
		useNavigation(testSections);

	return (
		<div>
			<span data-testid="section">{currentSectionId}</span>
			<span data-testid="slide">{currentSlideIndex}</span>
			<span data-testid="can-next">{String(canGoNext)}</span>
			<span data-testid="can-prev">{String(canGoPrev)}</span>
			<button type="button" onClick={goNext} data-testid="next">
				Next
			</button>
			<button type="button" onClick={goPrev} data-testid="prev">
				Prev
			</button>
			<LocationDisplay />
		</div>
	);
};

function renderAtRoute(path: string) {
	render(
		<MemoryRouter initialEntries={[path]}>
			<Routes>
				<Route path="/:sectionId/:slideIndex" element={<NavTestHarness />} />
			</Routes>
		</MemoryRouter>,
	);
}

describe("useNavigation", () => {
	it("reads current position from URL params", () => {
		renderAtRoute("/intro/0");
		expect(screen.getByTestId("section").textContent).toBe("intro");
		expect(screen.getByTestId("slide").textContent).toBe("0");
	});

	it("can go next from first slide, cannot go prev", () => {
		renderAtRoute("/intro/0");
		expect(screen.getByTestId("can-next").textContent).toBe("true");
		expect(screen.getByTestId("can-prev").textContent).toBe("false");
	});

	it("navigates to next slide within section", () => {
		renderAtRoute("/intro/0");
		fireEvent.click(screen.getByTestId("next"));
		expect(screen.getByTestId("location").textContent).toBe("/intro/1");
	});

	it("crosses to next section at boundary", () => {
		renderAtRoute("/intro/1");
		fireEvent.click(screen.getByTestId("next"));
		expect(screen.getByTestId("location").textContent).toBe("/architecture/0");
	});

	it("navigates to previous slide within section", () => {
		renderAtRoute("/intro/1");
		fireEvent.click(screen.getByTestId("prev"));
		expect(screen.getByTestId("location").textContent).toBe("/intro/0");
	});

	it("crosses to previous section at boundary", () => {
		renderAtRoute("/architecture/0");
		fireEvent.click(screen.getByTestId("prev"));
		expect(screen.getByTestId("location").textContent).toBe("/intro/1");
	});

	it("cannot go next from last slide of last section", () => {
		renderAtRoute("/architecture/1");
		expect(screen.getByTestId("can-next").textContent).toBe("false");
	});

	it("stays on same route when goNext at end", () => {
		renderAtRoute("/architecture/1");
		fireEvent.click(screen.getByTestId("next"));
		expect(screen.getByTestId("location").textContent).toBe("/architecture/1");
	});

	it("stays on same route when goPrev at start", () => {
		renderAtRoute("/intro/0");
		fireEvent.click(screen.getByTestId("prev"));
		expect(screen.getByTestId("location").textContent).toBe("/intro/0");
	});
});
