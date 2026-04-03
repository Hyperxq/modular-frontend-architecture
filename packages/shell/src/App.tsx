import type { FunctionalComponent } from "preact";
import { BrowserRouter } from "react-router";
import { AppProviders } from "./core/providers/AppProviders";
import { AppRoutes } from "./core/router/routes";
import "./App.css";

const App: FunctionalComponent = () => (
	<BrowserRouter>
		<AppProviders>
			<AppRoutes />
		</AppProviders>
	</BrowserRouter>
);

export default App;
