import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Rstest uses the same Rspack pipeline as production — no Babel, no Jest, no config divergence
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Import from @rstest/core (not vitest or jest). Render with @testing-library/preact (not
			@testing-library/react). The test environment matches the build environment exactly
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				@RSTEST/CORE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TESTING-LIBRARY/PREACT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SAME PIPELINE
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Build pipeline for tests + prod</dt>
				<dd class="text-2xl font-bold text-primary m-0">1</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Separate test transpilers</dt>
				<dd class="text-2xl font-bold text-primary m-0">0</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Test configuration drift is the most common source of false green tests
		</p>
	</div>
);

export const unitTestsWithRstest: Slide = {
	title: "Unit Tests With Rstest",
	type: "concept",
	Content,
};
