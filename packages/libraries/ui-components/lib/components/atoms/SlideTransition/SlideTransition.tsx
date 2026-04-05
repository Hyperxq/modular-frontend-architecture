import { cn } from "@modular-frontend/shared";
import type { ComponentChildren, FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface SlideTransitionProps {
	transitionKey: string;
	children: ComponentChildren;
}

const SlideTransition: FunctionalComponent<SlideTransitionProps> = ({
	transitionKey,
	children,
}) => {
	const [entering, setEntering] = useState(false);
	const prevKeyRef = useRef(transitionKey);

	useEffect(() => {
		if (prevKeyRef.current === transitionKey) return;
		prevKeyRef.current = transitionKey;

		setEntering(false);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setEntering(true);
			});
		});
	}, [transitionKey]);

	return (
		<div
			class={cn(
				"will-change-[opacity,transform]",
				entering && "animate-slide-enter motion-reduce:animate-none",
			)}
			aria-live="polite"
			aria-relevant="additions text"
			aria-atomic="true"
		>
			{children}
		</div>
	);
};

export default SlideTransition;
