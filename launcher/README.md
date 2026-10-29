# Pulsar Launcher desktop / Desktop-приложение

Pulsar Launcher is an early-access Electron application for Windows x64. The release contains working Minecraft Java Vanilla/Fabric installation and launch, isolated instances, compatible Modrinth mod management, local/offline profiles, local crash diagnostics, and cancellable installation of a matching official Mojang Java runtime when necessary. It is not yet a complete all-loader/all-account replacement for other launchers.

Pulsar Launcher — раннее desktop-приложение на Electron для Windows x64. В релизе работают установка и запуск Minecraft Java Vanilla/Fabric, отдельные инстансы, управление совместимыми модами Modrinth, локальные/оффлайн-профили, локальная диагностика ошибок и отменяемая установка подходящей официальной Java от Mojang при необходимости. Это пока не полная замена лаунчерам со всеми загрузчиками и аккаунтами.

## Build / Сборка

Requires Node.js 22+ and pnpm. Install dependencies from this directory:

```sh
pnpm install
pnpm run check
pnpm test
pnpm dev
pnpm run pack:dir
pnpm run build:win
```

`build:win` creates an NSIS installer, portable `.exe` and portable `.zip` for x64 Windows. The package is unsigned; a signing certificate is intentionally not embedded in source or artifacts.

## Functional scope / Возможности и ограничения

**Included:** official Mojang version metadata and game file installation through XMCL; Vanilla and Fabric; automatic fallback to the official Java runtime matching the installed Minecraft version when a compatible system Java is unavailable; per-instance runtime path, download progress and cancellation; explicitly configured Java executables are not overwritten; separate instance directories; compatible-folder import; Modrinth search, exact compatibility filters, release SHA-512 verification when available (SHA-1 fallback otherwise), and local mod toggles; offline profiles and supported Yggdrasil providers; OS-backed token protection when available; runtime, memory, appearance, EN/RU settings; local crash log, offline diagnosis, copy/save/open actions; optional user-confirmed AI-assistant link. Pulsar does not automatically transmit crash logs.

**Not included in v0.2.0:** Microsoft/Xbox account authentication, Bedrock, Forge/NeoForge/Quilt installation, Discord Rich Presence, built-in auto-updating, full import of every launcher's account/settings model, quest/progress integrations and any online multiplayer-server management.

**Supported identity modes:** Offline profiles can join offline-mode servers only. Yggdrasil login sends the credentials to the HTTPS provider selected by the user; the password is not saved, and launching that profile requires a matching authlib-injector JAR. Microsoft login is deliberately absent; Pulsar never requests a Microsoft password.

## Security notes / Безопасность

The Electron renderer has no Node integration, uses context isolation and sandboxing, and communicates through a small preload bridge. Account tokens are saved only when OS-protected storage is available. Mojang runtime installation checks SHA-1 values from official version/runtime metadata, accepts runtime file links only from official Mojang/Minecraft HTTPS domains, rejects paths outside the per-user runtime directory, and supports cancellation. Mod downloads are constrained to compatible releases and checked against Modrinth hashes. Imported common account/credential files are excluded. Review third-party provider URLs and the unsigned release before use.

Renderer Electron работает без Node integration, с context isolation и sandbox, через ограниченный preload bridge. Токены сохраняются только при доступности OS-protected storage. Загрузка Java сверяет SHA-1 из официальных метаданных Mojang, принимает ссылки только с официальных HTTPS-доменов Mojang/Minecraft, запрещает выход путей за каталог runtime и поддерживает отмену. Моды выбираются по совместимой версии и сверяются по хешу Modrinth. Типовые файлы учётных данных исключаются при импорте. Проверяйте URL внешних провайдеров и неподписанный релиз.

See `PLAN.md` and `RESEARCH.md` for architecture and verified technical-source notes.
