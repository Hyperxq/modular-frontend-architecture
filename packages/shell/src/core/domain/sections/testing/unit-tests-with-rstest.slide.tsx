import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Same build pipeline as production. What you test is what you ship.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Rstest is an Rspack-native test runner that uses the same build pipeline as your production
			code. There's no separate Babel config, no esbuild transform, no "works in tests but fails in
			prod" scenarios.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">What gets tested</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">Domain logic:</strong> Pure function calls. Example:{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						addVisited({"{}"}, "intro", 0) → {"{ intro: [0] }"}
					</code>
				</li>
				<li>
					<strong class="text-fg-primary">Zustand stores:</strong>{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						act()
					</code>{" "}
					wrapper for state transitions. Example:{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						navigate("architecture", 2) → assert currentSectionId
					</code>
				</li>
				<li>
					<strong class="text-fg-primary">Components:</strong> @testing-library/preact render +
					assertions. Example: Render{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						{"<Button>"}
					</code>{" "}
					→ assert class, text, click handler
				</li>
				<li>
					<strong class="text-fg-primary">API mocking:</strong> MSW{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						setupServer()
					</code>{" "}
					in Node. Example: Handler returns mock data → component renders it
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">Key conventions</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					Import from{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						@rstest/core
					</code>{" "}
					— never from vitest or jest
				</li>
				<li>
					Render with{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						@testing-library/preact
					</code>{" "}
					— never from @testing-library/react
				</li>
				<li>Test pure helpers separately from stores — better isolation, faster feedback</li>
				<li>
					Use{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						act()
					</code>{" "}
					for any Zustand state mutation that triggers a re-render
				</li>
				<li>
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						MSW setupServer()
					</code>{" "}
					for API mocking — same handlers as browser mode
				</li>
			</ul>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The test configuration lives in{" "}
			<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
				tests/rstest.config.ts
			</code>
			. It uses jsdom as the test environment and loads MSW setup files automatically. One config,
			all packages.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSTEST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNIT TESTING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZUSTAND
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TESTING-LIBRARY
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MSW
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			If your test config differs from your build config, you're testing the wrong thing.
		</p>
	</div>
);

export const unitTestsWithRstest: Slide = {
	title: "Unit Tests With Rstest",
	type: "concept",
	Content,
};
