import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Shell's module-federation.config.ts declares 1 remote and 4 shared singletons: preact,
			preact/compat, preact/hooks, zustand
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The remote entry URL is resolved from env. Shared config ensures Preact and Zustand are never
			duplicated across the MF boundary
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				1 REMOTE
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				4 SHARED
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SINGLETON CONFIG
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1</span>
				<span class="text-xs text-fg-secondary">Remote declared</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">4</span>
				<span class="text-xs text-fg-secondary">Shared singletons</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Adding a shared dep without singleton: true is a silent runtime bug
		</p>
	</div>
);

export const hostConfiguration: Slide = {
	title: "Host Configuration",
	type: "diagram",
	diagram: "remotes: { ui_components } + shared: { preact, preact/compat, preact/hooks, zustand }",
	Content,
};
