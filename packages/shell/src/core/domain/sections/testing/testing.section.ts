import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyTheTestingPyramid = lazy(() =>
	import(/* webpackChunkName: "section-testing" */ "./the-testing-pyramid.slide").then((m) => ({
		default: m.theTestingPyramid.Content,
	})),
);

const LazyUnitTestsWithRstest = lazy(() =>
	import(/* webpackChunkName: "section-testing" */ "./unit-tests-with-rstest.slide").then((m) => ({
		default: m.unitTestsWithRstest.Content,
	})),
);

const LazyE2eWithPlaywrightBdd = lazy(() =>
	import(/* webpackChunkName: "section-testing" */ "./e2e-with-playwright-bdd.slide").then((m) => ({
		default: m.e2eWithPlaywrightBdd.Content,
	})),
);

export const testingSection: Section = {
	id: "testing",
	title: "Testing",
	description: "Testing strategy and tools",
	slides: [
		{ title: "The Testing Pyramid", type: "concept", Content: LazyTheTestingPyramid },
		{ title: "Unit Tests With Rstest", type: "concept", Content: LazyUnitTestsWithRstest },
		{ title: "E2E With Playwright BDD", type: "concept", Content: LazyE2eWithPlaywrightBdd },
	],
};
