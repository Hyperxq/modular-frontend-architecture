import type { FunctionalComponent } from "preact";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./core/router/routes";

const App: FunctionalComponent = () => (
	<BrowserRouter>
		<AppRoutes />
	</BrowserRouter>
);

export default App;
