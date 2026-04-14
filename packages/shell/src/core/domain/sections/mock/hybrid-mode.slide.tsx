import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Mock everything by default — bypass specific routes on demand.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Sometimes you don't want to mock everything. The auth endpoints are ready but the user profile
			API isn't. Or you want to test a specific integration against the real backend while keeping
			everything else mocked.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Hybrid mode makes this selective. Set PUBLIC_MSW_OMIT_KEYS=auth,user and those specific route
			keys pass through to the real API while everything else stays mocked. The service worker
			checks the key before intercepting.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			This works because of a deliberate architectural decision: handlers define only paths, never
			full domains. The single source of truth for the backend URL is PUBLIC_GATEWAY_BACKEND. Mock
			handlers declare /api/users, not https://api.example.com/api/users. This means the same
			handlers work in any environment — local development, staging, production — without
			modification.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The handler organization follows the same principle. Handlers are grouped by API domain
			(users.mock.ts, posts.mock.ts), not by HTTP method. Each domain file contains all GET, POST,
			PUT, and DELETE handlers for that resource. This makes it trivial to mock or unmock an entire
			domain with a single key.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				HYBRID MODE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				SELECTIVE MOCKING
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				PASSTHROUGH
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				OMIT KEYS
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Selective mocking means you test what you want, when you want.
		</p>
	</div>
);

export const hybridMode: Slide = {
	title: "Hybrid Mode",
	type: "concept",
	Content,
};
