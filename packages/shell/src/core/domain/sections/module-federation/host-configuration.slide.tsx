import type { FunctionalComponent } from "preact";

const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			One remote. Four shared singletons. That's the entire host configuration.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The host configuration lives in shell/module-federation.config.ts and declares two things:
		</p>
		<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
			<li>
				<strong>Where to find the remote:</strong> remotes: {"{ ui_components: `ui_components@$"}
				{"{" + "remoteUrl}/mf-manifest.json` }"}. The remote URL is resolved from environment
				variables — localhost:3001 in development, a CDN path in production. The host doesn't care
				where the remote lives physically.
			</li>
			<li>
				<strong>What to share as singletons:</strong> preact, preact/hooks, preact/compat, and
				preact/jsx-runtime — all with singleton: true, eager: true. This guarantees a single Preact
				instance across the Module Federation boundary.
			</li>
		</ul>
		<p class="text-fg-secondary text-base leading-relaxed">
			That's the entire host-side configuration. One remote declaration, four shared singletons, and
			a URL that changes per environment. Everything else — how components are discovered, how
			they're bundled, how they're exposed — is the remote's responsibility.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HOST CONFIGURATION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REMOTES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SHARED SINGLETONS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MF-MANIFEST
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			The host's job is to declare what it needs and trust the remote to provide it.
		</p>
	</div>
);

export default Content;
