import { ApiRoutes } from "./routes";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type ResolverContext = {
  request: Request;
  params: Record<string, string>;
}

export type RouteResolver = (ctx: ResolverContext) => Response | Promise<Response> | undefined;

export type ApiRouteKey = keyof typeof ApiRoutes;
export type ApiRoutePath = (typeof ApiRoutes)[ApiRouteKey];

export function routePath(key: ApiRouteKey): ApiRoutePath {
  return ApiRoutes[key];
}


