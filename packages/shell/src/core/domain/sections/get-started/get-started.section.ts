import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyIsThisRightForYou = lazy(() =>
	import(/* webpackChunkName: "section-get-started" */ "./is-this-right-for-you.slide").then(
		(m) => ({ default: m.isThisRightForYou.Content }),
	),
);

const LazyWhatWeProvide = lazy(() =>
	import(/* webpackChunkName: "section-get-started" */ "./what-we-provide.slide").then((m) => ({
		default: m.whatWeProvide.Content,
	})),
);

const LazyStartHere = lazy(() =>
	import(/* webpackChunkName: "section-get-started" */ "./start-here.slide").then((m) => ({
		default: m.startHere.Content,
	})),
);

export const getStartedSection: Section = {
	id: "get-started",
	title: "Get Started",
	description: "Getting started with this architecture",
	slides: [
		{ title: "Is This Right For You", type: "concept", Content: LazyIsThisRightForYou },
		{ title: "What We Provide", type: "concept", Content: LazyWhatWeProvide },
		{ title: "Start Here", type: "concept", Content: LazyStartHere },
	],
};
