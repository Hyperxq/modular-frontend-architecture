import { describe, expect, it } from "@rstest/core";
import { cn } from "./cn";

describe("cn", () => {
	it("merges multiple classes", () => {
		expect(cn("flex", "items-center", "gap-2")).toBe("flex items-center gap-2");
	});

	it("handles conditional classes with falsy values omitted", () => {
		expect(cn("bg-surface", false && "bg-primary")).toBe("bg-surface");
		expect(cn("bg-surface", true && "bg-primary")).toBe("bg-primary");
		expect(cn("flex", undefined, null, "gap-2")).toBe("flex gap-2");
	});

	it("resolves Tailwind conflicts (later class wins via twMerge)", () => {
		expect(cn("px-4 py-2", "px-8")).toBe("py-2 px-8");
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
		expect(cn("bg-surface", "bg-primary")).toBe("bg-primary");
	});

	it("returns empty string for no arguments", () => {
		expect(cn()).toBe("");
	});

	it("handles array inputs", () => {
		expect(cn(["flex", "items-center"])).toBe("flex items-center");
	});
});
