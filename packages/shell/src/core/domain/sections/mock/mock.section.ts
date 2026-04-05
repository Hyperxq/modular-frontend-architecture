import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyTheProblemItSolves = lazy(() =>
	import(/* webpackChunkName: "section-mock" */ "./the-problem-it-solves.slide").then((m) => ({
		default: m.theProblemItSolves.Content,
	})),
);

const LazyThreeScenarios = lazy(() =>
	import(/* webpackChunkName: "section-mock" */ "./three-scenarios.slide").then((m) => ({
		default: m.threeScenarios.Content,
	})),
);

const LazyHybridMode = lazy(() =>
	import(/* webpackChunkName: "section-mock" */ "./hybrid-mode.slide").then((m) => ({
		default: m.hybridMode.Content,
	})),
);

const LazyZeroCostInProduction = lazy(() =>
	import(/* webpackChunkName: "section-mock" */ "./zero-cost-in-production.slide").then((m) => ({
		default: m.zeroCostInProduction.Content,
	})),
);

const LazyLiveToggleAndCiCd = lazy(() =>
	import(
		/* webpackChunkName: "section-mock" */ "../../../../features/mock-demo/MockDemoContainer"
	).then((m) => ({ default: m.MockDemoContainer })),
);

export const mockSection: Section = {
	id: "mock",
	title: "Mock Mode",
	description: "MSW-powered API mocking",
	slides: [
		{ title: "The Problem It Solves", type: "concept", Content: LazyTheProblemItSolves },
		{ title: "Three Scenarios", type: "concept", Content: LazyThreeScenarios },
		{ title: "Hybrid Mode", type: "concept", Content: LazyHybridMode },
		{ title: "Zero Cost In Production", type: "concept", Content: LazyZeroCostInProduction },
		{ title: "Live Toggle And CI/CD", type: "interactive", Content: LazyLiveToggleAndCiCd },
	],
};
