import type { Section } from "../types";
import { isThisRightForYou } from "./is-this-right-for-you.slide";
import { startHere } from "./start-here.slide";
import { whatWeProvide } from "./what-we-provide.slide";

export const getStartedSection: Section = {
	id: "get-started",
	title: "Get Started",
	description: "Getting started with this architecture",
	slides: [isThisRightForYou, whatWeProvide, startHere],
};
