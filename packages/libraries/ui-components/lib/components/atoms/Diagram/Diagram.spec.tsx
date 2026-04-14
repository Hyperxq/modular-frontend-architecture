import { describe, expect, it } from "@rstest/core";
import { render } from "@testing-library/preact";
import Diagram from "./Diagram";

describe("Diagram", () => {
	it("renders a container div", () => {
		render(<Diagram chart="graph TD\n  A --> B" />);
		expect(document.querySelector("[aria-label='Architecture diagram']")).toBeTruthy();
	});
});
