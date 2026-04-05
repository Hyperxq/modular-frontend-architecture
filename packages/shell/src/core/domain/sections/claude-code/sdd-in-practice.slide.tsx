import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Clean Architecture layers were specced first — 36 unit tests written from the spec, zero Biome
			errors on first lint
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The sdd-apply agent reads tasks.md, implements file by file, commits per section. The
			architect reviews diffs, not decisions.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				36 TESTS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO BIOME ERRORS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TASKS-DRIVEN
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Unit tests</dt>
				<dd class="text-2xl font-bold text-primary m-0">36</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Biome lint errors</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The spec is the contract — the AI is the implementer, not the designer.
		</p>
	</div>
);

export const sddInPractice: Slide = {
	title: "SDD In Practice",
	type: "concept",
	Content,
};
