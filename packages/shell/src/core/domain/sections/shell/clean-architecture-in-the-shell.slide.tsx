import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Shell follows Clean Architecture — 4 layers: domain, hooks, store, features
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			domain/ owns entities and slide data. hooks/ owns business logic. store/ owns Zustand.
			features/ owns route-level containers
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DOMAIN
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HOOKS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				STORE
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				FEATURES
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">4</span>
				<span class="text-xs text-fg-secondary">Arch layers</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Upward imports</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Dependencies only point inward — domain never imports from features
		</p>
	</div>
);

export const cleanArchitectureInTheShell: Slide = {
	title: "Clean Architecture In The Shell",
	type: "diagram",
	diagram: "features → hooks → store → domain",
	Content,
};
