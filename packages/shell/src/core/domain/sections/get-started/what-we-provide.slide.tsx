import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Coming soon: Nx schematics, Claude Code MCP tools, and skills for the full stack
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Schematics generate new packages pre-configured for this architecture. MCP tools let Claude
			navigate the codebase with full context. Skills encode the latest API patterns
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SCHEMATICS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MCP TOOLS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SKILLS
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">3</span>
				<span class="text-xs text-fg-secondary">Coming soon features</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Configuration needed</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The goal is a one-command project bootstrap — watch this repo
		</p>
	</div>
);

export const whatWeProvide: Slide = {
	title: "What We Provide",
	type: "concept",
	Content,
};
