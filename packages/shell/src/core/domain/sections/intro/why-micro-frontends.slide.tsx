import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>Independent deployment, team autonomy, technology freedom.</p>
);

export const whyMicroFrontends: Slide = {
	title: "Why Micro-Frontends?",
	type: "concept",
	Content,
};
