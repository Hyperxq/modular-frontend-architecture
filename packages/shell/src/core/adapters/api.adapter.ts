import type { ApiError, PaginatedResult } from "../domain/types";

interface RawPaginatedResponse {
	data: unknown[];
	total: number;
	page: number;
	page_size: number;
}

export function adaptPaginatedResponse<T>(
	raw: unknown,
	itemAdapter: (item: unknown) => T,
): PaginatedResult<T> {
	const r = raw as RawPaginatedResponse;
	return {
		data: r.data.map(itemAdapter),
		total: r.total,
		page: r.page,
		pageSize: r.page_size,
	};
}

export function adaptApiError(raw: unknown): ApiError {
	const r = raw as { message?: string; code?: string; status?: number };
	return {
		message: r.message ?? "Unknown error",
		code: r.code ?? "UNKNOWN",
		statusCode: r.status ?? 500,
	};
}
