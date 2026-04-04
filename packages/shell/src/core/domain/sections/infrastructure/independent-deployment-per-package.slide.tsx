import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const independentDeploymentPerPackage: Slide = {
	title: "Independent Deployment Per Package",
	type: "concept",
	Content,
};
