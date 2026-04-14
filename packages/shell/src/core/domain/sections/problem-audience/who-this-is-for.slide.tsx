import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			This isn't a tutorial — it's a production architecture you can study, question, and steal
			from.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			A lot of content out there is aimed at people just getting started. This is not that.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This is for architects, senior engineers, and technical leads who want to see a real
			architecture running in production — not a diagram on a whiteboard, not a proof of concept in
			a blog post.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			I want to be clear about the intent: I'm not presenting this as the perfect solution. There is
			no perfect solution. What I'm saying is: this was the problem I faced, and this is the
			architecture that worked. Take what's useful, challenge what doesn't convince you, and adapt
			it to your own context.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">A scope boundary</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				You don't need micro-frontends for every project. In my case, the motivation was specific:
				instead of splitting the application into four large chunks, I wanted to split it into
				small, independent pieces. Every component becomes its own file. Without publishing a
				package, I can expose these components as outputs that the new website consumes — but also
				as plug-and-play pieces that legacy CMS-based apps can embed directly.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ARCHITECTS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SENIOR ENGINEERS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PRODUCTION
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MICRO-FRONTENDS
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Real problems, real tradeoffs, real code. No silver bullets.
		</p>
	</div>
);

export const whoThisIsFor: Slide = {
	title: "Who This Is For",
	type: "concept",
	Content,
};
