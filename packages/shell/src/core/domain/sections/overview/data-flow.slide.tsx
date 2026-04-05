import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		{/* Insight */}
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Container/presentational pattern at the MF boundary — Shell owns logic, UI-Components owns
			rendering
		</p>
		{/* Body */}
		<p class="text-fg-secondary text-base leading-relaxed">
			Shell reads Zustand stores and passes data down via props. UI-Components never imports stores
			or calls APIs — it only receives and renders what it is given.
		</p>
		{/* Pills */}
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIDIRECTIONAL
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PROPS DOWN
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				EVENTS UP
			</li>
		</ul>
		{/* Metrics */}
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Smart container</dt>
				<dd class="text-2xl font-bold text-primary m-0">Shell</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Dumb renderer</dt>
				<dd class="text-2xl font-bold text-primary m-0">UI-Components</dd>
			</div>
		</dl>
		{/* Caption */}
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The MF boundary enforces the pattern — it cannot be violated accidentally
		</p>
	</div>
);

export const dataFlow: Slide = {
	title: "Data Flow",
	type: "diagram",
	diagram: "Shell [Zustand] → props → UI-Components [render only]",
	Content,
};
