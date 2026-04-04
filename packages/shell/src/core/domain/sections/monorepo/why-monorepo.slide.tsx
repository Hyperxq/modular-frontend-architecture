import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Bun workspaces + Nx 22 give unified DX with independent deployment boundaries
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			All packages share a single node_modules installation. Nx orchestrates builds with caching —
			no rebuild if nothing changed
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUN WORKSPACES
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NX 22
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIFIED DX
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1</span>
				<span class="text-xs text-fg-secondary">bun install</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">~0s</span>
				<span class="text-xs text-fg-secondary">Cached task re-run</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Monorepo ≠ monolith — packages stay independently deployable
		</p>
	</div>
);

export const whyMonorepo: Slide = {
	title: "Why Monorepo",
	type: "concept",
	Content,
};
