import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const theRealWorldProblem: Slide = {
	title: "The Real World Problem",
	type: "concept",
	Content,
};
