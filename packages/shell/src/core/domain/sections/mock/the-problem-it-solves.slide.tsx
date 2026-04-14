import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Your frontend shouldn't wait for the backend to exist.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Every frontend team hits this wall eventually: the API isn't ready, the staging server is
			down, or the test environment returns inconsistent data. Development stops. Tests become
			flaky. Demos break at the worst possible moment.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Mock Mode solves this by intercepting HTTP requests at the network level using MSW (Mock
			Service Worker) v2. A service worker sits between your fetch() calls and the network,
			returning mock responses before the request ever leaves the browser.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The critical design decision: your app doesn't know it's mocked. There's no if (isMock) check
			in your components. No mock-specific code paths. No test-only API clients. The same code runs
			against mock data in development and real data in production — the only difference is whether
			the service worker is active. Handlers live in mocks/, intercepting fetch/XHR before they
			reach the network.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MSW
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MOCK MODE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SERVICE WORKER
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NETWORK INTERCEPTION
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The best mock is one your code doesn't know exists.
		</p>
	</div>
);

export const theProblemItSolves: Slide = {
	title: "The Problem It Solves",
	type: "concept",
	Content,
};
