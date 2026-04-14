import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Shell reads state and passes it down as props. UI-Components receives and renders — nothing
			more.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The data flow follows the Container/Presentational pattern, applied at the micro-frontend
			boundary:
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>
				<strong class="text-fg-primary">User interacts with the UI</strong> — clicks a button,
				presses a key, navigates.
			</li>
			<li>
				<strong class="text-fg-primary">Shell handles the event</strong> — the router updates, a
				Zustand store transitions, a hook computes the next state.
			</li>
			<li>
				<strong class="text-fg-primary">Shell passes data down</strong> — every piece of information
				that UI-Components needs arrives as props or context values. Never as store imports, never
				as global state.
			</li>
			<li>
				<strong class="text-fg-primary">UI-Components renders</strong> — it receives props, returns
				JSX, and that's it. No side effects, no business decisions, no API calls.
			</li>
		</ol>
		<p class="text-fg-secondary text-base leading-relaxed">
			This boundary is not a suggestion — it's enforced by the architecture. UI-Components has no
			access to Zustand stores, no access to the router, and no access to shell internals. The only
			way data crosses the Module Federation boundary is through props that shell explicitly passes
			down.
		</p>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The result is a clear contract: if something breaks in the UI, the bug is in what shell
			passed. If the data is correct but the rendering is wrong, the bug is in UI-Components. No
			ambiguity.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DATA FLOW
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CONTAINER/PRESENTATIONAL
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PROPS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIDIRECTIONAL
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The boundary makes violations impossible, not just discouraged.
		</p>
	</div>
);

export const dataFlow: Slide = {
	title: "Data Flow",
	type: "diagram",
	diagram: `flowchart TD
    U(["👤 User\\nclick · key · swipe"])
    U --> R

    subgraph SHELL["Shell"]
        R["Router\\n(URL update)"]
        H["Hooks\\nuseNavigation · useKeyboard · useSwipe"]
        Z["Zustand Stores\\nAppStore · ProgressStore"]
        C["PresentationContainer\\n(composes data from hooks + stores)"]
        R --> H
        H --> Z
        Z --> C
    end

    C -->|"props / context values"| BOUNDARY

    BOUNDARY{{"── Module Federation boundary ──"}}

    BOUNDARY --> UI

    subgraph UICOMP["UI-Components"]
        UI["Header · Sidebar · CenterPanel\\nNavArrows · BottomBar\\n(receive props → return JSX)"]
    end

    UI --> DOM(["🖥️ DOM update"])

    CB["Shell-defined callbacks\\nonNext · onPrev · onSelect"]
    UI -.->|"calls callback prop"| CB
    CB -.->|"triggers state change"| Z`,
	Content,
};
