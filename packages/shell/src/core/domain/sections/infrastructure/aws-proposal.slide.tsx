import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			When you need full control: S3 + CloudFront + Lambda@Edge.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			For teams that need more control than a managed platform provides, the architecture maps
			naturally to AWS infrastructure.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">AWS building blocks</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					<strong class="text-fg-primary">S3</strong> — static hosting for both Shell and
					UI-Components build artifacts. Each MFE gets its own bucket prefix or bucket.
				</li>
				<li>
					<strong class="text-fg-primary">CloudFront</strong> — CDN distribution with cache
					invalidation per MFE. When UI-Components deploys a new version, only its cache is
					invalidated — Shell's cache remains warm.
				</li>
				<li>
					<strong class="text-fg-primary">Route 53</strong> — DNS management. Custom domains per
					environment (staging, production).
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">The key advantage</h4>
			<p class="text-fg-secondary text-sm leading-relaxed">
				Each micro-frontend deploys to its own S3 path with its own CloudFront cache behavior. This
				means:
			</p>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>Deploy UI-Components without touching Shell's cache</li>
				<li>Roll back a remote to a previous version by pointing to an older S3 prefix</li>
				<li>
					A/B test different remote versions by routing a percentage of traffic to a different
					origin
				</li>
			</ul>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			This is the infrastructure pattern for teams with 3+ MFEs that need true independent
			deployment with version control at the CDN level.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				AWS
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				S3
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CLOUDFRONT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				LAMBDA@EDGE
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				INFRASTRUCTURE
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Managed platforms are simpler. AWS gives you control. Choose based on your team size.
		</p>
	</div>
);

export const awsProposal: Slide = {
	title: "AWS Proposal",
	type: "diagram",
	diagram: `graph TD
    USER["👤 User"] --> R53["Route 53\nDNS · custom domain"]
    R53 --> CF["CloudFront\nCDN + cache"]

    CF -->|"/ — shell routes\ncache behavior A"| LEDGE["Lambda@Edge\nrequest routing\nSPA fallback\nsecurity headers"]
    CF -->|"/ui-components/* — remote chunks\ncache behavior B"| UIC_CACHE["CloudFront cache\nui-components only\ninvalidated per deploy"]

    LEDGE --> S3_SHELL["S3 — Shell\nindex.html\nshell JS chunks"]
    UIC_CACHE --> S3_UIC["S3 — UI-Components\nmf-manifest.json\ncomponent chunks"]

    DEPLOY_UIC["Deploy UI-Components\n↓\ninvalidate cache B only\nShell cache stays warm ✅"]
    DEPLOY_SHELL["Deploy Shell\n↓\ninvalidate cache A only\nUI-Components unaffected ✅"]

    S3_UIC --- DEPLOY_UIC
    S3_SHELL --- DEPLOY_SHELL

    style CF fill:#1e3a5f,color:#fff
    style DEPLOY_UIC fill:#1a3d2b,color:#fff
    style DEPLOY_SHELL fill:#1a3d2b,color:#fff`,
	Content,
};
