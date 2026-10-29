# Pulsar Discord setup helper / Помощник настройки Discord

This helper provisions an **existing** Discord server. A bot cannot create the server itself: create the guild while signed into Znikson's Discord account if Znikson must be the actual server owner, then create the bot application and install it. If another person owns the guild, the script can create a `Владелец` role and try to assign it to `DISCORD_OWNER_ID`, but it cannot transfer guild ownership.

Скрипт настраивает **уже созданный** Discord-сервер. Бот не умеет создавать сервер: если Znikson должен быть настоящим владельцем, создайте сервер из его аккаунта Discord, затем создайте bot application и установите бота. Если сервер принадлежит другому человеку, скрипт создаст роль `Владелец` и попытается выдать её пользователю `DISCORD_OWNER_ID`, но не может передать владение сервером.

## One-time setup / Первоначальная настройка

1. In Discord, create the server and bot application. Add a bot user in the Developer Portal and copy its token privately. Never paste a token into chat, source code or Git.
2. Set the application ID locally and generate the OAuth install link before the bot has joined the server:

   ```sh
   DISCORD_APPLICATION_ID=your-app-id pnpm run discord:invite
   ```

   Open the printed link, choose the Pulsar server and review the permissions in Discord's confirmation screen. The helper needs Manage Channels, Manage Roles, Manage Guild, View Channel, Send Messages, Send Messages in Threads, Read Message History, Manage Messages, Attach Files, Connect, Speak, Create Instant Invite, Kick Members, Ban Members and Moderate Members. Approve only after checking the application and target server.
3. Copy `discord/.env.example` to `discord/.env` and fill in `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`, `DISCORD_APPLICATION_ID`, and Znikson's `DISCORD_OWNER_ID`. The local `.env` is ignored by Git. If Discord's actual guild owner cannot be assigned the custom role by the bot, assign `Владелец` manually in Server Settings.
4. From the project root, load the env and run `pnpm run discord:setup`. macOS/Linux: `set -a && source discord/.env && set +a && pnpm run discord:setup`. In PowerShell, set `$env:DISCORD_BOT_TOKEN`, `$env:DISCORD_GUILD_ID`, `$env:DISCORD_APPLICATION_ID` and `$env:DISCORD_OWNER_ID`, then run `pnpm run discord:setup`.
5. The script prints a permanent invite for human members. Check roles and permissions, test AutoMod, review the invite, and complete Discord's Community Onboarding/Safety Setup before sharing it publicly.

1. Создайте сервер и приложение-бота в Discord. Добавьте bot user в Developer Portal и скопируйте токен только локально. Никогда не отправляйте токен в чат, исходный код или Git.
2. Локально задайте ID приложения и сформируйте OAuth-ссылку до добавления бота на сервер:

   ```sh
   DISCORD_APPLICATION_ID=your-app-id pnpm run discord:invite
   ```

   Откройте ссылку, выберите сервер Pulsar и проверьте разрешения в окне Discord. Нужны права Manage Channels, Manage Roles, Manage Guild, View Channel, Send Messages, Send Messages in Threads, Read Message History, Manage Messages, Attach Files, Connect, Speak, Create Instant Invite, Kick Members, Ban Members и Moderate Members. Одобряйте только после проверки приложения и целевого сервера.
3. Скопируйте `discord/.env.example` в `discord/.env` и заполните `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`, `DISCORD_APPLICATION_ID` и `DISCORD_OWNER_ID` пользователя Znikson. Локальный `.env` исключён из Git. Если бот не может выдать пользовательскую роль настоящему владельцу Discord, назначьте `Владелец` вручную в настройках сервера.
4. Из корня проекта загрузите env и запустите `pnpm run discord:setup`. macOS/Linux: `set -a && source discord/.env && set +a && pnpm run discord:setup`. В PowerShell задайте `$env:DISCORD_BOT_TOKEN`, `$env:DISCORD_GUILD_ID`, `$env:DISCORD_APPLICATION_ID` и `$env:DISCORD_OWNER_ID`, затем запустите `pnpm run discord:setup`.
5. Скрипт выведет постоянное приглашение для участников. Проверьте роли и права, протестируйте AutoMod и завершите настройку Community Onboarding / Safety Setup в Discord до публичной рассылки приглашения.

## Provisioned structure / Структура сервера

