// ---------------------------------------------------------------------------
// helpers.ts — shared test utilities
// Add: data generators, API helpers, custom assertions, time utilities
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Data generators
// ---------------------------------------------------------------------------

export const generateUniqueEmail = (): string =>
	`test.${Date.now()}@example.com`;

export const generateTestUser = () => ({
	name: "Test User",
	email: generateUniqueEmail(),
	password: "TestPassword123!",
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
