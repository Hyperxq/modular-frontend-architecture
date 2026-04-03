export interface PaginatedResult<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
}

export interface ApiError {
	message: string;
	code: string;
	statusCode: number;
}

export type Result<T, E = ApiError> = { success: true; data: T } | { success: false; error: E };
