import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Atomic Design gives a shared vocabulary — atoms, molecules, organisms — enforced by LEVEL_MODE
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			atoms/ (LEVEL_MODE=1) are primitive building blocks. molecules/ (LEVEL_MODE=2) compose atoms.
			organisms/ (LEVEL_MODE=3) are full UI sections
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ATOMS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MOLECULES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ORGANISMS
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Atomic levels</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">LEVEL_MODE per component</dt>
				<dd class="text-2xl font-bold text-primary m-0">1</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			LEVEL_MODE prevents organisms from importing other organisms at build time
		</p>
	</div>
);

export const atomicDesign: Slide = {
	title: "Atomic Design",
	type: "concept",
	Content,
};
