/**
 * Codex 预设供应商配置模板
 */
import { ProviderCategory } from "../types";
import type { PresetTheme } from "./claudeProviderPresets";

export interface CodexProviderPreset {
  name: string;
  nameKey?: string; // i18n key for localized display name
  websiteUrl: string;
  // 第三方供应商可提供单独的获取 API Key 链接
  apiKeyUrl?: string;
  auth: Record<string, any>; // 将写入 ~/.codex/auth.json
  config: string; // 将写入 ~/.codex/config.toml（TOML 字符串）
  isOfficial?: boolean; // 标识是否为官方预设
  category?: ProviderCategory; // 新增：分类
  isCustomTemplate?: boolean; // 标识是否为自定义模板
  // 新增：请求地址候选列表（用于地址管理/测速）
  endpointCandidates?: string[];
  // 新增：视觉主题配置
  theme?: PresetTheme;
  // 图标配置
  icon?: string; // 图标名称
  iconColor?: string; // 图标颜色
}

/**
 * 生成第三方供应商的 auth.json
 */
export function generateThirdPartyAuth(apiKey: string): Record<string, any> {
  return {
    OPENAI_API_KEY: apiKey || "",
  };
}

/**
 * 生成第三方供应商的 config.toml
 */
export function generateThirdPartyConfig(
  providerName: string,
  baseUrl: string,
  modelName = "gpt-5.4",
): string {
  // 清理供应商名称，确保符合TOML键名规范
  const cleanProviderName =
    providerName
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "_")
      .replace(/^_+|_+$/g, "") || "custom";

  return `model_provider = "${cleanProviderName}"
model = "${modelName}"
model_reasoning_effort = "high"
disable_response_storage = true

[model_providers.${cleanProviderName}]
name = "${cleanProviderName}"
base_url = "${baseUrl}"
wire_api = "responses"
requires_openai_auth = true`;
}

export const codexProviderPresets: CodexProviderPreset[] = [
  {
    name: "兔子线路",
    websiteUrl: "",
    apiKeyUrl: "https://api.tu-zi.com",
    auth: { OPENAI_API_KEY: "" },
    config: generateThirdPartyConfig(
      "tuzi_route",
      "https://api.tu-zi.com",
      "gpt-5.5",
    ),
    category: "aggregator",
    endpointCandidates: ["https://api.tu-zi.com"],
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
  {
    name: "coding",
    websiteUrl: "",
    apiKeyUrl: "https://store.tu-zi.com/cat/11",
    auth: { OPENAI_API_KEY: "" },
    config: generateThirdPartyConfig(
      "coding",
      "https://api.tu-zi.com/coding",
      "gpt-5.5",
    ),
    category: "aggregator",
    endpointCandidates: ["https://api.tu-zi.com/coding"],
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
  {
    name: "gaccode",
    websiteUrl: "",
    apiKeyUrl: "https://store.tu-zi.com/cat/1",
    auth: { OPENAI_API_KEY: "" },
    config: generateThirdPartyConfig(
      "gaccode",
      "https://gaccode.com/codex/v1",
      "gpt-5.5",
    ),
    category: "aggregator",
    endpointCandidates: ["https://gaccode.com/codex/v1"],
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
];
