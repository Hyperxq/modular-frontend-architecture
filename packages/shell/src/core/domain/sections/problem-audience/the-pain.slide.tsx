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
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEPLOYMENT BOTTLENECK
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TEAM COUPLING
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SHARED PIPELINE
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1 pipeline</span>
				<span class="text-xs text-fg-secondary">N teams blocked</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">Every change</span>
				<span class="text-xs text-fg-secondary">Full regression</span>
			</div>
		</div>
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
