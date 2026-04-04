import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const threeOutputsOneSource: Slide = {
	title: "Three Outputs One Source",
	type: "concept",
	Content,
};
