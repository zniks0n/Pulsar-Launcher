# План Pulsar Launcher desktop

## Архитектура

Собрать Windows desktop-приложение на Electron с независимым renderer/UI, main-process services и узким preload bridge. В renderer запрещены Node integration и прямой доступ к токенам; включены `contextIsolation` и sandbox. IPC-команды валидируются в main. Файловые пути для инстансов создаются внутри `%APPDATA%/Pulsar/instances`, учетные данные хранятся только через OS-backed Electron `safeStorage`; если безопасное хранилище недоступно, сохранять только пользовательские настройки и локальные offline-профили без токенов.

Первый реальный Java сценарий: локальные профили и безопасная custom-Yggdrasil авторизация, создание независимых инстансов, загрузка vanilla и поддерживаемых мод-лоадеров, поиск/установка модов Modrinth и реальный запуск Java. `@xmcl/installer` выполняет версионную установку и лоадер workﬂows, `@xmcl/core` — разрешение версии и запуск, исключительно из Electron main process. Воспроизводимые зависимости закрепляются lockfile. Сначала подтвердить фактические TypeScript API установленными типами, а не переносить устаревшие snippets.

Если пользователь не задал Java executable и в системе нет runtime, совместимого с выбранной версией Minecraft, на нажатие Play лаунчер загружает официальный Mojang Java runtime для компонента `javaVersion` этой версии. Runtime устанавливается в каталог данных Pulsar, путь сохраняется для отдельного инстанса, установка показывает прогресс и может быть отменена; явно выбранный пользовательский Java путь автоматически не подменяется. Использовать только проверенные SHA-1 метаданные официального Mojang runtime-манифеста и pinned API `@xmcl/installer`.

Microsoft account/device-code, Bedrock, CurseForge/FTB, другие launcher migrations, социальные сети, голос, Rich Presence, серверы, P2P и AI agent — расширения, а не фиктивно активные действия первой сборки. Включать только реальные интеграции после проверки API, получения нужных пользователем OAuth/API значений и реализации безопасного хранения. Discord-сервер делает пользователь.

## Дерево

- `launcher/main.mjs`: Electron window, безопасная конфигурация, IPC, app lifecycle.
- `launcher/preload.mjs`: typed-in-spirit узкий bridge для UI; никаких секретов.
- `launcher/services/store.mjs`: валидируемое JSON-хранилище настроек, аккаунтов и инстансов.
- `launcher/services/minecraft.mjs`: version/install/loader/launch orchestration и event progress.
- `launcher/services/accounts.mjs`: offline/Yggdrasil identity и защита access tokens.
- `launcher/services/modrinth.mjs`: поиск, metadata, безопасная загрузка и локальный enable/disable.
- `launcher/renderer/`: раздельные HTML, CSS, JS для Home, Instances, Mods, Settings, About и crash state.
- `launcher/assets/`: Pulsar mark и локальная графика.
- `launcher/pnpm-workspace.yaml`, `launcher/package.json`, lockfile: зафиксированный build policy/toolchain.
- `discord/`: независимый setup helper; запускается и управляется пользователем отдельно.
- корневые `index.html`, `styles.css`, `app.js`: отдельно публикуемый Webdev website.

## Дизайн

**Design Movement:** orbital ambient interface, sci-fi workstation сдержанного вида, продолжает язык текущего сайта.

**Core Principles:** ясная библиотека, контроль пользователя, спокойные поверхности, честные состояния готовности.

**Color Philosophy:** ночной сине-фиолетовый фон для глубокого фокуса; узнаваемый Pulsar violet обозначает активный выбор; mint зарезервирован для готовности и успешного статуса; тёплый янтарный только для предупреждений.

**Layout Paradigm:** постоянный rail слева, контекстный home canvas справа, компактная account strip сверху; глубина создаётся слоями и боковой панелью, а не повторяющимся центрированным dashboard grid.

**Signature Elements:** орбитальная отметка у выбранного инстанса; тонкий radial glow вокруг активного действия; моноширинные метки runtime/версий.

**Interaction Philosophy:** быстрый ответ на hover/press, большие понятные действия, длинные/сетевые операции имеют настоящий прогресс и cancel/error состояния; опасные действия требуют ясного подтверждения; keyboard navigation остаётся полноценной.

**Animation:** мягкое появление страниц и карточек, 180–260 ms на hover/focus/selection, приглушённая орбита на фоне; индикатор загрузки отражает фактический progress. Уважать `prefers-reduced-motion`.

**Typography System:** Manrope/системный sans для интерфейса и DM Mono/системный monospace для версий, RAM, путей и прогресса.

**Brand Essence:** персональная станция запуска Minecraft миров; ясный, собранный, доброжелательный.

**Brand Voice:** короткие команды и спокойные пояснения. Примеры: «Мир ждёт запуска»; «Скачивание продолжается — можно оставить это окно открытым».

**Wordmark & Logo:** собственная звезда Pulsar из `pulsar-mark.svg`, wordmark PULSAR, не использовать чужой логотип.

**Signature Brand Color:** Pulsar violet `#a996ff`.

## Ограничения

Публичный launcher будет unsigned пока не появятся сертификат и владелец издателя; Windows SmartScreen может предупреждать. Выпуск NSIS `.exe` и portable `.zip` от Linux зависит от поддерживаемой сборочной цепочки; если backend сборки недоступен, передать исходники и reproducible build steps, не выдавать сайт или source ZIP за Windows installer. Репозиторий GitHub зависит от разрешенного подключения; не использовать неавторизованный пользовательский аккаунт.
