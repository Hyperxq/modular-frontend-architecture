import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Zustand 5 lives in Shell only — UI-Components uses only local state and context
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Tailwind 4 uses a @theme CSS preset with design tokens. No config file needed. Tokens are CSS
			variables consumed as Tailwind classes
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZUSTAND 5
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TAILWIND 4
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DESIGN TOKENS
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Zustand stores in shell</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Stores in ui-components</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			State flows down, events flow up — the architecture enforces this
		</p>
	</div>
);

export const stateAndStyling: Slide = {
	title: "State And Styling",
	type: "concept",
	Content,
};
