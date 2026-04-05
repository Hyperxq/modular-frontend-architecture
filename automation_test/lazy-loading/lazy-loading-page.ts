import { BasePage } from "../base-page";

// ---------------------------------------------------------------------------
// LazyLoadingPage — Page Object for section-chunk lazy loading assertions
//
// Intercepts network requests to detect which section JS chunks are fetched.
// Pattern: section-<name>.js chunks produced by Rsbuild's code splitting.
// ---------------------------------------------------------------------------

class LazyLoadingPage extends BasePage {
	private capturedChunkRequests: string[] = [];

	/**
	 * Reset the captured list and start listening for section chunk requests.
	 * Call BEFORE navigating to capture requests from page load,
	 * or AFTER a navigation to capture only subsequent requests.
	 */
	interceptChunkRequests(): void {
		this.capturedChunkRequests = [];
		this.page.on("request", (req) => {
			const url = req.url();
			if (url.endsWith(".js") && /section-/i.test(url)) {
				this.capturedChunkRequests.push(url);
			}
		});
	}

	/** Returns a snapshot copy of all captured chunk URLs */
	getChunkRequests(): string[] {
		return [...this.capturedChunkRequests];
	}

	/**
	 * Returns true if any captured chunk URL matches the given pattern.
	 * @param pattern - regex string, matched case-insensitively
	 */
	hasFetchedChunk(pattern: string): boolean {
		return this.capturedChunkRequests.some((url) => new RegExp(pattern, "i").test(url));
	}

	/** Total number of captured chunk requests */
	chunkRequestCount(): number {
		return this.capturedChunkRequests.length;
	}
}

export { LazyLoadingPage };
