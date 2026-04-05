import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Built with Spec-Driven Development (SDD) — 7 phases from proposal to archive before touching
			code
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Every feature starts with a proposal, specs, design, tasks, apply, verify, archive. Claude
			Code implements; the architect decides.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SDD
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				7 PHASES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SPEC BEFORE CODE
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">SDD phases</dt>
				<dd class="text-2xl font-bold text-primary m-0">7</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Lines coded without a spec</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			AI is Jarvis. You are Tony Stark. Direct it, do not follow it.
		</p>
	</div>
);

export const howThisWasBuilt: Slide = {
	title: "How This Was Built",
	type: "concept",
	Content,
};
