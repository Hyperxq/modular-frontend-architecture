import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			If Preact isn't a singleton, everything breaks — silently.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This is the single most important configuration detail in the entire architecture. Get it
			wrong and you won't get an error message — you'll get behavior that makes no sense.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			When Module Federation loads a remote component, it needs to decide: should this remote use
			its own copy of Preact, or should it share the host's copy? The answer must be: always share
			the host's copy. One Preact instance. One hook state tree. One context chain.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Without singleton: true — two Preact instances load, hooks maintain separate state trees,
			useState in a remote component creates state in the wrong Preact instance, useContext returns
			undefined across the MF boundary, and event handlers silently fail.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The fix is declarative — both host and remote must declare the same shared config: preact,
			preact/hooks, preact/compat, preact/jsx-runtime — all with singleton: true, eager: true. The
			eager flag means the host loads Preact immediately instead of waiting for the first remote to
			request it, preventing a race condition at render time.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This is non-negotiable. There's no workaround, no alternative configuration. If you're using
			Module Federation with any UI framework, the framework MUST be a singleton.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SINGLETON
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PREACT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SHARED DEPENDENCIES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CRITICAL
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Singleton sharing isn't an optimization — it's a correctness requirement.
		</p>
	</div>
);

export const theSingletonRule: Slide = {
	title: "The Singleton Rule",
	type: "concept",
	Content,
};
