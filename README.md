# Pulsar Launcher

**Author: Znikson.** A modern home for Minecraft instances, mods and worlds.

**Автор: Znikson.** Современный дом для инстансов, модов и миров Minecraft.

> This repository currently contains a bilingual public website and an optional Discord server setup helper. It does **not** contain a finished desktop launcher, installer or portable launcher release. No binaries or Discord invite are claimed until they actually exist.
>
> Сейчас проект содержит двуязычный публичный сайт и вспомогательный скрипт настройки Discord-сервера. Готового десктопного лаунчера, установщика и портативного релиза здесь **пока нет**. Бинарники и приглашение в Discord не выдаются за уже опубликованные.

## Website / Сайт

The responsive landing page supports English and Russian, detects browser language, remembers a manual selection in `localStorage`, and presents the product roadmap, release status, community, author and support sections. Download and Discord actions show honest “coming soon” states until real files and an invite are configured; the site does not invent file sizes, dates, invite URLs or member counts.

Адаптивный лендинг поддерживает русский и английский, выбирает язык по локали браузера и сохраняет выбор пользователя в `localStorage`. На странице есть план продукта, статусы релизов, блоки сообщества, автора и поддержки. До настройки настоящих файлов и приглашения кнопки показывают честное состояние «скоро»; вымышленных размеров, дат, ссылок и числа участников нет.

## Run and build / Запуск и сборка

Requires Node.js 22 or later. The website has no third-party runtime dependencies.

Требуется Node.js 22 или новее. Сайт не использует внешние runtime-зависимости.

```sh
pnpm run dev
pnpm run build
pnpm run check
```

The dev server runs at `http://localhost:3000`; the static build is placed in `dist/`.

Сервер разработки доступен на `http://localhost:3000`; статическая сборка создаётся в `dist/`.

## Project structure / Структура проекта

The website source stays at the repository root because this folder is the deployable Webdev site. `scripts/` contains its local server/build steps, `discord/` contains the standalone server setup helper and safe env example, and `docs/` contains build/API notes. There is no `launcher/` directory because a desktop application has not been implemented; the website/helper source is not a launcher release.

Исходники сайта находятся в корне репозитория, потому что именно эта папка публикуется как Webdev-сайт. В `scripts/` лежат локальный сервер и сборка, в `discord/` — отдельный helper настройки сервера и безопасный пример env, в `docs/` — инструкции и API-заметки. Каталога `launcher/` пока нет: desktop-приложение не реализовано, этот исходный код не является его релизом.

## Discord helper / Помощник Discord

`discord/setup-server.mjs` creates missing Russian-language categories, roles, channels, pinned starter posts, read-only information channels, three voice rooms, basic AutoMod anti-spam rules and an invite in an existing server. It uses Node's built-in `fetch`; see [Discord setup instructions](discord/README.md) for safe one-time setup. The script cannot create the Discord server itself; the owner must create it, install the bot and complete Discord Community onboarding.

Файл `discord/setup-server.mjs` создаёт отсутствующие русскоязычные категории, роли, текстовые/форумные/голосовые каналы, закреплённые стартовые посты, информационные каналы только для чтения, три голосовые комнаты, базовые AutoMod-правила против спама и приглашение в уже созданный сервер. Используется встроенный Node `fetch`; безопасный запуск описан в [инструкции Discord](discord/README.md). Сам Discord-сервер создаёт владелец, устанавливает бота и завершает настройку Community Onboarding.

## Project links / Ссылки проекта

- Website / Сайт: [pulsar-bq4wlerh.manus.space](https://pulsar-bq4wlerh.manus.space)
- GitHub: `[GITHUB_ZNIKSON]` — replace only after a real public repository exists / заменить после появления публичного репозитория
- Discord: `[DISCORD_ZNIKSON]` — replace only after the server invite is available / заменить после появления приглашения
- Development support / Поддержка разработки: [DonationAlerts](https://www.donationalerts.com/r/zn1kson)

## Publish source to GitHub / Публикация исходников на GitHub

The public GitHub connector is not enabled in this session, so no repository or release is claimed. The downloadable source ZIP contains the current website and Discord setup helper, **not** the unfinished desktop launcher. After extracting it, you can publish this website/helper source with GitHub CLI:

В сессии нет разрешённого публичного GitHub-подключения, поэтому репозиторий и релиз не выдаются за созданные. ZIP с исходниками содержит текущий сайт и Discord setup helper, **но не** незавершённый desktop launcher. После распаковки опубликовать эти исходники можно через GitHub CLI:

```sh
gh auth login
git init -b main
git add .
git commit -m "Add Pulsar website and Discord setup helper"
gh repo create Pulsar-Launcher --public --source=. --remote=origin --push
```

The resulting repository would contain only the site/helper until the launcher is actually implemented. Replace `[GITHUB_ZNIKSON]` with the real URL and set `PULSAR_GITHUB_URL` / `PULSAR_RELEASES_URL` in `discord/.env` only when those destinations exist.

Этот репозиторий будет содержать только сайт/helper, пока сам лаунчер не реализован. Замените `[GITHUB_ZNIKSON]` настоящим адресом и задавайте `PULSAR_GITHUB_URL` / `PULSAR_RELEASES_URL` в `discord/.env` только после появления этих адресов.

The website defines the single requested `DONATE_URL` constant in `app.js`; the Discord helper defines the same destination once in `discord/setup-server.mjs`.

На сайте единственная требуемая константа `DONATE_URL` объявлена в `app.js`; скрипт Discord использует тот же адрес, объявленный ровно один раз в `discord/setup-server.mjs`.

## Author / Автор

**Znikson**
