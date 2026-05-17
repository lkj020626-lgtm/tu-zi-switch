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
    name: "tuzi",
    nameKey: "providerForm.presets.tuzi",
    websiteUrl: "https://api.tu-zi.com",
    apiKeyUrl: "https://api.tu-zi.com",
    settingsConfig: {
      baseUrl: "https://api.tu-zi.com",
      apiKey: "",
      api: "anthropic-messages",
      models: [
        {
          id: "claude-opus-4-7",
          name: "Claude Opus 4.7",
          contextWindow: 1000000,
          cost: { input: 5, output: 25 },
        },
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
    iconColor: "#FF6B9D",
    theme: {
      backgroundColor: "#FF6B9D",
      textColor: "#FFFFFF",
    },
    templateValues: {
      apiKey: {
        label: "API Key",
        placeholder: "",
        editorValue: "",
      },
    },
    suggestedDefaults: {
      model: {
        primary: "tuzi/claude-opus-4-7",
        fallbacks: ["tuzi/claude-sonnet-4-6"],
      },
      modelCatalog: {
        "tuzi/claude-opus-4-7": { alias: "Opus" },
        "tuzi/claude-sonnet-4-6": { alias: "Sonnet" },
      },
    },
  },
  {
    name: "TheRouter",
    websiteUrl: "https://therouter.ai",
    apiKeyUrl: "https://dashboard.therouter.ai",
    settingsConfig: {
      baseUrl: "https://api.therouter.ai/v1",
      apiKey: "",
      api: "openai-completions",
      models: [
        {
          id: "anthropic/claude-sonnet-4.6",
          name: "Claude Sonnet 4.6",
          contextWindow: 200000,
          cost: { input: 3, output: 15 },
        },
        {
          id: "openai/gpt-5.3-codex",
          name: "GPT-5.3 Codex",
          contextWindow: 200000,
          cost: { input: 5, output: 15 },
        },
        {
          id: "openai/gpt-5.2",
          name: "GPT-5.2",
          contextWindow: 128000,
          cost: { input: 5, output: 15 },
        },
        {
          id: "google/gemini-3-flash-preview",
          name: "Gemini 3 Flash",
          contextWindow: 1000000,
          cost: { input: 0.5, output: 1.5 },
        },
      ],
    },
    category: "aggregator",
    suggestedDefaults: {
      model: {
        primary: "therouter/anthropic/claude-sonnet-4.6",
        fallbacks: [
          "therouter/openai/gpt-5.2",
          "therouter/google/gemini-3-flash-preview",
        ],
      },
    },
  },
];
