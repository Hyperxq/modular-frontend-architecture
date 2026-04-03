import type { FunctionalComponent } from "preact";
import "./Sidebar.css";
import type { SidebarProps } from "./Sidebar.types";

const Sidebar: FunctionalComponent<SidebarProps> = ({
	sections,
	activeSectionId,
	onSectionClick,
}) => (
	<nav class="sidebar" aria-label="Presentation sections">
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
							<span class="sidebar__progress">
								{section.visitedCount}/{section.slideCount}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	</nav>
);

export default Sidebar;
