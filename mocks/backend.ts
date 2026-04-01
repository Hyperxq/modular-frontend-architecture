import type { ImportMeta } from "./env";
export const BACKEND_BASE_URL = (import.meta as unknown as ImportMeta).env.PUBLIC_GATEWAY_BACKEND;
