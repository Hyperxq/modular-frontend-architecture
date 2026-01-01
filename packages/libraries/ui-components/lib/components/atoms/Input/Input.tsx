import type React from "react";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	wrapperClassName?: string;
	inputClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
}

/**
 * Simple, accessible input component.
 */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		label,
		error,
		wrapperClassName = "",
		inputClassName = "",
		labelClassName = "",
		errorClassName = "",
		id,
		...rest
	} = props;

	const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;

	return (
		<div className={wrapperClassName}>
			{label && (
				<label htmlFor={inputId} className={labelClassName}>
					{label}
				</label>
			)}

			<input id={inputId} ref={ref} className={inputClassName} aria-invalid={!!error} {...rest} />

			{error && (
				<p role="alert" className={errorClassName}>
					{error}
				</p>
			)}
		</div>
	);
});

Input.displayName = "Input";

export { Input };
