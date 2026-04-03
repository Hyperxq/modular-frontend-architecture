import type { FunctionalComponent } from "preact";

interface HomeErrorProps {
	message?: string;
}

const HomeError: FunctionalComponent<HomeErrorProps> = ({
	message = "Error loading content. Please try again.",
}) => {
	return (
		<div class="flex items-center justify-center min-h-screen">
			<div class="text-red-500 p-8 text-center">{message}</div>
		</div>
	);
};

export default HomeError;
