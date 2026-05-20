import { describe, expect, it } from "vitest";
import { openclawProviderPresets } from "@/config/openclawProviderPresets";

describe("OpenClaw provider presets", () => {
  it("should expose only the requested presets", () => {
    expect(openclawProviderPresets.map((item) => item.name)).toEqual([
      "codex-tuzi",
      "codex-coding",
      "codex-gaccode",
      "claude-tuzi",
      "claude-gaccode",
    ]);
  });

  it("should configure codex-tuzi preset", () => {
    const preset = openclawProviderPresets.find((item) => item.name === "codex-tuzi");
    expect(preset).toBeDefined();
    expect(preset?.settingsConfig.baseUrl).toBe("https://api.tu-zi.com/v1");
  });

  it("should configure claude-gaccode preset", () => {
    const preset = openclawProviderPresets.find(
      (item) => item.name === "claude-gaccode",
    );
    expect(preset).toBeDefined();
    expect(preset?.settingsConfig.api).toBe("anthropic-messages");
    expect(preset?.settingsConfig.baseUrl).toBe("https://gaccode.com/claudecode");
  });

  it("should expose apiKeyUrl for all presets", () => {
    expect(
      openclawProviderPresets.every((item) => Boolean(item.apiKeyUrl)),
    ).toBe(true);
  });
});
