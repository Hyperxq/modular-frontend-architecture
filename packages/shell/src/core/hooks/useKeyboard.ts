import { useEffect } from "preact/hooks";
import type { NavigationResult } from "./useNavigation";

function useKeyboard({
	goNext,
	goPrev,
	canGoNext,
	canGoPrev,
}: Pick<NavigationResult, "goNext" | "goPrev" | "canGoNext" | "canGoPrev">) {
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "ArrowRight" && canGoNext) {
				event.preventDefault();
				goNext();
			} else if (event.key === "ArrowLeft" && canGoPrev) {
				event.preventDefault();
				goPrev();
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [goNext, goPrev, canGoNext, canGoPrev]);
}

export { useKeyboard };
