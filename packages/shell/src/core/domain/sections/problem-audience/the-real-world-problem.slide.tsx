import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			The hardest constraint isn't the new system — it's the one already running in production.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			When you start researching micro-frontends or architectures designed to survive the passing of
			time, you quickly run into three real problems:
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>
				<strong class="text-fg-primary">Developer experience collapses at scale.</strong> Multiple
				micro-frontends across multiple repositories means fragmented tooling, inconsistent
				dependency versions, and a painful inner loop for every developer on the team.
			</li>
			<li>
				<strong class="text-fg-primary">Sharing resources is a double-edged sword.</strong> If you
				don't share reusable code, you end up with duplication everywhere — a debt that future-you
				will pay for. But if you do share, you need to guarantee that every micro-frontend can
				access those shared resources reliably.
			</li>
			<li>
				<strong class="text-fg-primary">
					Communication between components has to be bidirectional.
				</strong>{" "}
				Data flows down, events flow up — and the boundary between host and remote must support both
				directions cleanly.
			</li>
		</ol>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">The answer</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				We needed two things that seem contradictory: a unified developer experience — everything in
				one place, easy to maintain, easy to navigate — and independent deployment — everything
				split into small pieces, loaded on demand, consumed by multiple targets. The monorepo
				improves the developer experience. Micro-frontends allow us to split that unified experience
				into small, independent pieces. That's why we chose a monorepo with micro-frontends powered
				by Module Federation.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MICRO-FRONTENDS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MONOREPO
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEVELOPER EXPERIENCE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BROWNFIELD
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Greenfield is easy. Brownfield is where architecture is tested.
		</p>
	</div>
);

export const theRealWorldProblem: Slide = {
	title: "The Real World Problem",
	type: "concept",
	Content,
};
