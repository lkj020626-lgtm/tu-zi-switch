import { describe, expect, it } from "vitest";
import {
  opencodeProviderPresets,
} from "@/config/opencodeProviderPresets";

describe("OpenCode provider presets", () => {
  it("should only expose custom configuration", () => {
    expect(opencodeProviderPresets).toEqual([]);
  });
});
