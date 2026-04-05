import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Open DevTools Network tab — MF chunks load on demand as you navigate slides
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Each slide navigation triggers a new network request to load only that component chunk.
			Nothing is pre-bundled into the shell
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ON-DEMAND LOADING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NETWORK TAB
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LAZY CHUNKS
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Shell bundle for components</dt>
				<dd class="text-2xl font-bold text-primary m-0">0KB</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Per component first load</dt>
				<dd class="text-2xl font-bold text-primary m-0">1 request</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Refresh the page on a slide — only that slide chunk reloads
		</p>
	</div>
);

export const seeItInDevTools: Slide = {
	title: "See It In Dev Tools",
	type: "concept",
	Content,
};
