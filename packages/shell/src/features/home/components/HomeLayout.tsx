import type { ComponentChildren, FunctionalComponent } from "preact";

interface HomeLayoutProps {
	theme: "light" | "dark";
	children: ComponentChildren;
}

const HomeLayout: FunctionalComponent<HomeLayoutProps> = ({ theme, children }) => {
	return (
		<main
			class={`min-h-screen ${theme === "dark" ? "bg-gradient-to-b from-slate-900 to-slate-800" : "bg-gray-100"}`}
		>
			{children}
		</main>
	);
};

export default HomeLayout;
