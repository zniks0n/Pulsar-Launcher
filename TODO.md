# Pulsar Launcher — состояние deliverables

## 1. Публичный EN/RU сайт
- [x] Поддерживаются английский и русский; по системной локали для RU выбирается русский, прочие локали — английский. Переключатель сохраняется в `localStorage`.
- [x] Лендинг оформлен по визуальному ориентиру XMCL, с оригинальной айдентикой Pulsar, тёмным градиентом/частицами и CSS-макетом интерфейса; не копирует XMCL, его логотип, бренд или тексты.
- [x] Hero, адаптивная навигация, feature cards, downloads, автор Znikson, DonationAlerts, Discord community, footer, правила и privacy dialog реализованы.
- [x] В исходниках сайта указан автор Znikson и прямые публичные ссылки: профиль `https://github.com/zniks0n`, репозиторий `https://github.com/zniks0n/Pulsar-Launcher`, Discord `https://discord.gg/S4Xjmh9wQw`.
- [x] Точная ссылка поддержки `https://www.donationalerts.com/r/zn1kson` задана одной константой `DONATE_URL`.
- [x] Добавлена приятная, ненавязчивая motion-система: поэтапное появление секций/cards, мягкие hover/focus/press transitions, nav/menu и dialog transitions; `prefers-reduced-motion` отключает scroll reveal и непрерывные эффекты, всё содержимое остаётся доступным.
- [x] Добавлены canonical/Open Graph/Twitter metadata, XML sitemap, `robots.txt` и корневой `/manus-routes.json`.
- [x] Исходники сайта содержат реальные ссылки релиза, bilingual copy и motion; canonical public site URL — `https://pulsar-bq4wlerh.manus.space/`.
- [ ] Предыдущий deployment status был `success` для checkpoint `b169c30`, но public browser отдавал устаревший EN-текст. JS/CSS имели неизменяемые имена (`app.js`, `styles.css`) при долгом static cache. Build pipeline теперь создаёт content-hashed имена и обновляет ссылки в собранном HTML; после следующего checkpoint требуется подтвердить реальный public output.

## 2. Download release и сайт-сообщество
- [x] Подготовлены ссылки на Windows x64 installer `.exe` и portable `.zip`; для каждого UI показывает размер, дату и GitHub Release URL, после создания релиза они ведут на соответствующие бинарники.
- [x] Для installer и ZIP записаны размеры/даты; Windows-бинарники прямо обозначены как неподписанные, а не как доверенный подписанный издателем продукт.
- [x] Feature cards — краш-репорт/ИИ, Discord Rich Presence, импорт, автообновление и визуализатор прогресса — помечены как roadmap, не как уже включённые возможности.
- [x] Discord CTA ведут на реальный invite. Счётчик показывает `approximate_member_count` снимком `1` на 2026-10-29; запрос Discord invite API не разрешает browser CORS, поэтому значение помечено датой и не выдаётся за live-counter.
- [x] Privacy dialog объясняет языковой `localStorage`, датированный счётчик Discord и передачу данных DonationAlerts.

## 3. Рабочее desktop-приложение
- [x] Создан самостоятельный Electron launcher с безопасным BrowserWindow (`nodeIntegration:false`, context isolation, sandbox) и ограниченным preload/IPC bridge.
- [x] Адаптивный интерфейс содержит Home, Instances, Mods, Settings, About; RU/EN, тёмную/светлую тему, акцентные цвета и плавные hover/section transitions с reduced-motion support.
- [x] Реализованы реальные Minecraft Java version metadata, установка необходимых Vanilla client/libraries/assets и установка Fabric; установка отправляет фактический progress и поддерживает отмену.
- [x] Игра запускается отдельным процессом Minecraft Java; код проверяет минимальную Java major version из версионного metadata, валидность памяти и runtime перед запуском.
- [x] Временная оффлайн-установка Minecraft 1.21.4 прошла; тестовый запуск в Linux/Xvfb достиг `game:window-ready`, временные тестовые данные удалены. Это не означает тестирование Windows графического режима или Microsoft login.
- [x] Инстансы имеют отдельные папки/группы; поддержан импорт совместимых локальных Minecraft/Prism-папок, базовая навигация и управление выбранным инстансом.
- [x] Modrinth search/совместимые версии доступны; файлы загружаются из Modrinth CDN и проверяются по хешу, локальные mods можно включать/выключать.
- [x] Поддержаны локальные offline-профили и сторонний HTTPS Yggdrasil; пароль не сохраняется, токен сохраняется только через OS-protected storage, если оно доступно; для запуска Yggdrasil предусмотрен `authlib-injector`.
- [x] Settings включают Java executable, memory, authlib-injector, snapshots, язык/тему/акцент и локальные crash report предпочтения.
- [x] При закрытии игры UI предлагает локальный crash report: оффлайн-диагностика, копирование/сохранение/просмотр лога и user-confirmed переходы к внешнему AI assistant; лог самовольно не загружается.
- [x] Unit tests оффлайн crash diagnostics и защищённого async account storage: 8 прошли; Electron JavaScript syntax проверен.
- [x] Финальная Electron `v0.1.0` пересборка собрала Windows x64 NSIS installer, portable `.exe` и portable `.zip`; проверены PE signatures, SHA-256 и zip integrity. Бинарники unsigned.
- [ ] Microsoft/Xbox authentication отсутствует: требуется проверенная регистрация публичного OAuth client/app flow. Не запрашивать Microsoft-пароль и не включать фиктивный вход.
- [ ] Bedrock; Forge/NeoForge/Quilt/OptiFine/LabyMod; automatic Java runtime download; CurseForge/FTB; автоподписанный updater; полный импорт аккаунтов/настроек всех лаунчеров не включены.
- [ ] Остальные идеи из исходного brief не выполнены: импорт из всех перечисленных launcher-ов; коллекции/избранное, зависимости модов/шейдеры/resource packs и AI pack builder; миры/chunk tools/3D blueprints, achievements/FTB quests, локальный сервер и каталог; друзья/личные сообщения/voice/cosmetics/leaderboards/skin studio; FPS/ресурсный менеджер/options sync/task manager/P2P/Big Picture/correlated telemetry; Discord Rich Presence; игровые updater и DPoP clock tolerance. Не представлять их на сайте как готовые функции.
- [ ] Discord Rich Presence, Microsoft login и Bedrock не включены в ранний релиз; пользователь поручил мне настроить сам Discord guild.

