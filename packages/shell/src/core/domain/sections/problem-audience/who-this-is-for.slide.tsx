import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const whoThisIsFor: Slide = {
	title: "Who This Is For",
	type: "concept",
	Content,
};
