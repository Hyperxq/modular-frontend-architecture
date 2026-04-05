import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => <p>TODO: slide content</p>;

export const nxAsTaskRunnerOnly: Slide = {
	title: "Nx As Task Runner Only",
	type: "concept",
	Content,
};
