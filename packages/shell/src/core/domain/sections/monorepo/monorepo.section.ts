import type { Section } from "../types";
import { folderStructure } from "./folder-structure.slide";
import { nxAsTaskRunnerOnly } from "./nx-as-task-runner-only.slide";
import { whyMonorepo } from "./why-monorepo.slide";

export const monorepoSection: Section = {
	id: "monorepo",
	title: "Monorepo",
	description: "Monorepo strategy and tooling",
	slides: [whyMonorepo, folderStructure, nxAsTaskRunnerOnly],
};
