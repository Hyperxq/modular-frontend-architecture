import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyHowThisWasBuilt = lazy(() =>
	import(/* webpackChunkName: "section-claude-code" */ "./how-this-was-built.slide").then((m) => ({
		default: m.howThisWasBuilt.Content,
	})),
);

const LazySddInPractice = lazy(() =>
	import(/* webpackChunkName: "section-claude-code" */ "./sdd-in-practice.slide").then((m) => ({
		default: m.sddInPractice.Content,
	})),
);

const LazyLessonsLearned = lazy(() =>
	import(/* webpackChunkName: "section-claude-code" */ "./lessons-learned.slide").then((m) => ({
		default: m.lessonsLearned.Content,
	})),
);

export const claudeCodeSection: Section = {
	id: "claude-code",
	title: "Claude Code",
	description: "How this project was built with AI",
	slides: [
		{ title: "How This Was Built", type: "concept", Content: LazyHowThisWasBuilt },
		{ title: "SDD In Practice", type: "concept", Content: LazySddInPractice },
		{ title: "Lessons Learned", type: "concept", Content: LazyLessonsLearned },
	],
};
