const DONATE_URL = "https://www.donationalerts.com/r/zn1kson";
const LINKS = {
  github: "",
  discord: "",
  installer: "",
  portable: "",
};

const GITHUB_PROFILE_URL = "https://github.com/zniks0n";
const GITHUB_REPO_URL = "https://github.com/zniks0n/Pulsar-Launcher";
const DISCORD_INVITE_URL = "https://discord.gg/S4Xjmh9wQw";
LINKS.github = GITHUB_PROFILE_URL;
LINKS.discord = DISCORD_INVITE_URL;
LINKS.installer = `${GITHUB_REPO_URL}/releases/download/v0.2.0/Pulsar-Launcher-0.2.0-x64.exe`;
LINKS.portable = `${GITHUB_REPO_URL}/releases/download/v0.2.0/Pulsar-Launcher-0.2.0-x64.zip`;

const messages = {
  en: {
    skip: "Skip to content", navFeatures: "Features", navDownloads: "Downloads", navCommunity: "Community", navGet: "Get Pulsar",
    heroEyebrow: "A new orbit for your Minecraft worlds", heroTitle: "Your worlds,<br><em>one orbit.</em>",
    heroText: "Keep supported Minecraft Java instances and mods in one place. Pulsar is an early-access launcher, built around your worlds—not busywork.",
    downloadSetup: "Download installer", downloadPortable: "Portable version", heroMeta: "EARLY ACCESS · v0.2.0", heroDiscord: "Meet the community <span>↗</span>",
    floatMods: "MODS, IN ORBIT", floatModsSub: "Your library, organized", mockOverline: "YOUR LIBRARY", mockGreeting: "Ready when you are.", mockReady: "READY", mockInstances: "Instances", mockModsCount: "Mods managed", mockJava: "Runtime ready", mockLocal: "LOCAL PROFILE", floatFocus: "FOCUS MODE", floatFocusSub: "Less setup. More play.", artCaption: "PRODUCT CONCEPT · INTERFACE PREVIEW", bottomLine: "BUILT FOR THE WAY YOU PLAY",
    featureKicker: "THE LAUNCHER, REIMAGINED", featureTitle: "A little less setup.<br><em>A lot more world.</em>", featureIntro: "The tools you need to shape a Minecraft experience that feels like yours — brought together in one thoughtfully designed place.", roadmap: "NOT IN v0.2.0",
    crashLine: "Mod resolution failed", crashFound: "Found a conflict", featureCrashTitle: "Crash report,<br>with a way forward.", featureCrashText: "Find common Java and mod errors on-device. Review any context before choosing to open an external AI assistant; logs are never sent automatically.",
    presencePlaying: "PLAYING A GAME", featurePresenceTitle: "Your Discord status,<br>in sync with your world.", featurePresenceText: "Rich Presence is not included in v0.2.0. This build does not send your activity to Discord.",
    importLabel: "BRING YOUR WORLDS WITH YOU", featureImportTitle: "Bring a profile.<br>Keep your worlds.", featureImportText: "Import compatible local and Prism instances. Accounts, every modpack format and all launcher settings are not migrated.",
    updateLatest: "MANUAL RELEASE UPDATES", updateSecure: "Automatic in-app updates are not available in v0.2.0.", featureUpdateTitle: "Updates when<br>you choose.", featureUpdateText: "Get new builds from GitHub Releases and verify their hashes; Pulsar does not yet update itself.",
    questProgress: "ROADMAP CONCEPT", questCurrent: "Sample quest", featureProgressTitle: "Progress that<br>feels like progress.", featureProgressText: "Achievements and modpack quest integrations are not included in v0.2.0; this card is a concept preview.",
    roadmapNote: "Badges distinguish included features from concepts. Cards marked “Not in v0.2.0” are not available in the launcher yet.", downloadKicker: "YOUR NEXT WORLD IS WAITING", downloadTitle: "Choose your<br><em>way to launch.</em>", downloadIntro: "Choose an installer or portable ZIP from the public v0.2.0 Windows release.", releaseComing: "EARLY ACCESS · v0.2.0 AVAILABLE", setupTitle: "Installer", setupDescription: "Guided setup for the v0.2.0 Windows x64 Java Edition release.", fileSize: "FILE SIZE", published: "PUBLISHED", notPublished: "Not yet", portableTitle: "Portable", portableDescription: "No installer. Keep Pulsar in a folder and take it with you.", downloadNote: "Unsigned Windows build. SmartScreen may show an unknown-publisher warning. Review the release notes and SHA-256 checksums before running.",
    supportLabel: "KEEP THE SIGNAL ALIVE", supportTitle: "Good tools are<br><em>built together.</em>", supportText: "Pulsar is an independent project by Znikson. If you like the direction, your support helps make more time for development.", supportButton: "Support development", supportSecure: "A little support goes a long way.",
    communityKicker: "FIND YOUR PEOPLE", communityLabel: "THE PULSAR COMMUNITY", communityTitle: "Made for players.<br><em>Better with players.</em>", communityText: "Share your setups, trade ideas and help shape what Pulsar becomes. Join the community on Discord.", discordButton: "Join the Discord", communityStatus: "COMMUNITY STATUS", communityMembers: "approx. Discord members · 29 Oct 2026", communityOpening: "INVITE OPEN",
    authorLabel: "INDEPENDENTLY BUILT", authorTitle: "One creator.<br><em>A universe of ideas.</em>", authorText: "Pulsar Launcher is created by Znikson — for people who love making Minecraft their own.", authorBy: "AUTHOR", closingText: "Your next world deserves a better launch.", closingLink: "Explore downloads <span>↗</span>", footerBlurb: "A modern home for your Minecraft worlds.", footerRules: "Community rules", footerPrivacy: "Privacy", footerDonate: "Support", footerMade: "Made with care for your next adventure.",
    releaseToast: "The v0.2.0 release download could not be opened. Visit the GitHub releases page.", discordToast: "Opening the Pulsar Discord invitation.", githubToast: "Opening Znikson's GitHub profile.", rulesTitle: "Community rules", rulesBody: "<p>Be respectful, keep discussions constructive and follow Discord's Terms of Service. Do not spam, harass other members, share private information or post malicious links.</p><p>Use the right channel for each topic. Moderators may remove content or restrict accounts to keep the community safe.</p>", privacyTitle: "Privacy", privacyBody: "<p>This page stores your language choice in browser localStorage. The community number is a snapshot of Discord's approximate invite count fetched on 29 Oct 2026; it is not refreshed on each visit. Pulsar does not collect accounts.</p><p>Support opens DonationAlerts in a new tab. Data submitted there is handled by DonationAlerts.</p>",
  },
  ru: {
    skip: "Перейти к содержимому", navFeatures: "Возможности", navDownloads: "Скачать", navCommunity: "Сообщество", navGet: "О Pulsar",
    heroEyebrow: "Новая орбита для миров Minecraft", heroTitle: "Твои миры.<br><em>В одной орбите.</em>",
    heroText: "Совместимые инстансы Minecraft Java и моды — в одном месте. Pulsar — ранний релиз лаунчера для миров, а не рутины.",
    downloadSetup: "Скачать установщик", downloadPortable: "Портативная версия", heroMeta: "РАННИЙ ДОСТУП · v0.2.0", heroDiscord: "К сообществу <span>↗</span>",
    floatMods: "МОДЫ НА ОРБИТЕ", floatModsSub: "Библиотека в порядке", mockOverline: "ТВОЯ БИБЛИОТЕКА", mockGreeting: "Готовы к запуску.", mockReady: "ГОТОВО", mockInstances: "Инстансы", mockModsCount: "Модов в порядке", mockJava: "Среда готова", mockLocal: "ЛОКАЛЬНЫЙ ПРОФИЛЬ", floatFocus: "ФОКУС-РЕЖИМ", floatFocusSub: "Меньше настроек. Больше игры.", artCaption: "КОНЦЕПТ ПРОДУКТА · ПРЕВЬЮ ИНТЕРФЕЙСА", bottomLine: "ДЛЯ ТВОЕГО СПОСОБА ИГРАТЬ",
    featureKicker: "НОВЫЙ ВЗГЛЯД НА ЛАУНЧЕР", featureTitle: "Меньше подготовки.<br><em>Больше миров.</em>", featureIntro: "Всё, чтобы собрать Minecraft под себя, — в одном продуманном и удобном месте.", roadmap: "НЕТ В v0.2.0",
    crashLine: "Не удалось разрешить моды", crashFound: "Найден конфликт", featureCrashTitle: "Краш-репорт<br>с планом действий.", featureCrashText: "Ищи типичные ошибки Java и модов прямо на устройстве. Перед открытием внешнего AI можно проверить контекст; лог не отправляется автоматически.",
    presencePlaying: "СЕЙЧАС В ИГРЕ", featurePresenceTitle: "Статус Discord<br>в ритме твоего мира.", featurePresenceText: "Rich Presence отсутствует в v0.2.0. Эта версия не передаёт Discord сведения о твоей активности.",
    importLabel: "ЗАБЕРИ СВОИ МИРЫ С СОБОЙ", featureImportTitle: "Смени лаунчер.<br>Сохрани свои миры.", featureImportText: "Импортируй совместимые локальные и Prism-инстансы. Аккаунты, любые форматы сборок и все настройки лаунчеров не переносятся.",
    updateLatest: "PULSAR ОБНОВЛЁН", updateSecure: "Обновление — в фоне, без лишних шагов", featureUpdateTitle: "Всегда актуален.<br>Не выпадая из игры.", featureUpdateText: "Новые сборки — в GitHub Releases; сверяй их хеши. Pulsar пока не обновляет себя автоматически.",
    questProgress: "ТВОЯ ЛИНИЯ КВЕСТОВ", questCurrent: "В Незер", featureProgressTitle: "Прогресс,<br>который видно.", featureProgressText: "Достижения и интеграция квестов сборок не входят в v0.2.0; карточка показывает только концепцию.",
    roadmapNote: "Метки показывают, что уже работает, а что пока является концептом. Карточки «Нет в v0.2.0» ещё не доступны в лаунчере.", downloadKicker: "ТВОЙ СЛЕДУЮЩИЙ МИР ЖДЁТ", downloadTitle: "Выбери свой<br><em>способ запуска.</em>", downloadIntro: "Доступен ранний релиз Windows v0.2.0: установщик и портативный ZIP.", releaseComing: "РАННИЙ ДОСТУП · v0.2.0", setupTitle: "Установщик", setupDescription: "Установка раннего релиза v0.2.0 для Minecraft Java на Windows x64.", fileSize: "РАЗМЕР ФАЙЛА", published: "ДАТА РЕЛИЗА", notPublished: "Пока нет", portableTitle: "Портативная версия", portableDescription: "Без установки. Храни Pulsar в папке и бери с собой.", downloadNote: "Сборка Windows x64 не подписана. SmartScreen может предупредить. Перед запуском прочитайте инструкцию и сверьте SHA-256.",
    supportLabel: "ПОДДЕРЖИ СИГНАЛ", supportTitle: "Хорошие инструменты<br><em>создают вместе.</em>", supportText: "Pulsar — независимый проект Znikson. Если тебе нравится идея, поддержка поможет уделять разработке больше времени.", supportButton: "Поддержать разработку", supportSecure: "Любая поддержка важна.",
    communityKicker: "НАЙДИ СВОИХ", communityLabel: "СООБЩЕСТВО PULSAR", communityTitle: "Для игроков.<br><em>Вместе — лучше.</em>", communityText: "Делитесь сборками, обсуждайте идеи и помогайте решать, каким станет Pulsar. Присоединяйтесь к сообществу в Discord.", discordButton: "Открыть Discord", communityStatus: "СТАТУС СООБЩЕСТВА", communityMembers: "примерно в Discord · 29.10.2026", communityOpening: "ПРИГЛАШЕНИЕ ОТКРЫТО",
    authorLabel: "НЕЗАВИСИМЫЙ ПРОЕКТ", authorTitle: "Один автор.<br><em>Целая вселенная идей.</em>", authorText: "Pulsar Launcher создаёт Znikson — для тех, кто любит настраивать Minecraft под себя.", authorBy: "АВТОР", closingText: "Твой следующий мир заслуживает хорошего запуска.", closingLink: "К загрузкам <span>↗</span>", footerBlurb: "Современный дом для миров Minecraft.", footerRules: "Правила сообщества", footerPrivacy: "Конфиденциальность", footerDonate: "Поддержать", footerMade: "Создано с заботой о твоих следующих приключениях.",
    releaseToast: "Не удалось открыть загрузку. Посетите страницу релизов GitHub.", discordToast: "Открываем приглашение Pulsar в Discord.", githubToast: "Открываем профиль Znikson на GitHub.", rulesTitle: "Правила сообщества", rulesBody: "<p>Уважайте друг друга, поддерживайте конструктивное общение и соблюдайте правила Discord. Не спамьте, не преследуйте участников, не публикуйте личные данные и вредоносные ссылки.</p><p>Пишите по теме в подходящий канал. Модераторы могут удалять сообщения и ограничивать доступ ради безопасности сообщества.</p>", privacyTitle: "Конфиденциальность", privacyBody: "<p>Сайт хранит выбранный язык в localStorage браузера. Число участников — снимок примерного значения из публичного Discord invite API, полученный 29.10.2026; при каждом посещении он не обновляется. Pulsar не собирает аккаунты.</p><p>Кнопка поддержки открывает DonationAlerts в новой вкладке. Переданные там данные обрабатывает DonationAlerts.</p>",
  },
};

