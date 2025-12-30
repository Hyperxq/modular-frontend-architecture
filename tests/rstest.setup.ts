import { afterEach, expect } from "@rstest/core";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/preact";
import loadEnvFile from "../helpers/envLoaderHelper";

afterEach(() => cleanup());

if (process.env.NODE_ENV === "test") {
	loadEnvFile(process.cwd(), ".env.test");
}

expect.extend(jestDomMatchers);
