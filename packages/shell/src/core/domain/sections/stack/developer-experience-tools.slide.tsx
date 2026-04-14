import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			One linter, one formatter, one set of git hooks — zero configuration debates.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Developer experience isn't just about the code you write — it's about the guardrails that
			prevent bad code from reaching the repository:
		</p>
		<div class="flex flex-col gap-2">
			<h4 class="text-sm font-semibold text-fg-primary">Biome — lint and format in one tool</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Biome replaces both ESLint and Prettier with a single, fast binary. The rules that matter
				most are enforced as errors, not warnings:
			</p>
			<ul class="flex flex-col gap-1 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<code class="font-mono text-primary">noExplicitAny</code> — no any types, ever
				</li>
				<li>
					<code class="font-mono text-primary">noCommonJs</code> — no require() or module.exports
				</li>
				<li>
					<code class="font-mono text-primary">useComponentExportOnlyModules</code> — component
					files export only components
				</li>
			</ul>
			<p class="text-fg-secondary text-sm">
				One config file. One command: <code class="font-mono text-primary">bun run lint:fix</code>.
				No plugin conflicts, no config inheritance chains.
			</p>
		</div>
		<div class="flex flex-col gap-2">
			<h4 class="text-sm font-semibold text-fg-primary">
				Lefthook — git hooks without the ceremony
			</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Lefthook runs pre-commit and commit-msg hooks:
			</p>
			<ul class="flex flex-col gap-1 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">Pre-commit</strong> — Biome lint + format on staged files
					only
				</li>
				<li>
					<strong class="text-fg-primary">Commit-msg</strong> — commitlint enforces Conventional
					Commits (<code class="font-mono text-primary">feat(shell): ...</code>,{" "}
					<code class="font-mono text-primary">fix(ui-components): ...</code>)
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-2">
			<h4 class="text-sm font-semibold text-fg-primary">TypeScript — strict mode, no exceptions</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				<code class="font-mono text-primary">strict: true</code> with{" "}
				<code class="font-mono text-primary">noUncheckedIndexedAccess</code>. The compiler catches
				what linting misses. Combined with Biome's noExplicitAny, there's nowhere for untyped code
				to hide.
			</p>
		</div>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				BIOME
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LEFTHOOK
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				TYPESCRIPT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CONVENTIONAL COMMITS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DX
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Good DX isn't about making things easy — it's about making the wrong thing hard.
		</p>
	</div>
);

export const developerExperienceTools: Slide = {
	title: "Developer Experience Tools",
	type: "concept",
	Content,
};
