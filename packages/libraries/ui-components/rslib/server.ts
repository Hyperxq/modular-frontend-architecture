import type { ServerConfig } from "@rsbuild/core";

// ---------------------------------------------------------------------------
// Dev server config for MF remote
// Shell (host) connects to this on :3001
// ---------------------------------------------------------------------------

export const devServer: ServerConfig = {
	port: 3001,
	compress: { level: 6 },
	headers: {
		"Cache-Control": "public, max-age=31536000, immutable",
	},
	publicDir: false,
	cors: {
		origin: [/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/],
	},
};
