import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const theBigPicture: Slide = {
	title: "The Big Picture",
	type: "concept",
	Content,
};
