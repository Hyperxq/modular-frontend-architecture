import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { NavigationResult } from "./useNavigation";

interface KeyboardOptions
	extends Pick<NavigationResult, "goNext" | "goPrev" | "canGoNext" | "canGoPrev"> {
	/** Duration in ms that the disabled flash remains visible (default: 1500) */
	flashDuration?: number;
}

interface KeyboardResult {
	/** True when the user pressed ArrowLeft at the very first slide */
	flashPrev: boolean;
	/** True when the user pressed ArrowRight at the very last slide */
	flashNext: boolean;
}

function useKeyboard(options: KeyboardOptions): KeyboardResult {
	const { goNext, goPrev, canGoNext, canGoPrev, flashDuration = 1500 } = options;
	const [flashPrev, setFlashPrev] = useState(false);
	const [flashNext, setFlashNext] = useState(false);
	const prevTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearPrevTimer = useCallback(() => {
		if (prevTimer.current) {
			clearTimeout(prevTimer.current);
			prevTimer.current = null;
		}
	}, []);

	const clearNextTimer = useCallback(() => {
		if (nextTimer.current) {
			clearTimeout(nextTimer.current);
			nextTimer.current = null;
		}
	}, []);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "ArrowRight") {
				if (canGoNext) {
					event.preventDefault();
					goNext();
				} else {
					// Flash the disabled next arrow briefly
					event.preventDefault();
					clearNextTimer();
					setFlashNext(true);
					nextTimer.current = setTimeout(() => setFlashNext(false), flashDuration);
				}
			} else if (event.key === "ArrowLeft") {
				if (canGoPrev) {
					event.preventDefault();
					goPrev();
				} else {
					// Flash the disabled prev arrow briefly
					event.preventDefault();
					clearPrevTimer();
					setFlashPrev(true);
					prevTimer.current = setTimeout(() => setFlashPrev(false), flashDuration);
				}
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [goNext, goPrev, canGoNext, canGoPrev, flashDuration, clearPrevTimer, clearNextTimer]);

	// Cleanup timers on unmount
	useEffect(() => {
		return () => {
			clearPrevTimer();
			clearNextTimer();
		};
	}, [clearPrevTimer, clearNextTimer]);

	return { flashPrev, flashNext };
}

export { useKeyboard };
export type { KeyboardResult };
