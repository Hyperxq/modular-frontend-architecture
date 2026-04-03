import type { FunctionalComponent } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useCallback } from "preact/hooks";
import { useAppStore } from "../../core/store";
import HomeEmpty from "./components/HomeEmpty";
import HomeError from "./components/HomeError";
import HomeLayout from "./components/HomeLayout";
import HomeLoading from "./components/HomeLoading";
import type { HomeFormData } from "./domain/home.types";
import { useHomeQuery } from "./hooks/useHomeQuery";

const HomeWelcome = lazy(() => import("./components/HomeWelcome"));
const HomeSearchForm = lazy(() => import("./components/HomeSearchForm"));

// Smart container — reads store, calls hooks, decides what to render
// No props — route-level component, all data from hooks/stores
// ZERO layout markup: no div/main/section, no Tailwind classes here
const HomeContainer: FunctionalComponent = () => {
	const theme = useAppStore((s) => s.theme);
	const { items, isLoading, isError } = useHomeQuery();

	const handleFormSubmit = useCallback((data: HomeFormData) => {
		// TODO: wire to real submission handler — business logic lives here, not in the form
		console.log("Form submitted:", data);
	}, []);

	if (isLoading) {
		return <HomeLoading />;
	}

	if (isError) {
		return <HomeError />;
	}

	const welcomeItem = items[0];

	return (
		<HomeLayout theme={theme}>
			{welcomeItem ? (
				<Suspense fallback={<HomeLoading message="Loading content..." />}>
					<HomeWelcome
						title={welcomeItem.title}
						message={welcomeItem.description}
						updatedAt={welcomeItem.publishedAt}
					/>
				</Suspense>
			) : (
				<HomeEmpty />
			)}
			<Suspense fallback={null}>
				<HomeSearchForm onSubmit={handleFormSubmit} />
			</Suspense>
		</HomeLayout>
	);
};

export default HomeContainer;
