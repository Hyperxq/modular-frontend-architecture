import type { ComponentChildren, FunctionalComponent } from "preact";
import { useAuthStore } from "../store/auth.store";

interface ProtectedRouteProps {
	children: ComponentChildren;
}

// TODO: Placeholder — auth guard logic deferred to auth change.
// When auth is implemented, redirect unauthenticated users to /login.
// Currently renders children regardless of auth state.
const ProtectedRoute: FunctionalComponent<ProtectedRouteProps> = ({ children }) => {
	// Auth state subscribed but not enforced — placeholder for future guard
	useAuthStore((s) => s.isAuthenticated);
	return <>{children}</>;
};

export { ProtectedRoute };
