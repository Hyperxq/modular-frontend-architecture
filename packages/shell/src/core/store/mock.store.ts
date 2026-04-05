import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export interface MockState {
	isActive: boolean;
	isEnabled: boolean;
}

export interface MockActions {
	toggle: () => Promise<void>;
	setEnabled: (enabled: boolean) => void;
}

type MockStore = MockState & MockActions;

const mockStoreCreator: StateCreator<MockStore> = (set, get) => ({
	isActive: import.meta.env.PUBLIC_ENABLE_MOCKING === "true",
	isEnabled: import.meta.env.PUBLIC_ENABLE_MOCKING === "true",

	toggle: async () => {
		const { isActive, isEnabled } = get();
		if (!isEnabled) return;

		if (isActive) {
			const { stopMocking } = await import("../../../../../mocks/init-mocking");
			await stopMocking();
		} else {
			const { startMocking } = await import("../../../../../mocks/init-mocking");
			await startMocking();
		}
		set({ isActive: !isActive });
	},

	setEnabled: (enabled) => set({ isEnabled: enabled }),
});

const isDev = process.env.NODE_ENV !== "production";
export const useMockStore = isDev
	? create<MockStore>()(devtools(mockStoreCreator, { name: "MockStore" }))
	: create<MockStore>()(mockStoreCreator);

export function useMockToggle() {
	return useMockStore(useShallow((s) => ({ isActive: s.isActive, toggle: s.toggle })));
}

export function useIsMockEnabled() {
	return useMockStore((s) => s.isEnabled);
}
