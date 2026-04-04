import type { Section } from "../types";
import { howThisWasBuilt } from "./how-this-was-built.slide";
import { lessonsLearned } from "./lessons-learned.slide";
import { sddInPractice } from "./sdd-in-practice.slide";

export const claudeCodeSection: Section = {
	id: "claude-code",
	title: "Claude Code",
	description: "How this project was built with AI",
	slides: [howThisWasBuilt, sddInPractice, lessonsLearned],
};
