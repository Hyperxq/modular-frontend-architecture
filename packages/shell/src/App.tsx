import { lazy, Suspense } from "preact/compat";
import "./App.css";

const Button = lazy(() => import("ui_components/atoms/Button/Button"));
const Input = lazy(() => import("ui_components/atoms/Input/Input"));

const App = () => {
	return (
		<div class="content">
			<h1>Rsbuild with Preact</h1>
			<p>Start building amazing things with Rsbuild.</p>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					maxWidth: "400px",
					margin: "2rem auto",
				}}
			>
				<Suspense fallback={<div>Loading Button...</div>}>
					<Button label="Click me" variant="primary" />
					<Button label="Secondary" variant="secondary" />
					<Button label="Danger" variant="danger" />
				</Suspense>
				<Suspense fallback={<div>Loading Input...</div>}>
					<Input label="Email" placeholder="Enter your email" />
				</Suspense>
			</div>
		</div>
	);
};

export default App;
