import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Zustand owns global state in Shell. Tailwind 4 owns visual consistency across both packages.
		</p>
		<div class="flex flex-col gap-2">
			<h4 class="text-sm font-semibold text-fg-primary">State: Zustand 5</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Zustand lives exclusively in Shell — UI-Components never imports it, never creates stores,
				never reads global state directly. Shell reads from Zustand and passes everything down as
				props.
			</p>
			<ul class="flex flex-col gap-1 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">Minimal API</strong> — no providers, no reducers, no
					action creators. A store is a function that returns an object.
				</li>
				<li>
					<strong class="text-fg-primary">DevTools + Persist</strong> — Redux DevTools integration
					and localStorage persistence come as middleware, not as separate packages.
				</li>
				<li>
					<strong class="text-fg-primary">useShallow</strong> — optimized selectors that prevent
					unnecessary re-renders when only part of the state changes.
				</li>
				<li>
					<strong class="text-fg-primary">No context providers</strong> — Zustand doesn't need a
					Provider wrapper, which simplifies the Module Federation boundary.
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-2">
			<h4 class="text-sm font-semibold text-fg-primary">Styling: Tailwind CSS 4</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Tailwind provides visual consistency across both packages through a shared preset:
			</p>
			<ul class="flex flex-col gap-1 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">@theme directive</strong> — design tokens (colors,
					spacing, typography) defined once in shared/, consumed by both Shell and UI-Components.
				</li>
				<li>
					<strong class="text-fg-primary">cn() utility</strong> — wraps clsx + tailwind-merge for
					conditional class composition without conflicts.
				</li>
				<li>
					<strong class="text-fg-primary">No CSS-in-JS runtime</strong> — Tailwind compiles to
					static CSS. No runtime cost, no hydration mismatches.
				</li>
			</ul>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZUSTAND
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TAILWIND CSS 4
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				STATE MANAGEMENT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DESIGN TOKENS
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			State flows through props. Style flows through tokens. Both are contracts.
		</p>
	</div>
);

export const stateAndStyling: Slide = {
	title: "State And Styling",
	type: "diagram",
	diagram: `graph LR
    subgraph STATE["State Flow"]
        direction LR
        ZS["Zustand Store\\nShell only"]
        SC["Shell reads\\nuseShallow selector"]
        PR["props / context\\npassed down"]
        UC1["UI-Components\\nreceives + renders"]
        ZS --> SC --> PR --> UC1
    end

    subgraph TOKENS["Token Flow"]
        direction LR
        TP["tailwind-preset.css\\nShared — @theme"]
        SH2["Shell\\nimports preset"]
        UIC2["UI-Components\\nimports preset"]
        CSS["Static CSS\\ncompiled at build time\\nzero runtime cost"]
        TP --> SH2 --> CSS
        TP --> UIC2 --> CSS
    end`,
	Content,
};
