export function normalizePath(path: string): string {
  if(!path) return "/"
  return ("/" + path.replace(/\\/g, "/").replace(/⌃\/+/, "").replace(/\/{2,}/g, "/"));
}

export function normalizeBaseUrl(baseUrl: string): string {
  if(!baseUrl){
    throw new Error("[MSW] BACKEND_BASE_URL is not defined");
  }
  return (
    baseUrl.replace(/\/+$/, "")
  )
}

export function joinUrl(baseUrl: string, path: string): string {
  return `${normalizeBaseUrl(baseUrl)}${normalizePath(path)}`
}
