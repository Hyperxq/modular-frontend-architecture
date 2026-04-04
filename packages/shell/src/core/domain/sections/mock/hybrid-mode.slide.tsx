import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const hybridMode: Slide = {
	title: "Hybrid Mode",
	type: "concept",
	Content,
};
