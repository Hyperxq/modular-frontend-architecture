import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Don't trust the documentation — open DevTools and see Module Federation working in real time.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The best way to understand Module Federation is to watch it happen. Open your browser's
			DevTools on this presentation and you'll see the architecture in action:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong>Network tab:</strong> Filter by localhost:3001. You'll see individual chunk requests
				for each component — Header, Sidebar, CenterPanel, NavArrows. Each one is a separate HTTP
				request to the remote server. The host didn't bundle these — it fetched them at runtime.
			</li>
			<li>
				<strong>Sources tab:</strong> Look for the ui_components source map group. You'll see the
				full component tree from the remote, organized by Atomic Design level. These files are
				served by a different dev server on a different port — but to your app, they look like local
				imports.
			</li>
			<li>
				<strong>mf-manifest.json:</strong> Navigate to localhost:3001/mf-manifest.json. This is the
				contract between host and remote — a JSON file that maps every exposed component to its
				chunk URL.
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			What you won't see: Preact loaded twice. No duplicate framework code. The singleton sharing
			configuration guarantees that the host's Preact instance is reused by every remote component.
			One instance, one hook tree, one context chain. This isn't a simulation — it's the
			architecture working exactly as designed.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEV TOOLS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				NETWORK TAB
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MF-MANIFEST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RUNTIME LOADING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LIVE DEMO
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The Network tab doesn't lie. If you see separate chunk requests, Module Federation is working.
		</p>
	</div>
);

export const seeItInDevTools: Slide = {
	title: "See It In Dev Tools",
	type: "concept",
	Content,
};
