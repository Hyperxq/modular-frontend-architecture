import { lazy, Suspense } from "preact/compat";
import "./App.css";

const Input = lazy(() => import("ui_components/Input"));

const App = () => {
	return (
		<div className="content">
			<h1>Rsbuild with Preact</h1>
			<p>Start building amazing things with Rsbuild.</p>
			<Suspense fallback={<div>Loading remote Input component...</div>}>
				<Input />
			</Suspense>
			</div>
	);
};

export default App;
