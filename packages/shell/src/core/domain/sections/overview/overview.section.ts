import type { Section } from "../types";
import { dataFlow } from "./data-flow.slide";
import { theBigPicture } from "./the-big-picture.slide";
import { thisWebsiteIsTheExample } from "./this-website-is-the-example.slide";

export const overviewSection: Section = {
	id: "overview",
	title: "Overview",
	description: "High-level architecture overview",
	slides: [theBigPicture, thisWebsiteIsTheExample, dataFlow],
};
