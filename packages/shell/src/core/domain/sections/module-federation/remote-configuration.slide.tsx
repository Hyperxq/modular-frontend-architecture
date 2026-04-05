import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			UI-Components uses Rslib format: "mf" with auto-discovered entries and filenameHash: false
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Each component becomes its own MF-exposed chunk. filenameHash: false keeps chunk names stable
			— required for immutable CDN caching without cache-busting
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSLIB MF FORMAT
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AUTO-DISCOVERY
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				STABLE CHUNK NAMES
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">42</span>
				<span class="text-xs text-fg-secondary">Auto-exposed entries</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">0</span>
				<span class="text-xs text-fg-secondary">Manual registrations</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			filenameHash: false is intentional — version changes happen via URL path, not filename
		</p>
	</div>
);

export const remoteConfiguration: Slide = {
	title: "Remote Configuration",
	type: "diagram",
	diagram: "lib/components/**/*.tsx --[fast-glob]--> mf-manifest.json --[rslib mf]--> chunks",
	Content,
};
