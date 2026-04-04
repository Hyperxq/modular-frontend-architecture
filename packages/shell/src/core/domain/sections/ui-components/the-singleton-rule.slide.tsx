import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const theSingletonRule: Slide = {
	title: "The Singleton Rule",
	type: "concept",
	Content,
};
