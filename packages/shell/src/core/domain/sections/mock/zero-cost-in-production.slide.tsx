import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			PUBLIC_ENABLE_MOCKING=false means the service worker never registers — zero runtime cost in
			production
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Rspack tree-shakes the entire mocks/ directory when mocking is disabled. No worker file is
			downloaded, no handler code is loaded
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TREE SHAKING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO RUNTIME COST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ENV-GATED
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Mock code in prod bundle</dt>
				<dd class="text-2xl font-bold text-primary m-0">0KB</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Controls everything</dt>
				<dd class="text-2xl font-bold text-primary m-0">1 env var</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The mock system disappears completely in production — by design
		</p>
	</div>
);

export const zeroCostInProduction: Slide = {
	title: "Zero Cost In Production",
	type: "concept",
	Content,
};
