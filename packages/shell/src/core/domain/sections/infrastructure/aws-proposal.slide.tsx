import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>TODO: slide content</p>
);

export const awsProposal: Slide = {
	title: "AWS Proposal",
	type: "concept",
	Content,
};
