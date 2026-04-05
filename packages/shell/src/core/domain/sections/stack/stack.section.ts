import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyTheBundlerEcosystem = lazy(() =>
	import(/* webpackChunkName: "section-stack" */ "./the-bundler-ecosystem.slide").then((m) => ({
		default: m.theBundlerEcosystem.Content,
	})),
);

const LazyWhyPreact = lazy(() =>
	import(/* webpackChunkName: "section-stack" */ "./why-preact.slide").then((m) => ({
		default: m.whyPreact.Content,
	})),
);

const LazyStateAndStyling = lazy(() =>
	import(/* webpackChunkName: "section-stack" */ "./state-and-styling.slide").then((m) => ({
		default: m.stateAndStyling.Content,
	})),
);

const LazyDeveloperExperienceTools = lazy(() =>
	import(/* webpackChunkName: "section-stack" */ "./developer-experience-tools.slide").then(
		(m) => ({ default: m.developerExperienceTools.Content }),
	),
);

export const stackSection: Section = {
	id: "stack",
	title: "Stack & Tooling",
	description: "The tools we use",
	slides: [
		{ title: "The Bundler Ecosystem", type: "concept", Content: LazyTheBundlerEcosystem },
		{ title: "Why Preact", type: "concept", Content: LazyWhyPreact },
		{ title: "State And Styling", type: "concept", Content: LazyStateAndStyling },
		{
			title: "Developer Experience Tools",
			type: "concept",
			Content: LazyDeveloperExperienceTools,
		},
	],
};
