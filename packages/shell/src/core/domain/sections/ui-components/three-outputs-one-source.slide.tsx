import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			One codebase, three consumers: Module Federation at runtime, Import Maps for ESM browsers, Web
			Components for any framework
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The same .tsx source file compiles to all three targets. Shell uses MF today; import maps and
			web components are ready for future consumers
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				IMPORT MAPS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				WEB COMPONENTS
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">3</span>
				<span class="text-xs text-fg-secondary">Output formats</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1</span>
				<span class="text-xs text-fg-secondary">Source file</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Build once, consume many — each target is independently tree-shakeable
		</p>
	</div>
);

export const threeOutputsOneSource: Slide = {
	title: "Three Outputs One Source",
	type: "concept",
	Content,
};
