import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";

const SHIMMER =
	"bg-gradient-to-r from-surface-container via-surface-container-high/60 to-surface-container bg-[length:200%_100%] animate-shimmer rounded-[--radius] motion-reduce:animate-none";

const SkeletonBlock: FunctionalComponent<{ class?: string }> = ({ class: cls }) => (
	<div class={cn(SHIMMER, cls)} />
);

const SIDEBAR_ITEMS = ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11"];
const SIDEBAR_DOTS = ["d0", "d1", "d2"];
const BOTTOM_DOTS = ["b0", "b1", "b2", "b3"];

const PresentationSkeleton: FunctionalComponent = () => (
	<div class="layout-grid-no-diagram grid h-dvh w-full overflow-hidden bg-surface">
		{/* Header */}
		<div class="grid-area-header flex justify-center items-center px-4 py-3 bg-surface-container-low border-b border-border-ghost">
			<SkeletonBlock class="h-4 w-48" />
		</div>

		{/* Sidebar */}
		<div class="grid-area-sidebar bg-surface-container-low border-r border-border-ghost px-3 py-4 flex flex-col gap-6">
			<div class="px-4 flex flex-col gap-2">
				<SkeletonBlock class="h-5 w-32" />
				<SkeletonBlock class="h-3 w-16" />
			</div>
			<div class="flex flex-col gap-1">
				{SIDEBAR_ITEMS.map((key) => (
					<div key={key} class="px-4 py-3 flex flex-col gap-2">
						<SkeletonBlock class="h-3 w-full" />
						<div class="flex gap-1">
							{SIDEBAR_DOTS.map((dk) => (
								<SkeletonBlock key={dk} class="w-1.5 h-1.5 rounded-full" />
							))}
						</div>
					</div>
				))}
			</div>
		</div>

		{/* Center */}
		<div class="grid-area-center bg-surface-container-low p-8 flex flex-col gap-5 min-h-0 overflow-hidden">
			<div class="max-w-3xl flex flex-col gap-5">
				<SkeletonBlock class="h-3 w-32" />
				<SkeletonBlock class="h-12 w-3/4" />
				<SkeletonBlock class="h-4 w-full" />
				<SkeletonBlock class="h-4 w-5/6" />
				<div class="flex gap-2">
					<SkeletonBlock class="h-6 w-24 rounded-full" />
					<SkeletonBlock class="h-6 w-20 rounded-full" />
					<SkeletonBlock class="h-6 w-28 rounded-full" />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-2">
						<SkeletonBlock class="h-8 w-20" />
						<SkeletonBlock class="h-3 w-28" />
					</div>
					<div class="flex flex-col gap-2">
						<SkeletonBlock class="h-8 w-20" />
						<SkeletonBlock class="h-3 w-28" />
					</div>
				</div>
			</div>
		</div>

		{/* Bottom */}
		<div class="grid-area-bottom flex justify-center">
			<div class="flex flex-col items-center gap-2 px-4 py-2 bg-surface-container-highest/40 backdrop-blur-[12px] border border-border-ghost/60 rounded-[--radius]">
				<div class="flex gap-[6px]">
					{BOTTOM_DOTS.map((key, i) => (
						<SkeletonBlock key={key} class={cn("h-2", i === 0 ? "w-4" : "w-2")} />
					))}
				</div>
				<SkeletonBlock class="h-3 w-36" />
			</div>
		</div>
	</div>
);

export { PresentationSkeleton };
