import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three layers of state, three clear owners — no overlap, no confusion.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			State management follows a strict hierarchy:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong>Global app state:</strong> Zustand 5, lives in Shell only. Example: Theme, locale,
				progress, mock mode
			</li>
			<li>
				<strong>UI local state:</strong> useState / useReducer, lives in UI-Components. Example:
				Input focus, dropdown open/closed, animation state
			</li>
			<li>
				<strong>Cross-component state:</strong> Context API, Provider in Shell / consumer in
				UI-Components. Example: Shared values that multiple components need simultaneously
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			The rules are simple: Zustand stores are created and read in Shell only. UI-Components never
			imports useProgressStore or any other store. UI-Components owns its own visual state — whether
			a dropdown is open, whether an input is focused. Context bridges the gap when props become
			unwieldy.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This works safely because Preact is a singleton across the Module Federation boundary. Context
			providers in Shell propagate to components loaded from UI-Components — there's no second
			Preact instance breaking the context chain.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZUSTAND
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				STATE MANAGEMENT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CONTEXT API
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SINGLETON
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Global state in Shell. Local state in components. Context when props aren't enough.
		</p>
	</div>
);

export const stateManagementRules: Slide = {
	title: "State Management Rules",
	type: "diagram",
	diagram: `graph TD
    subgraph GLOBAL["Global State — Shell only"]
        ZU["Zustand 5\\nAppStore · ProgressStore · MockStore\\nTheme · locale · progress · mock toggle"]
    end

    subgraph BRIDGE["Cross-boundary State — Context API"]
        CP["Context Provider\\nShell provides"]
        PREACT["🔑 Preact singleton\\nacross MF boundary"]
        CC["Context Consumer\\nUI-Components reads"]
        CP --> PREACT --> CC
    end

    subgraph LOCAL["Local State — UI-Components only"]
        US["useState / useReducer\\nInput focus · dropdown open\\nAnimation state · hover"]
    end

    ZU -->|"Shell reads store\\npasses as props or context"| CP

    style GLOBAL fill:#1e3a5f,color:#fff
    style BRIDGE fill:#3a2a00,color:#ffcc00
    style LOCAL fill:#1a3d2b,color:#fff
    style PREACT fill:#5f1e1e,color:#fff`,
	Content,
};
