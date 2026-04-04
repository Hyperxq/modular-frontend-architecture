import type { Section } from "./types";
import { architectureSection } from "./architecture/architecture.section";
import { introSection } from "./intro/intro.section";
import { mockSection } from "./mock/mock.section";
import { stackSection } from "./stack/stack.section";

const sections: Section[] = [introSection, architectureSection, stackSection, mockSection];

export { sections };
export { SLIDE_TYPE } from "./types";
export type { Section, Slide, SlideType } from "./types";
export {
	getGlobalSlideIndex,
	getSectionById,
	getSectionIndex,
	getSlide,
	getTotalSlides,
	isFirstSlide,
	isLastSlide,
} from "./helpers";
