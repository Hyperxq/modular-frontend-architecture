import { claudeCodeSection } from "./claude-code/claude-code.section";
import { getStartedSection } from "./get-started/get-started.section";
import { infrastructureSection } from "./infrastructure/infrastructure.section";
import { mockSection } from "./mock/mock.section";
import { moduleFederationSection } from "./module-federation/module-federation.section";
import { monorepoSection } from "./monorepo/monorepo.section";
import { overviewSection } from "./overview/overview.section";
import { problemAudienceSection } from "./problem-audience/problem-audience.section";
import { shellSection } from "./shell/shell.section";
import { stackSection } from "./stack/stack.section";
import { testingSection } from "./testing/testing.section";
import type { Section } from "./types";
import { uiComponentsSection } from "./ui-components/ui-components.section";

const sections: Section[] = [
	problemAudienceSection,
	overviewSection,
	monorepoSection,
	stackSection,
	shellSection,
	uiComponentsSection,
	moduleFederationSection,
	mockSection,
	testingSection,
	infrastructureSection,
	claudeCodeSection,
	getStartedSection,
];

export { sections };
export {
	getGlobalSlideIndex,
	getSectionById,
	getSectionIndex,
	getSlide,
	getTotalSlides,
	isFirstSlide,
	isLastSlide,
} from "./helpers";
export type { Section, Slide, SlideType } from "./types";
export { SLIDE_TYPE } from "./types";
