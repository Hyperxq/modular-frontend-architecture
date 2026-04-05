import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			S3 + CloudFront per package — immutable caching with cache invalidation on deploy
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			Each package gets its own S3 bucket and CloudFront distribution. filenameHash: false on
			UI-Components chunks means CDN invalidation, not new URLs
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				S3
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CLOUDFRONT
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				IMMUTABLE CACHE
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">2</span>
				<span class="text-xs text-fg-secondary">CloudFront distributions</span>
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-primary">∞</span>
				<span class="text-xs text-fg-secondary">Cache TTL for chunks</span>
			</div>
		</div>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			CloudFront invalidation on deploy is cheaper than cache-busting via filenames
		</p>
	</div>
);

export const awsProposal: Slide = {
	title: "AWS Proposal",
	type: "concept",
	Content,
};
