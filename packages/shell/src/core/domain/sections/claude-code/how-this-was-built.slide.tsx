import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			This entire architecture was designed and implemented with Claude Code — from spec to
			production.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Let me be transparent about something: this project was built using AI-assisted development.
			Not as a gimmick — as a deliberate methodology.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">
				The tool is Claude Code — but the methodology is what matters
			</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">I directed. The AI executed.</strong> Every architectural
					decision — Clean Architecture in the shell, Atomic Design in UI-Components, singleton
					sharing, auto-discovery — was a human decision. Claude Code implemented it, following
					explicit specifications.
				</li>
				<li>
					<strong class="text-fg-primary">Skills keep the AI current.</strong> Preact 10, Zustand 5,
					Tailwind CSS 4, Rstest — each technology has a skill file that teaches the AI the latest
					patterns and conventions. No hallucinated APIs, no deprecated patterns.
				</li>
				<li>
					<strong class="text-fg-primary">Persistent memory eliminates context loss.</strong> Engram
					stores decisions, bugfixes, and architecture knowledge across sessions. The AI doesn't
					"forget" why we chose Preact over React, or why the MF remote has no config file.
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">
				The number that puts this in perspective
			</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				When this same architecture was implemented for a real production project with a team, it
				took <strong class="text-fg-primary">4 months</strong> — between designing the architecture
				and shipping it. With Claude Code, it took{" "}
				<strong class="text-primary">4 days of ultra focus</strong>.
			</p>
			<p class="text-fg-secondary text-sm leading-relaxed">
				That's not a claim that AI replaces understanding. It's the opposite: the 4-day result was
				only possible because the architect already had 4 months of hard-won knowledge about what to
				build and why. The AI executed. The human directed.
			</p>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">The methodology: SDD + TDD + gentle-ai</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Every significant change went through{" "}
				<strong class="text-fg-primary">proposal → specs → design → tasks → apply → verify</strong>.
				The AI didn't make architectural decisions — it implemented the ones already made in the
				spec phase.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CLAUDE CODE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AI-ASSISTED
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SKILLS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ENGRAM
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				METHODOLOGY
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			AI is a force multiplier, not a replacement for understanding.
		</p>
	</div>
);

export const howThisWasBuilt: Slide = {
	title: "How This Was Built",
	type: "concept",
	Content,
};
