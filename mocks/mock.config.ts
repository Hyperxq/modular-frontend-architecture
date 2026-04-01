import type { ApiRouteKey } from "./types";

export interface MockConfig {
  ommitedKeys: Set<ApiRouteKey>;
  onUnhandled: "warn" | "bypass" | "error";
}

function parseKeys(value?: string): Set<ApiRouteKey> {
  return new Set(
    (value ?? "").split(",").map((element) => element.trim()).filter(Boolean) as ApiRouteKey[]
  );
}

export function resolveMockConfig(): MockConfig {
  return {
    ommitedKeys: parseKeys(import.meta.env.PUBLIC_MSW_OMIT_KEYS),
    onUnhandled: (import.meta.env.PUBLIC_MSW_ON_UNHANDLED as "warn" | "bypass" | "error" | undefined) ?? "bypass",
  }
}
