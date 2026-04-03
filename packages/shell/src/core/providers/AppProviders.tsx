import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentChildren, FunctionalComponent } from "preact";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 5 * 60 * 1000, retry: 1 },
	},
});

interface AppProvidersProps {
	children: ComponentChildren;
}

const AppProviders: FunctionalComponent<AppProvidersProps> = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export { AppProviders };
