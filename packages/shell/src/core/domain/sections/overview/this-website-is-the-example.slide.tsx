import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const thisWebsiteIsTheExample: Slide = {
	title: "This Website Is The Example",
	type: "concept",
	Content,
};
