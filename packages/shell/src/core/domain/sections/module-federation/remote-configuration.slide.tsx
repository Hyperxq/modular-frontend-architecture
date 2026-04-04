import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const remoteConfiguration: Slide = {
	title: "Remote Configuration",
	type: "concept",
	Content,
};
