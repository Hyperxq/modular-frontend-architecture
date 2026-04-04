import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const threeScenarios: Slide = {
	title: "Three Scenarios",
	type: "concept",
	Content,
};
