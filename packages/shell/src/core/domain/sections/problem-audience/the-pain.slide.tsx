import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			SPA monolith grows → deployment bottleneck, one team blocks all releases
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Teams couple to a shared deploy pipeline; a CSS change requires a full regression cycle
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEPLOYMENT BOTTLENECK
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TEAM COUPLING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SHARED PIPELINE
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">N teams blocked</dt>
				<dd class="text-2xl font-bold text-primary m-0">1 pipeline</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Full regression</dt>
				<dd class="text-2xl font-bold text-primary m-0">Every change</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The bigger the app, the worse the coupling gets
		</p>
	</div>
);

export const thePain: Slide = {
	title: "The Pain",
	type: "concept",
	Content,
};
