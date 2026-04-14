import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			One mock infrastructure. Four completely different use cases.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The same MSW handlers serve four distinct scenarios:
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>
				<strong>Frontend development without backend:</strong> The API team is still building
				endpoints? Start developing today. Mock handlers return realistic data structures that match
				the API contract. When the real endpoints are ready, you remove the mock — your code doesn't
				change.
			</li>
			<li>
				<strong>Bug reproduction:</strong> A user reports a bug that only happens with a specific
				API response — an edge case payload, a 500 error, a timeout, an empty array where you
				expected data. Write a mock handler that returns that specific response. See the bug, debug
				it, fix it, and write a test — all without touching the backend. Mock mode turns "it works
				on my machine" into "I can reproduce it in 30 seconds."
			</li>
			<li>
				<strong>Deterministic E2E testing:</strong> Playwright tests need consistent data to produce
				reliable results. External APIs are flaky — timeouts, rate limits, changing data. MSW
				handlers return the exact same response every time. 29 scenarios across 3 browsers, all
				deterministic.
			</li>
			<li>
				<strong>Interactive demos:</strong> You're presenting to stakeholders and there's no
				deployed backend available. Mock mode gives you a fully functional application with
				realistic data — no infrastructure required. This presentation you're watching right now can
				run in mock mode.
			</li>
		</ol>
		<p class="text-fg-secondary text-base leading-relaxed">
			The key: the same handler definitions work in all four scenarios. Browser service workers for
			development, debugging, and demos. Node request interceptors for tests. Write the handler
			once, use it everywhere.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				USE CASES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEVELOPMENT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUG REPRODUCTION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TESTING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEMOS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MSW
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Same handlers, four use cases, zero duplication.
		</p>
	</div>
);

export const fourScenarios: Slide = {
	title: "Four Scenarios",
	type: "concept",
	Content,
};
