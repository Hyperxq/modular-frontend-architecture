import type { Section } from "../types";
import { developerExperienceTools } from "./developer-experience-tools.slide";
import { stateAndStyling } from "./state-and-styling.slide";
import { theBundlerEcosystem } from "./the-bundler-ecosystem.slide";
import { whyPreact } from "./why-preact.slide";

export const stackSection: Section = {
	id: "stack",
	title: "Stack & Tooling",
	description: "The tools we use",
	slides: [theBundlerEcosystem, whyPreact, stateAndStyling, developerExperienceTools],
};
