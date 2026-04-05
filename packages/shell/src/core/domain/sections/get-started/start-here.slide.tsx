import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Clone the repo, run bun run dev:mock, and read the code — it is the documentation
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			git clone → bun install → bun run dev:mock. Navigate to :3002. Every slide maps to a file in
			packages/shell/src/core/domain/sections/
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CLONE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUN RUN DEV:MOCK
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				READ THE CODE
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Setup commands</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Start here</dt>
				<dd class="text-2xl font-bold text-primary m-0">:3002</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The codebase is the spec. The spec is in openspec/. Start with the code
		</p>
	</div>
);

export const startHere: Slide = {
	title: "Start Here",
	type: "concept",
	Content,
};
