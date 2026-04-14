import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Business-readable scenarios that run across three browsers — that's E2E done right.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			E2E tests use Playwright with Cucumber BDD. Tests are written in Gherkin — a structured
			language that stakeholders can read.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">Example scenario</h4>
			<pre class="text-xs font-mono bg-surface-container text-primary rounded p-3 leading-relaxed overflow-x-auto whitespace-pre-wrap">{`Given I am on slide 'intro' at index 0
When I click the next arrow
Then the URL should contain '/intro/1'
And the slide title should be 'Structural Analysis'
And the previous button should be enabled`}</pre>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			Feature files live in{" "}
			<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
				automation_test/features/
			</code>
			. Step definitions in{" "}
			<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
				automation_test/steps/
			</code>
			. MSW handles all data — no real backend required.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">Browser matrix</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">Chromium</strong> — Desktop Chrome
				</li>
				<li>
					<strong class="text-fg-primary">Firefox</strong> — Desktop Firefox
				</li>
				<li>
					<strong class="text-fg-primary">Mobile Chrome</strong> — Pixel 5 viewport
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">How it runs</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
					bun run e2e
				</code>{" "}
				orchestrates the full pipeline via Nx: start UI-Components (port 3001), start Shell (port
				3002), generate BDD step definitions, run Playwright across all browser profiles.
				Screenshots on failure, video on retry, HTML + Cucumber reporters for debugging.
			</p>
		</div>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Scenarios</dt>
				<dd class="text-2xl font-bold text-primary m-0">29</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Browsers</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
		</dl>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PLAYWRIGHT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CUCUMBER
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BDD
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				GHERKIN
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CROSS-BROWSER
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				E2E
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			If a stakeholder can read the test, a stakeholder can trust the test.
		</p>
	</div>
);

export const e2eWithPlaywrightBdd: Slide = {
	title: "E2E With Playwright BDD",
	type: "concept",
	Content,
};
