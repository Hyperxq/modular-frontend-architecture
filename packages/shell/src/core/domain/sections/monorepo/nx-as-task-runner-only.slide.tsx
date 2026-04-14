import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Nx runs your tasks. It doesn't own your project.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Nx is used strictly as a task orchestrator — no generators, no plugins for code scaffolding,
			no framework-specific wrappers. It does three things:
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>
				<strong class="text-fg-primary">Dependency-aware ordering</strong> —{" "}
				<code class="font-mono text-primary">bun run dev</code> starts UI-Components first (port
				3001), then Shell (port 3002), because the host needs the remote running to resolve Module
				Federation manifests.
			</li>
			<li>
				<strong class="text-fg-primary">Parallel execution</strong> — lint, format, and test
				commands run across all packages simultaneously, with a configurable concurrency limit.
			</li>
			<li>
				<strong class="text-fg-primary">Build caching</strong> — tasks that haven't changed since
				the last run are skipped. This matters as the number of packages grows.
			</li>
		</ol>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">Key commands</h4>
			<ul class="flex flex-col gap-1 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<code class="font-mono text-primary">bun run dev</code> → starts both dev servers in
					order, streaming output
				</li>
				<li>
					<code class="font-mono text-primary">bun run test</code> → runs Rstest across all packages
				</li>
				<li>
					<code class="font-mono text-primary">bun run lint:fix</code> → lints all packages in
					parallel via Biome
				</li>
				<li>
					<code class="font-mono text-primary">bun run e2e</code> → starts servers, generates BDD
					steps, runs Playwright
				</li>
			</ul>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The intentional constraint is important: Nx is a task runner, not a framework. The moment you
			let a tool own your project structure, you're locked into its opinions.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NX
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TASK RUNNER
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ORCHESTRATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CACHING
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Tools should serve your architecture, not the other way around.
		</p>
	</div>
);

export const nxAsTaskRunnerOnly: Slide = {
	title: "Nx As Task Runner Only",
	type: "concept",
	Content,
};
