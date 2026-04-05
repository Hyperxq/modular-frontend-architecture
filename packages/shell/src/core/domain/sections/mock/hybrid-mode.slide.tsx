import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			PUBLIC_MSW_OMIT_KEYS lets you bypass specific handlers and hit the real API selectively
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Set PUBLIC_MSW_OMIT_KEYS=auth,user to let auth calls through while mocking everything else.
			The service worker checks the key before intercepting
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SELECTIVE BYPASS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				OMIT KEYS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HYBRID
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Handlers total</dt>
				<dd class="text-2xl font-bold text-primary m-0">N</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Bypassed via OMIT_KEYS</dt>
				<dd class="text-2xl font-bold text-primary m-0">K</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Ideal for testing against a real auth service while mocking slow or unstable APIs
		</p>
	</div>
);

export const hybridMode: Slide = {
	title: "Hybrid Mode",
	type: "concept",
	Content,
};
