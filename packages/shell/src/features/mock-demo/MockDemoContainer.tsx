import type { FunctionalComponent } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useCallback, useEffect, useState } from "preact/hooks";
import { useMockToggle, useIsMockEnabled } from "../../core/store/mock.store";

interface User {
	id: number;
	name: string;
	email: string;
}

const MockDemo = lazy(() => import("ui_components/organisms/MockDemo/MockDemo"));

const MockDemoContainer: FunctionalComponent = () => {
	const { isActive, toggle } = useMockToggle();
	const isEnabled = useIsMockEnabled();

	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = useCallback(async () => {
		const baseUrl = import.meta.env.PUBLIC_GATEWAY_BACKEND;
		if (!baseUrl) {
			setError("PUBLIC_GATEWAY_BACKEND is not configured");
			return;
		}

		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${baseUrl}/users`);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const data = await response.json();
			setUsers(data.map((u: User) => ({ id: u.id, name: u.name, email: u.email })));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch users");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers, isActive]);

	const handleToggle = useCallback(async () => {
		await toggle();
	}, [toggle]);

	return (
		<Suspense
			fallback={
				<div style={{ color: "var(--text-muted)", padding: "var(--space-8)" }}>Loading...</div>
			}
		>
			<MockDemo
				isMockActive={isActive}
				isMockEnabled={isEnabled}
				onToggle={handleToggle}
				users={users}
				isLoading={isLoading}
				error={error}
			/>
		</Suspense>
	);
};

export { MockDemoContainer };
