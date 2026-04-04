import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const nxAsTaskRunnerOnly: Slide = {
	title: "Nx As Task Runner Only",
	type: "concept",
	Content,
};
