import type { Mock } from "@rstest/core";
import { describe, expect, it, rs } from "@rstest/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/preact";
import type { ComponentChildren, FunctionalComponent } from "preact";

// Mock the data hook so tests don't depend on real API or QueryClient state
rs.mock("./hooks/useHomeQuery", () => ({
	useHomeQuery: rs.fn(),
}));

// Mock lazy components to avoid dynamic import / Suspense complexity in tests
rs.mock("./components/HomeWelcome", () => ({
	default: ({ title, message }: { title: string; message: string }) => (
		<div data-testid="home-welcome">
			<h1>{title}</h1>
			<p>{message}</p>
		</div>
	),
}));

rs.mock("./components/HomeSearchForm", () => ({
	default: () => <div data-testid="home-search-form" />,
}));

// Mock dumb layout / state components — tested in isolation
rs.mock("./components/HomeLayout", () => ({
	default: ({ children }: { children: ComponentChildren }) => (
		<div data-testid="home-layout">{children}</div>
	),
}));

rs.mock("./components/HomeLoading", () => ({
	default: ({ message }: { message?: string }) => (
		<div data-testid="home-loading">{message ?? "Loading..."}</div>
	),
}));

rs.mock("./components/HomeError", () => ({
	default: ({ message }: { message?: string }) => (
		<div data-testid="home-error">{message ?? "Error loading content. Please try again."}</div>
	),
}));

rs.mock("./components/HomeEmpty", () => ({
	default: () => <div data-testid="home-empty">No content available.</div>,
}));

import HomeContainer from "./HomeContainer";
import { useHomeQuery } from "./hooks/useHomeQuery";

function makeWrapper() {
	const qc = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	const Wrapper: FunctionalComponent<{ children: ComponentChildren }> = ({ children }) => (
		<QueryClientProvider client={qc}>{children}</QueryClientProvider>
	);
	return Wrapper;
}

describe("HomeContainer", () => {
	it("shows loading state when isLoading is true", () => {
		(useHomeQuery as Mock).mockReturnValue({
			items: [],
			isLoading: true,
			isError: false,
			error: null,
		});

		render(<HomeContainer />, { wrapper: makeWrapper() });

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("shows error state when isError is true", () => {
		(useHomeQuery as Mock).mockReturnValue({
			items: [],
			isLoading: false,
			isError: true,
			error: new Error("Network error"),
		});

		render(<HomeContainer />, { wrapper: makeWrapper() });

		expect(screen.getByText("Error loading content. Please try again.")).toBeInTheDocument();
	});

	it("renders HomeWelcome with data when items are available", async () => {
		(useHomeQuery as Mock).mockReturnValue({
			items: [
				{
					id: "550e8400-e29b-41d4-a716-446655440000",
					title: "Welcome Home",
					description: "This is the welcome message",
					publishedAt: new Date("2026-01-01T00:00:00.000Z"),
					isActive: true,
				},
			],
			isLoading: false,
			isError: false,
			error: null,
		});

		render(<HomeContainer />, { wrapper: makeWrapper() });

		await waitFor(() => {
			expect(screen.getByTestId("home-welcome")).toBeInTheDocument();
			expect(screen.getByText("Welcome Home")).toBeInTheDocument();
		});
	});

	it("shows empty state when items array is empty", () => {
		(useHomeQuery as Mock).mockReturnValue({
			items: [],
			isLoading: false,
			isError: false,
			error: null,
		});

		render(<HomeContainer />, { wrapper: makeWrapper() });

		expect(screen.getByText("No content available.")).toBeInTheDocument();
	});

	it("renders the search form alongside content", async () => {
		(useHomeQuery as Mock).mockReturnValue({
			items: [
				{
					id: "550e8400-e29b-41d4-a716-446655440001",
					title: "Test Title",
					description: "Test description",
					publishedAt: new Date("2026-01-01T00:00:00.000Z"),
					isActive: true,
				},
			],
			isLoading: false,
			isError: false,
			error: null,
		});

		render(<HomeContainer />, { wrapper: makeWrapper() });

		await waitFor(() => {
			expect(screen.getByTestId("home-search-form")).toBeInTheDocument();
		});
	});
});
