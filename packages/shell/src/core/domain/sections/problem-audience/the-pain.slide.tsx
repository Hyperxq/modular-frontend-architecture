import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			A 10-year-old multi-repo with 5-minute load times — that was the wake-up call.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			I come from Angular, where the framework gives you a workspace with multiple sub-projects out
			of the box. React is a different story — most teams start with a single SPA, one HTML file,
			and a pile of components. That works until it doesn't.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The project I inherited was 10 years old, split across four repositories, and deeply legacy.
			Two problems had compounded over time:
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>
				<strong class="text-fg-primary">Development experience was broken.</strong> Four repos meant
				four dependency trees. Over the years, developers upgraded libraries in one repo but not the
				others — because touching the others meant risking breakage. Code was duplicated everywhere.
				The reason was simple: you can't share resources across repos without publishing private
				packages, and when everything is due yesterday, nobody stops to set that up.
			</li>
			<li>
				<strong class="text-fg-primary">Performance was neglected.</strong> The application itself
				wasn't complex, but no one had paid attention to optimization. The app loaded all of its
				code, all API resources, and all web assets upfront. The result? Users waited nearly five
				minutes between the first page load, authentication, and finally landing on the home screen.
			</li>
		</ol>
		<p class="text-fg-secondary text-base leading-relaxed">
			That was the reality. Something had to change.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LEGACY
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				MULTI-REPO
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PERFORMANCE
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			This isn't a greenfield fantasy — it's a brownfield rescue mission.
		</p>
	</div>
);

export const thePain: Slide = {
	title: "The Pain",
	type: "concept",
	Content,
};
