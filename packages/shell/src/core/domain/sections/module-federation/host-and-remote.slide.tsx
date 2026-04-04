import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const hostAndRemote: Slide = {
	title: "Host And Remote",
	type: "concept",
	Content,
};
