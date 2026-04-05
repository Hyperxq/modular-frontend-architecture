import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three lessons: load skills for latest APIs, use engram for memory across sessions, always
			understand before delegating
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Without skills, Claude uses stale training data for Rsbuild/Rstest/Preact APIs. Without
			engram, context resets every session. Without understanding, you cannot review diffs.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SKILLS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ENGRAM
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UNDERSTAND FIRST
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Critical lessons</dt>
				<dd class="text-2xl font-bold text-primary m-0">3</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Hours saved long-term</dt>
				<dd class="text-2xl font-bold text-primary m-0">∞</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			AI amplifies what you know. It cannot replace what you do not.
		</p>
	</div>
);

export const lessonsLearned: Slide = {
	title: "Lessons Learned",
	type: "concept",
	Content,
};
