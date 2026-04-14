import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			One dependency tree. One set of tools. One place to search, refactor, and reason about your
			code.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The multi-repo setup we came from had a clear failure mode: four repositories meant four
			dependency trees, four CI pipelines, four places where things could drift apart — and they
			did, constantly.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			A monorepo solves this by putting everything under one roof:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong class="text-fg-primary">One dependency tree</strong> — when you upgrade Preact,
				every package gets the same version. No more "works in repo A but breaks in repo B."
			</li>
			<li>
				<strong class="text-fg-primary">Atomic commits</strong> — a change to a shared component and
				the shell that uses it lands in one commit, one PR, one review. No cross-repo coordination.
			</li>
			<li>
				<strong class="text-fg-primary">Shared tooling</strong> — one Biome config, one Tailwind
				preset, one set of git hooks. Consistency is automatic, not enforced by discipline.
			</li>
			<li>
				<strong class="text-fg-primary">Simplified onboarding</strong> — a new developer clones one
				repo, runs bun install, and has the entire system ready.
			</li>
		</ul>
		<p class="text-fg-secondary text-sm leading-relaxed">
			Monorepos work well for small to medium teams. If you have many teams working on the same
			product, splitting into multiple repositories with clear ownership boundaries is the better
			call. In our case, we had a single team of ten — a monorepo was the right fit.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MONOREPO
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEVELOPER EXPERIENCE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUN WORKSPACES
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The monorepo doesn't prevent bad architecture — it just removes the excuse of "it's in the
			other repo."
		</p>
	</div>
);

export const whyMonorepo: Slide = {
	title: "Why Monorepo",
	type: "concept",
	Content,
};
