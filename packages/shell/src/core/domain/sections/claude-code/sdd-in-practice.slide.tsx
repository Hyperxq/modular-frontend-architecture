import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Spec first. Code second. Every significant change goes through a planning pipeline.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Spec-Driven Development (SDD) is the workflow that keeps AI-assisted development disciplined.
			Every significant change follows a pipeline:
		</p>
		<p class="text-fg-secondary text-sm font-mono text-center py-2">
			Proposal → Specs → Design → Tasks → Apply → Verify → Archive
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">Each phase produces an artifact</h4>
			<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
				<li>
					<strong class="text-fg-primary">Proposal</strong> — "What are we changing and why?"
					Intent, scope, approach.
				</li>
				<li>
					<strong class="text-fg-primary">Specs</strong> — "What must be true when we're done?"
					Requirements and acceptance scenarios.
				</li>
				<li>
					<strong class="text-fg-primary">Design</strong> — "How will we build it?" Architecture
					decisions, folder structure, data flow.
				</li>
				<li>
					<strong class="text-fg-primary">Tasks</strong> — "What exactly do we implement?" A
					checklist broken into phases.
				</li>
				<li>
					<strong class="text-fg-primary">Apply</strong> — Claude Code reads{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						tasks.md
					</code>{" "}
					and implements file by file, committing after each section.
				</li>
				<li>
					<strong class="text-fg-primary">Verify</strong> — Tests pass. Biome has zero errors. No{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						any
					</code>{" "}
					types. Specs are satisfied.
				</li>
				<li>
					<strong class="text-fg-primary">Archive</strong> — Specs merge into main documentation.
					The change is complete.
				</li>
			</ol>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">Why this matters</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Without SDD, AI-assisted development becomes: "write me a component" → get something that
				works → move on → accumulate inconsistencies. With SDD, every change is traceable: the
				proposal explains why, the specs define what, the design defines how, and verification
				confirms it actually works. The architect reviews diffs, not decisions. The decisions were
				made in the spec phase.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SDD
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SPEC-DRIVEN DEVELOPMENT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PIPELINE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				METHODOLOGY
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The spec prevents the AI from making assumptions — it follows the plan, not its training data.
		</p>
	</div>
);

export const sddInPractice: Slide = {
	title: "SDD In Practice",
	type: "concept",
	Content,
};
