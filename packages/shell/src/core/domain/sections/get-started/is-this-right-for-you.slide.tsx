import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const isThisRightForYou: Slide = {
	title: "Is This Right For You",
	type: "concept",
	Content,
};
