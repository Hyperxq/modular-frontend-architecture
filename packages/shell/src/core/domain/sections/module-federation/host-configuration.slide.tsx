import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const hostConfiguration: Slide = {
	title: "Host Configuration",
	type: "concept",
	Content,
};
