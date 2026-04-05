import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => <p>TODO: slide content</p>;

export const unitTestsWithRstest: Slide = {
	title: "Unit Tests With Rstest",
	type: "concept",
	Content,
};
