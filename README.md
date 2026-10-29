# Pulsar Launcher

**Автор / Author: Znikson** · ранний доступ / early access `v0.1.0`

Pulsar Launcher is an open-source Windows desktop launcher for Minecraft Java Edition, plus a bilingual public website. This is an early release: it installs and launches real Vanilla and Fabric instances, but it is not a finished replacement for every launcher.

Pulsar Launcher — открытый Windows-лаунчер Minecraft Java Edition и двуязычный сайт. Это ранний релиз: он устанавливает и запускает настоящие Vanilla- и Fabric-сборки, но пока не заменяет все существующие лаунчеры.

## Downloads / Загрузки

- **Windows x64 installer (.exe):** [v0.1.0 release](https://github.com/zniks0n/Pulsar-Launcher/releases/download/v0.1.0/Pulsar-Launcher-0.1.0-x64.exe)
- **Windows portable (.zip):** [v0.1.0 release](https://github.com/zniks0n/Pulsar-Launcher/releases/download/v0.1.0/Pulsar-Launcher-0.1.0-x64.zip)
- The portable `.exe`, release notes and `SHA256SUMS.txt` are on the same [GitHub release](https://github.com/zniks0n/Pulsar-Launcher/releases/tag/v0.1.0).

The first Windows binaries are **unsigned**. Windows SmartScreen may show an unknown-publisher warning. Review the release notes and verify the supplied SHA-256 checksums before running the files.

Первый Windows-релиз **не подписан**. SmartScreen может показать предупреждение о неизвестном издателе. Перед запуском прочитайте описание релиза и проверьте SHA-256.

## What works / Что уже работает

- Isolated Minecraft Java instances with real official version metadata, game libraries and assets; Vanilla and Fabric installation; cancellable progress.
- Import of compatible local Minecraft/Prism-style folders, with common account/credential files excluded from the import.
- Modrinth search and compatible Fabric/Vanilla mod download, hash verification and local enable/disable.
- Offline profiles and third-party Yggdrasil login flows; passwords are not persisted. Online tokens are saved only when the operating system's protected storage is available.
- Java/version compatibility validation, memory settings, language (EN/RU), themes, accent colors, local crash reports and offline crash diagnostics.
- Optional AI-assisted crash explanation opens a user-selected external assistant only after a confirmation step; Pulsar does not upload the crash report.

## Not included yet / Пока не реализовано

Microsoft account/Xbox authentication, Bedrock, Forge/NeoForge/Quilt installation, full migrations from every launcher, Discord Rich Presence, built-in auto-updater and quest/progress integrations are not in this v0.1.0 release. These are not presented as working product features. The web page marks roadmap items accordingly.

В v0.1.0 пока нет входа Microsoft/Xbox, Bedrock, установки Forge/NeoForge/Quilt, импорта из всех лаунчеров, Discord Rich Presence, встроенного автообновления и интеграций достижений/квестов. Эти возможности не выдаются за готовые.

## Project links / Ссылки проекта

- Website / Сайт: [pulsar-bq4wlerh.manus.space](https://pulsar-bq4wlerh.manus.space/)
- GitHub source and releases / Исходники и релизы: [zniks0n/Pulsar-Launcher](https://github.com/zniks0n/Pulsar-Launcher)
- Author profile / Профиль автора: [github.com/zniks0n](https://github.com/zniks0n)
- Discord invitation / Приглашение Discord: [discord.gg/S4Xjmh9wQw](https://discord.gg/S4Xjmh9wQw)
- Development support / Поддержка: [DonationAlerts](https://www.donationalerts.com/r/zn1kson)

## Build / Сборка

Requires Node.js 22+ and pnpm. The desktop app is in `launcher/`; the public website source is at the repository root.

```sh
# Website
pnpm install
pnpm run check
pnpm run build
pnpm run dev

# Desktop app
cd launcher
pnpm install
pnpm run check
pnpm test
pnpm dev
pnpm run build:win
```

`pnpm run build:win` creates an NSIS installer, a portable executable and a portable ZIP for Windows x64. An Authenticode signing certificate is not included. See [desktop notes](launcher/README.md), [website build](docs/BUILD.md) and [installation notes](docs/INSTALL.md).

`build:win` создаёт NSIS-установщик, портативный `.exe` и ZIP для Windows x64. Сертификат Authenticode не включён. Инструкции: [desktop-приложение](launcher/README.md), [сборка сайта](docs/BUILD.md), [установка](docs/INSTALL.md).

## Discord helper / Настройка Discord

The optional `discord/setup-server.mjs` configures channels and moderation for an **existing** guild; it does not create a Discord server. Znikson manages the server and invitation. If using the helper, begin with [its safety and setup guide](discord/README.md) and keep the bot token in a local, ignored `.env` file.

Необязательный `discord/setup-server.mjs` настраивает каналы и модерацию в **уже созданном** сервере; он не создаёт сам сервер. Сервером и приглашением управляет Znikson. Для helper сначала прочитайте [инструкцию и меры безопасности](discord/README.md); храните токен бота только в локальном игнорируемом `.env`.

## License / Лицензия

MIT. Pulsar is an independent community project and is not affiliated with Mojang Studios or Microsoft.