Object.assign(messages.en, {
  heroMeta: "EARLY ACCESS · v0.2.0",
  downloadIntro: "Choose an installer or portable ZIP from the public v0.2.0 Windows release.",
  releaseComing: "EARLY ACCESS · v0.2.0 AVAILABLE",
  downloadNote: "Unsigned Windows build. SmartScreen may show an unknown-publisher warning. Review the release notes and SHA-256 checksums before running.",
  communityText: "Share your setups, trade ideas and help shape what Pulsar becomes. Join the community on Discord.",
  communityMembers: "approx. Discord members · 29 Oct 2026",
  communityOpening: "INVITE OPEN",
  discordToast: "Opening the Pulsar Discord invitation.",
  githubToast: "Opening Znikson's GitHub profile.",
  rulesBody: "<p>Be respectful, keep discussions constructive and follow Discord's Terms of Service. Do not spam, harass other members, share private information or post malicious links.</p><p>Use the right channel for each topic. Moderators may remove content or restrict accounts to keep the community safe.</p>",
  privacyBody: "<p>This page stores your language choice in browser localStorage. The community number is a snapshot of Discord's approximate invite count fetched on 29 Oct 2026; it is not refreshed on each visit. Pulsar does not collect accounts.</p><p>Support opens DonationAlerts in a new tab. Data submitted there is handled by DonationAlerts.</p>",
});
Object.assign(messages.ru, {
  heroMeta: "РАННИЙ ДОСТУП · v0.2.0",
  downloadIntro: "Доступен релиз Windows v0.2.0 для Minecraft Java Edition: установщик и портативный ZIP.",
  releaseComing: "РАННИЙ ДОСТУП · v0.2.0",
  downloadNote: "Сборка Windows x64 не подписана. SmartScreen может предупредить. Перед запуском прочитайте инструкцию и сверьте SHA-256.",
  communityText: "Делитесь сборками, обсуждайте идеи и помогайте решать, каким станет Pulsar. Присоединяйтесь к сообществу в Discord.",
  communityMembers: "примерно в Discord · 29.10.2026",
  communityOpening: "ПРИГЛАШЕНИЕ ОТКРЫТО",
  discordToast: "Открываем приглашение в Discord Pulsar.",
  githubToast: "Открываем профиль Znikson на GitHub.",
  rulesBody: "<p>Уважайте друг друга, поддерживайте конструктивное общение и соблюдайте правила Discord. Не спамьте, не преследуйте участников, не публикуйте личные данные и вредоносные ссылки.</p><p>Пишите по теме в подходящий канал. Модераторы могут удалять сообщения и ограничивать доступ ради безопасности сообщества.</p>",
  privacyBody: "<p>Сайт хранит выбранный язык в localStorage браузера. Число участников — снимок примерного значения из публичного Discord invite API, полученный 29.10.2026; при каждом посещении он не обновляется. Pulsar не собирает аккаунты.</p><p>Кнопка поддержки открывает DonationAlerts в новой вкладке. Переданные там данные обрабатывает DonationAlerts.</p>",
});

