import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Not every project needs AWS. Sometimes GitHub Pages is exactly enough.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			For open-source projects, demos, or small teams that don't need CDN-level control, GitHub
			Pages provides a zero-cost deployment path.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">What you get</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">Free hosting</strong> — no infrastructure costs for public
					repositories
				</li>
				<li>
					<strong class="text-fg-primary">Automatic deploys</strong> — GitHub Actions builds and
					deploys on every push to main
				</li>
				<li>
					<strong class="text-fg-primary">Preview deploys</strong> — each PR gets its own preview
					URL
				</li>
				<li>
					<strong class="text-fg-primary">Custom domains</strong> — CNAME configuration for branded
					URLs
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">How it works with Module Federation</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				The MF remote's build artifacts are included in the Shell's{" "}
				<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
					dist/
				</code>{" "}
				directory at a known subpath (
				<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
					/ui-components/mf/
				</code>
				). GitHub Pages serves the entire directory as static files. The host's{" "}
				<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
					assetPrefix
				</code>{" "}
				points to the same domain, and Module Federation resolves manifests and chunks from the
				subpath.
			</p>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">The tradeoff</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				GitHub Pages serves everything from a single origin — there's no per-MFE cache invalidation,
				no edge routing, no version-based rollbacks. For a reference implementation or a team demo,
				that's perfectly fine. For a production system with multiple teams deploying independently,
				you'll outgrow it.
			</p>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The point is: start simple. The architecture doesn't force you into complex infrastructure on
			day one. Deploy to GitHub Pages today, migrate to Cloudflare or AWS when you need to.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				GITHUB PAGES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				STATIC HOSTING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ZERO COST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SIMPLE DEPLOYMENT
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Start with the simplest deployment that works. Migrate when you have a reason to.
		</p>
	</div>
);

export const githubPagesAlternative: Slide = {
	title: "GitHub Pages Alternative",
	type: "concept",
	Content,
};
