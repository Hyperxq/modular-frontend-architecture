import type { Section } from "../types";
import { e2eWithPlaywrightBdd } from "./e2e-with-playwright-bdd.slide";
import { theTestingPyramid } from "./the-testing-pyramid.slide";
import { unitTestsWithRstest } from "./unit-tests-with-rstest.slide";

export const testingSection: Section = {
	id: "testing",
	title: "Testing",
	description: "Testing strategy and tools",
	slides: [theTestingPyramid, unitTestsWithRstest, e2eWithPlaywrightBdd],
};
