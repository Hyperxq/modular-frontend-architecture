interface MockUser {
	id: number;
	name: string;
	email: string;
}

interface MockDemoProps {
	isMockActive: boolean;
	isMockEnabled: boolean;
	onToggle: () => void;
	users: MockUser[];
	isLoading: boolean;
	error: string | null;
}

export type { MockDemoProps, MockUser };
