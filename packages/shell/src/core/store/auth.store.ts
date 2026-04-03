import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
	id: string;
	email: string;
	name: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface AuthActions {
	setUser: (user: User) => void;
	clearUser: () => void;
	setLoading: (isLoading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const authStoreCreator: StateCreator<AuthStore, [["zustand/devtools", never]], []> = (set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	setUser: (user) => set({ user, isAuthenticated: true }),
	clearUser: () => set({ user: null, isAuthenticated: false }),
	setLoading: (isLoading) => set({ isLoading }),
});

export const useAuthStore = create<AuthStore>()(devtools(authStoreCreator, { name: "AuthStore" }));
