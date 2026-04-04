import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const stateManagementRules: Slide = {
	title: "State Management Rules",
	type: "concept",
	Content,
};
