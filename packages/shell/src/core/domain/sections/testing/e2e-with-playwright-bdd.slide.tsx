import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Playwright BDD uses Gherkin feature files — scenarios are readable by non-engineers
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Feature files in automation_test/features/. Step definitions in automation_test/steps/. Zero
			backend dependency — MSW provides all data
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				GHERKIN
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PLAYWRIGHT
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO BACKEND
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">29</span>
				<span class="text-xs text-fg-secondary">Scenarios</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">3</span>
				<span class="text-xs text-fg-secondary">Browsers (Chromium/Firefox/WebKit)</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			BDD scenarios serve as living documentation — they describe behavior, not implementation
		</p>
	</div>
);

export const e2eWithPlaywrightBdd: Slide = {
	title: "E2E With Playwright BDD",
	type: "concept",
	Content,
};
