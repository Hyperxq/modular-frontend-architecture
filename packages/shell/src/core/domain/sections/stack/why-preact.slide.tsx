import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Preact is 3KB vs React's 40KB — and it MUST be singleton across the MF boundary
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			preact/compat gives full React API surface. Module Federation shared config enforces
			singleton: true so only one Preact instance runs at runtime
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				3KB
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REACT COMPAT
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SINGLETON REQUIRED
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">3KB</span>
				<span class="text-xs text-fg-secondary">Preact runtime</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">40KB</span>
				<span class="text-xs text-fg-secondary">React runtime</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Without singleton: true, hooks fail silently across the MF boundary
		</p>
	</div>
);

export const whyPreact: Slide = {
	title: "Why Preact",
	type: "concept",
	Content,
};
