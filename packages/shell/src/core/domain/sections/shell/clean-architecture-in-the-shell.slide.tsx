import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			The shell follows Clean Architecture — domain logic doesn't know it's inside a micro-frontend.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The shell's internal structure is layered, inspired by Clean Architecture and Screaming
			Architecture:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong>core/domain/</strong> — pure business logic. Section definitions, slide data models,
				helper functions. No framework imports, no side effects. Testable with plain function calls.
			</li>
			<li>
				<strong>core/hooks/</strong> — application adapters. useNavigation handles boundary
				detection and slide transitions. useKeyboard binds shortcuts. These hooks translate domain
				logic into framework interactions.
			</li>
			<li>
				<strong>core/store/</strong> — state ports. Zustand stores for app state, progress tracking,
				and mock mode control. Each store uses devtools for Redux DevTools and persist for
				localStorage.
			</li>
			<li>
				<strong>core/router/</strong> — routing configuration. React Router route definitions and
				guards.
			</li>
			<li>
				<strong>features/</strong> — vertical slices. Each feature module (presentation, mock-demo)
				has its own container component and data composition hook.
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			The key insight: the domain/ layer has zero imports from Preact, Zustand, or any framework. If
			you swapped the UI framework tomorrow, the domain logic would survive unchanged. That's not
			theoretical — it's how Clean Architecture is supposed to work.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CLEAN ARCHITECTURE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SCREAMING ARCHITECTURE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DOMAIN LOGIC
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SEPARATION OF CONCERNS
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			If your business logic imports your framework, you don't have architecture — you have
			coupling.
		</p>
	</div>
);

export const cleanArchitectureInTheShell: Slide = {
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
	Content,
};
