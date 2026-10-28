# Pulsar Launcher — состояние сайта, Discord helper и оставшихся deliverables

## 1. EN/RU и язык интерфейса
- [x] Поддерживаются английский и русский; при первом визите английский/русский выбираются по системной локали, все прочие локали переключаются на английский.
- [x] Пользователь может переключать EN/RU; выбор сохраняется в `localStorage` и используется при следующем визите.

## 2. Публичный лендинг и навигация
- [x] Лендинг оформлен по визуальному ориентиру XMCL: оригинальная айдентика Pulsar, тёмное космическое оформление/частицы и макет интерфейса; не копировать XMCL, его логотип, бренд или тексты.
- [x] Hero содержит знак и описание Pulsar Launcher, «Download installer .EXE», «Portable version .ZIP» и Discord CTA; навигация по функциям, загрузкам и сообществу адаптируется для мобильных экранов.
- [x] Все кнопки загрузок ведут к реальной секции Downloads; пока релизов нет, сайт честно сообщает, что первая версия готовится.
- [x] Оригинальная графика сайта — макет, не скриншот несуществующего приложения; исключены неподтверждённые продуктовые заявления.

## 3. Карточки функций и Download UI
- [x] Сайт показывает roadmap-карточки «Краш-репорт с ИИ», Discord Rich Presence, импорт из других лаунчеров, автообновление и визуализатор прогресса; все помечены как разрабатываемые/планируемые.
- [x] Downloads показывает два варианта: Windows `.exe` и портативный `.zip`; для каждого отведены размер, дата и настоящая GitHub Releases ссылка, но отсутствующие файлы/сведения помечены «ещё не опубликовано» вместо вымышленных значений.
- [ ] Создать desktop launcher, собрать эти два файла, протестировать, вычислить реальные SHA-256/размеры/даты, опубликовать GitHub Release и заменить placeholders настоящими ссылками.

## 4. DonationAlerts и автор сайта
- [x] Отдельный блок «Поддержать разработку» и кнопка в подвале используют ровно `https://www.donationalerts.com/r/zn1kson`.
- [x] В `app.js` одна константа `DONATE_URL = "https://www.donationalerts.com/r/zn1kson"`; имя автора продукта — Znikson.
- [x] Авторский блок содержит Znikson и placeholders `[GITHUB_ZNIKSON]` / `[DISCORD_ZNIKSON]`, пока фактических публичных адресов нет.
- [x] Footer содержит Discord, GitHub, правила, privacy, DonationAlerts, `© 2026 Znikson` и переключатель EN/RU.

## 5. Website Discord section
- [x] Секция описывает сообщество, содержит CTA приглашения и счётчик/статус сообщества.
- [x] Приглашение и число участников честно отмечены как недоступные до появления настоящего сервера и инвайта; ничего не выдумано.
- [ ] Внести действительную Discord invite URL и реальное число участников после настройки сервера.

## 6. Публичная поставка website
- [x] Website адаптивен, собран без сторонних runtime-зависимостей; переключатель языка, секционная навигация, диалоги, загрузки, community CTA и поддержка имеют согласованные состояния.
- [x] Добавлены canonical/Open Graph/Twitter metadata, XML sitemap, `robots.txt` и корневой `/manus-routes.json`.
- [x] Публичная страница успешно открыта браузером: `https://pulsar-bq4wlerh.manus.space`.
- [x] Последняя опубликованная версия/checkpoint: `48239353845979a2e9e51828d906fd0bde434565`.

## 7. Discord server automation helper
- [x] Подготовлен `discord/setup-server.mjs`; код создаёт отсутствующие ресурсы существующего Discord guild и не удаляет пользовательские данные.
- [x] Русские категории: `ИНФОРМАЦИЯ`, `СООБЩЕСТВО`, `ПОДДЕРЖКА`, `ГОЛОСОВЫЕ`, приватные `СОТРУДНИКИ`.
- [x] Информация/read-only: `объявления`, `правила`, `загрузки`, `поддержать-разработку`; сообщество: `общий-чат`, `обсуждение-лаунчера`, `скриншоты`, `моды-и-миры`, форум `предложения`; поддержка: форумы `помощь`/`баг-репорты`; голосовые: `Общий`, `С-модами`, `АФК`; private: `чат-команды`, `лог-модерации`.
- [x] Создаются роли `Владелец`, `Разработчик`, `Модератор`, `Игрок`, `Тестировщик`, `Помощник`, `Бустер`, `RU`; роль владельца назначается по локальному `DISCORD_OWNER_ID`, если Discord позволяет.
- [x] В пустых текстовых каналах создаётся и закрепляется приветственное сообщение; в новых форумах создаются закреплённые шаблонные темы и статус-теги. В #правила указаны автор Znikson, правила и меры модерации; #объявления описывает roadmap, сайт, автора и статус репозитория; #загрузки не фальсифицирует URL, размеры, даты или SHA-256; #поддержать-разработку содержит прямую ссылку DonationAlerts.
- [x] Helper может создать baseline AutoMod против Discord-detected spam и mass mentions/mention raids, настроить alert в закрытый журнал, повысить verification/content-filter только если слабее целевого уровня, и задать описание сервера только если его ещё нет.
- [x] Helper может сформировать бот OAuth install URL без токена через `pnpm run discord:invite`; локальная одноразовая настройка — `pnpm run discord:setup`.
- [ ] Владелец должен создать сервер от аккаунта Znikson, application/bot, локально установить токен/Guild ID/User ID, пригласить бота с описанными правами, запустить helper, при необходимости вручную выдать владельцу роль и проверить результат AutoMod.
- [ ] Администратор должен вручную включить Discord Community и выполнить Community Onboarding/Safety Setup; bot не меняет функцию `COMMUNITY` и не создаёт сервер.
- [ ] После настройки заменить `[DISCORD_ZNIKSON]`, community CTA placeholder и статус-счётчик сайта реальными данными.

