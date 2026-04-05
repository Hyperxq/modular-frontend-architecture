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
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				FAST-GLOB
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO CONFIG
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AUTO-EXPOSED
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Manual registrations</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">= 1 MF entry</dt>
				<dd class="text-2xl font-bold text-primary m-0">1 file</dd>
			</div>
		</dl>
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
