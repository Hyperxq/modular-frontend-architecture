import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const zeroCostInProduction: Slide = {
	title: "Zero Cost In Production",
	type: "concept",
	Content,
};
