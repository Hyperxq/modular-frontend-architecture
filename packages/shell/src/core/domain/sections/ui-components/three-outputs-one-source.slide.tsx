import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Write once, distribute three ways — Module Federation, Import Maps, Web Components.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The same Atomic Design components produce three independent outputs from a single source:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong>Module Federation (Active)</strong> — the primary output. Rslib builds each
				component as an MF expose entry. Shell consumes them at runtime via the mf-manifest.json.
				Full HMR, TypeScript types across the boundary, and runtime loading with zero package
				publishing.
			</li>
			<li>
				<strong>Import Maps (Ready)</strong> — native browser ESM imports via{" "}
				{'<script type="importmap">'}. Components are served from a CDN with explicit URL mappings.
				No bundler required by the consumer — any HTML page can import components directly.
			</li>
			<li>
				<strong>Web Components (Ready)</strong> — framework-agnostic custom elements via
				@r2wc/react-to-web-component. Any HTML page can use {'<my-button variant="primary">'}{" "}
				without knowing Preact exists. The escape hatch for legacy systems and CMS integrations.
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			Why this matters: real migrations don't start from zero. The new app uses Module Federation.
			The legacy CMS pages use Import Maps or Web Components. The same component library serves all
			of them — no forks, no duplicated code, no synchronization headaches.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				IMPORT MAPS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				WEB COMPONENTS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DISTRIBUTION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BROWNFIELD
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			One component library. Three consumption models. Zero code duplication.
		</p>
	</div>
);

export const threeOutputsOneSource: Slide = {
	title: "Three Outputs One Source",
	type: "diagram",
	diagram: `graph LR
    SRC["📦 ui-components\\nRslib source\\nAtomic Design components\\n(one codebase)"]

    SRC -->|"format: 'mf'\\nmf-manifest.json"| MF["Module Federation\\n🟢 Active\\nShell lazy-imports at runtime\\nFull HMR · TypeScript types\\nbest DX"]

    SRC -->|"format: 'esm'\\nCDN URL"| IM["Import Maps\\n🟡 Ready\\nAny HTML page\\nno bundler required\\n<script type='importmap'>"]

    SRC -->|"@r2wc/react-to-web-component\\ncustom elements"| WC["Web Components\\n🟡 Ready\\nLegacy CMS · any framework\\n<my-button variant='primary'>\\nno Preact knowledge needed"]

    style SRC fill:#1e3a5f,color:#fff
    style MF fill:#1a3d2b,color:#fff
    style IM fill:#3a3a00,color:#ffff99
    style WC fill:#3a3a00,color:#ffff99`,
	Content,
};
