import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";
import type { SidebarProps } from "./Sidebar.types";

const SidebarContent: FunctionalComponent<
	Pick<SidebarProps, "sections" | "activeSectionId" | "onSectionClick" | "appName" | "version">
> = ({ sections, activeSectionId, onSectionClick, appName, version }) => (
	<nav
		class="bg-surface-container-low h-full px-3 py-4 overflow-y-auto border-r border-border-ghost"
		aria-label="Presentation sections"
	>
		{appName && (
			<div class="flex flex-col px-4 mb-8">
				<span class="font-sans text-lg font-bold text-primary">{appName}</span>
				{version && <span class="font-mono text-label-sm text-fg-muted mt-1">{version}</span>}
			</div>
		)}
		<ul class="list-none flex flex-col gap-1">
			{sections.map((section) => {
				const isActive = section.id === activeSectionId;
				return (
					<li key={section.id} class="m-0">
						<button
							type="button"
							class={cn(
								"flex flex-col items-start gap-1 w-full py-3 bg-transparent border-none border-l-2 cursor-pointer transition-all duration-normal ease-default text-left",
								isActive
									? "border-primary bg-surface-container-high text-primary pl-[calc(1rem-2px)] pr-4 rounded-r-[--radius]"
									: "border-transparent text-fg-secondary px-4 hover:bg-surface-bright hover:text-fg-primary rounded-[--radius]",
							)}
							onClick={() => onSectionClick(section.id)}
							aria-current={isActive ? "step" : undefined}
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
											"w-1.5 h-1.5 rounded-full transition-all duration-normal ease-default",
											i < section.visitedCount ? "bg-primary" : "bg-fg-muted",
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

const Sidebar: FunctionalComponent<SidebarProps> = ({
	sections,
	activeSectionId,
	onSectionClick,
	appName,
	version,
	isDrawer,
	isOpen,
	onClose,
}) => {
	const contentProps = { sections, activeSectionId, onSectionClick, appName, version };

	if (!isDrawer) {
		return <SidebarContent {...contentProps} />;
	}

	const handleSectionClick = (sectionId: string) => {
		onSectionClick(sectionId);
		onClose?.();
	};

	return (
		<div
			class={cn(
				"fixed inset-0 z-overlay transition-opacity duration-slow ease-default",
				isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
			)}
			data-testid="sidebar-drawer"
			role="dialog"
			aria-modal="true"
			aria-label="Navigation menu"
			aria-hidden={!isOpen}
		>
			<button
				type="button"
				class="absolute inset-0 bg-surface-overlay border-none cursor-default"
				onClick={onClose}
				onKeyDown={(e) => e.key === "Escape" && onClose?.()}
				tabIndex={-1}
				aria-label="Close menu"
			/>
			<div
				class={cn(
					"absolute top-0 left-0 h-full w-[--width-sidebar-mobile] transition-transform duration-slow ease-out",
					isOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<SidebarContent {...contentProps} onSectionClick={handleSectionClick} />
			</div>
		</div>
	);
};

export default Sidebar;
