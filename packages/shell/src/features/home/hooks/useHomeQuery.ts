import { useQuery } from "@tanstack/react-query";
import { toHomeDomain } from "../adapters/home.adapter";
import { homeListApiSchema } from "../domain/home.schema";
import type { HomeModel } from "../domain/home.types";
import { getHomeData } from "../services/home.service";

export function useHomeQuery(): {
	items: HomeModel[];
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
} {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["home", "items"],
		queryFn: async () => {
			const raw = await getHomeData();
			const validated = homeListApiSchema.parse(raw);
			return validated.map(toHomeDomain).filter((item): item is HomeModel => item !== null);
		},
	});

	return {
		items: data ?? [],
		isLoading,
		isError,
		error: error as Error | null,
	};
}
