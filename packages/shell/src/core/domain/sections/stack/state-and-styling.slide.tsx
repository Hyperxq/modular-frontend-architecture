import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const stateAndStyling: Slide = {
	title: "State And Styling",
	type: "concept",
	Content,
};
