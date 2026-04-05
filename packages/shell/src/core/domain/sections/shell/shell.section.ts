import type { Section } from "../types";
import { cleanArchitectureInTheShell } from "./clean-architecture-in-the-shell.slide";
import { howShellTalksToUiComponents } from "./how-shell-talks-to-ui-components.slide";
import { stateManagementRules } from "./state-management-rules.slide";
import { theFiveRules } from "./the-five-rules.slide";

export const shellSection: Section = {
	id: "shell",
	title: "Shell & Communication",
	description: "Shell architecture and communication patterns",
	slides: [
		cleanArchitectureInTheShell,
		howShellTalksToUiComponents,
		stateManagementRules,
		theFiveRules,
	],
};
