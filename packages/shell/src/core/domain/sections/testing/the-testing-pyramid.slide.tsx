import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three layers, three feedback speeds — from pure function tests to full browser journeys.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The testing strategy follows the classic pyramid — fast and cheap at the bottom, slow and
			comprehensive at the top.
		</p>
		<div class="flex flex-col gap-3">
			<div class="flex flex-col gap-1">
				<h4 class="text-sm font-semibold text-fg-primary">Unit (fast) — Rstest</h4>
				<p class="text-fg-secondary text-sm leading-relaxed">
					Pure function testing. Domain logic, store transitions, helper utilities. These tests run
					in milliseconds, have zero dependencies on the DOM, and cover the business rules that
					matter most. Rstest uses the same Rspack build pipeline as production — no separate
					config, no transformation surprises.
				</p>
			</div>
			<div class="flex flex-col gap-1">
				<h4 class="text-sm font-semibold text-fg-primary">
					Component (mid) — Rstest + testing-library/preact
				</h4>
				<p class="text-fg-secondary text-sm leading-relaxed">
					Render tests. Components receive props, render output, respond to interactions.
					@testing-library/preact provides the rendering environment, and MSW's Node server handles
					any API calls the component triggers. These tests validate that the display layer works
					correctly in isolation.
				</p>
			</div>
			<div class="flex flex-col gap-1">
				<h4 class="text-sm font-semibold text-fg-primary">
					E2E (slow) — Playwright + Cucumber BDD
				</h4>
				<p class="text-fg-secondary text-sm leading-relaxed">
					Full browser journeys. Gherkin scenarios describe user flows in business language.
					Playwright runs these across Chromium, Firefox, and Mobile Chrome. MSW provides
					deterministic data so tests never flake on external APIs.
				</p>
			</div>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			Each layer tests what the layer below cannot. Unit tests can't catch rendering bugs. Component
			tests can't catch navigation flows. E2E tests can't run fast enough to cover every edge case.
			The pyramid exists because no single layer is sufficient.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">E2E in the AI-assisted development era</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				There's an argument that the traditional pyramid shape is shifting. AI agents can generate
				E2E tests from Gherkin scenarios in seconds — the cost of writing them drops dramatically.
				More importantly, E2E tests are the only layer that validates the entire system end to end:
				the build, the deployment, the MF remote loading, the real browser behavior. When you're
				moving fast with AI-generated code, that full-system guarantee matters more than ever.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TESTING PYRAMID
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSTEST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PLAYWRIGHT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BDD
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TESTING-LIBRARY
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Fast at the bottom, thorough at the top. No layer replaces another.
		</p>
	</div>
);

export const theTestingPyramid: Slide = {
	title: "The Testing Pyramid",
	type: "diagram",
	diagram: `graph BT
    subgraph E2E["🔺 E2E — Playwright BDD\nSlow · Few · Expensive\n29 scenarios · 3 browsers\nFull system validation"]
        e["Given / When / Then\nReal browser · Real DOM\nMSW for deterministic data"]
    end

    subgraph COMP["🔶 Component — Rstest + testing-library\nMedium speed · Moderate count\nRenders in isolation"]
        c["render component\nassert output\ntest interactions"]
    end

    subgraph UNIT["🔷 Unit — Rstest\nFast · Many · Cheap\nMilliseconds · No DOM"]
        u["Pure functions\nZustand store transitions\nDomain logic helpers"]
    end

    UNIT -->|"can't catch rendering bugs"| COMP
    COMP -->|"can't catch navigation flows"| E2E`,
	Content,
};
