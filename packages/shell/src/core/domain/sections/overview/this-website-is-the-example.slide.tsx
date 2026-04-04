import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		{/* Insight */}
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			You are looking at the reference implementation right now — dogfooding in production
		</p>
		{/* Body */}
		<p class="text-fg-secondary text-base leading-relaxed">
			This presentation runs on the exact architecture it describes. Every slide is a Preact
			component loaded via Module Federation — the repo is its own living documentation.
		</p>
		{/* Pills */}
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DOGFOODING
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LIVE DEMO
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SELF-DOCUMENTING
			</span>
		</div>
		{/* Metrics */}
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">42</span>
				<span class="text-xs text-fg-secondary">Live slides</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">External deps bundled</span>
			</div>
		</div>
		{/* Caption */}
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The best documentation is working code
		</p>
	</div>
);

export const thisWebsiteIsTheExample: Slide = {
	title: "This Website Is The Example",
	type: "concept",
	Content,
};
