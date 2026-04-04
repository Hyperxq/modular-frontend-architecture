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

const mockStoreCreator: StateCreator<MockStore, [["zustand/devtools", never]], []> = (
	set,
	get,
) => ({
	isActive: import.meta.env.PUBLIC_ENABLE_MOCKING === "true",
	isEnabled: import.meta.env.PUBLIC_ENABLE_MOCKING === "true",

	toggle: async () => {
		const { isActive } = get();
		if (isActive) {
			const { stopMocking } = await import("../../../../../mocks/init-mocking");
			await stopMocking();
		} else {
			const { startMocking } = await import("../../../../../mocks/init-mocking");
			await startMocking();
		}
		set({ isActive: !isActive }, false, "toggle");
	},

	setEnabled: (enabled) => set({ isEnabled: enabled }, false, "setEnabled"),
});

export const useMockStore = create<MockStore>()(
	devtools(mockStoreCreator, { name: "MockStore" }),
);

export function useMockToggle() {
	return useMockStore(useShallow((s) => ({ isActive: s.isActive, toggle: s.toggle })));
}

export function useIsMockEnabled() {
	return useMockStore((s) => s.isEnabled);
}
