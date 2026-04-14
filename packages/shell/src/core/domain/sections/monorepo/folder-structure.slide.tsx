import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			The folder structure should scream the architecture — not the framework.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This is Screaming Architecture — a term coined by Robert C. Martin. The idea is simple: when
			you look at the folder structure, it should tell you what the system does, not what framework
			it uses.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Each package is independently versioned with its own package.json. Cross-package imports use
			workspace aliases: <code class="font-mono text-primary">@modular-frontend/shell</code>,{" "}
			<code class="font-mono text-primary">@modular-frontend/ui-components</code>,{" "}
			<code class="font-mono text-primary">@modular-frontend/shared</code>.
		</p>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The root package.json defines Bun workspaces that discover all packages automatically. Mocks,
			tests, and automation live at the root because they serve the entire project — not a single
			package.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				FOLDER STRUCTURE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SCREAMING ARCHITECTURE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUN WORKSPACES
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			If you can't understand the project by reading the folder tree, the architecture has failed.
		</p>
	</div>
);

export const folderStructure: Slide = {
	title: "Folder Structure",
	type: "diagram",
	diagram: `graph TD
    ROOT["📁 modular-frontend-architecture"]

    ROOT --> PKG["📁 packages/"]
    ROOT --> MOCKS["📁 mocks/\\nMSW handlers — browser + Node"]
    ROOT --> AUTO["📁 automation_test/\\nPlaywright BDD · E2E"]
    ROOT --> TESTS["📁 tests/\\nrstest config"]
    ROOT --> OPEN["📁 openspec/\\nSDD specs + proposals"]

    PKG --> SH["📁 shell/ 🔵\\nRsbuild host · :3002\\nBusiness logic · Routing\\nZustand · Auth"]
    PKG --> LIB["📁 libraries/"]

    LIB --> UIC["📁 ui-components/ 🟢\\nRslib remote · :3001\\nAtomic Design components\\nDisplay only"]
    LIB --> SHARED["📁 shared/ ⚪\\nSource-only · no build\\ncn() · isLocalEnv()\\ntailwind-preset.css"]

    SH -->|"MF — runtime"| UIC
    SH -->|"source import"| SHARED
    UIC -->|"source import"| SHARED

    style SH fill:#1e3a5f,color:#fff
    style UIC fill:#1a3d2b,color:#fff
    style SHARED fill:#2a2a2a,color:#ccc`,
	Content,
};
