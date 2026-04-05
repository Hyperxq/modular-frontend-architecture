import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Legacy coexistence and incremental migration are the real drivers
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			One source must serve MF consumers, import-map browsers, and Web Component embedders —
			simultaneously
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LEGACY COEXISTENCE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				INCREMENTAL MIGRATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				3 OUTPUTS
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Rewrites needed</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Outputs from 1 source</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The architecture must support brownfield migration, not just greenfield
		</p>
	</div>
);

export const theRealWorldProblem: Slide = {
	title: "The Real World Problem",
	type: "concept",
	Content,
};
