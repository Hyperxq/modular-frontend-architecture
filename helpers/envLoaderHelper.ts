import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export default function loadEnvFile(rootPath: string, file = ".env") {
	const envPath = resolve(rootPath, file);
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf-8").split("\n");
  const loadedEnv: Record<string, string> = {};
  for(const line of lines) {
    const trimmed = line.trim();
    if(!trimmed && trimmed.startsWith("#")) continue;

    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim().replace(/^['"]|['"]$/g, "");
    process.env[key.trim()] = value;
    loadedEnv[key.trim()] = value;
  }
  return loadedEnv;
}
