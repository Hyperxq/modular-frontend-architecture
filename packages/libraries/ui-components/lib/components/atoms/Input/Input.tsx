import type { FunctionalComponent } from "preact";
import { forwardRef } from "preact/compat";

interface InputProps {
	id?: string;
	label?: string;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	onInput?: (value: string) => void;
}

const Input: FunctionalComponent<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, placeholder, value, disabled = false, onInput }, ref) => {
		return (
			<div>
				{label && (
					<label htmlFor={id} class="block text-sm font-medium text-fg-secondary mb-1">
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={id}
					class="w-full px-3 py-2 border border-border-ghost rounded-md bg-surface-container text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-border-focus disabled:opacity-50 disabled:cursor-not-allowed"
					placeholder={placeholder}
					value={value}
					disabled={disabled}
					onInput={(e) => onInput?.((e.target as HTMLInputElement).value)}
				/>
			</div>
		);
	},
);

export default Input;
