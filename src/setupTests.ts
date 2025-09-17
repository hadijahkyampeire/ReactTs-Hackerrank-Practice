// Use the Vitest-aware entry so it wires up matchers correctly.
import "@testing-library/jest-dom/vitest";

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up the DOM after each test (like Jest's default config)
afterEach(() => {
  cleanup();
});
