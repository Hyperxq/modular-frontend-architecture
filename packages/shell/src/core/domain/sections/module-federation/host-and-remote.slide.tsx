import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			The host asks for a component. The remote serves it. The browser does the rest.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Module Federation works on a simple mental model: one application (the host) declares that it
			needs components from another application (the remote). At runtime — not at build time — the
			host fetches those components over HTTP and renders them as if they were local.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			In this architecture: Shell is the host (port 3002), declaring ui_components as its remote and
			lazy-loading components from it. UI-Components is the remote (port 3001), exposing every
			auto-discovered component via an mf-manifest.json that tells the host where each chunk lives.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The real use case isn't mixing frameworks — it's decoupling parts of your application so they
			can be developed, versioned, and deployed independently. The reference implementation uses two
			MFEs because that's the minimum viable setup to demonstrate the pattern end to end. Add a new
			remote, declare it in the host's remotes config, lazy-load its components — no structural
			changes required.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HOST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REMOTE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RUNTIME LOADING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MF-MANIFEST
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Two MFEs to teach the pattern. N MFEs to scale it.
		</p>
	</div>
);

export const hostAndRemote: Slide = {
	title: "Host And Remote",
	type: "diagram",
	diagram: `sequenceDiagram
    participant Dev as Developer
    participant Shell as Shell :3002
    participant Manifest as mf-manifest.json<br/>(:3001)
    participant Chunk as Component chunk<br/>(:3001/chunks/...)
    participant Browser as Browser DOM

    Note over Dev,Chunk: BUILD TIME
    Dev->>Shell: rslib build (ui-components first)
    Dev->>Manifest: generates mf-manifest.json

    Note over Shell,Browser: RUNTIME
    Browser->>Shell: loads app
    Shell->>Manifest: fetch mf-manifest.json
    Manifest-->>Shell: { exposes: { "./atoms/Button": "/chunks/Button.abc123.js" } }
    Shell->>Chunk: fetch chunk on demand<br/>(only when component is needed)
    Chunk-->>Shell: component module
    Shell->>Browser: render as if local import

    Note over Shell,Browser: Shell never bundled the remote.<br/>It fetched it.`,
	Content,
};