All server categories, channels, seed posts and role names are in Russian. The `ИНФОРМАЦИЯ` category contains read-only `объявления`, `правила`, `загрузки` and `поддержать-разработку`. The `СООБЩЕСТВО` category contains `общий-чат`, `обсуждение-лаунчера`, `скриншоты`, `моды-и-миры` and the `предложения` forum. `ПОДДЕРЖКА` has `помощь` and `баг-репорты` forums with starter templates/tags. `ГОЛОСОВЫЕ` contains `Общий`, `С-модами` and `АФК`. The private `СОТРУДНИКИ` category contains `чат-команды` and `лог-модерации`.

All text channels receive a pinned first message when empty; new forums get a pinned starter post. The pinned rules identify Znikson and list consequences. Announcements explain the planned crash-report/AI, Rich Presence, import, auto-update and progress-viewer features without claiming they're released. The `загрузки` channel points to the real v0.2.0 Windows release assets, with a checksum note. The development-support post links directly to DonationAlerts.

Все названия категорий, каналов, начальных сообщений и ролей — на русском. В категории `ИНФОРМАЦИЯ` находятся read-only `объявления`, `правила`, `загрузки` и `поддержать-разработку`. В `СООБЩЕСТВО` — `общий-чат`, `обсуждение-лаунчера`, `скриншоты`, `моды-и-миры` и форум `предложения`. В `ПОДДЕРЖКА` — форумы `помощь` и `баг-репорты` с шаблонами и тегами. В `ГОЛОСОВЫЕ` — `Общий`, `С-модами` и `АФК`. Приватная категория `СОТРУДНИКИ` включает `чат-команды` и `лог-модерации`.

Если текстовый канал пуст, в нём появится закреплённое первое сообщение; в новых форумах появится закреплённая стартовая тема. В правилах указаны автор Znikson и возможные меры модерации. Объявления описывают планируемые краш-отчёт/ИИ, Rich Presence, импорт, автообновление и визуализатор прогресса, не выдавая их за готовый релиз. В канале `загрузки` указаны реальные файлы Windows-релиза v0.2.0 и ссылка на проверку контрольной суммы. В сообщении о поддержке есть прямая ссылка DonationAlerts.

Roles created: `Владелец`, `Разработчик`, `Модератор`, `Игрок`, `Тестировщик`, `Помощник`, `Бустер` and `RU`. The script preserves existing matching roles/channels and does not delete user data. It creates baseline AutoMod rules that block Discord-detected spam and messages with more than five unique mentions (with mention-raid detection), and route alerts to the private moderation log. It only tightens the guild verification and explicit-content-filter levels, preserving stronger existing settings. For an existing Community server it also sets Russian as the preferred locale and selects the rules/update channels. Community must be enabled by an administrator first; the bot does not change the `COMMUNITY` feature or configure Onboarding.

Скрипт создаёт роли `Владелец`, `Разработчик`, `Модератор`, `Игрок`, `Тестировщик`, `Помощник`, `Бустер` и `RU`. Существующие подходящие роли и каналы сохраняются, пользовательские данные не удаляются. Создаются базовые AutoMod-правила: блокировка распознанного Discord спама и сообщений более чем с пятью уникальными упоминаниями; включается обнаружение набега упоминаний, а уведомления идут в приватный журнал модерации. Скрипт только повышает строгость проверочного уровня и фильтра явного контента, сохраняя более строгие настройки. Если Community уже включён, скрипт задаёт русский язык и каналы правил/обновлений. Сначала администратор должен включить Community вручную; бот не меняет функцию `COMMUNITY` и не настраивает Onboarding.

`PULSAR_SITE_URL`, `PULSAR_GITHUB_URL`, `PULSAR_RELEASES_URL` and `PULSAR_DISCORD_INVITE_URL` have safe project defaults in `.env.example`; override them locally only when the owner intentionally changes a link. The script holds the required DonationAlerts URL in one `DONATE_URL` constant. Baseline safety settings and AutoMod are applied when the script runs; review the resulting rules in Discord. Do not claim an actual guild, invite, community owner role, or running bot until the owner completes this setup.

В `.env.example` уже заданы публичные ссылки сайта, репозитория, релизов и приглашения Discord. Переопределяйте их только локально, если владелец намеренно меняет ссылку. Требуемая ссылка DonationAlerts задана одной константой `DONATE_URL`. Базовые настройки безопасности и AutoMod применяются при запуске скрипта; проверьте правила в Discord. До завершения настройки владельцем не утверждайте, что сервер, приглашение, роль владельца или бот уже существуют.
