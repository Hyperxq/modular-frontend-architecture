import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const theBundlerEcosystem: Slide = {
	title: "The Bundler Ecosystem",
	type: "concept",
	Content,
};
