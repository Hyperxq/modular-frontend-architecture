import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Rsbuild (app), Rslib (library), Rstest (tests) — one Rust-based toolchain across all layers
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			All three tools share the same @rspack/core version. Build, bundle, and test with a consistent
			config API
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSBUILD
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSLIB
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSTEST
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSPACK
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">5–10×</span>
				<span class="text-xs text-fg-secondary">Faster than webpack</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">1</span>
				<span class="text-xs text-fg-secondary">@rspack/core version</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Version alignment is critical — a mismatch causes binding crashes
		</p>
	</div>
);

export const theBundlerEcosystem: Slide = {
	title: "The Bundler Ecosystem",
	type: "concept",
	Content,
};
