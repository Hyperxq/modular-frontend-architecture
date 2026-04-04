import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const theTestingPyramid: Slide = {
	title: "The Testing Pyramid",
	type: "concept",
	Content,
};
