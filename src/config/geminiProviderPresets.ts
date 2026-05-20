import type { ProviderCategory } from "@/types";

/**
 * Gemini 预设供应商的视觉主题配置
 */
export interface GeminiPresetTheme {
  /** 图标类型：'gemini' | 'generic' | 'tuzi' */
  icon?: "gemini" | "generic" | "tuzi";
  /** 背景色（选中状态），支持 hex 颜色 */
  backgroundColor?: string;
  /** 文字色（选中状态），支持 hex 颜色 */
  textColor?: string;
}

export interface GeminiProviderPreset {
  name: string;
  nameKey?: string; // i18n key for localized display name
  websiteUrl: string;
  apiKeyUrl?: string;
  settingsConfig: object;
  baseURL?: string;
  model?: string;
  description?: string;
  category?: ProviderCategory;
  endpointCandidates?: string[];
  theme?: GeminiPresetTheme;
  // 图标配置
  icon?: string; // 图标名称
  iconColor?: string; // 图标颜色
}

export const geminiProviderPresets: GeminiProviderPreset[] = [
  {
    name: "兔子线路",
    websiteUrl: "",
    apiKeyUrl: "https://api.tu-zi.com",
    settingsConfig: {
      env: {
        GOOGLE_GEMINI_BASE_URL: "https://api.tu-zi.com",
        GEMINI_MODEL: "gemini-3.1-pro",
      },
    },
    baseURL: "https://api.tu-zi.com",
    model: "gemini-3.1-pro",
    category: "aggregator",
    endpointCandidates: ["https://api.tu-zi.com"],
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
];
