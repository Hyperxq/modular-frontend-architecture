// ---------------------------------------------------------------------------
// helpers.ts — shared test utilities
// Add: data generators, API helpers, custom assertions, time utilities
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Data generators
// ---------------------------------------------------------------------------

export const generateUniqueEmail = (): string => `test.${Date.now()}@example.com`;

const TEST_PASSWORD = process.env.TEST_USER_PASSWORD ?? "placeholder-change-in-env";

export const generateTestUser = () => ({
	name: "Test User",
	email: generateUniqueEmail(),
	password: TEST_PASSWORD,
});

// ---------------------------------------------------------------------------
// Time utilities
// ---------------------------------------------------------------------------

export const waitFor = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const retryAction = async (
	action: () => Promise<void>,
	retries = 3,
	delay = 500,
): Promise<void> => {
	for (let i = 0; i < retries; i++) {
		try {
			await action();
			return;
		} catch (err) {
			if (i === retries - 1) throw err;
			await waitFor(delay);
		}
	}
};
