import type { FunctionalComponent } from "preact";
import type { HeaderProps } from "./Header.types";

const Header: FunctionalComponent<HeaderProps> = ({ title, linkText, linkUrl }) => (
	<header class="flex justify-center items-center relative px-4 py-3 bg-surface-container-low z-header">
		<h1 class="font-label text-label-md font-semibold text-fg-primary tracking-normal uppercase m-0">
			{title}
		</h1>
		{linkText && linkUrl && (
			<a
				class="absolute right-4 font-label text-label-sm text-fg-secondary uppercase no-underline transition-colors duration-fast ease-default hover:text-primary"
				href={linkUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				{linkText}
			</a>
		)}
	</header>
);

export default Header;
