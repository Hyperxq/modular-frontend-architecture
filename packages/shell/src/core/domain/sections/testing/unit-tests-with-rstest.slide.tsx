import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const unitTestsWithRstest: Slide = {
	title: "Unit Tests With Rstest",
	type: "concept",
	Content,
};
