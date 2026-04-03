import type { FunctionalComponent } from "preact";
import "./Header.css";
import type { HeaderProps } from "./Header.types";

const Header: FunctionalComponent<HeaderProps> = ({ title, linkText, linkUrl }) => (
	<header class="header">
		<h1 class="header__title">{title}</h1>
		{linkText && linkUrl && (
			<a class="header__link" href={linkUrl} target="_blank" rel="noopener noreferrer">
				{linkText}
			</a>
		)}
	</header>
);

export default Header;
