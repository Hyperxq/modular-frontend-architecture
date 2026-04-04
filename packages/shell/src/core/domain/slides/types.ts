const SLIDE_TYPE = {
	CONCEPT: "concept",
	DIAGRAM: "diagram",
	CODE: "code",
	INTERACTIVE: "interactive",
} as const;

type SlideType = (typeof SLIDE_TYPE)[keyof typeof SLIDE_TYPE];

interface Slide {
	title: string;
	type: SlideType;
	content: string;
	diagram?: string;
	notes?: string;
}

interface Section {
	id: string;
	title: string;
	description: string;
	slides: Slide[];
}

export { SLIDE_TYPE };
export type { Section, Slide, SlideType };
