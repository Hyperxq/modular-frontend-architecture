import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			MSW intercepts HTTP at the service worker level — no hardcoded data, no backend dependency
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Handlers live in mocks/. They intercept fetch/XHR before they reach the network. The app code
			does not know if it is hitting a mock or a real API
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MSW
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SERVICE WORKER
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HTTP INTERCEPTION
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Hardcoded data files</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Real app code paths</dt>
				<dd class="text-2xl font-bold text-primary m-0">100%</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Mock the transport, not the code — your components behave identically
		</p>
	</div>
);

export const theProblemItSolves: Slide = {
	title: "The Problem It Solves",
	type: "concept",
	Content,
};
