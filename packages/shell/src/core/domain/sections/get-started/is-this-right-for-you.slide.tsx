import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Yes if: 3+ teams, independent deployments needed, brownfield migration. No if: solo project,
			startup, single team
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This architecture has a real complexity cost. It pays off at scale — when one team deploy
			cannot block another. Below 3 teams, the overhead outweighs the benefit
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				3+ TEAMS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				INDEPENDENT DEPLOYS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BROWNFIELD OK
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Minimum teams</dt>
				<dd class="text-2xl font-bold text-primary m-0">3+</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Team = too small</dt>
				<dd class="text-2xl font-bold text-primary m-0">1</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Use the simplest architecture that solves your actual problem
		</p>
	</div>
);

export const isThisRightForYou: Slide = {
	title: "Is This Right For You",
	type: "concept",
	Content,
};
