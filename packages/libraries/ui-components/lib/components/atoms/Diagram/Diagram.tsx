import type { FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import type { DiagramProps } from "./Diagram.types";

let _counter = 0;

const Diagram: FunctionalComponent<DiagramProps> = ({ chart }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const idRef = useRef(`mermaid-${(_counter++).toString(36)}`);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		import("mermaid")
			.then(({ default: mermaid }) => {
				mermaid.initialize({
					startOnLoad: false,
					theme: "dark",
					fontFamily: "inherit",
					darkMode: true,
				});
				return mermaid.render(idRef.current, chart);
			})
			.then(({ svg }) => {
				if (containerRef.current) {
					containerRef.current.innerHTML = svg;
				}
			})
			.catch((err) => {
				console.error("[Diagram] render FAILED:", err);
			});
	}, [chart]);

	return (
		<div
			ref={containerRef}
			role="img"
			class="w-full overflow-auto [&_svg]:max-w-full [&_svg]:h-auto"
			aria-label="Architecture diagram"
		/>
	);
};

export default Diagram;
