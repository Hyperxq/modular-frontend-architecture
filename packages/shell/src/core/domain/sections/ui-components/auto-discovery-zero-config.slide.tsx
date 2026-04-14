import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Create the file. It's automatically exposed. Zero manual registration.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			One of the most common sources of friction in component libraries is the registration step:
			you create a component, then you have to add it to a barrel file, update an export map, or
			register it in a config. Forget that step and the component exists but isn't consumable.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This architecture eliminates that entirely with fast-glob auto-discovery:
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>You create lib/components/atoms/MyComponent/MyComponent.tsx</li>
			<li>At build time, fast-glob scans the components/ directory and finds every .tsx file</li>
			<li>Each file is automatically registered as a Module Federation expose entry</li>
			<li>
				Shell can immediately import it: import MyComponent from
				"ui_components/atoms/MyComponent/MyComponent"
			</li>
		</ol>
		<p class="text-fg-secondary text-base leading-relaxed">
			The LEVEL_MODE environment variable controls how deep the auto-discovery goes: LEVEL_MODE=1
			compiles atoms only; LEVEL_MODE=2 adds molecules; LEVEL_MODE=3 adds organisms (default). This
			compiles the entire level — not individual components. It's a scope filter, not a selective
			build.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AUTO-DISCOVERY
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				FAST-GLOB
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO CONFIG
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LEVEL_MODE
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The best registration system is no registration system.
		</p>
	</div>
);

export const autoDiscoveryZeroConfig: Slide = {
	title: "Auto-Discovery Zero Config",
	type: "diagram",
	diagram: `flowchart LR
    DEV["👨‍💻 Developer\\ncreates\\nButton.tsx"]
    FG["fast-glob\\nscans lib/components/**/*.tsx\\nat build time"]
    PE["pluginEntries()\\ngenerates entry points\\nper component"]
    PX["pluginExposes()\\ngenerates MF exposes\\n./atoms/Button/Button"]
    MF["mf-manifest.json\\nmaps expose → chunk URL"]
    SH["Shell\\nimport Button from\\n'ui_components/atoms/Button/Button'"]

    DEV -->|"write the file"| FG
    FG -->|"auto-discovers"| PE
    PE -->|"auto-registers"| PX
    PX -->|"auto-generates"| MF
    MF -->|"resolved at runtime"| SH

    SKIP["❌ No barrel file\\n❌ No manual exposes config\\n❌ No registration step"]

    FG --- SKIP

    style SKIP fill:#5f1e1e,color:#fff
    style DEV fill:#1e3a5f,color:#fff
    style SH fill:#1a3d2b,color:#fff`,
	Content,
};
