import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>How monoliths fail at scale.</p>
);

export const structuralAnalysis: Slide = {
	title: "Structural Analysis",
	type: "diagram",
	Content,
	diagram: "monolith-diagram",
};
