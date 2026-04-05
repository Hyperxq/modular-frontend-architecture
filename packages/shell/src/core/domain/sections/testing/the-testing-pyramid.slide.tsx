import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three layers: unit (Rstest), component (testing-library/preact), E2E (Playwright BDD across 3
			browsers)
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Unit tests cover pure logic. Component tests render with testing-library. E2E runs full user
			journeys with Gherkin scenarios in Chromium, Firefox, and WebKit
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				COMPONENT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				E2E
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">E2E scenarios</dt>
				<dd class="text-2xl font-bold text-primary m-0">29</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Browser engines</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Every layer has a different feedback speed — unit is under 1s, E2E is minutes
		</p>
	</div>
);

export const theTestingPyramid: Slide = {
	title: "The Testing Pyramid",
	type: "concept",
	Content,
};
