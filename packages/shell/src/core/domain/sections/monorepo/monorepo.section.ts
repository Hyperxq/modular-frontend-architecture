import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyWhyMonorepo = lazy(() =>
	import(/* webpackChunkName: "section-monorepo" */ "./why-monorepo.slide").then((m) => ({
		default: m.whyMonorepo.Content,
	})),
);

const LazyFolderStructure = lazy(() =>
	import(/* webpackChunkName: "section-monorepo" */ "./folder-structure.slide").then((m) => ({
		default: m.folderStructure.Content,
	})),
);

const LazyNxAsTaskRunnerOnly = lazy(() =>
	import(/* webpackChunkName: "section-monorepo" */ "./nx-as-task-runner-only.slide").then((m) => ({
		default: m.nxAsTaskRunnerOnly.Content,
	})),
);

export const monorepoSection: Section = {
	id: "monorepo",
	title: "Monorepo",
	description: "Monorepo strategy and tooling",
	slides: [
		{ title: "Why Monorepo", type: "concept", Content: LazyWhyMonorepo },
		{ title: "Folder Structure", type: "concept", Content: LazyFolderStructure },
		{ title: "Nx As Task Runner Only", type: "concept", Content: LazyNxAsTaskRunnerOnly },
	],
};
