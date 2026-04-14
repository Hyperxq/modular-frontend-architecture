import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Atoms compose into molecules. Molecules compose into organisms. Nothing skips a level.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			UI-Components follows Brad Frost's Atomic Design methodology — a compositional hierarchy that
			scales predictably:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong>Atoms (LEVEL_MODE=1)</strong> — the smallest building blocks. A Button, an Input,
				NavArrows, a SlideTransition. They receive props and render. No composition, no layout
				decisions.
			</li>
			<li>
				<strong>Molecules (LEVEL_MODE=2)</strong> — compositions of atoms. A Header combines text
				and navigation atoms. A Sidebar combines list items and selection state. They coordinate
				atoms but don't own business logic.
			</li>
			<li>
				<strong>Organisms (LEVEL_MODE=3)</strong> — complex compositions that form complete UI
				sections. PresentationLayout orchestrates the entire slide view. MockDemo composes the
				interactive MSW toggle.
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			Every component follows the same structure: Button.tsx — pure display component;
			Button.types.ts — props interface (ComponentChildren, not ReactNode); Button.spec.tsx — unit
			test. The discipline is in what's NOT there: no API calls, no store imports, no routing logic,
			no side effects.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ATOMIC DESIGN
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ATOMS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MOLECULES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ORGANISMS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				COMPOSITION
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The simplest component is the most reusable component.
		</p>
	</div>
);

export const atomicDesign: Slide = {
	title: "Atomic Design",
	type: "diagram",
	diagram: `graph BT
    subgraph ATOMS["Atoms — LEVEL_MODE=1\\nSmallest building blocks — props in, JSX out"]
        B["Button"]
        I["Input"]
        NA["NavArrows"]
        BB["BottomBar"]
        ST["SlideTransition"]
    end

    subgraph MOLECULES["Molecules — LEVEL_MODE=2\\nComposed from atoms — coordinate, don't own logic"]
        H["Header"]
        SB["Sidebar"]
        CP["CenterPanel"]
        DP["DiagramPanel"]
    end

    subgraph ORGANISMS["Organisms — LEVEL_MODE=3\\nComplete UI sections — orchestrate molecules"]
        PL["PresentationLayout"]
        MD["MockDemo"]
    end

    B --> H
    NA --> H
    B --> SB
    CP --> PL
    H --> PL
    SB --> PL
    BB --> PL
    DP --> PL`,
	Content,
};
