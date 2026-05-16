//! 官方供应商种子数据
//!
//! 启动时调用 `Database::init_default_official_providers` 把这些条目
//! 写入 `providers` 表，让所有用户都能看到一个"一键切回官方"的入口。
//!
//! 字段与前端预设保持一致，参见：
//! - `src/config/claudeProviderPresets.ts`（"Claude Official"）
//! - `src/config/codexProviderPresets.ts`（"OpenAI Official"）
//! - `src/config/geminiProviderPresets.ts`（"Google Official"）

use crate::app_config::AppType;

pub(crate) const CLAUDE_DESKTOP_OFFICIAL_PROVIDER_ID: &str = "claude-desktop-official";

/// 单条官方供应商种子定义。
pub(crate) struct OfficialProviderSeed {
    pub id: &'static str,
    pub app_type: AppType,
    pub name: &'static str,
    pub website_url: &'static str,
    pub icon: &'static str,
    pub icon_color: &'static str,
    /// settings_config 的 JSON 字符串，每个 app 结构不同。
    pub settings_config_json: &'static str,
}

/// Claude / Claude Desktop / Codex / Gemini 的官方预设。
///
/// id 固定，便于幂等检查；name 直接用英文原名（与前端预设一致），不做 i18n。
pub(crate) const OFFICIAL_SEEDS: &[OfficialProviderSeed] = &[
    OfficialProviderSeed {
        id: "tuzi-claude",
        app_type: AppType::Claude,
        name: "tuzi-Claude",
        website_url: "https://api.tu-zi.com",
        icon: "tuzi",
        icon_color: "#FF6B9D",
        settings_config_json: r#"{"env":{"ANTHROPIC_BASE_URL":"https://gaccode.com/claudecode","ANTHROPIC_AUTH_TOKEN":""}}"#,
    },
    OfficialProviderSeed {
        id: "tuzi-codex",
        app_type: AppType::Codex,
        name: "tuzi-Codex",
        website_url: "https://api.tu-zi.com",
        icon: "tuzi",
        icon_color: "#FF6B9D",
        settings_config_json: r#"{"auth":{"OPENAI_API_KEY":""},"config":"model_provider = \"tuzi\"\nmodel = \"gpt-5.4\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.tuzi]\nname = \"tuzi\"\nbase_url = \"https://gaccode.com/codex/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true"}"#,
    },
    OfficialProviderSeed {
        id: "tuzi-gemini",
        app_type: AppType::Gemini,
        name: "tuzi-Gemini",
        website_url: "https://api.tu-zi.com",
        icon: "tuzi",
        icon_color: "#FF6B9D",
        settings_config_json: r#"{"env":{},"config":{}}"#,
    },
];

/// 判断给定的 provider id 是否属于内置官方种子。
///
/// 单一事实源：直接扫描 `OFFICIAL_SEEDS`，避免在多处重复维护 id 列表。
pub(crate) fn is_official_seed_id(id: &str) -> bool {
    OFFICIAL_SEEDS.iter().any(|seed| seed.id == id)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn official_seeds_include_tuzi() {
        let seed = OFFICIAL_SEEDS
            .iter()
            .find(|seed| seed.id == "tuzi-claude")
            .expect("tuzi-claude seed");

        assert_eq!(seed.app_type, AppType::Claude);
        assert!(is_official_seed_id("tuzi-claude"));
        assert!(is_official_seed_id("tuzi-codex"));
        assert!(is_official_seed_id("tuzi-gemini"));
    }
}
