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
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				36 TESTS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO BIOME ERRORS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TASKS-DRIVEN
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">36</span>
				<span class="text-xs text-fg-secondary">Unit tests</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Biome lint errors</span>
			</div>
		</div>
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
