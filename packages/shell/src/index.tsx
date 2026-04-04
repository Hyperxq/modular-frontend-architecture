import "./styles/base.css";

const enableMocking = import.meta.env.PUBLIC_ENABLE_MOCKING === "true";

async function prepareMocking() {
	if (!enableMocking) return;
	const { initMocking } = await import("../../../mocks/init-mocking");
	await initMocking();
}

prepareMocking().then(async () => {
	const { render } = await import("preact");
	const { default: App } = await import("./App");

	const root = document.getElementById("root");
	if (root) {
		render(<App />, root);
	}
});
