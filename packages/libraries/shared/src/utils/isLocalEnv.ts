export function isLocalEnv(envMode: string | undefined): boolean {
  return envMode === "development.local" || envMode === "mock" || !envMode;
}