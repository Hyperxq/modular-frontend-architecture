import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Five rules. Memorize them. Every architecture decision in this project traces back to one of
			these.
		</p>
		<ol class="flex flex-col gap-3 list-decimal pl-4 text-fg-secondary text-sm">
			<li>
				<strong>UI-Components NEVER imports from Shell.</strong> No store imports, no hook imports,
				no route access. The dependency arrow points one way: Shell → UI-Components. Never the
				reverse.
			</li>
			<li>
				<strong>UI-Components NEVER creates Zustand stores.</strong> All global state lives in
				Shell. If a component needs data, Shell passes it as a prop. If a component needs to trigger
				a state change, Shell passes a callback.
			</li>
			<li>
				<strong>UI-Components NEVER accesses routing directly.</strong> No useNavigate(), no
				useParams(), no route guards. Navigation is Shell's responsibility. Components receive the
				current state and render accordingly.
			</li>
			<li>
				<strong>All event handlers are callback props from Shell.</strong> onClick, onSubmit,
				onSelect — these are functions that Shell defines and passes down. UI-Components calls them
				without knowing what they do.
			</li>
			<li>
				<strong>All data is serializable props — no store references.</strong> What crosses the
				Module Federation boundary must be plain data: strings, numbers, arrays, objects, and
				functions. Never store instances, never observables, never framework-specific references.
			</li>
		</ol>
		<p class="text-fg-secondary text-base leading-relaxed">
			These aren't guidelines — they're constraints enforced by the architecture. Break any one of
			them and you've coupled the display layer to the business layer. That's the one thing this
			architecture exists to prevent.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RULES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BOUNDARIES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CONSTRAINTS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SEPARATION OF CONCERNS
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Constraints aren't limitations — they're the architecture.
		</p>
	</div>
);

export const theFiveRules: Slide = {
	title: "The Five Rules",
	type: "concept",
	Content,
};
