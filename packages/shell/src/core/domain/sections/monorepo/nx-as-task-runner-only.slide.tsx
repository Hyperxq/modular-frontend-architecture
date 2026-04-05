import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Nx is used ONLY as a task runner — no generators, no Nx plugins, no framework coupling
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			nx.json defines task dependencies and caching. project.json defines targets. That is the
			entire Nx surface area used
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TASK RUNNER ONLY
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NO GENERATORS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CACHING
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Config files used</dt>
				<dd class="text-2xl font-bold text-primary m-0">2</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Generators ignored</dt>
				<dd class="text-2xl font-bold text-primary m-0">∞</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Escape hatch always available — Bun scripts work without Nx
		</p>
	</div>
);

export const nxAsTaskRunnerOnly: Slide = {
	title: "Nx As Task Runner Only",
	type: "concept",
	Content,
};
