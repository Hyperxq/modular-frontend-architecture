import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

// biome-ignore lint/style/useComponentExportOnlyModules: slide pattern — Content is co-located with its Slide data object by design
const Content: FunctionalComponent = () => (
	<div class="flex flex-col gap-5 animate-slide-enter">
		<p class="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
			Each micro-frontend can be built, versioned, and deployed independently — that's the whole
			point.
		</p>
		<p class="text-fg-secondary text-base leading-relaxed">
			The deployment architecture follows the same principle as the development architecture:
			independence. Each package produces its own build artifacts, and those artifacts can be
			deployed separately.
		</p>
		<p class="text-fg-secondary text-sm leading-relaxed">
			In the current reference implementation, both Shell and UI-Components deploy to Cloudflare
			Pages as a single unit — the CI workflow builds both packages and serves them from one domain.
			This is intentional: it's the simplest viable deployment for a two-MFE setup.
		</p>
		<div class="flex flex-col gap-1">
			<h4 class="text-sm font-semibold text-fg-primary">
				But the architecture scales to independent deployment
			</h4>
			<ul class="flex flex-col gap-2 pl-4 text-fg-secondary text-sm list-disc">
				<li>
					UI-Components produces{" "}
					<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
						mf-manifest.json
					</code>{" "}
					+ component chunks. These can be deployed to any CDN or static host.
				</li>
				<li>
					Shell references the remote via a URL resolved from environment variables. Point it to a
					different CDN, a different version, a different environment — no rebuild required.
				</li>
				<li>
					Each remote deploys on its own cadence. Update a Button component? Deploy UI-Components.
					The host picks up the new version at runtime via the manifest — no host rebuild, no
					coordination.
				</li>
			</ul>
		</div>
		<p class="text-fg-secondary text-sm leading-relaxed">
			The build order in CI is deliberate: UI-Components builds first, then Shell. The host needs to
			know the remote's URL at build time for the{" "}
			<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
				assetPrefix
			</code>{" "}
			configuration. In production, the MF remote's chunks live at{" "}
			<code class="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-primary">
				/ui-components/mf/
			</code>{" "}
			on the same domain.
		</p>
		<ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Key concepts">
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				DEPLOYMENT
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CLOUDFLARE PAGES
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				CI/CD
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				INDEPENDENT DEPLOY
			</li>
			<li class="px-3 py-1 rounded-full text-xs font-mono bg-surface-container text-fg-secondary border border-outline-variant">
				ASSET PREFIX
			</li>
		</ul>
		<p class="text-xs text-fg-secondary italic border-t border-outline-variant pt-3">
			Deploy together today. Deploy independently tomorrow. The architecture supports both.
		</p>
	</div>
);

export const independentDeploymentPerPackage: Slide = {
	title: "Independent Deployment Per Package",
	type: "diagram",
	diagram: `graph TD
    subgraph TODAY["Today — Deployed together"]
        CI1["CI Pipeline\n(single workflow)"]
        CI1 --> B1["Build ui-components first"]
        CI1 --> B2["Build shell second"]
        B1 --> D1["Cloudflare Pages\ndist/\n├── shell assets\n└── ui-components/mf/"]
        B2 --> D1
    end

    subgraph TOMORROW["Tomorrow — Independent deployment"]
        CI2["UI-Components CI\n(own workflow)"]
        CI3["Shell CI\n(own workflow)"]
        CI2 --> CDN["CDN / S3 bucket\nui-components chunks\n+ mf-manifest.json"]
        CI3 --> HOST["Shell host\nPUBLIC_BUCKET_URL\npoints to CDN"]
        CDN -.->|"resolved at runtime\nno shell rebuild needed"| HOST
    end

    KEY["🔑 Decoupling mechanism\nPUBLIC_BUCKET_URL env var\nchange the URL → shell picks up\nnew remote version automatically"]

    style KEY fill:#1e3a5f,color:#fff
    style TODAY fill:#1a1a2e
    style TOMORROW fill:#0f2a1a`,
	Content,
};
