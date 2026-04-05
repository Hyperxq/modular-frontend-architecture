import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three usage modes: unit tests (full mock), E2E tests (full mock), local dev (hybrid mode)
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Unit tests use msw/node setupServer. E2E uses the same handlers via Playwright. Local dev runs
			the browser service worker with selective bypass
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIT TESTS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				E2E TESTS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LOCAL DEV
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1 handler set</span>
				<span class="text-xs text-fg-secondary">Reused across all 3</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Duplicate mock code</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Write handlers once, use everywhere — the same file serves all three scenarios
		</p>
	</div>
);

export const threeScenarios: Slide = {
	title: "Three Scenarios",
	type: "concept",
	Content,
};
