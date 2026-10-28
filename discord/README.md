# Pulsar Discord setup helper

This helper provisions channels and roles in an **existing** Discord server. Discord bots cannot create the server itself; the owner must create a guild in Discord, create a bot application, invite the bot, then run the script. It uses only Node.js 22 built-ins, creates missing items, preserves existing channels and roles, seeds starter messages, and prints a permanent human invite link. Running it again does not delete existing content.

Этот скрипт создаёт роли и каналы в **уже существующем** сервере Discord. Бот не может создать сам сервер: владелец должен создать его, зарегистрировать приложение-бот, пригласить бота и запустить скрипт. Зависимости не нужны: используется Node.js 22. Скрипт создаёт отсутствующие элементы, сохраняет существующие, добавляет стартовые сообщения и выводит постоянную ссылку для участников. Повторный запуск ничего не удаляет.

## One-time setup / Первоначальная настройка

1. Create the Discord server and bot application in Discord. Add a bot user in the Developer Portal and copy its token privately. Never paste the token into chat or commit it.
2. Set `DISCORD_APPLICATION_ID` locally, then generate the bot-install link **before** the bot is in the server:

   ```sh
   DISCORD_APPLICATION_ID=your-app-id pnpm run discord:invite
   ```

   Open the printed link, choose the existing Pulsar server, and grant the permissions displayed by the OAuth dialog. The helper requires Manage Channels, Manage Roles, Manage Guild, View Channel, Send Messages, Send Messages in Threads, Read Message History, Manage Messages, Attach Files, Connect, Speak, Create Instant Invite, Kick Members, Ban Members and Moderate Members. Review the requested permission screen before approving.
3. Copy `.env.example` to `.env` in this directory and fill in `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`, your user ID in `DISCORD_OWNER_ID`, and the application ID in `DISCORD_APPLICATION_ID`. Keep `.env` private; Git ignores it. The Owner role is created even if no owner ID is provided; it is assigned only when `DISCORD_OWNER_ID` is set.
4. From the project root, load environment variables and run `pnpm run discord:setup`. On macOS/Linux: `set -a && source discord/.env && set +a && pnpm run discord:setup`. In PowerShell, set `$env:DISCORD_BOT_TOKEN`, `$env:DISCORD_GUILD_ID`, `$env:DISCORD_OWNER_ID`, `$env:DISCORD_APPLICATION_ID`, then run `pnpm run discord:setup`.
5. The script prints a permanent invite URL for human members. Review role order, permissions, safety settings and community onboarding in Discord before publishing the invite. Discord may require extra owner-side steps for Community features or AutoMod.

## Что создаёт скрипт

It creates announcement, rules and download channels (read-only for members), general chat, launcher discussion, screenshots, mods/worlds, suggestion/help/bug-report forums, a development-support channel, three voice rooms, private team chat and moderation log. Roles: Owner, Developer, Moderator, Helper, Tester, Booster and Player. Private team channels are restricted to Owner/Developer/Moderator, with access for the setup bot so it can complete provisioning.

Создаются каналы объявлений, правил и загрузок (только для чтения участников), общий чат, обсуждение лаунчера, скриншоты, моды/миры, форумы предложений, помощи и ошибок, поддержка разработки, три голосовые комнаты, закрытый чат команды и журнал модерации. Роли: Владелец, Разработчик, Модератор, Помощник, Тестировщик, Бустер и Игрок. Закрытые каналы видны команде и самому боту, чтобы тот мог завершить настройку.

`PULSAR_SITE_URL` defaults to the published website. Set `PULSAR_GITHUB_URL` only after a real public repository exists. Development support points to the requested DonationAlerts URL, held in the single `DONATE_URL` constant in `setup-server.mjs`.

`PULSAR_SITE_URL` по умолчанию указывает на сайт. Указывайте `PULSAR_GITHUB_URL` только после создания настоящего публичного репозитория. Поддержка ведёт на требуемый адрес DonationAlerts через одну константу `DONATE_URL` в `setup-server.mjs`.

The helper does not enable Discord AutoMod or Community onboarding and cannot publish launcher binaries. Review Discord's Safety Setup, then add actual release and invite links to the website after those items exist.

Скрипт не включает AutoMod и Community Onboarding и не публикует бинарники лаунчера. Проверьте настройки безопасности Discord и добавьте в сайт реальные ссылки на приглашение и релизы, когда они появятся.
