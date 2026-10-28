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

## Discord helper / Помощник Discord

`discord/setup-server.mjs` creates missing categories, roles, channels, forum starter posts, read-only announcements/rules/downloads, three voice rooms and an invite in an existing server. It uses Node's built-in `fetch`; see [Discord setup instructions](discord/README.md) for safe one-time setup. The script cannot create the Discord server itself; the owner must create the server and invite the bot. AutoMod and Community onboarding remain Discord-side configuration.

Файл `discord/setup-server.mjs` создаёт отсутствующие категории, роли, текстовые/форумные/голосовые каналы, стартовые посты, каналы объявлений/правил/загрузок только для чтения и постоянное приглашение в уже созданный сервер. Используется встроенный Node `fetch`; безопасный запуск описан в [инструкции Discord](discord/README.md). Сам Discord-сервер создаёт владелец. AutoMod и Community onboarding настраиваются отдельно в Discord.

## Project links / Ссылки проекта

- Website / Сайт: [pulsar-bq4wlerh.manus.space](https://pulsar-bq4wlerh.manus.space)
- GitHub: `[GITHUB_ZNIKSON]` — replace only after a real public repository exists / заменить после появления публичного репозитория
- Discord: `[DISCORD_ZNIKSON]` — replace only after the server invite is available / заменить после появления приглашения
- Development support / Поддержка разработки: [DonationAlerts](https://www.donationalerts.com/r/zn1kson)

The website defines the single requested `DONATE_URL` constant in `app.js`; the Discord helper defines the same destination once in `discord/setup-server.mjs`.

На сайте единственная требуемая константа `DONATE_URL` объявлена в `app.js`; скрипт Discord использует тот же адрес, объявленный ровно один раз в `discord/setup-server.mjs`.

## Author / Автор

**Znikson**
