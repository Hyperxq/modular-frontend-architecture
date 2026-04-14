import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three commands. That's all it takes to see the architecture running.
		</p>
		<pre class="text-xs font-mono bg-surface-container text-primary rounded p-3 leading-relaxed">{`git clone <repo-url>
bun install
bun run dev:mock`}</pre>
		<p class="text-fg-secondary text-sm leading-relaxed">
			Navigate to{" "}
			<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
				localhost:3002
			</code>
			. You're looking at the architecture.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">What to explore first</h4>
			<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
				<li>
					Open DevTools → Network tab. Filter by{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						localhost:3001
					</code>
					. Watch Module Federation fetch components at runtime from the remote.
				</li>
				<li>
					Open{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						packages/shell/src/core/
					</code>
					. See Clean Architecture in practice — domain, hooks, stores, router, features.
				</li>
				<li>
					Open{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						packages/libraries/ui-components/lib/components/
					</code>
					. See Atomic Design — atoms, molecules, organisms. Each component is pure display.
				</li>
				<li>
					Toggle mock mode. Watch the service worker intercept requests in real time. Disable it and
					watch the same requests hit the network.
				</li>
				<li>
					Run{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						bun run test
					</code>
					. See Rstest execute against the same build pipeline as production.
				</li>
				<li>
					Read{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						openspec/
					</code>
					. See the specs, proposals, and designs that produced every architectural decision.
				</li>
			</ol>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm text-fg-secondary border-collapse">
				<thead>
					<tr class="border-b border-outline-variant">
						<th class="text-left py-2 pr-4 font-semibold text-fg-primary">Service</th>
						<th class="text-left py-2 font-semibold text-fg-primary">Port</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-outline-variant">
						<td class="py-2 pr-4">UI-Components (MF Remote)</td>
						<td class="py-2 font-mono text-primary">3001</td>
					</tr>
					<tr>
						<td class="py-2 pr-4">Shell (Host App)</td>
						<td class="py-2 font-mono text-primary">3002</td>
					</tr>
				</tbody>
			</table>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				QUICK START
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				GETTING STARTED
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CLONE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				EXPLORE
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The codebase is the spec. Every slide maps to a file in{" "}
			<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded">
				packages/shell/src/core/domain/sections/
			</code>{" "}
			— start there.
		</p>
	</div>
);

export const startHere: Slide = {
	title: "Start Here",
	type: "concept",
	Content,
};
