import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyHostAndRemote = lazy(() =>
	import(/* webpackChunkName: "section-module-federation" */ "./host-and-remote.slide").then(
		(m) => ({ default: m.hostAndRemote.Content }),
	),
);

const LazyHostConfiguration = lazy(() =>
	import(/* webpackChunkName: "section-module-federation" */ "./host-configuration.slide").then(
		(m) => ({ default: m.hostConfiguration.Content }),
	),
);

const LazyRemoteConfiguration = lazy(() =>
	import(/* webpackChunkName: "section-module-federation" */ "./remote-configuration.slide").then(
		(m) => ({ default: m.remoteConfiguration.Content }),
	),
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
		{
			title: "Host And Remote",
			type: "diagram",
			diagram: "Shell (:3002) --[runtime fetch]--> ui_components (:3001 | CDN)",
			Content: LazyHostAndRemote,
		},
		{
			title: "Host Configuration",
			type: "diagram",
			diagram:
				"remotes: { ui_components } + shared: { preact, preact/compat, preact/hooks, zustand }",
			Content: LazyHostConfiguration,
		},
		{
			title: "Remote Configuration",
			type: "diagram",
			diagram: "lib/components/**/*.tsx --[fast-glob]--> mf-manifest.json --[rslib mf]--> chunks",
			Content: LazyRemoteConfiguration,
		},
		{ title: "See It In Dev Tools", type: "concept", Content: LazySeeItInDevTools },
	],
};