## 8. Desktop launcher — не выполнен
- [ ] Создать самостоятельное desktop приложение Pulsar Launcher с тёмной/светлой темами, пользовательской палитрой, картинкой/видео/частицами для фона, боковой навигацией «Главная / Инстансы / Моды / Настройки», account header, smooth transitions, hover и rounded controls.
- [ ] Выпустить `.exe` и self-contained `.zip`; в «Настройки → О программе» и «О лаунчере» указать автора Znikson, версию, website, GitHub/Discord placeholders или действительные адреса.
- [ ] Аккаунты: Microsoft OAuth, offline nickname, Ely.by, LittleSkin, custom Yggdrasil через authlib-injector с автоподстановкой `-javaagent`, загрузка скинов, optional CustomSkinLoader для offline nick, «Disable Authlib Injector», мультиаккаунт-хаб, автообновление токенов.
- [ ] Инстансы: изолированные Java/Bedrock профили, группы папок, независимые моды/миры/RAM/Java/JVM args/loader/theme, Quick Action, настраиваемый Focus Mode dashboard.
- [ ] Загрузчики: Forge, Fabric, Quilt, NeoForge, OptiFine, LabyMod; установка любых версий, Java auto-download, resumable installs, fast downloads и зеркала (BMCLAPI и др.).
- [ ] Контент: Modrinth, CurseForge, FTB; URL/drag-and-drop imports; импорт Prism, MultiMC, ATLauncher, GDLauncher, CurseForge App, Modrinth App, TLauncher и official launcher; коллекции/избранное; управление модами, включение/выключение/фильтры/зависимости/«Скрыть уже установленные»; группы модов, шейдеры/resource packs, детали мода и AI-suggested pack builder.
- [ ] Миры/серверы: previews сохранений и chunk tools, неблокирующий 3D blueprint preview, achievements/FTB quest progress visualizer, local server, server/modpack export, server list/catalog/rating.
- [ ] Социальные функции: friends/DM/chat, in-game voice without plugins, cosmetics and 3D try-on, leaderboards, skin studio.
- [ ] Производительность/восстановление: FPS boost, Visual Enhancement Hub, Smart Resource Management, options.txt sync, task manager, P2P host migration/reconnect/filename encoding/Glassmorphism dialog, Big Picture/gamepad, Correlated Runtime Telemetry.
- [ ] Надёжность: updater и DPoP Clock Skew Tolerance; тесты реального запуска Minecraft.
- [ ] При краше Minecraft автоматически показать «Краш-репорт»: instance/version/loader/time/exit code/error type, highlighted log и копирование/сохранение/open-folder.
- [ ] Crash UI имеет AI cards ChatGPT, Claude, Gemini, DeepSeek, Perplexity, Copilot, GigaChat, YandexGPT и custom AI; клик открывает AI web app с подготовленным prompt (launcher/MC/loader/mods/crash-report/latest.log/error/вопрос), localized по UI; быстрый offline rules-based диагностика и конкретные действия.
- [ ] «Краши и диагностика» содержит auto-open, auto-copy prompt, AI toggles, custom link/template placeholders `{log}`, `{mods}`, `{version}`, `{loader}`, `{error}`; приватность: consent warning до отправки внешнему AI и локальный offline analysis.
- [ ] Rich Presence пока пользователь в launcher/игре показывает выбранный instance, game version, loader, server и play time; управляется из настроек.

## 9. GitHub repository/release — не выполнены
- [ ] Создать публичный repository `Pulsar-Launcher`, описание About с Znikson/site/Discord/DonationAlerts, запушить исходники в требуемую структуру `launcher/`, `website/`, `discord/`, README EN/RU, `LICENSE` (MIT, `Copyright (c) 2026 Znikson`), `CHANGELOG.md`, `.gitignore`, `docs/INSTALL.md`, `docs/BUILD.md`.
- [ ] Создать GitHub Release с реально собранными `.exe`/`.zip` и ссылками/хэшами.
- [ ] Создание не выполнено: в этой сессии не было разрешённого GitHub-коннектора; не утверждать, что репозиторий или release существуют.

## 10. Передача кода и авторство
- [x] В корневом README и `package.json` указан Znikson; MIT LICENSE, CHANGELOG, `.gitignore`, BUILD/INSTALL docs сохранены.
- [x] Передан source ZIP сайта и Discord helper; это не является установщиком или portable-релизом launcher.
- [x] Токенов, аккаунтных ключей и реального bot `.env` в Git/архив не включено.
