interface HttpService {
	get: (path: string) => Promise<unknown>;
	post: (path: string, body: unknown) => Promise<unknown>;
	put: (path: string, body: unknown) => Promise<unknown>;
	patch: (path: string, body: unknown) => Promise<unknown>;
	del: (path: string) => Promise<unknown>;
}

const BASE_URL = import.meta.env.PUBLIC_API_URL ?? "";

async function handleResponse(res: Response): Promise<unknown> {
	if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
	return res.json() as unknown;
}

export const httpService: HttpService = {
	get: async (path) => {
		const res = await fetch(`${BASE_URL}${path}`, {
			headers: { "Content-Type": "application/json" },
		});
		return handleResponse(res);
	},
	post: async (path, body) => {
		const res = await fetch(`${BASE_URL}${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return handleResponse(res);
	},
	put: async (path, body) => {
		const res = await fetch(`${BASE_URL}${path}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return handleResponse(res);
	},
	patch: async (path, body) => {
		const res = await fetch(`${BASE_URL}${path}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return handleResponse(res);
	},
	del: async (path) => {
		const res = await fetch(`${BASE_URL}${path}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
		return handleResponse(res);
	},
};
