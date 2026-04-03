import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";
import type { SidebarProps } from "./Sidebar.types";

const Sidebar: FunctionalComponent<SidebarProps> = ({
	sections,
	activeSectionId,
	onSectionClick,
	appName,
	version,
}) => (
	<nav class="bg-surface z-sidebar px-3 py-4 overflow-y-auto" aria-label="Presentation sections">
		{appName && (
			<div class="flex flex-col px-4 mb-8">
				<span class="font-sans text-lg font-bold text-primary">{appName}</span>
				{version && <span class="font-mono text-label-sm text-fg-muted mt-1">{version}</span>}
			</div>
		)}
		<ul class="list-none flex flex-col gap-4">
			{sections.map((section) => {
				const isActive = section.id === activeSectionId;
				return (
					<li key={section.id} class="m-0">
						<button
							type="button"
							class={cn(
								"flex flex-col items-start gap-1 w-full px-4 py-3 bg-transparent border-none rounded-[--radius] text-fg-secondary cursor-pointer transition-colors duration-fast ease-default text-left",
								isActive
									? "bg-surface-container-high text-primary hover:bg-surface-container-high"
									: "hover:bg-surface-bright",
							)}
							onClick={() => onSectionClick(section.id)}
							aria-current={isActive ? "true" : undefined}
						>
							<span class="font-label text-label-md uppercase">{section.title}</span>
							<span
								class="flex gap-[4px]"
								role="img"
								aria-label={`${section.visitedCount} of ${section.slideCount} slides visited`}
							>
								{Array.from({ length: section.slideCount }, (_, i) => (
									<span
										key={i}
										class={cn(
											"w-1.5 h-1.5 rounded-full bg-fg-muted",
											i < section.visitedCount && "bg-primary",
										)}
									/>
								))}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	</nav>
);

export default Sidebar;
