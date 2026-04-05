import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyThePain = lazy(() =>
	import(/* webpackChunkName: "section-problem-audience" */ "./the-pain.slide").then((m) => ({
		default: m.thePain.Content,
	})),
);

const LazyWhoThisIsFor = lazy(() =>
	import(/* webpackChunkName: "section-problem-audience" */ "./who-this-is-for.slide").then(
		(m) => ({ default: m.whoThisIsFor.Content }),
	),
);

const LazyTheRealWorldProblem = lazy(() =>
	import(/* webpackChunkName: "section-problem-audience" */ "./the-real-world-problem.slide").then(
		(m) => ({ default: m.theRealWorldProblem.Content }),
	),
);

export const problemAudienceSection: Section = {
	id: "problem-audience",
	title: "Problem & Audience",
	description: "The pain points and target audience",
	slides: [
		{ title: "The Pain", type: "concept", Content: LazyThePain },
		{ title: "Who This Is For", type: "concept", Content: LazyWhoThisIsFor },
		{ title: "The Real World Problem", type: "concept", Content: LazyTheRealWorldProblem },
	],
};
