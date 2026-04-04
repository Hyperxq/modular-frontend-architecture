import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>3KB runtime, React compatibility via aliases.</p>
);

export const preactSignals: Slide = {
	title: "Preact + Signals",
	type: "concept",
	Content,
};