const RELEASE_DATE = "2026-10-29";
Object.assign(messages.en, {
  heroText: "Keep supported Minecraft Java instances and mods in one place. Pulsar is an early-access launcher, built around your worlds—not busywork.",
  featureIntro: "Start with what is included in v0.2.0, then see which ideas are still on the roadmap.",
  roadmap: "NOT IN v0.2.0",
  featureAvailable: "IN v0.2.0",
  featurePartial: "LIMITED SUPPORT",
  currentBuildLabel: "AVAILABLE NOW · v0.2.0",
  currentBuildTitle: "A focused first release, built to work.",
  currentBuildIntro: "Pulsar ships as a Windows x64 launcher for Minecraft Java Edition. Here is what you can use today.",
  buildJavaTitle: "Java Edition",
  buildJavaText: "Create and launch Vanilla or Fabric instances. If compatible Java is missing, Pulsar can download the official matching runtime.",
  buildLibraryTitle: "Instances & Modrinth",
  buildLibraryText: "Keep installs separate, import compatible local or Prism folders, and manage compatible Modrinth mods with hash verification.",
  buildPrivacyTitle: "Accounts & diagnostics",
  buildPrivacyText: "Use offline profiles or a custom Yggdrasil server. Crash patterns are diagnosed locally; opening an external AI assistant is optional and user-initiated.",
  notIncludedLabel: "NOT INCLUDED IN v0.2.0",
  notIncludedText: "Microsoft sign-in, Bedrock, Forge/NeoForge/Quilt/OptiFine/LabyMod, CurseForge/FTB, Discord Rich Presence, automatic self-updates and broad launcher migration are not available yet.",
  featureCrashTitle: "A crash report<br>with a clear next step.",
  featureCrashText: "Find common Java and mod errors on-device. Review any context before choosing to open an external AI assistant; logs are never sent automatically.",
  crashLine: "Game exited unexpectedly",
  crashFound: "Likely cause detected",
  crashLocalTag: "LOCAL DIAGNOSIS",
  aiOptionalTag: "OPTIONAL AI",
  featurePresenceText: "Rich Presence is not included in v0.2.0. This build does not send your activity to Discord.",
  featureImportTitle: "Bring a profile.<br>Keep your worlds.",
  featureImportText: "Import compatible local and Prism instances. Accounts, every modpack format and all launcher settings are not migrated.",
  bubbleLocal: "Local",
  bubbleMods: "Mods",
  importLabel: "COMPATIBLE INSTANCE FOLDERS",
  updateLatest: "MANUAL RELEASE UPDATES",
  updateSecure: "Automatic in-app updates are not available in v0.2.0.",
  featureUpdateTitle: "Updates when<br>you choose.",
  featureUpdateText: "Get new builds from GitHub Releases and verify their hashes; Pulsar does not yet update itself.",
  questProgress: "ROADMAP CONCEPT",
  questCurrent: "Sample quest",
  featureProgressText: "Achievements and modpack quest integrations are not included in v0.2.0; this card is a concept preview.",
  roadmapNote: "Badges distinguish included features from concepts. Cards marked “Not in v0.2.0” are not available in the launcher yet.",
  artCaption: "UI CONCEPT · SAMPLE DATA",
  setupDescription: "Guided setup for the v0.2.0 Windows x64 Java Edition release.",
  downloadIntro: "Download the v0.2.0 Windows x64 build for Minecraft Java Edition.",
  releaseComing: "EARLY ACCESS · v0.2.0 AVAILABLE",
  downloadWarning: "Unsigned Windows x64 build. SmartScreen may warn. Read the install guide and verify SHA-256 before running.",
  installGuideLink: "Install guide",
  releaseNotesLink: "Release notes",
  checksumsLink: "SHA-256 checksums",
  privacyBody: "<p>This page stores your language choice in browser localStorage. It loads Manrope and DM Mono from Google Fonts. The community number is a snapshot of Discord's approximate invite count fetched on 29 Oct 2026; it is not refreshed on each visit.</p><p>Support opens DonationAlerts in a new tab, where data is handled by DonationAlerts. Pulsar does not collect website accounts.</p>",
});
Object.assign(messages.ru, {
  heroText: "Совместимые инстансы Minecraft Java и моды — в одном месте. Pulsar — ранний релиз лаунчера для миров, а не рутины.",
  featureIntro: "Сначала — что уже включено в v0.2.0, ниже — идеи, которые пока остаются планами.",
  roadmap: "НЕТ В v0.2.0",
  featureAvailable: "ЕСТЬ В v0.2.0",
  featurePartial: "ОГРАНИЧЕННАЯ ПОДДЕРЖКА",
  currentBuildLabel: "УЖЕ ДОСТУПНО · v0.2.0",
  currentBuildTitle: "Первые функции уже в релизе.",
  currentBuildIntro: "Сейчас Pulsar — лаунчер Minecraft Java Edition для Windows x64. Вот что доступно в релизе.",
  buildJavaTitle: "Minecraft Java",
  buildJavaText: "Создавай и запускай Vanilla или Fabric. Если подходящей Java нет, Pulsar загрузит официальный runtime нужной версии.",
  buildLibraryTitle: "Инстансы и Modrinth",
  buildLibraryText: "Разделяй установки, импортируй совместимые локальные/Prism-папки и управляй совместимыми модами Modrinth с проверкой хеша.",
  buildPrivacyTitle: "Аккаунты и диагностика",
  buildPrivacyText: "Доступны офлайн-профили и свой Yggdrasil-сервер. Причины вылета разбираются локально; внешний AI запускается только по твоему выбору.",
  notIncludedLabel: "ПОКА НЕТ В v0.2.0",
  notIncludedText: "Вход Microsoft, Bedrock, Forge/NeoForge/Quilt/OptiFine/LabyMod, CurseForge/FTB, Discord Rich Presence, автообновления и полный перенос из других лаунчеров пока недоступны.",
  featureCrashTitle: "Краш-репорт<br>с понятным шагом дальше.",
  featureCrashText: "Ищи типичные ошибки Java и модов прямо на устройстве. Перед открытием внешнего AI можно проверить контекст; лог не отправляется автоматически.",
  crashLine: "Игра завершилась с ошибкой",
  crashFound: "Вероятная причина найдена",
  crashLocalTag: "ЛОКАЛЬНЫЙ АНАЛИЗ",
  aiOptionalTag: "AI ПО ЖЕЛАНИЮ",
  featurePresenceText: "Rich Presence отсутствует в v0.2.0. Эта версия не передаёт Discord сведения о твоей активности.",
  featureImportTitle: "Перенеси инстанс.<br>Оставь миры с собой.",
  featureImportText: "Импортируй совместимые локальные и Prism-инстансы. Аккаунты, любые форматы сборок и все настройки лаунчеров не переносятся.",
  bubbleLocal: "Локально",
  bubbleMods: "Моды",
  importLabel: "СОВМЕСТИМЫЕ ПАПКИ ИНСТАНСОВ",
  updateLatest: "ОБНОВЛЕНИЯ ВРУЧНУЮ",
  updateSecure: "Автообновление лаунчера пока недоступно.",
  featureUpdateTitle: "Обновляйся,<br>когда удобно.",
  featureUpdateText: "Новые сборки — в GitHub Releases; сверяй их хеши. Pulsar пока не обновляет себя автоматически.",
  questProgress: "КОНЦЕПТ ПЛАНА РАЗВИТИЯ",
  questCurrent: "Пример квеста",
  featureProgressText: "Достижения и интеграция квестов сборок не входят в v0.2.0; карточка показывает только концепцию.",
  roadmapNote: "Метки показывают, что уже работает, а что пока является концептом. Карточки «Нет в v0.2.0» ещё не доступны в лаунчере.",
  artCaption: "КОНЦЕПТ ИНТЕРФЕЙСА · ДАННЫЕ ПРИМЕРНЫЕ",
  setupDescription: "Установка раннего релиза v0.2.0 для Minecraft Java на Windows x64.",
  downloadIntro: "Скачай v0.2.0 для Minecraft Java Edition на Windows x64.",
  releaseComing: "РАННИЙ ДОСТУП · v0.2.0 ДОСТУПЕН",
  downloadWarning: "Сборка Windows x64 не подписана. SmartScreen может предупредить. Перед запуском прочитайте инструкцию и сверьте SHA-256.",
  installGuideLink: "Инструкция",
  releaseNotesLink: "Описание релиза",
  checksumsLink: "SHA-256",
  privacyBody: "<p>Сайт хранит выбранный язык в localStorage браузера и загружает шрифты Manrope и DM Mono через Google Fonts. Число участников — снимок примерного значения из публичного Discord invite API от 29.10.2026; оно не обновляется при каждом посещении.</p><p>Кнопка поддержки открывает DonationAlerts в новой вкладке, где и обрабатываются переданные данные. Сайт Pulsar не собирает аккаунты.</p>",
});
const RELEASES = {
  setup: { url: LINKS.installer, size: "117.2 MiB", date: RELEASE_DATE },
  portable: { url: LINKS.portable, size: "149.3 MiB", date: RELEASE_DATE },
};
const STORAGE_KEY = "pulsar-language";
const supported = new Set(["en", "ru"]);
const storedLanguage = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } })();
const browserLanguage = (navigator.languages?.[0] || navigator.language || "en").toLowerCase();
let currentLanguage = supported.has(storedLanguage) ? storedLanguage : (browserLanguage.startsWith("ru") ? "ru" : "en");
let toastTimer;

