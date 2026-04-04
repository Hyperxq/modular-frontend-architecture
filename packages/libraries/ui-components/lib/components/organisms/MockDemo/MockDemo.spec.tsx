import { describe, expect, it } from "@rstest/core";
import { fireEvent, render, screen } from "@testing-library/preact";
import MockDemo from "./MockDemo";
import type { MockDemoProps } from "./MockDemo.types";

function makeProps(overrides: Partial<MockDemoProps> = {}): MockDemoProps {
	return {
		isMockActive: true,
		isMockEnabled: true,
		onToggle: overrides.onToggle ?? (() => {}),
		users: [
			{ id: 1, name: "Leanne Graham", email: "leanne@example.com" },
			{ id: 2, name: "Ervin Howell", email: "ervin@example.com" },
		],
		isLoading: false,
		error: null,
		...overrides,
	};
}

describe("MockDemo", () => {
	it("renders toggle button with correct aria-label when active", () => {
		render(<MockDemo {...makeProps()} />);
		expect(screen.getByRole("button", { name: "Disable mock mode" })).toBeInTheDocument();
	});

	it("renders toggle button with correct aria-label when inactive", () => {
		render(<MockDemo {...makeProps({ isMockActive: false })} />);
		expect(screen.getByRole("button", { name: "Enable mock mode" })).toBeInTheDocument();
	});

	it("shows 'Mock' source label when active", () => {
		render(<MockDemo {...makeProps()} />);
		expect(screen.getByTestId("source-label")).toHaveTextContent("Source: Mock");
	});

	it("shows 'Real API' source label when inactive", () => {
		render(<MockDemo {...makeProps({ isMockActive: false })} />);
		expect(screen.getByTestId("source-label")).toHaveTextContent("Source: Real API");
	});

	it("renders user list", () => {
		render(<MockDemo {...makeProps()} />);
		expect(screen.getByTestId("user-list")).toBeInTheDocument();
		expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
		expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
	});

	it("shows loading indicator", () => {
		render(<MockDemo {...makeProps({ isLoading: true, users: [] })} />);
		expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
		expect(screen.getByText("Fetching users...")).toBeInTheDocument();
	});

	it("shows error message", () => {
		render(<MockDemo {...makeProps({ error: "Network error", users: [] })} />);
		expect(screen.getByTestId("error-message")).toHaveTextContent("Network error");
	});

	it("shows empty state when no users", () => {
		render(<MockDemo {...makeProps({ users: [] })} />);
		expect(screen.getByText("No users found.")).toBeInTheDocument();
	});

	it("calls onToggle when toggle is clicked", () => {
		let called = 0;
		const onToggle = () => { called++; };
		render(<MockDemo {...makeProps({ onToggle })} />);
		fireEvent.click(screen.getByRole("button", { name: "Disable mock mode" }));
		expect(called).toBe(1);
	});

	it("disables toggle when mock mode is not enabled", () => {
		render(<MockDemo {...makeProps({ isMockEnabled: false })} />);
		expect(screen.getByRole("button")).toBeDisabled();
	});
});
