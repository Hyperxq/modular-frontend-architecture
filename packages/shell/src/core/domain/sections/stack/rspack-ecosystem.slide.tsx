import type { FunctionalComponent } from "preact";
import type { Slide } from "../types";

const Content: FunctionalComponent = () => (
	<p>Rsbuild, Rslib, Rstest — unified toolchain.</p>
);

export const rspackEcosystem: Slide = {
	title: "Rspack Ecosystem",
	type: "concept",
	Content,
};
