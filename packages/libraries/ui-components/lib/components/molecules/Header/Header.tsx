import type { FunctionalComponent } from "preact";
import "./Header.css";

interface HeaderProps {
	title: string;
	currentSectionIndex: number;
	totalSections: number;
}

const Header: FunctionalComponent<HeaderProps> = ({
	title,
	currentSectionIndex,
	totalSections,
}) => (
	<header class="header">
		<h1 class="header__title">{title}</h1>
		<span class="header__counter">
			{currentSectionIndex + 1} / {totalSections}
		</span>
	</header>
);

export default Header;
