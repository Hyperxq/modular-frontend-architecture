import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			This architecture has a real complexity cost. Make sure the problem justifies the solution.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Before you adopt this architecture, be honest about whether you need it.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">When TO use it</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>3+ teams that need to deploy features independently without blocking each other</li>
				<li>
					Applications with clear domain boundaries — dashboard, settings, admin, each owned by a
					different team
				</li>
				<li>Runtime composition — different parts of the app update at different cadences</li>
				<li>
					Brownfield migration — you need to serve components to both new and legacy systems
					simultaneously
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">When NOT to use it</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">Small teams (1-3 devs)</strong> — the overhead of Module
					Federation, separate builds, and monorepo tooling isn't justified. A single Rsbuild app is
					simpler and faster.
				</li>
				<li>
					<strong class="text-fg-primary">Simple applications</strong> — if your app has 5-10 pages
					and one team, micro-frontends add complexity with no benefit.
				</li>
				<li>
					<strong class="text-fg-primary">Tight deadlines</strong> — setting up this infrastructure
					takes real time upfront. If you need to ship in 2 weeks, use a monolith.
				</li>
				<li>
					<strong class="text-fg-primary">Teams without bundler knowledge</strong> — Module
					Federation requires understanding Rspack/Webpack internals. Misconfigured singleton
					sharing produces cryptic runtime errors.
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">The honest assessment</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				For most projects, a well-structured monolith with good folder conventions achieves 80% of
				the benefits with 20% of the complexity. This architecture is worth it when the
				organizational benefit of independent deployment and team autonomy outweighs the technical
				overhead.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TRADEOFFS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				WHEN TO USE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				WHEN NOT TO USE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HONEST ASSESSMENT
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The best architecture is the one that solves your actual problem — not the most impressive
			one.
		</p>
	</div>
);

export const isThisRightForYou: Slide = {
	title: "Is This Right For You",
	type: "concept",
	Content,
};
