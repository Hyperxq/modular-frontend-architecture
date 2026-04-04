import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Five top-level directories, each with a single clear responsibility
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			shell/ owns the host app. libraries/ owns shared code. mocks/ owns MSW handlers.
			automation_test/ owns E2E. openspec/ owns architecture specs
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SHELL
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LIBRARIES
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MOCKS
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AUTOMATION_TEST
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				OPENSPEC
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">3</span>
				<span class="text-xs text-fg-secondary">Deployable packages</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1</span>
				<span class="text-xs text-fg-secondary">Shared node_modules</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Flat structure beats deep nesting for discoverability
		</p>
	</div>
);

export const folderStructure: Slide = {
	title: "Folder Structure",
	type: "concept",
	Content,
};
