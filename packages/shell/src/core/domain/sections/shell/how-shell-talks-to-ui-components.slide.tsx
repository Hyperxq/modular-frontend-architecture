import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => <p>TODO: slide content</p>;

export const howShellTalksToUiComponents: Slide = {
	title: "How Shell Talks To UI-Components",
	type: "concept",
	Content,
};
