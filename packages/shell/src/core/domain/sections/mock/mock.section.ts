import type { Section } from "../types";
import { hybridMode } from "./hybrid-mode.slide";
import { liveToggleAndCiCd } from "./live-toggle-and-ci-cd.slide";
import { theProblemItSolves } from "./the-problem-it-solves.slide";
import { threeScenarios } from "./three-scenarios.slide";
import { zeroCostInProduction } from "./zero-cost-in-production.slide";

export const mockSection: Section = {
	id: "mock",
	title: "Mock Mode",
	description: "MSW-powered API mocking",
	slides: [theProblemItSolves, threeScenarios, hybridMode, zeroCostInProduction, liveToggleAndCiCd],
};
