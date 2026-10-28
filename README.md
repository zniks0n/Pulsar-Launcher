# Pulsar Launcher

A modern home for Minecraft instances, mods and worlds. **Author: Znikson.**

Современный дом для инстансов, модов и миров Minecraft. **Автор: Znikson.**

> This repository currently contains the public-facing website project. The desktop launcher, downloadable release binaries and Discord server are separate deliverables and are not represented as finished here.
>
> Сейчас в репозитории находится сайт проекта. Десктопный лаунчер, файлы релиза и Discord-сервер — отдельные задачи; этот сайт не выдаёт их за уже готовые.

## Website / Сайт

The bilingual landing page supports English and Russian, remembers the selected language in `localStorage`, presents roadmap features, and includes download, community, author and support sections. The initial installer, portable archive and Discord invitation are not published yet; the page reports this instead of inventing links, sizes or member counts.

Двуязычный лендинг поддерживает русский и английский, сохраняет выбор языка в `localStorage`, описывает планируемые возможности и содержит блоки скачивания, сообщества, автора и поддержки. Установщик, портативный архив и приглашение в Discord пока не опубликованы; сайт не подменяет их вымышленными ссылками, размерами или числом участников.

## Run / Запуск

Requires Node.js 22 or later. There are no third-party runtime dependencies.

Требуется Node.js 22 или новее. Внешних runtime-зависимостей нет.

```sh
pnpm run dev
```

Open `http://localhost:3000`. Build the static site into `dist/` with `pnpm run build`; run source checks with `pnpm run check`.

Откройте `http://localhost:3000`. Для сборки статического сайта в `dist/` выполните `pnpm run build`; проверки исходников запускаются через `pnpm run check`.

## Project links / Ссылки проекта

- GitHub: `[GITHUB_ZNIKSON]` (replace after the public repository is created / заменить после создания публичного репозитория)
- Discord: `[DISCORD_ZNIKSON]` (replace after the community invite exists / заменить после создания приглашения сообщества)
- Development support / Поддержать разработку: [DonationAlerts](https://www.donationalerts.com/r/zn1kson)

The `DONATE_URL` constant is defined once at the top of `app.js`.

Константа `DONATE_URL` объявлена один раз в начале `app.js`.

## Author / Автор

**Znikson**
