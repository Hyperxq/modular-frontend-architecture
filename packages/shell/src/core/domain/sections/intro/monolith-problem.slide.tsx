import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>Traditional monoliths create tightly coupled systems.</p>
);

export const monolithProblem: Slide = {
	title: "The Monolith Problem",
	type: "concept",
	Content,
};