## 4. GitHub repository и release
- [x] После отдельного разрешения пользователя создан публичный GitHub repository `https://github.com/zniks0n/Pulsar-Launcher`.
- [x] Исходники, README, MIT license и документация отправлены в public `main` (source commit `a8ed6f7`); GitHub About указывает сайт, автора Znikson и Minecraft launcher description/topic metadata. В README размещены Discord и DonationAlerts links.
- [x] Опубликован GitHub Release `v0.1.0`: Windows x64 installer, portable `.exe`, portable `.zip`, `SHA256SUMS.txt` и ZIP исходников; checksum values пересверены с output GitHub release.
- [x] Ссылки сайта указывают на соответствующие real GitHub release assets.
- [x] Windows-файлы unsigned; это явно указано в release notes, README и installation docs; Authenticode certificate не предоставлен.

## 5. Настроить существующий Discord guild
- [x] Подготовлен optional idempotent `discord/setup-server.mjs`, двуязычная инструкция, безопасный `.env.example`; helper настраивает существующий guild, не создаёт сервер и не удаляет пользовательские данные.
- [x] Helper поддерживает категории/каналы/форумы/роли, pinned seed messages, AutoMod baseline, verification/content filters, правила, ссылки сайта/repository/releases/DonationAlerts и заданный владельцем реальный invite URL.
- [x] Проверен существующий invite `https://discord.gg/S4Xjmh9wQw`: он ведёт на guild `PL / Pulsar Launcher` с одним участником. Не создавать дубликат и не удалять существующие данные.
- [ ] Авторизация Discord не завершена: browser tool открыл неавторизованную Sandbox-страницу, заполнение через ошибочные/не совпавшие индексы не удалось; форма показала неожиданные сохранённые login-значения, не относящиеся к переданным данным. Кнопка входа не нажималась; пароль не подтверждался и в репозитории не сохранялся. Не повторять вход через эту среду; потребуется реальный авторизованный Discord-сеанс или локальный setup helper с bot token владельца. Пользователю рекомендовано сменить пароль, отправленный в чат.
- [ ] Настроить согласованную структуру категорий/каналов/форумов, роли и права доступа, rules/welcome сообщения, основные safety/AutoMod параметры и использовать уже существующий invite; проверить результат в Discord.
- [ ] Включить Discord Community/Onboarding, если нужные настройки доступны владельцу; если Discord требует ручного шага или отдельного подтверждения, сообщить пользователю только этот конкретный блокер.

## 6. Источники, архив, checkpoint и публикация
- [x] Сохранены MIT LICENSE, CHANGELOG, `.gitignore`, research notes, BUILD/INSTALL docs и инструкции desktop.
- [x] В репозитории и документации нет реального bot token, Microsoft/Yggdrasil пароля или пользовательских ключей.
- [x] Пересобраны site и desktop после последних изменений; проверены 83 статических i18n key на EN/RU, локальный HTTP (страница/CSS/JS/SVG/route manifest), JavaScript syntax и 8 unit tests.
- [x] Manus canonical checkpoint `6713d35969ec1eb07a1be5d49e31298b03dac77f` был сохранён, а автоматическая публикация принята. Следующая исправляющая версия ещё требует своего checkpoint.
- [ ] После content-hash исправления подтвердить public version в браузере; не выдавать обновлённый сайт за окончательно готовый до этой проверки.
- [x] Чистый source ZIP собран из коммита проекта без `.git`, `node_modules`, сборочных бинарников и `.env`; Source ZIP не является `.exe` или portable launcher.
