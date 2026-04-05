import type { FunctionalComponent } from "preact";
import type { HeaderProps } from "./Header.types";

function isSafeUrl(url: string): boolean {
	try {
		const { protocol } = new URL(url);
		return protocol === "https:" || protocol === "http:";
	} catch {
		return false;
	}
}

const Header: FunctionalComponent<HeaderProps> = ({
	title,
	linkText,
	linkUrl,
	showMenuButton,
	onMenuToggle,
}) => (
	<header class="flex justify-center items-center relative px-4 py-3 bg-surface-container-low z-header">
		{showMenuButton && (
			<button
				type="button"
				class="absolute left-4 flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer text-fg-primary"
				onClick={onMenuToggle}
				aria-label="Toggle menu"
			>
				<svg
					class="w-6 h-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M3 12h18M3 6h18M3 18h18" />
				</svg>
			</button>
		)}
		<h1 class="font-label text-label-md font-semibold text-fg-primary tracking-normal uppercase m-0">
			{title}
		</h1>
		{linkUrl && isSafeUrl(linkUrl) && (
			<a
				class="absolute right-4 font-label text-label-sm text-fg-secondary uppercase no-underline transition-colors duration-fast ease-default hover:text-primary"
				href={linkUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${linkText ?? "GitHub repository"} (opens in new tab)`}
			>
				{showMenuButton ? (
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
					</svg>
				) : (
					linkText
				)}
			</a>
		)}
	</header>
);

export default Header;
