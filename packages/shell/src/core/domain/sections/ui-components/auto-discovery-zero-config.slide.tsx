import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const autoDiscoveryZeroConfig: Slide = {
	title: "Auto-Discovery Zero Config",
	type: "concept",
	Content,
};
