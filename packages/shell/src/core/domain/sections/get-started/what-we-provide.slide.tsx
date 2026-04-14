import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			A working reference implementation today — schematics, MCP tools, and skills on the roadmap.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">What you get right now</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">A complete, cloneable reference implementation</strong> —
					not a starter template, not a boilerplate. A production-grade architecture with real
					patterns, real tests, and real deployment.
				</li>
				<li>
					<strong class="text-fg-primary">ARCHITECTURE_GUIDE.md</strong> — a comprehensive document
					covering every architectural decision, every configuration detail, and every tradeoff.
				</li>
				<li>
					<strong class="text-fg-primary">OpenSpec artifacts</strong> — the SDD specs, proposals,
					and design documents that produced this architecture. You can see not just what was built,
					but why each decision was made.
				</li>
				<li>
					<strong class="text-fg-primary">42 slides</strong> — this presentation itself, which is
					also the running example of the architecture.
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">What's coming</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">Schematics</strong> — generators to scaffold new MFE
					remotes following the established patterns
				</li>
				<li>
					<strong class="text-fg-primary">Claude Code MCP tools</strong> — specialized tools for
					working with this architecture in AI-assisted workflows
				</li>
				<li>
					<strong class="text-fg-primary">Skills for the full stack</strong> — instruction files
					that keep AI assistants updated on every technology in the stack
				</li>
			</ul>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			This is a living project. The architecture evolves, the documentation stays current, and the
			reference implementation reflects real-world usage — not a frozen snapshot.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REFERENCE IMPLEMENTATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DOCUMENTATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				OPENSPEC
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ROADMAP
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The codebase is the spec. The spec is in openspec/. Start with the code.
		</p>
	</div>
);

export const whatWeProvide: Slide = {
	title: "What We Provide",
	type: "concept",
	Content,
};
