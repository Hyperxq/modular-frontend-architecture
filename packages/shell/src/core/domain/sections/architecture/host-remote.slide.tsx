import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>How host loads remote modules.</p>
);

export const hostRemote: Slide = {
	title: "Host & Remote",
	type: "diagram",
	Content,
	diagram: "host-remote-diagram",
};
