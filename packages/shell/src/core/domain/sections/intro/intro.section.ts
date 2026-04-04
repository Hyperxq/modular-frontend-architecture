import type { Section } from "../types";
import { monolithProblem } from "./monolith-problem.slide";
import { structuralAnalysis } from "./structural-analysis.slide";
import { whyMicroFrontends } from "./why-micro-frontends.slide";

export const introSection: Section = {
	id: "intro",
	title: "Overview",
	description: "Introduction to the architecture",
	slides: [monolithProblem, structuralAnalysis, whyMicroFrontends],
};
