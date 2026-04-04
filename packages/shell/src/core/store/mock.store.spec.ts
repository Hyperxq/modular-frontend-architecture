import { afterEach, beforeEach, describe, expect, it } from "@rstest/core";
import { useMockStore } from "./mock.store";

describe("useMockStore", () => {
	beforeEach(() => {
		useMockStore.setState({ isActive: true, isEnabled: true });
	});

	afterEach(() => {
		useMockStore.setState({ isActive: true, isEnabled: true });
	});

	it("has correct initial state when mocking is enabled", () => {
		const state = useMockStore.getState();
		expect(state.isActive).toBe(true);
		expect(state.isEnabled).toBe(true);
	});

	it("toggle flips isActive from true to false", async () => {
		await useMockStore.getState().toggle();
		expect(useMockStore.getState().isActive).toBe(false);
	});

	it("toggle flips isActive from false to true", async () => {
		useMockStore.setState({ isActive: false });
		await useMockStore.getState().toggle();
		expect(useMockStore.getState().isActive).toBe(true);
	});

	it("setEnabled updates isEnabled", () => {
		useMockStore.getState().setEnabled(false);
		expect(useMockStore.getState().isEnabled).toBe(false);
	});
});