function showToast(text) {
  const toast = document.querySelector(".toast");
  toast.textContent = text;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function applyLanguage(language, persist = true) {
  currentLanguage = supported.has(language) ? language : "en";
  const copy = messages[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = copy[element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value;
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-donate]").forEach((link) => {
    link.href = DONATE_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  document.querySelectorAll("[data-discord]").forEach((link) => {
    link.href = DISCORD_INVITE_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  document.querySelectorAll(".download-trigger").forEach((link) => {
    const release = RELEASES[link.dataset.release];
    if (release) {
      link.href = release.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
  document.querySelectorAll("[data-release-size]").forEach((element) => {
    element.textContent = RELEASES[element.dataset.releaseSize]?.size || "—";
  });
  document.querySelectorAll("[data-release-date]").forEach((element) => {
    element.textContent = RELEASES[element.dataset.releaseDate]?.date || "—";
  });
  const shareTitle = currentLanguage === "ru"
    ? "Pulsar Launcher — каждый мир на своей орбите"
    : "Pulsar Launcher — every world, in its own orbit";
  const shareDescription = currentLanguage === "ru"
    ? "Pulsar Launcher — современный дом для миров Minecraft. Инстансы, моды и сохранения в одном месте, меньше настройки — больше игры."
    : "Pulsar Launcher is a modern home for your Minecraft worlds. Keep instances, mods and saves together, and spend less time setting up.";
  document.title = shareTitle;
  document.querySelector('meta[name="description"]').content = shareDescription;
  document.querySelector('meta[property="og:title"]').content = shareTitle;
  document.querySelector('meta[property="og:description"]').content = shareDescription;
  document.querySelector('meta[property="og:locale"]').content = currentLanguage === "ru" ? "ru_RU" : "en_US";
  document.querySelector('meta[name="twitter:title"]').content = shareTitle;
  document.querySelector('meta[name="twitter:description"]').content = shareDescription;
  renderCommunityCount();
  if (persist) { try { localStorage.setItem(STORAGE_KEY, currentLanguage); } catch {} }
}

function openConfiguredLink(kind) {
  const value = LINKS[kind];
  if (value && !value.startsWith("[")) {
    window.open(value, "_blank", "noopener,noreferrer");
    return true;
  }
  return false;
}

const approximateCommunityMembers = 1; // User-provided Discord invite API snapshot, 2026-10-29; not a live count.
function renderCommunityCount() {
  const element = document.querySelector("[data-member-count]");
  if (!element) return;
  const locale = currentLanguage === "ru" ? "ru-RU" : "en-US";
  element.textContent = new Intl.NumberFormat(locale).format(approximateCommunityMembers);
}

applyLanguage(currentLanguage, false);

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

document.querySelectorAll(".download-trigger").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const release = RELEASES[link.dataset.release];
    if (release?.url) window.open(release.url, "_blank", "noopener,noreferrer");
    else showToast(messages[currentLanguage].releaseToast);
  });
});

document.querySelectorAll("[data-discord]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!openConfiguredLink("discord")) showToast(messages[currentLanguage].discordToast);
  });
});

