import { beforeEach, describe, expect, it } from "@rstest/core";
import { useAppStore } from "./app.store";

describe("app.store", () => {
	beforeEach(() => {
		// Reset store to initial state before each test
		useAppStore.setState({
			theme: "dark",
			locale: "en",
			isInitialized: false,
		});
	});

	it("has correct initial state", () => {
		const state = useAppStore.getState();
		expect(state.theme).toBe("dark");
		expect(state.locale).toBe("en");
		expect(state.isInitialized).toBe(false);
	});

	it("setTheme updates theme to light", () => {
		useAppStore.getState().setTheme("light");
		expect(useAppStore.getState().theme).toBe("light");
	});

	it("setTheme updates theme to dark", () => {
		useAppStore.setState({ theme: "light" });
		useAppStore.getState().setTheme("dark");
		expect(useAppStore.getState().theme).toBe("dark");
	});

	it("setLocale updates locale", () => {
		useAppStore.getState().setLocale("es");
		expect(useAppStore.getState().locale).toBe("es");
	});

	it("markInitialized sets isInitialized to true", () => {
		expect(useAppStore.getState().isInitialized).toBe(false);
		useAppStore.getState().markInitialized();
		expect(useAppStore.getState().isInitialized).toBe(true);
	});
});
