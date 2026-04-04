import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const theFiveRules: Slide = {
	title: "The Five Rules",
	type: "concept",
	Content,
};
