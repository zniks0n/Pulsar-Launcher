# Pulsar Launcher v0.2.0 — Early Access

**Author: Znikson** · Windows x64 · unsigned builds

## English

v0.2.0 adds automatic Java-runtime setup for Minecraft Java Edition. When the selected instance has no explicitly configured Java executable and the computer's Java is missing or too old, pressing **Play** downloads the official Mojang Java runtime component and major version required by that Minecraft version. The launcher shows download progress, allows cancellation, stores the runtime path on the instance, checks Mojang-provided SHA-1 metadata and refuses manifest paths, URLs or existing filesystem links that escape the managed runtime folder. A Java executable explicitly selected by the user is never silently replaced.

The runtime is downloaded into a private staging directory, checked, and moved under the per-user runtime root. A real Linux x64 installation of the Java 21.0.7 runtime was smoke-tested; the release build itself targets Windows x64. The 16 launcher unit tests and Electron source syntax checks pass.

The release includes the NSIS installer (`Pulsar-Launcher-0.2.0-x64.exe`), portable executable (`Pulsar-Launcher-0.2.0-portable.exe`), portable ZIP (`Pulsar-Launcher-0.2.0-x64.zip`), `SHA256SUMS.txt` and the clean source ZIP. Verify hashes before running an artifact. These Windows builds are unsigned; Windows may show an unknown-publisher warning.

Still not included: Microsoft/Xbox sign-in, Bedrock, Forge/NeoForge/Quilt, Discord Rich Presence, complete migrations from all launchers and built-in auto-update. Pulsar does not ask for a Microsoft password. Offline profiles are for offline-mode servers; third-party Yggdrasil login remains a separate provider flow.

## Русский

В v0.2.0 появилась автоматическая установка Java для Minecraft Java Edition. Если для инстанса не указан собственный Java executable, а системная Java отсутствует или слишком старая, при нажатии **Играть** лаунчер загружает официальный компонент и версию Java от Mojang, необходимые выбранной версии Minecraft. Показывается прогресс, загрузку можно отменить; путь сохраняется в настройках инстанса. Проверяются SHA-1 из метаданных Mojang; загрузки блокируются, если URL, путь или уже существующая файловая ссылка выходят за пределы папки runtime. Явно выбранная пользователем Java незаметно не заменяется.

Java сначала устанавливается во временную закрытую папку, проверяется и затем переносится в пользовательскую папку runtime. Проверена реальная установка Java 21.0.7 для Linux x64; сам релиз собран для Windows x64. Проходят 16 unit-тестов и проверка синтаксиса Electron-кода.

Релиз содержит NSIS-установщик (`Pulsar-Launcher-0.2.0-x64.exe`), портативный `.exe` (`Pulsar-Launcher-0.2.0-portable.exe`), portable ZIP (`Pulsar-Launcher-0.2.0-x64.zip`), `SHA256SUMS.txt` и чистый ZIP исходного кода. Перед запуском проверьте контрольные суммы. Сборки Windows не подписаны, поэтому может появиться предупреждение о неизвестном издателе.

Пока не входят: вход Microsoft/Xbox, Bedrock, Forge/NeoForge/Quilt, Discord Rich Presence, полный импорт из всех лаунчеров и встроенное автообновление. Pulsar не запрашивает пароль Microsoft. Оффлайн-профили подходят для серверов в offline-mode; вход Yggdrasil выполняется отдельно через выбранного пользователя провайдера.

- Website / Сайт: https://pulsar-bq4wlerh.manus.space/
- Source / Исходный код: https://github.com/zniks0n/Pulsar-Launcher
- Author / Автор: Znikson
- Support / Поддержка: https://www.donationalerts.com/r/zn1kson
