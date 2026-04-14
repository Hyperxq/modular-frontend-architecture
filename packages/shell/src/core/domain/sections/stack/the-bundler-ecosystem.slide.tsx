import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			All three tools share the same @rspack/core version — one config API from build to test.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The entire build pipeline runs on the Rspack ecosystem — a Rust-based, Webpack-compatible
			bundler family that's 5-10x faster than Webpack:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong class="text-fg-primary">Rsbuild</strong> — builds the Shell (host app). Think of it
				as Webpack + webpack-dev-server + html-webpack-plugin, but with zero boilerplate and Rust
				speed.
			</li>
			<li>
				<strong class="text-fg-primary">Rslib</strong> — builds UI-Components (library). It's
				Rsbuild adapted for library output: ESM, Module Federation, and Web Components — all from
				the same config.
			</li>
			<li>
				<strong class="text-fg-primary">Rstest</strong> — runs unit tests. It uses the same Rspack
				build pipeline as production, so there's no separate Babel or esbuild config for tests. What
				you test is what you ship.
			</li>
		</ul>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The critical detail: all three tools share the same{" "}
			<code class="font-mono text-primary">@rspack/core</code> version. This isn't optional — if
			they diverge, you get native binding mismatches and SWC plugin ABI errors that no JavaScript
			shim can fix. One version, enforced via overrides in the root package.json.
		</p>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Build speed vs Webpack</dt>
				<dd class="text-2xl font-bold text-primary m-0">5-10x</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Config files per tool</dt>
				<dd class="text-2xl font-bold text-primary m-0">1</dd>
			</div>
		</dl>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSPACK
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSBUILD
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSLIB
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSTEST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUNDLER
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Same engine from dev to test to production. No config translation, no surprises.
		</p>
	</div>
);

export const theBundlerEcosystem: Slide = {
	title: "The Bundler Ecosystem",
	type: "diagram",
	diagram: `graph TD
    LOCK["🔒 root package.json overrides\\n@rspack/core pinned to one version\\n@rsbuild/core pinned to one version"]

    LOCK --> RB["Rsbuild\\nbuilds Shell · host app\\ndev server · HMR · HTML"]
    LOCK --> RL["Rslib\\nbuilds UI-Components · remote\\nESM · MF · Web Components"]
    LOCK --> RT["Rstest\\nruns unit tests\\nsame build pipeline as prod"]

    RB -->|"same engine"| CORE["@rspack/core\\n(Rust native binary)"]
    RL -->|"same engine"| CORE
    RT -->|"same engine"| CORE

    CORE --> OK["✅ One version → consistent behavior\\ndev = test = production"]

    DIV["❌ Version mismatch →\\nnative binary ABI error\\nSWC plugin crash\\ncryptic runtime failure"]

    CORE -.->|"if versions diverge"| DIV

    style LOCK fill:#1a3d2b,color:#fff
    style OK fill:#1a3d2b,color:#fff
    style DIV fill:#5f1e1e,color:#fff`,
	Content,
};
