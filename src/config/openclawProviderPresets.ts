/**
 * OpenClaw provider presets configuration
 * OpenClaw uses models.providers structure with custom provider configs
 */
import type {
  ProviderCategory,
  OpenClawProviderConfig,
  OpenClawDefaultModel,
} from "../types";
import type { PresetTheme, TemplateValueConfig } from "./claudeProviderPresets";

/** Suggested default model configuration for a preset */
export interface OpenClawSuggestedDefaults {
  /** Default model config to apply (agents.defaults.model) */
  model?: OpenClawDefaultModel;
  /** Model catalog entries to add (agents.defaults.models) */
  modelCatalog?: Record<string, { alias?: string }>;
}

export interface OpenClawProviderPreset {
  name: string;
  nameKey?: string; // i18n key for localized display name
  websiteUrl: string;
  apiKeyUrl?: string;
  /** OpenClaw settings_config structure */
  settingsConfig: OpenClawProviderConfig;
  isOfficial?: boolean;
  category?: ProviderCategory;
  /** Template variable definitions */
  templateValues?: Record<string, TemplateValueConfig>;
  /** Visual theme config */
  theme?: PresetTheme;
  /** Icon name */
  icon?: string;
  /** Icon color */
  iconColor?: string;
  /** Mark as custom template (for UI distinction) */
  isCustomTemplate?: boolean;
  /** Suggested default model configuration */
  suggestedDefaults?: OpenClawSuggestedDefaults;
}

/**
 * OpenClaw API protocol options
 * @see https://github.com/openclaw/openclaw/blob/main/docs/gateway/configuration.md
 */
export const openclawApiProtocols = [
  { value: "openai-completions", label: "OpenAI Completions" },
  { value: "openai-responses", label: "OpenAI Responses" },
  { value: "anthropic-messages", label: "Anthropic Messages" },
  { value: "google-generative-ai", label: "Google Generative AI" },
  { value: "bedrock-converse-stream", label: "AWS Bedrock" },
] as const;

/**
 * OpenClaw provider presets list
 */
export const openclawProviderPresets: OpenClawProviderPreset[] = [
  {
    name: "codex-tuzi",
    websiteUrl: "",
    apiKeyUrl: "https://api.tu-zi.com",
    settingsConfig: {
      baseUrl: "https://api.tu-zi.com/v1",
      apiKey: "",
      api: "openai-completions",
      models: [
        {
          id: "openai/gpt-5.3-codex",
          name: "GPT-5.3 Codex",
          contextWindow: 200000,
          cost: { input: 5, output: 15 },
        },
      ],
    },
    category: "aggregator",
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
  {
    name: "codex-coding",
    websiteUrl: "",
    apiKeyUrl: "https://api.tu-zi.com/coding",
    settingsConfig: {
      baseUrl: "https://api.tu-zi.com/coding",
      apiKey: "",
      api: "openai-completions",
      models: [
        {
          id: "openai/gpt-5.3-codex",
          name: "GPT-5.3 Codex",
          contextWindow: 200000,
          cost: { input: 5, output: 15 },
        },
      ],
    },
    category: "aggregator",
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
  {
    name: "codex-gaccode",
    websiteUrl: "",
    apiKeyUrl: "https://store.tu-zi.com/cat/1",
    settingsConfig: {
      baseUrl: "https://gaccode.com/code/v1",
      apiKey: "",
      api: "openai-completions",
      models: [
        {
          id: "openai/gpt-5.3-codex",
          name: "GPT-5.3 Codex",
          contextWindow: 200000,
          cost: { input: 5, output: 15 },
        },
      ],
    },
    category: "aggregator",
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
  {
    name: "claude-tuzi",
    websiteUrl: "",
    apiKeyUrl: "https://api.tu-zi.com",
    settingsConfig: {
      baseUrl: "https://api.tu-zi.com/v1",
      apiKey: "",
      api: "anthropic-messages",
      models: [
        {
          id: "claude-sonnet-4-6",
          name: "Claude Sonnet 4.6",
          contextWindow: 1000000,
          cost: { input: 3, output: 15 },
        },
      ],
    },
    category: "aggregator",
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
  {
    name: "claude-gaccode",
    websiteUrl: "",
    apiKeyUrl: "https://store.tu-zi.com/cat/1",
    settingsConfig: {
      baseUrl: "https://gaccode.com/claudecode",
      apiKey: "",
      api: "anthropic-messages",
      models: [
        {
          id: "claude-sonnet-4-6",
          name: "Claude Sonnet 4.6",
          contextWindow: 1000000,
          cost: { input: 3, output: 15 },
        },
      ],
    },
    category: "aggregator",
    icon: "tuzi",
    theme: { icon: "tuzi" },
  },
];
