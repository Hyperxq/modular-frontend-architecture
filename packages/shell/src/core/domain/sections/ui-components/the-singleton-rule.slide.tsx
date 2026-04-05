import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Preact MUST be singleton: true AND eager: true in BOTH the host and remote MF config
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			If singleton is false, two Preact instances load. Hooks silently fail. There is no runtime
			error — components just stop updating
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SINGLETON: TRUE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				EAGER: TRUE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BOTH SIDES
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Sides that need config</dt>
				<dd class="text-2xl font-bold text-primary m-0">2</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Tolerable Preact instances</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			This is the most common MF + Preact failure mode — it is silent and hard to debug
		</p>
	</div>
);

export const theSingletonRule: Slide = {
	title: "The Singleton Rule",
	type: "concept",
	Content,
};
