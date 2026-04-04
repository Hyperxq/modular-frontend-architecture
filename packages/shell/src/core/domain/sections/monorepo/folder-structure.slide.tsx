import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const folderStructure: Slide = {
	title: "Folder Structure",
	type: "concept",
	Content,
};
