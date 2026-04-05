import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Shell and UI-Components have independent CI pipelines — no coordinated deploy required
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Updating a UI component deploys only the remote. The host shell picks up the new version on
			next load via the URL-only coupling. Zero downtime, zero coordination
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				INDEPENDENT PIPELINES
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				URL COUPLING
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO COORDINATION
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">2</span>
				<span class="text-xs text-fg-secondary">Independent pipelines</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Coordinated deploys</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The URL is the contract — change the path to version, not the filename
		</p>
	</div>
);

export const independentDeploymentPerPackage: Slide = {
	title: "Independent Deployment Per Package",
	type: "concept",
	Content,
};
