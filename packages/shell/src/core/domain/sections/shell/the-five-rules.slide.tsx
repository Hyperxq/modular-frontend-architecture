import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Five non-negotiable rules govern all code in this repo — enforced by Biome and architecture
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			1) No upward imports. 2) No Zustand stores in ui-components. 3) All data via props. 4)
			Callbacks as event props. 5) State must be serializable
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NO UPWARD IMPORTS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PROPS ONLY
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SERIALIZABLE STATE
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">5</span>
				<span class="text-xs text-fg-secondary">Enforced rules</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Exceptions allowed</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Rules without enforcement are suggestions — Biome makes them errors
		</p>
	</div>
);

export const theFiveRules: Slide = {
	title: "The Five Rules",
	type: "concept",
	Content,
};
