import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => <p>TODO: slide content</p>;

export const theTestingPyramid: Slide = {
	title: "The Testing Pyramid",
	type: "concept",
	Content,
};
