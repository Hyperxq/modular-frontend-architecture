import type { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface SwipeOptions {
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
	threshold?: number;
	enabled?: boolean;
}

export function useSwipe(ref: RefObject<HTMLElement>, options: SwipeOptions): void {
	const { onSwipeLeft, onSwipeRight, threshold = 50, enabled = true } = options;
	const startX = useRef(0);
	const startY = useRef(0);

	useEffect(() => {
		const el = ref.current;
		if (!el || !enabled) return;

		const onTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0];
			startX.current = touch.clientX;
			startY.current = touch.clientY;
		};

		const onTouchEnd = (e: TouchEvent) => {
			const touch = e.changedTouches[0];
			const dx = touch.clientX - startX.current;
			const dy = touch.clientY - startY.current;

			if (Math.abs(dx) < threshold || Math.abs(dy) > Math.abs(dx)) return;

			if (dx < 0) {
				onSwipeLeft();
			} else {
				onSwipeRight();
			}
		};

		el.addEventListener("touchstart", onTouchStart, { passive: true });
		el.addEventListener("touchend", onTouchEnd, { passive: true });

		return () => {
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
		};
	}, [ref, onSwipeLeft, onSwipeRight, threshold, enabled]);
}
