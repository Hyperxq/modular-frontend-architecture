import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Shell is the MF host, UI-Components is the MF remote — loaded at runtime via PUBLIC_BUCKET_URL
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The remote URL is injected at runtime from an env variable. In dev it points to :3001. In
			production it points to the CDN bucket
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HOST
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				REMOTE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				RUNTIME URL
			</li>
		</ul>
		<dl class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Dev remote URL</dt>
				<dd class="text-2xl font-bold text-primary m-0">:3001</dd>
			</div>
			<div class="flex flex-col">
				<dt class="text-xs text-fg-secondary">Prod remote URL</dt>
				<dd class="text-2xl font-bold text-primary m-0">PUBLIC_BUCKET_URL</dd>
			</div>
		</dl>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			URL injection is the only coupling between host and remote at runtime
		</p>
	</div>
);

export const hostAndRemote: Slide = {
	title: "Host And Remote",
	type: "diagram",
	diagram: "Shell (:3002) --[runtime fetch]--> ui_components (:3001 | CDN)",
	Content,
};
