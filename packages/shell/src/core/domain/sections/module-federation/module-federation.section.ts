import { lazy } from "preact/compat";
import type { Section } from "../types";
import { hostAndRemoteMeta } from "./host-and-remote.slide.meta";
import { hostConfigurationMeta } from "./host-configuration.slide.meta";
import { remoteConfigurationMeta } from "./remote-configuration.slide.meta";

const LazyHostAndRemote = lazy(
	() => import(/* webpackChunkName: "section-module-federation" */ "./host-and-remote.slide"),
);

const LazyHostConfiguration = lazy(
	() => import(/* webpackChunkName: "section-module-federation" */ "./host-configuration.slide"),
);

const LazyRemoteConfiguration = lazy(
	() => import(/* webpackChunkName: "section-module-federation" */ "./remote-configuration.slide"),
);

const LazySeeItInDevTools = lazy(() =>
	import(/* webpackChunkName: "section-module-federation" */ "./see-it-in-dev-tools.slide").then(
		(m) => ({ default: m.seeItInDevTools.Content }),
	),
);

export const moduleFederationSection: Section = {
	id: "module-federation",
	title: "Module Federation",
	description: "Module Federation host and remote setup",
	slides: [
		{ ...hostAndRemoteMeta, Content: LazyHostAndRemote },
		{ ...hostConfigurationMeta, Content: LazyHostConfiguration },
		{ ...remoteConfigurationMeta, Content: LazyRemoteConfiguration },
		{ title: "See It In Dev Tools", type: "concept", Content: LazySeeItInDevTools },
	],
};
