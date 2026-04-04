import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const atomicDesign: Slide = {
	title: "Atomic Design",
	type: "concept",
	Content,
};
