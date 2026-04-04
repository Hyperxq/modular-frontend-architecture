import type { FunctionalComponent } from "preact";
import { ErrorBoundary } from "../../../components/ErrorBoundary";
import { MockDemoContainer } from "../../../../features/mock-demo/MockDemoContainer";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<ErrorBoundary
		fallback={
			<p class="text-body-md text-fg-muted p-4">
				Mock demo unavailable — restart the dev servers to load this component.
			</p>
		}
	>
		<MockDemoContainer />
	</ErrorBoundary>
);

export const mockDemo: Slide = {
	title: "Mock Mode Demo",
	type: "interactive",
	Content,
};
