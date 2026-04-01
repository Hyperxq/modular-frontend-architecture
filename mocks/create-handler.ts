import { http, passthrough } from "msw";
import { BACKEND_BASE_URL } from "./backend";
import type { MockConfig } from "./mock.config";
import { routeResultMap } from "./route-result-map";
import { ApiRouteKey, routePath } from "./types";
import { joinUrl } from "./url";

export function createHandler(
  method: "get" | "post" | "put" | "patch" | "delete",
  key: ApiRouteKey,
  config: MockConfig,
  baseUrl: string = BACKEND_BASE_URL,
) {
    const url = joinUrl(baseUrl, routePath(key));
    const resolver = routeResultMap[key];

    return http[method](url, ({request, params}) => {
      if(config.ommitedKeys.has(key)) return passthrough();

      if(!resolver) return passthrough();

      return resolver({
        request,
        params: params as Record<string, string>
      })
    })
  }
