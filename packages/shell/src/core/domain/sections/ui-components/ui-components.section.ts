import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyAtomicDesign = lazy(() =>
	import(/* webpackChunkName: "section-ui-components" */ "./atomic-design.slide").then((m) => ({
		default: m.atomicDesign.Content,
	})),
);

const LazyAutoDiscoveryZeroConfig = lazy(() =>
	import(/* webpackChunkName: "section-ui-components" */ "./auto-discovery-zero-config.slide").then(
		(m) => ({ default: m.autoDiscoveryZeroConfig.Content }),
	),
);

const LazyThreeOutputsOneSource = lazy(() =>
	import(/* webpackChunkName: "section-ui-components" */ "./three-outputs-one-source.slide").then(
		(m) => ({ default: m.threeOutputsOneSource.Content }),
	),
);

const LazyTheSingletonRule = lazy(() =>
	import(/* webpackChunkName: "section-ui-components" */ "./the-singleton-rule.slide").then(
		(m) => ({ default: m.theSingletonRule.Content }),
	),
);

export const uiComponentsSection: Section = {
	id: "ui-components",
	title: "UI Components",
	description: "Component library architecture",
	slides: [
		{ title: "Atomic Design", type: "concept", Content: LazyAtomicDesign },
		{ title: "Auto-Discovery Zero Config", type: "concept", Content: LazyAutoDiscoveryZeroConfig },
		{ title: "Three Outputs One Source", type: "concept", Content: LazyThreeOutputsOneSource },
		{ title: "The Singleton Rule", type: "concept", Content: LazyTheSingletonRule },
	],
};
