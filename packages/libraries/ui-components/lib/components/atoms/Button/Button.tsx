import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";

interface ButtonProps {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
	variant?: "primary" | "secondary" | "danger";
	type?: "button" | "submit" | "reset";
	ariaLabel?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
	primary: "bg-primary text-on-primary hover:bg-primary-dim focus:ring-primary",
	secondary:
		"bg-surface-container-high text-fg-primary hover:bg-surface-bright focus:ring-outline-variant",
	danger: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-500",
};

const Button: FunctionalComponent<ButtonProps> = ({
	label,
	onClick,
	disabled = false,
	variant = "primary",
	type = "button",
	ariaLabel,
}) => {
	return (
		<button
			type={type}
			class={cn(
				"inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors duration-fast ease-default focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
				variantClasses[variant],
			)}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
		>
			{label}
		</button>
	);
};

export default Button;
