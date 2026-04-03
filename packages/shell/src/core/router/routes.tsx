import type { FunctionalComponent } from "preact";
import { lazy, Suspense } from "preact/compat";
import { Route, Routes } from "react-router";

const HomeContainer = lazy(() => import("../../features/home/HomeContainer"));

const AppRoutes: FunctionalComponent = () => (
	<Routes>
		<Route
			path="/"
			element={
				<Suspense fallback={<div class="text-center p-8 text-white">Loading...</div>}>
					<HomeContainer />
				</Suspense>
			}
		/>
	</Routes>
);

export { AppRoutes };
