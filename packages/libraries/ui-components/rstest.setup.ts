import { afterEach, expect } from "@rstest/core";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/preact";

afterEach(() => cleanup());

expect.extend(jestDomMatchers);
