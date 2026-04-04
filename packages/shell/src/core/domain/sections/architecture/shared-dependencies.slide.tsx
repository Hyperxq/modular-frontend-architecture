import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>Singleton pattern for shared libraries.</p>
);

export const sharedDependencies: Slide = {
	title: "Shared Dependencies",
	type: "code",
	Content,
};
