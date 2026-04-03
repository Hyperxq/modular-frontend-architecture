import type { FunctionalComponent } from "preact";

interface HomeLoadingProps {
	message?: string;
}

const HomeLoading: FunctionalComponent<HomeLoadingProps> = ({ message = "Loading..." }) => {
	return (
		<div class="flex items-center justify-center min-h-screen">
			<div class="text-center p-8 text-white text-xl">{message}</div>
		</div>
	);
};

export default HomeLoading;
