import { render } from "preact";
import App from "./App";
import "./styles/base.css";

async function bootstrap() {
	if (import.meta.env.PUBLIC_ENABLE_MOCKING === "true") {
		const { initMocking } = await import("../../../mocks/init-mocking");
		await initMocking();
	}

	const root = document.getElementById("root");
	if (root) {
		render(<App />, root);
	}
}

bootstrap();
