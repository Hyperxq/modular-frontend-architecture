import { httpService } from "../../../core/services/http.service";

export interface HomeServiceDeps {
	http?: typeof httpService;
}

// Returns raw unknown — adapter handles parsing and validation
export async function getHomeData(deps: HomeServiceDeps = {}): Promise<unknown> {
	const http = deps.http ?? httpService;
	return http.get("/api/home/items");
}
