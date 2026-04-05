import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three Zustand stores: appStore (auth/session), progressStore (slide position), mockStore (MSW
			toggle)
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			All stores use devtools + persist middleware. useShallow prevents unnecessary re-renders.
			UI-Components never imports any store
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				APPSTORE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PROGRESSSTORE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MOCKSTORE
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Zustand stores</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Stores in ui-components</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			useShallow is not optional — without it every state update re-renders all consumers
		</p>
	</div>
);

export const stateManagementRules: Slide = {
	title: "State Management Rules",
	type: "concept",
	Content,
};
