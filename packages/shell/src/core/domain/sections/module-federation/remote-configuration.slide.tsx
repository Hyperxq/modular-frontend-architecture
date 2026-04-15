import type { FunctionalComponent } from "preact";

const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			There is no module-federation.config.ts in the remote. Rslib handles it declaratively.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			UI-Components has no separate Module Federation config file. The MF configuration is fully
			declarative through Rslib's format: "mf" output. Rslib takes care of everything:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong>Entry discovery</strong> — fast-glob scans the components/ directory and every .tsx
				file becomes an MF expose entry automatically. No manual exposes map.
			</li>
			<li>
				<strong>Manifest generation</strong> — Rslib produces an mf-manifest.json that maps each
				expose name to its chunk URL. The host reads this manifest at runtime.
			</li>
			<li>
				<strong>Chunk splitting</strong> — each component is its own chunk. The host loads only what
				it imports — if you only use Button, only Button's code is fetched.
			</li>
			<li>
				<strong>Shared dependencies</strong> — the remote declares the same singletons as the host.
				Module Federation resolves: "does the host already have Preact loaded? Yes → use the host's
				copy."
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			The result is zero-config component exposure: create a file, it's automatically an MF entry.
			Delete a file, it's automatically removed. Adding a new component is literally: create
			lib/components/atoms/NewThing/NewThing.tsx → done.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REMOTE CONFIGURATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RSLIB
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AUTO-DISCOVERY
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MF-MANIFEST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO CONFIG
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The remote's job is to expose components. Rslib makes that automatic.
		</p>
	</div>
);

export default Content;
