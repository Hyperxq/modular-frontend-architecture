import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			This isn't a slide deck about architecture — it IS the architecture.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			What you're looking at right now is the implementation itself. This presentation app is built
			with the exact patterns it teaches:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				The Header, Sidebar, CenterPanel, and NavArrows you see on screen are Atomic Design
				components living in ui-components, loaded at runtime via Module Federation.
			</li>
			<li>
				The navigation logic, keyboard shortcuts, and slide progress tracking are handled by Zustand
				stores and custom hooks living in shell.
			</li>
			<li>
				The Mock Mode demo you'll see later uses the same MSW infrastructure that the development
				team uses daily.
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			Every concept — Clean Architecture, Container/Presentational pattern, auto-discovery,
			singleton sharing — is demonstrated in the codebase you can clone, run, and inspect.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This is not a proof of concept. This is not a toy example. This is a production-grade
			reference implementation that teaches by being.
		</p>
		<p class="text-fg-secondary text-sm leading-relaxed">
			If you want to see Module Federation in action right now, open DevTools → Network tab and
			filter by <code class="font-mono text-primary">mf-manifest.json</code>. You'll see the shell
			fetching the remote manifest, then loading individual component chunks on demand as you
			navigate. That's the architecture — not as a diagram, but as live HTTP traffic.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REFERENCE IMPLEMENTATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DOGFOODING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LEARN BY DOING
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Clone it. Run it. Break it. That's how you learn.
		</p>
	</div>
);

export const thisWebsiteIsTheExample: Slide = {
	title: "This Website Is The Example",
	type: "concept",
	Content,
};
