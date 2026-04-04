import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const developerExperienceTools: Slide = {
	title: "Developer Experience Tools",
	type: "concept",
	Content,
};
