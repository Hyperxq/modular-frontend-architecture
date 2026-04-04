import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>Webpack/Rspack runtime module sharing.</p>
);

export const moduleFederation: Slide = {
	title: "Module Federation",
	type: "concept",
	Content,
};
