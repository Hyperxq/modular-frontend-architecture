import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		{/* Insight */}
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Two packages, one runtime — Shell hosts, UI-Components renders on demand
		</p>
		{/* Body */}
		<p class="text-fg-secondary text-base leading-relaxed">
			Shell runs on :3002 as the MF host. UI-Components runs on :3001 as the MF remote. They share
			Preact as a singleton across the Module Federation boundary, ensuring a single instance at
			runtime.
		</p>
		{/* Pills */}
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RUNTIME COMPOSITION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SINGLETON
			</li>
		</ul>
		{/* Metrics */}
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Shell (host)</dt>
				<dd class="text-2xl font-bold text-primary m-0">:3002</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">UI-Components (remote)</dt>
				<dd class="text-2xl font-bold text-primary m-0">:3001</dd>
			</div>
		</dl>
		{/* Caption */}
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			No shared bundle — components load only when navigated to
		</p>
	</div>
);

export const theBigPicture: Slide = {
	title: "The Big Picture",
	type: "concept",
	Content,
};
