import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const e2eWithPlaywrightBdd: Slide = {
	title: "E2E With Playwright BDD",
	type: "concept",
	Content,
};
