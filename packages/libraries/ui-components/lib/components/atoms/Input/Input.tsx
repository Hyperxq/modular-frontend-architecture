import { FC, forwardRef } from "react";

export interface InputProps {
	id?: string;
	className?: string;
}

/**
 * Super simple input component.
 */
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	({ id, className, ...rest }, ref) => {
		return <input id={id} ref={ref} className={className} {...rest} />;
	},
);

export default Input;
