import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Biome replaces ESLint + Prettier. Lefthook enforces commit conventions. Bun runs everything
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Biome lints and formats with one binary, zero config drift. Lefthook runs pre-commit checks.
			Conventional Commits gate every push
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BIOME
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LEFTHOOK
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CONVENTIONAL COMMITS
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Binary (Biome)</dt>
				<dd class="text-2xl font-bold text-primary m-0">1</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Config drift</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Fast feedback loop — lint errors surface before they reach CI
		</p>
	</div>
);

export const developerExperienceTools: Slide = {
	title: "Developer Experience Tools",
	type: "concept",
	Content,
};
