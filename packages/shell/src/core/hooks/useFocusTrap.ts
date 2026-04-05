import type { RefObject } from "preact";
import { useEffect } from "preact/hooks";

const FOCUSABLE_SELECTORS = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	'[tabindex]:not([tabindex="-1"])',
].join(", ");

export function useFocusTrap(ref: RefObject<HTMLElement>, isActive: boolean): void {
	useEffect(() => {
		if (!isActive || !ref.current) return;

		const container = ref.current;
		const focusableElements = Array.from(
			container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		firstElement?.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Tab") return;
			if (focusableElements.length === 0) {
				e.preventDefault();
				return;
			}
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			}
		};

		container.addEventListener("keydown", handleKeyDown);
		return () => container.removeEventListener("keydown", handleKeyDown);
	}, [isActive, ref]);
}
