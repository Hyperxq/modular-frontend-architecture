import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const sddInPractice: Slide = {
	title: "SDD In Practice",
	type: "concept",
	Content,
};
