import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const theProblemItSolves: Slide = {
	title: "The Problem It Solves",
	type: "concept",
	Content,
};
