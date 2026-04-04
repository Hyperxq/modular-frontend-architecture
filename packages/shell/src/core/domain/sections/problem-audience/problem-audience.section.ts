import type { Section } from "../types";
import { thePain } from "./the-pain.slide";
import { theRealWorldProblem } from "./the-real-world-problem.slide";
import { whoThisIsFor } from "./who-this-is-for.slide";

export const problemAudienceSection: Section = {
	id: "problem-audience",
	title: "Problem & Audience",
	description: "The pain points and target audience",
	slides: [thePain, whoThisIsFor, theRealWorldProblem],
};
