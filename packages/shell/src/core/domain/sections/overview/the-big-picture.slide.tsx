import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Three packages, one monorepo, zero ambiguity about who owns what.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			There's an apparent contradiction at the heart of this architecture: we use a monorepo to
			centralize — one place, one dependency tree, one developer experience — and micro-frontends to
			decentralize — independent builds, independent deployments, independent ownership. That
			tension is not a flaw. It's the whole point. You get the DX of a monolith and the scalability
			of distributed systems.
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong class="text-fg-primary">Shell</strong> — the host application. Owns all business
				logic, routing, authentication, state management, and orchestration. Runs on Rsbuild at port
				3002.
			</li>
			<li>
				<strong class="text-fg-primary">UI-Components</strong> — the remote library. Owns the visual
				layer — atoms, molecules, and organisms following Atomic Design. Runs on Rslib at port 3001
				and exposes components via Module Federation.
			</li>
			<li>
				<strong class="text-fg-primary">Shared</strong> — source-only utilities. No build step, no
				dist folder. Provides helpers like cn(), isLocalEnv(), types, and the Tailwind preset that
				keeps visual consistency across both packages.
			</li>
		</ul>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">Why the Rspack family</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				When we decided to use Module Federation, our first instinct was Vite — it's fast, modern,
				and widely adopted. But we hit a wall: Vite doesn't fully support Module Federation in
				development. That's what led us to the Rspack ecosystem. The Rspack team has been working
				closely with the Module Federation team, and it shows — the integration is first-class.
				Rsbuild, Rslib, and Rstest share the same engine, the same config API, and the same mental
				model. That consistency pays dividends every single day.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SHELL
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				UI-COMPONENTS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SHARED
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MONOREPO
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MODULE FEDERATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSPACK
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Shell thinks. UI-Components renders. Shared connects.
		</p>
	</div>
);

export const theBigPicture: Slide = {
	title: "The Big Picture",
	type: "diagram",
	diagram: `graph LR
    subgraph MONO["Monorepo — Bun + Nx"]
        direction LR

        subgraph SHELL["Shell · :3002 · Host"]
            s["Business Logic\\nRouting · Stores\\nAuth · Security"]
        end

        subgraph UIC["UI-Components · :3001 · Remote"]
            u["Atoms · Molecules · Organisms\\n(display only)"]
        end

        subgraph UICN["Remote N · :300X"]
            n["..."]
        end

        subgraph SHARED["Shared · no build · no dist"]
            sh["cn() · isLocalEnv()\\ntailwind-preset.css"]
        end
    end

    SHELL -->|"Module Federation — runtime"| UIC
    SHELL -.->|"Module Federation — runtime"| UICN
    SHELL -->|"source import — build time"| SHARED
    UIC -->|"source import — build time"| SHARED`,
	Content,
};
