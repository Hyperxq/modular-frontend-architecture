import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const lessonsLearned: Slide = {
	title: "Lessons Learned",
	type: "concept",
	Content,
};
