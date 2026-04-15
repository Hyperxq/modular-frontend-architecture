import type { SlideMeta } from "../types";

export const cleanArchitectureInTheShellMeta: SlideMeta = {
	title: "Clean Architecture In The Shell",
	type: "diagram",
	diagram: `graph TD
    subgraph SHELL["Shell — Clean Architecture"]
        F["features/\\nVertical slices\\nPresentationContainer · MockDemoContainer\\n(composition layer)"]
        ST["core/store/\\nZustand stores\\nAppStore · ProgressStore · MockStore\\n(state ports)"]
        H["core/hooks/\\nuseNavigation · useKeyboard · useSwipe\\n(framework adapters)"]
        D["core/domain/\\nSection definitions · Slide models\\nPure functions — zero framework imports\\n(business logic)"]

        F --> ST
        F --> H
        ST --> D
        H --> D
    end

    NOTE["✅ domain/ has zero imports from\\nPreact · Zustand · React Router\\nSwap the framework → domain survives"]

    D --- NOTE

    style D fill:#1a3d2b,color:#fff
    style NOTE fill:#1e3a5f,color:#fff`,
};
