import type { Section } from "../../types";
import { preactSignals } from "./preact-signals.slide";
import { rspackEcosystem } from "./rspack-ecosystem.slide";

export const stackSection: Section = {
	id: "stack",
	title: "Stack & Tooling",
	description: "The tools we use",
	slides: [rspackEcosystem, preactSignals],
};
