import type { FunctionalComponent } from "preact";
import "./Sidebar.css";
import type { SidebarProps } from "./Sidebar.types";

function buildDots(visited: number, total: number): string {
	return Array.from({ length: total }, (_, i) => (i < visited ? "●" : "○")).join("");
}

const Sidebar: FunctionalComponent<SidebarProps> = ({
	sections,
	activeSectionId,
	onSectionClick,
	appName,
	version,
}) => (
	<nav class="sidebar" aria-label="Presentation sections">
		{appName && (
			<div class="sidebar__brand">
				<span class="sidebar__app-name">{appName}</span>
				{version && <span class="sidebar__version">{version}</span>}
			</div>
		)}
		<ul class="sidebar__list">
			{sections.map((section) => {
				const isActive = section.id === activeSectionId;
				return (
					<li key={section.id} class="sidebar__item">
						<button
							type="button"
							class={`sidebar__btn${isActive ? " sidebar__btn--active" : ""}`}
							onClick={() => onSectionClick(section.id)}
							aria-current={isActive ? "true" : undefined}
						>
							<span class="sidebar__title">{section.title}</span>
							<span
								class="sidebar__dots"
								role="img"
								aria-label={`${section.visitedCount} of ${section.slideCount} slides visited`}
							>
								{buildDots(section.visitedCount, section.slideCount)}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	</nav>
);

export default Sidebar;
