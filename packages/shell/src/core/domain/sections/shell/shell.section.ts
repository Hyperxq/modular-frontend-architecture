import { lazy } from "preact/compat";
import type { Section } from "../types";
import { cleanArchitectureInTheShellMeta } from "./clean-architecture-in-the-shell.slide.meta";

const LazyCleanArchitectureInTheShell = lazy(
	() => import(/* webpackChunkName: "section-shell" */ "./clean-architecture-in-the-shell.slide"),
);

const LazyHowShellTalksToUiComponents = lazy(() =>
	import(/* webpackChunkName: "section-shell" */ "./how-shell-talks-to-ui-components.slide").then(
		(m) => ({ default: m.howShellTalksToUiComponents.Content }),
	),
);

const LazyStateManagementRules = lazy(() =>
	import(/* webpackChunkName: "section-shell" */ "./state-management-rules.slide").then((m) => ({
		default: m.stateManagementRules.Content,
	})),
);

const LazyTheFiveRules = lazy(() =>
	import(/* webpackChunkName: "section-shell" */ "./the-five-rules.slide").then((m) => ({
		default: m.theFiveRules.Content,
	})),
);

export const shellSection: Section = {
	id: "shell",
	title: "Shell & Communication",
	description: "Shell architecture and communication patterns",
	slides: [
		{ ...cleanArchitectureInTheShellMeta, Content: LazyCleanArchitectureInTheShell },
		{
			title: "How Shell Talks To UI-Components",
			type: "concept",
			Content: LazyHowShellTalksToUiComponents,
		},
		{ title: "State Management Rules", type: "concept", Content: LazyStateManagementRules },
		{ title: "The Five Rules", type: "concept", Content: LazyTheFiveRules },
	],
};
