import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Ten hard-won lessons from building a production architecture with AI.
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>
				<strong class="text-fg-primary">Preact singleton sharing is non-negotiable.</strong>{" "}
				Misconfigure it and everything breaks silently — no error messages, just impossible
				behavior.
			</li>
			<li>
				<strong class="text-fg-primary">Async bootstrap for MSW.</strong> The service worker MUST
				register before the first render. Skip the{" "}
				<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
					await
				</code>{" "}
				and early requests bypass the mock.
			</li>
			<li>
				<strong class="text-fg-primary">assetPrefix on MF remote is mandatory.</strong> Without it,
				chunk URLs resolve to the root domain, returning 404 HTML pages that trigger MIME type
				errors.
			</li>
			<li>
				<strong class="text-fg-primary">Auto-discovery over manual registration.</strong> fast-glob
				eliminates the entire category of "forgot to register the component" bugs.
			</li>
			<li>
				<strong class="text-fg-primary">Source-only shared packages.</strong> No build step, no{" "}
				<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
					dist/
				</code>{" "}
				folder. Just import from source. One less build to maintain, one less thing to break.
			</li>
			<li>
				<strong class="text-fg-primary">Domain-grouped mock handlers.</strong> Organize by API
				domain (
				<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
					users.mock.ts
				</code>
				), not by HTTP method. Makes it trivial to mock or unmock an entire resource.
			</li>
			<li>
				<strong class="text-fg-primary">127.0.0.1 over localhost in WSL2.</strong> IPv6 resolution
				issues cause phantom connection failures that waste hours to debug.
			</li>
			<li>
				<strong class="text-fg-primary">Phantom dependencies break CI.</strong> Packages that work
				locally via hoisting fail in CI with strict resolution. Declare every dependency explicitly.
			</li>
			<li>
				<strong class="text-fg-primary">Skills keep AI updated.</strong> Without skill files, AI
				falls back to training data — which means deprecated APIs, old patterns, and subtle bugs.
			</li>
			<li>
				<strong class="text-fg-primary">AI is Tony Stark's suit, not Tony Stark.</strong> You must
				know the architecture to direct the AI. If you can't explain why a decision was made, you
				shouldn't be making it — AI or not.
			</li>
		</ol>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">
				The one lesson that ties everything together
			</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				The most important thing I learned — not from Claude, but from Pavel, who was the kind of
				sensei you don't forget — is this: <strong class="text-fg-primary">iterate</strong>. Don't
				try to get it perfect on the first attempt. Create the foundations. Make them solid. Then
				loop — review, refine, improve — until it feels done. And think as a software craftsman:
				someone who cares about the quality of what they build, not just that it ships.
			</p>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Every lesson on this list came from an iteration. The architecture you're looking at isn't
				the first version. It's the version that survived the loop.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LESSONS LEARNED
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				GOTCHAS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PRODUCTION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				EXPERIENCE
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Every lesson on this list cost us hours. Now it costs you a slide.
		</p>
	</div>
);

export const lessonsLearned: Slide = {
	title: "Lessons Learned",
	type: "concept",
	Content,
};
