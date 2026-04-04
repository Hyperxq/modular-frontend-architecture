import type { FunctionalComponent } from "preact";
import { Navigate, Route, Routes } from "react-router";
import { SlideRoute } from "./SlideRoute";

const AppRoutes: FunctionalComponent = () => (
	<Routes>
		<Route path="/:sectionId/:slideIndex" element={<SlideRoute />} />
		<Route path="*" element={<Navigate to="/problem-audience/0" replace />} />
	</Routes>
);

export { AppRoutes };
