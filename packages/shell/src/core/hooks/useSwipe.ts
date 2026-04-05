import type { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface SwipeOptions {
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
	threshold?: number;
	enabled?: boolean;
}

/**
 * Detects horizontal swipe gestures on a touch-enabled element.
 *
 * Uses `touchmove` with `passive: false` so we can call `preventDefault()`
 * once a horizontal swipe is detected — this stops the browser's native
 * scroll from hijacking the gesture. Vertical scrolling is left untouched.
 *
 * **Important:** the target element (`ref.current`) must exist in the DOM
 * when the effect runs.  If it lives inside `<Suspense>`, wrap the swipe
 * target in a div that is **outside** the Suspense boundary so the ref
 * is available on mount.
 */
export function useSwipe(ref: RefObject<HTMLElement>, options: SwipeOptions): void {
	const { onSwipeLeft, onSwipeRight, threshold = 50, enabled = true } = options;
	const startX = useRef(0);
	const startY = useRef(0);
	const isHorizontalSwipe = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el || !enabled) return;

		const onTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0];
			startX.current = touch.clientX;
			startY.current = touch.clientY;
			isHorizontalSwipe.current = false;
		};

		const onTouchMove = (e: TouchEvent) => {
			const touch = e.touches[0];
			const dx = Math.abs(touch.clientX - startX.current);
			const dy = Math.abs(touch.clientY - startY.current);

			// Once we've moved enough to determine direction, lock it in
			if (!isHorizontalSwipe.current && dx > 10 && dx > dy * 1.5) {
				isHorizontalSwipe.current = true;
			}

			// Block native scroll only when swiping horizontally
			if (isHorizontalSwipe.current) {
				e.preventDefault();
			}
		};

		const onTouchEnd = (e: TouchEvent) => {
			if (!isHorizontalSwipe.current) return;

			const touch = e.changedTouches[0];
			const dx = touch.clientX - startX.current;

			if (Math.abs(dx) < threshold) return;

			if (dx < 0) {
				onSwipeLeft();
			} else {
				onSwipeRight();
			}
		};

		el.addEventListener("touchstart", onTouchStart, { passive: true });
		// passive: false is REQUIRED to call preventDefault() on horizontal swipes
		el.addEventListener("touchmove", onTouchMove, { passive: false });
		el.addEventListener("touchend", onTouchEnd, { passive: true });

		return () => {
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchmove", onTouchMove);
			el.removeEventListener("touchend", onTouchEnd);
		};
	}, [ref, onSwipeLeft, onSwipeRight, threshold, enabled]);
}
