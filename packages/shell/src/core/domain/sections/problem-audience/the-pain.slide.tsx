import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const thePain: Slide = {
	title: "The Pain",
	type: "concept",
	Content,
};
