import type { SlideMeta } from "../types";

export const dataFlowMeta: SlideMeta = {
	title: "Data Flow",
	type: "diagram",
	diagram: `flowchart TD
    U(["👤 User\\nclick · key · swipe"])
    U --> R

    subgraph SHELL["Shell"]
        R["Router\\n(URL update)"]
        H["Hooks\\nuseNavigation · useKeyboard · useSwipe"]
        Z["Zustand Stores\\nAppStore · ProgressStore"]
        C["PresentationContainer\\n(composes data from hooks + stores)"]
        R --> H
        H --> Z
        Z --> C
    end

    C -->|"props / context values"| BOUNDARY

    BOUNDARY{{"── Module Federation boundary ──"}}

    BOUNDARY --> UI

    subgraph UICOMP["UI-Components"]
        UI["Header · Sidebar · CenterPanel\\nNavArrows · BottomBar\\n(receive props → return JSX)"]
    end

    UI --> DOM(["🖥️ DOM update"])

    CB["Shell-defined callbacks\\nonNext · onPrev · onSelect"]
    UI -.->|"calls callback prop"| CB
    CB -.->|"triggers state change"| Z`,
};
