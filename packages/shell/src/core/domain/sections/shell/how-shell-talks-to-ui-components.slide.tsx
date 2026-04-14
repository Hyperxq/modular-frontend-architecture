import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Shell reads from Zustand and passes everything down via props through PresentationContainer.
			UI-Components never touches a store.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The communication pattern is unidirectional and explicit. Full flow:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				Shell (PresentationContainer) reads from: useNavigation() → goNext, goPrev, canGoNext,
				canGoPrev; useProgressStore() → visitedSlides, currentPosition; usePresentationData() →
				composed slide data, sidebar items
			</li>
			<li>
				ALL data passed as props to: &lt;Header title={"{...}"} /&gt;, &lt;Sidebar sections=
				{"{...}"}
				onSelect={"{...}"} /&gt;, &lt;CenterPanel content={"{...}"} /&gt;, &lt;BottomBar current=
				{"{...}"} total={"{...}"} /&gt;, &lt;NavArrows onNext={"{...}"} onPrev={"{...}"} /&gt;
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			The PresentationContainer is the single point where shell intelligence meets UI rendering. It
			reads from hooks and stores, composes the data, and passes it down. UI-Components receives
			props and returns JSX — nothing more.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Event handlers work the same way in reverse: onNext, onSelect, onPrev are callback props that
			shell defines and UI-Components invokes. The component doesn't know what happens when you
			click "next" — it just calls the function it was given.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CONTAINER/PRESENTATIONAL
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PROPS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIDIRECTIONAL FLOW
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PRESENTATION CONTAINER
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			One container, one boundary, one contract. That's the interface.
		</p>
	</div>
);

export const howShellTalksToUiComponents: Slide = {
	title: "How Shell Talks To UI-Components",
	type: "diagram",
	diagram: `graph LR
    subgraph SHELL["Shell"]
        PC["PresentationContainer"]
        HK["useNavigation()\\nuseProgressStore()\\nusePresentationData()"]
        HK --> PC
    end

    WALL{{"── Module Federation boundary ──"}}

    PC -->|"props down"| WALL

    subgraph UIC["UI-Components"]
        HD["Header"]
        SB["Sidebar"]
        CP["CenterPanel"]
        BB["BottomBar"]
        NA["NavArrows"]
    end

    WALL --> HD
    WALL --> SB
    WALL --> CP
    WALL --> BB
    WALL --> NA

    NA -.->|"onNext() callback"| PC
    SB -.->|"onSelect() callback"| PC

    style WALL fill:#3a2a00,color:#ffcc00`,
	Content,
};
