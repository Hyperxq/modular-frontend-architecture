import { lazy } from "preact/compat";
import type { Section } from "../types";
import { dataFlowMeta } from "./data-flow.slide.meta";

const LazyTheBigPicture = lazy(() =>
	import(/* webpackChunkName: "section-overview" */ "./the-big-picture.slide").then((m) => ({
		default: m.theBigPicture.Content,
	})),
);

const LazyThisWebsiteIsTheExample = lazy(() =>
	import(/* webpackChunkName: "section-overview" */ "./this-website-is-the-example.slide").then(
		(m) => ({ default: m.thisWebsiteIsTheExample.Content }),
	),
);

const LazyDataFlow = lazy(
	() => import(/* webpackChunkName: "section-overview" */ "./data-flow.slide"),
);

export const overviewSection: Section = {
	id: "overview",
	title: "Overview",
	description: "High-level architecture overview",
	slides: [
		{ title: "The Big Picture", type: "concept", Content: LazyTheBigPicture },
		{
			title: "This Website Is The Example",
			type: "concept",
			Content: LazyThisWebsiteIsTheExample,
		},
		{ ...dataFlowMeta, Content: LazyDataFlow },
	],
};
