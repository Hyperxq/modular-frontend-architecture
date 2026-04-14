import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			3KB instead of 40KB — and you keep the entire React API.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			We didn't start with Preact. We started with React — the obvious choice.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The assumption was that since all dependencies are declared as peerDependencies in
			UI-Components, the remote's output would be tiny: just the component functions, no framework
			code bundled. That assumption was wrong. React's production bundle carries its own weight
			regardless — and when we measured the output, the size was larger than expected for what
			should have been a near-empty library.
		</p>
		<p class="text-fg-secondary text-sm leading-relaxed">
			In a micro-frontend architecture, every remote loads its own bundle. If your UI framework
			weighs 40KB+ per remote, that cost multiplies with every micro-frontend you add. Preact
			changes the math.
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong class="text-fg-primary">3KB gzipped</strong> — compared to React's 40KB+. In an
				architecture where components are loaded on demand, this difference compounds.
			</li>
			<li>
				<strong class="text-fg-primary">Full React API via preact/compat</strong> — hooks, context,
				lazy, Suspense, refs. The ecosystem works: React Router, Zustand, TanStack Query,
				react-hook-form — all run on Preact without patches.
			</li>
			<li>
				<strong class="text-fg-primary">Singleton sharing via Module Federation</strong> — Preact is
				configured as <code class="font-mono text-primary">singleton: true</code> on both host and
				remote, so only one instance runs at runtime. Hooks work across the MF boundary. Context
				propagates. Events fire correctly.
			</li>
		</ul>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The tradeoff is honest: Preact doesn't have React's ecosystem breadth for edge cases, and some
			React libraries require minor adjustments. But for this architecture — where UI-Components are
			display-only and Shell handles all logic — Preact's API surface is more than sufficient.
		</p>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Preact gzipped</dt>
				<dd class="text-2xl font-bold text-primary m-0">3KB</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">React gzipped</dt>
				<dd class="text-2xl font-bold text-primary m-0">40KB+</dd>
			</div>
		</dl>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PREACT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BUNDLE SIZE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REACT COMPAT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SINGLETON
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The lightest runtime with the widest compatibility. That's the point.
		</p>
	</div>
);

export const whyPreact: Slide = {
	title: "Why Preact",
	type: "concept",
	Content,
};
