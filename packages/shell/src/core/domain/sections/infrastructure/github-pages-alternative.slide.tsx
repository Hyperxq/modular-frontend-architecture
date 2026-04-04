import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const githubPagesAlternative: Slide = {
	title: "GitHub Pages Alternative",
	type: "concept",
	Content,
};
