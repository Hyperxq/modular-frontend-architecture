/* ─── Slide content types ─── */

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

/* ─── Sample data — replace with real content later ─── */

const sections: Section[] = [
	{
		id: "intro",
		title: "Overview",
		description: "Introduction to the architecture",
		slides: [
			{ title: "The Monolith Problem", type: "concept", content: "Traditional monoliths create tightly coupled systems." },
			{ title: "Structural Analysis", type: "diagram", content: "How monoliths fail at scale.", diagram: "monolith-diagram" },
			{ title: "Why Micro-Frontends?", type: "concept", content: "Independent deployment, team autonomy, technology freedom." },
		],
	},
	{
		id: "architecture",
		title: "Architecture",
		description: "Deep dive into MFE patterns",
		slides: [
			{ title: "Module Federation", type: "concept", content: "Webpack/Rspack runtime module sharing." },
			{ title: "Host & Remote", type: "diagram", content: "How host loads remote modules.", diagram: "host-remote-diagram" },
			{ title: "Shared Dependencies", type: "code", content: "Singleton pattern for shared libraries." },
		],
	},
	{
		id: "stack",
		title: "Stack & Tooling",
		description: "The tools we use",
		slides: [
			{ title: "Rspack Ecosystem", type: "concept", content: "Rsbuild, Rslib, Rstest — unified toolchain." },
			{ title: "Preact + Signals", type: "concept", content: "3KB runtime, React compatibility via aliases." },
		],
	},
];

/* ─── Helpers ─── */

function getTotalSlides(data: Section[]): number {
	return data.reduce((sum, section) => sum + section.slides.length, 0);
}

function getSectionById(data: Section[], sectionId: string): Section | undefined {
	return data.find((s) => s.id === sectionId);
}

function getSlide(data: Section[], sectionId: string, slideIndex: number): Slide | undefined {
	const section = getSectionById(data, sectionId);
	if (!section) return undefined;
	return section.slides[slideIndex];
}

function getSectionIndex(data: Section[], sectionId: string): number {
	return data.findIndex((s) => s.id === sectionId);
}

function isFirstSlide(data: Section[], sectionId: string, slideIndex: number): boolean {
	const sectionIdx = getSectionIndex(data, sectionId);
	return sectionIdx === 0 && slideIndex === 0;
}

function isLastSlide(data: Section[], sectionId: string, slideIndex: number): boolean {
	const sectionIdx = getSectionIndex(data, sectionId);
	if (sectionIdx === -1) return false;
	const isLastSection = sectionIdx === data.length - 1;
	const isLastInSection = slideIndex === data[sectionIdx].slides.length - 1;
	return isLastSection && isLastInSection;
}

export {
	SLIDE_TYPE,
	sections,
	getSectionById,
	getSectionIndex,
	getSlide,
	getTotalSlides,
	isFirstSlide,
	isLastSlide,
};
export type { Section, Slide, SlideType };
