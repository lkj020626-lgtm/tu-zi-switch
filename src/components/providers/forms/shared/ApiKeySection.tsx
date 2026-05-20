import { useTranslation } from "react-i18next";
import ApiKeyInput from "../ApiKeyInput";
import type { ProviderCategory } from "@/types";

interface ApiKeySectionProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  category?: ProviderCategory;
  shouldShowLink: boolean;
  websiteUrl: string;
  placeholder?: {
    official: string;
    thirdParty: string;
  };
  disabled?: boolean;
  linkPlacement?: "below" | "right";
}

export function ApiKeySection({
  id,
  label,
  value,
  onChange,
  category,
  shouldShowLink,
  websiteUrl,
  placeholder,
  disabled,
  linkPlacement = "below",
}: ApiKeySectionProps) {
  const { t } = useTranslation();

  const defaultPlaceholder = {
    official: t("providerForm.apiKeyAutoFill", {
      defaultValue: "输入 API Key，将自动填充到配置",
    }),
    thirdParty: t("providerForm.apiKeyAutoFill", {
      defaultValue: "输入 API Key，将自动填充到配置",
    }),
  };

  const finalPlaceholder = placeholder || defaultPlaceholder;

  return (
    <div className="space-y-1">
      <ApiKeyInput
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={
          category === "official"
            ? finalPlaceholder.official
            : finalPlaceholder.thirdParty
        }
        disabled={disabled}
      />
      {shouldShowLink && websiteUrl ? (
        <div
          className={
            linkPlacement === "right"
              ? "flex justify-end pr-1 -mt-8 min-h-0"
              : "flex justify-end pr-1"
          }
        >
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {t("providerForm.getApiKey", {
              defaultValue: "获取 API Key",
            })}
          </a>
        </div>
      ) : null}
    </div>
  );
}
