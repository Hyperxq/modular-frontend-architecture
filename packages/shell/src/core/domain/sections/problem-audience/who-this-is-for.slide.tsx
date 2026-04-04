import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Built for senior engineers and architects owning multi-team frontends
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			If you have 3+ teams shipping features into one SPA, this architecture is for you
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ARCHITECTS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SENIOR DEVS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MULTI-TEAM
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">3+</span>
				<span class="text-xs text-fg-secondary">Teams minimum</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1</span>
				<span class="text-xs text-fg-secondary">Shared codebase today</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Not for solo projects or startups — this complexity has a cost
		</p>
	</div>
);

export const whoThisIsFor: Slide = {
	title: "Who This Is For",
	type: "concept",
	Content,
};
