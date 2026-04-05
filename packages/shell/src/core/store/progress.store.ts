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
	currentSectionId: "problem-audience",
	currentSlideIndex: 0,
	visitedSlides: {},
};

const progressStoreCreator: StateCreator<ProgressStore> = (set) => ({
	...initialState,

	navigate: (sectionId, slideIndex) =>
		set(
			(state) => ({
				currentSectionId: sectionId,
				currentSlideIndex: slideIndex,
				visitedSlides: visitUpTo(state.visitedSlides, sectionId, slideIndex),
			}),
			false,
		),

	markVisited: (sectionId, slideIndex) =>
		set(
			(state) => ({
				visitedSlides: addVisited(state.visitedSlides, sectionId, slideIndex),
			}),
			false,
		),

	resetProgress: () => set(initialState, false),
});

function visitUpTo(
	visited: Record<string, number[]>,
	sectionId: string,
	slideIndex: number,
): Record<string, number[]> {
	const existing = visited[sectionId] ?? [];
	const kept = existing.filter((i) => i <= slideIndex);
	if (!kept.includes(slideIndex)) {
		kept.push(slideIndex);
	}
	if (kept.length === existing.length && existing.every((v, i) => v === kept[i])) {
		return visited;
	}
	return { ...visited, [sectionId]: kept };
}

function addVisited(
	visited: Record<string, number[]>,
	sectionId: string,
	slideIndex: number,
): Record<string, number[]> {
	const existing = visited[sectionId] ?? [];
	if (existing.includes(slideIndex)) return visited;
	return { ...visited, [sectionId]: [...existing, slideIndex] };
}

const persistedStore = persist(progressStoreCreator, {
	name: "mfe-progress",
	version: 1,
	migrate: (persistedState, version) => {
		if (version === 0) return {};
		return persistedState as ProgressStore;
	},
	partialize: (state) => ({
		currentSectionId: state.currentSectionId,
		currentSlideIndex: state.currentSlideIndex,
		visitedSlides: state.visitedSlides,
	}),
});

const isDev = process.env.NODE_ENV !== "production";
export const useProgressStore = isDev
	? create<ProgressStore>()(devtools(persistedStore, { name: "ProgressStore" }))
	: create<ProgressStore>()(persistedStore);

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

export { addVisited, visitUpTo, initialState };
export type { ProgressActions, ProgressState, ProgressStore };
