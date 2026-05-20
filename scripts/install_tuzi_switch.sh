#!/usr/bin/env bash
set -euo pipefail

REPO="${TUZI_SWITCH_REPO:-tuziapi/tuzi-switch}"
TAG="${TUZI_SWITCH_TAG:-v1.0.0}"
TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

release_path="latest"
if [[ "$TAG" != "latest" ]]; then
  release_path="tags/${TAG}"
fi

release_json="$TMP_DIR/release.json"
curl -fsSL -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/${REPO}/releases/${release_path}" \
  -o "$release_json"

asset_url="$(
  python3 - "$release_json" "$(uname -s)" "$(uname -m)" <<'PY'
import json
import platform
import sys

release_path, os_name, machine = sys.argv[1:4]
with open(release_path, "r", encoding="utf-8") as f:
    release = json.load(f)

assets = release.get("assets", [])
names = [asset.get("name", "") for asset in assets]

def arch_tokens(value: str) -> list[str]:
    value = value.lower()
    if value in {"arm64", "aarch64"}:
        return ["arm64", "aarch64"]
    if value in {"x86_64", "amd64"}:
        return ["x86_64", "amd64", "x64"]
    return [value]

def matches(asset_name: str, allowed_exts: tuple[str, ...]) -> bool:
    lower = asset_name.lower()
    return any(lower.endswith(ext) for ext in allowed_exts)

def arch_match(asset_name: str) -> bool:
    lower = asset_name.lower()
    tokens = arch_tokens(machine)
    return any(token in lower for token in tokens) or "universal" in lower

preferred_exts = []
if os_name == "Darwin":
    preferred_exts = [".zip", ".dmg"]
elif os_name == "Linux":
    preferred_exts = [".appimage", ".deb", ".rpm"]
else:
    raise SystemExit(f"Unsupported platform: {os_name}")

selected = None
for ext in preferred_exts:
    for asset in assets:
        name = asset.get("name", "")
        if not matches(name, (ext,)):
            continue
        if arch_match(name):
            selected = asset
            break
    if selected is not None:
        break

if selected is None:
    for ext in preferred_exts:
        for asset in assets:
            name = asset.get("name", "")
            if matches(name, (ext,)):
                selected = asset
                break
        if selected is not None:
            break

if selected is None:
    raise SystemExit("No installer asset found in the release")

print(selected["browser_download_url"])
PY
)"

asset_name="${asset_url##*/}"
asset_file="$TMP_DIR/$asset_name"
curl -fL "$asset_url" -o "$asset_file"

case "${asset_name,,}" in
  *.zip)
    unzip -q "$asset_file" -d "$TMP_DIR/unpacked"
    app_path="$(find "$TMP_DIR/unpacked" -name '*.app' -type d | head -n 1)"
    if [[ -z "${app_path:-}" ]]; then
      echo "No .app bundle found inside the macOS archive" >&2
      exit 1
    fi

    dest_dir="/Applications"
    if [[ ! -w "$dest_dir" ]]; then
      dest_dir="$HOME/Applications"
    fi
    mkdir -p "$dest_dir"

    app_name="$(basename "$app_path")"
    rm -rf "$dest_dir/$app_name"
    if command -v ditto >/dev/null 2>&1; then
      ditto "$app_path" "$dest_dir/$app_name"
    else
      cp -R "$app_path" "$dest_dir/$app_name"
    fi

    if command -v xattr >/dev/null 2>&1; then
      xattr -dr com.apple.quarantine "$dest_dir/$app_name" || true
    fi

    echo "Installed to $dest_dir/$app_name"
    ;;
  *.appimage)
    install_root="$HOME/.local/share/tuzi-switch"
    bin_root="$HOME/.local/bin"
    install_path="$install_root/tuzi-switch.AppImage"
    mkdir -p "$install_root" "$bin_root"
    mv "$asset_file" "$install_path"
    chmod +x "$install_path"
    ln -sf "$install_path" "$bin_root/tuzi-switch"
    echo "Installed to $install_path"
    echo "Symlink created at $bin_root/tuzi-switch"
    ;;
  *)
    echo "Unsupported installer asset: $asset_name" >&2
    exit 1
    ;;
esac
