import type { ComponentChildren, FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import "./SlideTransition.css";

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
			class={`slide-transition${entering ? " slide-transition--entering" : ""}`}
			aria-atomic="true"
		>
			{children}
		</div>
	);
};

export default SlideTransition;
