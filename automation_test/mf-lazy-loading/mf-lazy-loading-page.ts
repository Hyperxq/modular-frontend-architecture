import { BasePage } from "../base-page";

// ---------------------------------------------------------------------------
// MfLazyLoadingPage — Page Object for Module Federation remote loading assertions
//
// Intercepts network requests to the MF remote (port 3001) to verify that
// components are served from the remote host and not bundled into the shell.
// ---------------------------------------------------------------------------

class MfLazyLoadingPage extends BasePage {
	private capturedMFRequests: string[] = [];

	/**
	 * Reset the captured list and start listening for MF remote requests.
	 * Filters to URLs containing ":3001" (the ui-components MF remote port).
	 * Call BEFORE navigating to capture requests from page load,
	 * or AFTER a navigation to capture only subsequent requests.
	 */
	interceptMFRequests(): void {
		this.capturedMFRequests = [];
		this.page.on("request", (req) => {
			const url = req.url();
			if (url.includes(":3001")) {
				this.capturedMFRequests.push(url);
			}
		});
	}

	/** Returns a snapshot copy of all captured MF remote request URLs */
	getMFRequests(): string[] {
		return [...this.capturedMFRequests];
	}

	/** Returns true if the MF manifest has been fetched from the remote */
	hasManifestBeenFetched(): boolean {
		return this.capturedMFRequests.some((url) => /mf-manifest\.json/i.test(url));
	}

	/**
	 * Returns true if a JS file for the given component has been fetched.
	 * @param name - component name, matched case-insensitively against the URL
	 */
	hasComponentBeenFetched(name: string): boolean {
		return this.capturedMFRequests.some((url) => new RegExp(name, "i").test(url));
	}

	/** Count of captured MF remote requests that are JS files */
	getMFJsRequestCount(): number {
		return this.capturedMFRequests.filter((url) => url.endsWith(".js")).length;
	}
}

export { MfLazyLoadingPage };
