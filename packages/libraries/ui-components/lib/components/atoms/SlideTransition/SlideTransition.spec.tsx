import { describe, expect, it } from "@rstest/core";
import { render, screen } from "@testing-library/preact";
import SlideTransition from "./SlideTransition";

describe("SlideTransition", () => {
	it("renders children", () => {
		render(
			<SlideTransition transitionKey="intro-0">
				<p>Slide content</p>
			</SlideTransition>,
		);
		expect(screen.getByText("Slide content")).toBeInTheDocument();
	});

	it("has aria-atomic true on wrapper", () => {
		const { container } = render(
			<SlideTransition transitionKey="intro-0">
				<p>Content</p>
			</SlideTransition>,
		);
		const wrapper = container.querySelector(".slide-transition");
		expect(wrapper).toHaveAttribute("aria-atomic", "true");
	});

	it("does not have entering class on initial render", () => {
		const { container } = render(
			<SlideTransition transitionKey="intro-0">
				<p>Content</p>
			</SlideTransition>,
		);
		const wrapper = container.querySelector(".slide-transition");
		expect(wrapper?.classList.contains("slide-transition--entering")).toBe(false);
	});

	it("does not unmount children on key change", () => {
		const { container, rerender } = render(
			<SlideTransition transitionKey="intro-0">
				<p data-testid="stable">Stable</p>
			</SlideTransition>,
		);

		rerender(
			<SlideTransition transitionKey="intro-1">
				<p data-testid="stable">Stable</p>
			</SlideTransition>,
		);

		expect(screen.getByTestId("stable")).toBeInTheDocument();
		expect(container.querySelectorAll("[data-testid='stable']")).toHaveLength(1);
	});
});
