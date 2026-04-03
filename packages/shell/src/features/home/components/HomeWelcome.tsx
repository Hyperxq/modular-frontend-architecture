import type { FunctionalComponent } from "preact";

interface HomeWelcomeProps {
	title: string;
	message: string;
	updatedAt: Date;
}

// Pure dumb component — no store, no hooks, no side effects
const HomeWelcome: FunctionalComponent<HomeWelcomeProps> = ({ title, message, updatedAt }) => {
	return (
		<section class="py-20 px-8 text-center">
			<h1 class="text-5xl font-bold mb-4 text-white">{title}</h1>
			<p class="text-slate-300 text-lg mb-6">{message}</p>
			<p class="text-slate-500 text-sm">
				Last updated:{" "}
				{updatedAt.toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</p>
		</section>
	);
};

export default HomeWelcome;
