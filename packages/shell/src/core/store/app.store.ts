import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

type Theme = "light" | "dark";

export interface AppState {
	theme: Theme;
	locale: string;
	isInitialized: boolean;
	isSidebarOpen: boolean;
}

export interface AppActions {
	setTheme: (theme: Theme) => void;
	setLocale: (locale: string) => void;
	markInitialized: () => void;
	toggleSidebar: () => void;
	closeSidebar: () => void;
}

type AppStore = AppState & AppActions;

const appStoreCreator: StateCreator<AppStore, [["zustand/devtools", never]], []> = (set) => ({
	theme: "dark",
	locale: "en",
	isInitialized: false,
	isSidebarOpen: false,
	setTheme: (theme) => set({ theme }),
	setLocale: (locale) => set({ locale }),
	markInitialized: () => set({ isInitialized: true }),
	toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
	closeSidebar: () => set({ isSidebarOpen: false }),
});

export const useAppStore = create<AppStore>()(devtools(appStoreCreator, { name: "AppStore" }));

export function useAppTheme() {
	return useAppStore(useShallow((s) => ({ theme: s.theme, setTheme: s.setTheme })));
}

export function useSidebarDrawer() {
	return useAppStore(
		useShallow((s) => ({
			isSidebarOpen: s.isSidebarOpen,
			toggleSidebar: s.toggleSidebar,
			closeSidebar: s.closeSidebar,
		})),
	);
}
