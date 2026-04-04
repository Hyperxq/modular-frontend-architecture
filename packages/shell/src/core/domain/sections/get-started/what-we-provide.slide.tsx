import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const whatWeProvide: Slide = {
	title: "What We Provide",
	type: "concept",
	Content,
};