document.querySelectorAll('[data-profile="github"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!openConfiguredLink("github")) showToast(messages[currentLanguage].githubToast);
  });
});
document.querySelectorAll('[data-profile="discord"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!openConfiguredLink("discord")) showToast(messages[currentLanguage].discordToast);
  });
});

const motionPreference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll(
  ".section-kicker, .feature-heading-row, .current-build, .feature-list .feature-card, .roadmap-note, .download-heading-row, .download-cards .download-card, .download-footnote, .support-section, .community-layout, .author-section, .closing-cta, .site-footer"
);
if (revealTargets.length && !motionPreference?.matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  document.querySelectorAll(".feature-list .feature-card, .download-cards .download-card").forEach((element, index) => {
    element.style.setProperty("--reveal-order", String(index % 5));
  });
  revealTargets.forEach((element) => element.setAttribute("data-reveal", ""));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

const dialog = document.querySelector("#info-dialog");
document.querySelectorAll("[data-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    const copy = messages[currentLanguage];
    const type = button.dataset.dialog;
    document.querySelector("#dialog-title").textContent = copy[type === "rules" ? "rulesTitle" : "privacyTitle"];
    document.querySelector("#dialog-body").innerHTML = copy[type === "rules" ? "rulesBody" : "privacyBody"];
    dialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? (currentLanguage === "ru" ? "Закрыть меню" : "Close menu") : (currentLanguage === "ru" ? "Открыть меню" : "Open menu"));
  nav.classList.toggle("is-open", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}));
