import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const whyPreact: Slide = {
	title: "Why Preact",
	type: "concept",
	Content,
};
