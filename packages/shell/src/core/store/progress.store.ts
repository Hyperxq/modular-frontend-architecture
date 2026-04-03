import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

interface ProgressState {
	currentSectionId: string;
	currentSlideIndex: number;
	visitedSlides: Record<string, number[]>;
}

interface ProgressActions {
	navigate: (sectionId: string, slideIndex: number) => void;
	markVisited: (sectionId: string, slideIndex: number) => void;
	resetProgress: () => void;
}

type ProgressStore = ProgressState & ProgressActions;

const initialState: ProgressState = {
	currentSectionId: "intro",
	currentSlideIndex: 0,
	visitedSlides: {},
};

const progressStoreCreator: StateCreator<
	ProgressStore,
	[["zustand/devtools", never], ["zustand/persist", unknown]],
	[]
> = (set) => ({
	...initialState,

	navigate: (sectionId, slideIndex) =>
		set(
			(state) => ({
				currentSectionId: sectionId,
				currentSlideIndex: slideIndex,
				visitedSlides: addVisited(state.visitedSlides, sectionId, slideIndex),
			}),
			false,
			"navigate",
		),

	markVisited: (sectionId, slideIndex) =>
		set(
			(state) => ({
				visitedSlides: addVisited(state.visitedSlides, sectionId, slideIndex),
			}),
			false,
			"markVisited",
		),

	resetProgress: () => set(initialState, false, "resetProgress"),
});

function addVisited(
	visited: Record<string, number[]>,
	sectionId: string,
	slideIndex: number,
): Record<string, number[]> {
	const existing = visited[sectionId] ?? [];
	if (existing.includes(slideIndex)) return visited;
	return { ...visited, [sectionId]: [...existing, slideIndex] };
}

export const useProgressStore = create<ProgressStore>()(
	devtools(
		persist(progressStoreCreator, {
			name: "mfe-progress",
			partialize: (state) => ({
				currentSectionId: state.currentSectionId,
				currentSlideIndex: state.currentSlideIndex,
				visitedSlides: state.visitedSlides,
			}),
		}),
		{ name: "ProgressStore" },
	),
);

export function useCurrentPosition() {
	return useProgressStore(
		useShallow((s) => ({
			sectionId: s.currentSectionId,
			slideIndex: s.currentSlideIndex,
		})),
	);
}

export function useVisitedSlides() {
	return useProgressStore((s) => s.visitedSlides);
}

export { addVisited, initialState };
export type { ProgressActions, ProgressState, ProgressStore };
