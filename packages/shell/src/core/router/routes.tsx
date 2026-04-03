import type { FunctionalComponent } from "preact";
import { Navigate, Route, Routes } from "react-router";

const AppRoutes: FunctionalComponent = () => (
	<Routes>
		<Route path="/:sectionId/:slideIndex" element={<div>Slide placeholder</div>} />
		<Route path="*" element={<Navigate to="/intro/0" replace />} />
	</Routes>
);

export { AppRoutes };
