import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			fast-glob auto-discovers all .tsx components — zero manual registration in rslib.config
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Every .tsx file under lib/components/ becomes its own independent Module Federation exposed
			entry. Adding a component = creating a file
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				FAST-GLOB
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO CONFIG
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AUTO-EXPOSED
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Manual registrations</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1 file</span>
				<span class="text-xs text-fg-secondary">= 1 MF entry</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			mf-manifest.json is generated at build time — never edit it manually
		</p>
	</div>
);

export const autoDiscoveryZeroConfig: Slide = {
	title: "Auto-Discovery Zero Config",
	type: "concept",
	Content,
};
