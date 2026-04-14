import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			In production, the mock infrastructure doesn't exist — it's tree-shaken out of the bundle.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			A common concern with mock infrastructure: what's the production cost? In this architecture,
			the answer is zero.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The entire mock system is gated by the PUBLIC_ENABLE_MOCKING environment variable. In
			production builds, this variable is false, and the bundler does the rest:
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>The async bootstrap checks PUBLIC_ENABLE_MOCKING before importing any mock code</li>
			<li>Since the condition is statically false in production, the import is never reached</li>
			<li>Rspack's tree-shaking eliminates all mock-related code from the final bundle</li>
			<li>
				No service worker registration, no handler definitions, no MSW runtime — none of it ships
			</li>
		</ol>
		<p class="text-fg-secondary text-base leading-relaxed">
			This is possible because of the async bootstrap pattern: MSW must finish registering before
			the app renders, so the mock initialization is already wrapped in a conditional await. That
			same conditional becomes the dead-code elimination boundary in production.
		</p>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Mock code in production</dt>
				<dd class="text-2xl font-bold text-primary m-0">0 bytes</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Bundle size impact</dt>
				<dd class="text-2xl font-bold text-primary m-0">none</dd>
			</div>
		</dl>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TREE-SHAKING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PRODUCTION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO COST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEAD CODE ELIMINATION
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The cheapest code is the code that doesn't ship.
		</p>
	</div>
);

export const zeroCostInProduction: Slide = {
	title: "Zero Cost In Production",
	type: "diagram",
	diagram: `flowchart TD
    ENV{"PUBLIC_ENABLE_MOCKING\\n=== true?"}

    ENV -->|"yes — dev / mock"| A["await initMocking()\\nimport MSW worker\\nregister service worker\\nload all handlers"]

    ENV -->|"no — production"| B["skip\\n(nothing imported)"]

    A --> RENDER["render app"]
    B --> RENDER

    A --> BUNDLE_DEV["Dev bundle\\n✅ MSW runtime\\n✅ Service worker\\n✅ Handler definitions"]
    B --> BUNDLE_PROD["Prod bundle\\n❌ MSW — tree-shaken\\n❌ Service worker — not registered\\n❌ Handlers — eliminated\\n→ 0 bytes of mock code"]

    style B fill:#1a3d2b,color:#fff
    style BUNDLE_PROD fill:#1a3d2b,color:#fff
    style BUNDLE_DEV fill:#3a2a00,color:#ffcc00`,
	Content,
};
