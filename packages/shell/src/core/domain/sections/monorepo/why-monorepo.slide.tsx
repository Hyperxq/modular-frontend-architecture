import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const whyMonorepo: Slide = {
	title: "Why Monorepo",
	type: "concept",
	Content,
};
