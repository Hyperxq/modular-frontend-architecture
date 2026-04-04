import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const seeItInDevTools: Slide = {
	title: "See It In Dev Tools",
	type: "concept",
	Content,
};
