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
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUN WORKSPACES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NX 22
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIFIED DX
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">bun install</dt>
				<dd class="text-2xl font-bold text-primary m-0">1</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Cached task re-run</dt>
				<dd class="text-2xl font-bold text-primary m-0">~0s</dd>
			</div>
		</dl>
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
