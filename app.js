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
LINKS.installer = `${GITHUB_REPO_URL}/releases/download/v0.1.0/Pulsar-Launcher-0.1.0-x64.exe`;
LINKS.portable = `${GITHUB_REPO_URL}/releases/download/v0.1.0/Pulsar-Launcher-0.1.0-x64.zip`;

const messages = {
  en: {
    skip: "Skip to content", navFeatures: "Features", navDownloads: "Downloads", navCommunity: "Community", navGet: "Get Pulsar",
    heroEyebrow: "A new orbit for your Minecraft worlds", heroTitle: "Your worlds,<br><em>one orbit.</em>",
    heroText: "Keep every instance, modpack and save close at hand. Pulsar is a modern Minecraft launcher in the making — focused on your worlds, not the busywork.",
    downloadSetup: "Download installer", downloadPortable: "Portable version", heroMeta: "EARLY ACCESS · v0.1.0", heroDiscord: "Meet the community <span>↗</span>",
    floatMods: "MODS, IN ORBIT", floatModsSub: "Your library, organized", mockOverline: "YOUR LIBRARY", mockGreeting: "Ready when you are.", mockReady: "READY", mockInstances: "Instances", mockModsCount: "Mods managed", mockJava: "Runtime ready", mockLocal: "LOCAL PROFILE", floatFocus: "FOCUS MODE", floatFocusSub: "Less setup. More play.", artCaption: "PRODUCT CONCEPT · INTERFACE PREVIEW", bottomLine: "BUILT FOR THE WAY YOU PLAY",
    featureKicker: "THE LAUNCHER, REIMAGINED", featureTitle: "A little less setup.<br><em>A lot more world.</em>", featureIntro: "The tools you need to shape a Minecraft experience that feels like yours — brought together in one thoughtfully designed place.", roadmap: "IN DEVELOPMENT",
    crashLine: "Mod resolution failed", crashFound: "Found a conflict", featureCrashTitle: "Crash report,<br>with a way forward.", featureCrashText: "Understand the error, spot a likely culprit and get clear next steps — with an optional AI-assisted explanation.",
    presencePlaying: "PLAYING A GAME", featurePresenceTitle: "Your Discord status,<br>in sync with your world.", featurePresenceText: "Show your instance, loader and play time with a Rich Presence that you can control from settings.",
    importLabel: "BRING YOUR WORLDS WITH YOU", featureImportTitle: "Switch launchers.<br>Keep your worlds.", featureImportText: "Bring instances and modpacks from launchers you already use, then keep everything in one tidy library.",
    updateLatest: "PULSAR IS UP TO DATE", updateSecure: "A smoother update, in the background", featureUpdateTitle: "Stay current.<br>Stay in your flow.", featureUpdateText: "Designed for reliable updates that keep your launcher ready without interrupting your routine.",
    questProgress: "YOUR QUEST LINE", questCurrent: "Into the Nether", featureProgressTitle: "Progress that<br>feels like progress.", featureProgressText: "See achievements and modpack quests come together in a clear view of how far you've travelled.",
    roadmapNote: "Pulsar Launcher is in active development. Features shown are part of the product roadmap and may change.", downloadKicker: "YOUR NEXT WORLD IS WAITING", downloadTitle: "Choose your<br><em>way to launch.</em>", downloadIntro: "Choose an installer or portable ZIP from the public v0.1.0 Windows release.", releaseComing: "EARLY ACCESS · v0.1.0 AVAILABLE", setupTitle: "Installer", setupDescription: "A guided install. Shortcuts, updates and a clean start.", fileSize: "FILE SIZE", published: "PUBLISHED", notPublished: "Not yet", portableTitle: "Portable", portableDescription: "No installer. Keep Pulsar in a folder and take it with you.", downloadNote: "Unsigned Windows build. SmartScreen may show an unknown-publisher warning. Review the release notes and SHA-256 checksums before running.",
    supportLabel: "KEEP THE SIGNAL ALIVE", supportTitle: "Good tools are<br><em>built together.</em>", supportText: "Pulsar is an independent project by Znikson. If you like the direction, your support helps make more time for development.", supportButton: "Support development", supportSecure: "A little support goes a long way.",
    communityKicker: "FIND YOUR PEOPLE", communityLabel: "THE PULSAR COMMUNITY", communityTitle: "Made for players.<br><em>Better with players.</em>", communityText: "Share your setups, trade ideas and help shape what Pulsar becomes. Join the community on Discord.", discordButton: "Join the Discord", communityStatus: "COMMUNITY STATUS", communityMembers: "approx. Discord members · 29 Oct 2026", communityOpening: "INVITE OPEN",
    authorLabel: "INDEPENDENTLY BUILT", authorTitle: "One creator.<br><em>A universe of ideas.</em>", authorText: "Pulsar Launcher is created by Znikson — for people who love making Minecraft their own.", authorBy: "AUTHOR", closingText: "Your next world deserves a better launch.", closingLink: "Explore downloads <span>↗</span>", footerBlurb: "A modern home for your Minecraft worlds.", footerRules: "Community rules", footerPrivacy: "Privacy", footerDonate: "Support", footerMade: "Made with care for your next adventure.",
    releaseToast: "The v0.1.0 release download could not be opened. Visit the GitHub releases page.", discordToast: "Opening the Pulsar Discord invitation.", githubToast: "Opening Znikson's GitHub profile.", rulesTitle: "Community rules", rulesBody: "<p>Be respectful, keep discussions constructive and follow Discord's Terms of Service. Do not spam, harass other members, share private information or post malicious links.</p><p>Use the right channel for each topic. Moderators may remove content or restrict accounts to keep the community safe.</p>", privacyTitle: "Privacy", privacyBody: "<p>This page stores your language choice in browser localStorage. The community number is a snapshot of Discord's approximate invite count fetched on 29 Oct 2026; it is not refreshed on each visit. Pulsar does not collect accounts.</p><p>Support opens DonationAlerts in a new tab. Data submitted there is handled by DonationAlerts.</p>",
  },
  ru: {
    skip: "Перейти к содержимому", navFeatures: "Возможности", navDownloads: "Скачать", navCommunity: "Сообщество", navGet: "О Pulsar",
    heroEyebrow: "Новая орбита для миров Minecraft", heroTitle: "Твои миры.<br><em>В одной орбите.</em>",
    heroText: "Все инстансы, сборки и сохранения — рядом. Pulsar — современный лаунчер Minecraft в разработке, который помогает заниматься мирами, а не рутиной.",
    downloadSetup: "Скачать установщик", downloadPortable: "Портативная версия", heroMeta: "РАННИЙ ДОСТУП · v0.1.0", heroDiscord: "К сообществу <span>↗</span>",
    floatMods: "МОДЫ НА ОРБИТЕ", floatModsSub: "Библиотека в порядке", mockOverline: "ТВОЯ БИБЛИОТЕКА", mockGreeting: "Готовы к запуску.", mockReady: "ГОТОВО", mockInstances: "Инстансы", mockModsCount: "Модов в порядке", mockJava: "Среда готова", mockLocal: "ЛОКАЛЬНЫЙ ПРОФИЛЬ", floatFocus: "ФОКУС-РЕЖИМ", floatFocusSub: "Меньше настроек. Больше игры.", artCaption: "КОНЦЕПТ ПРОДУКТА · ПРЕВЬЮ ИНТЕРФЕЙСА", bottomLine: "ДЛЯ ТВОЕГО СПОСОБА ИГРАТЬ",
    featureKicker: "НОВЫЙ ВЗГЛЯД НА ЛАУНЧЕР", featureTitle: "Меньше подготовки.<br><em>Больше миров.</em>", featureIntro: "Всё, чтобы собрать Minecraft под себя, — в одном продуманном и удобном месте.", roadmap: "В РАЗРАБОТКЕ",
    crashLine: "Не удалось разрешить моды", crashFound: "Найден конфликт", featureCrashTitle: "Краш-репорт<br>с планом действий.", featureCrashText: "Разберись в ошибке, найди возможную причину и получи понятные шаги. При желании — с помощью ИИ.",
    presencePlaying: "СЕЙЧАС В ИГРЕ", featurePresenceTitle: "Статус Discord<br>в ритме твоего мира.", featurePresenceText: "Показывай инстанс, загрузчик и время в игре. Rich Presence можно включать и отключать в настройках.",
    importLabel: "ЗАБЕРИ СВОИ МИРЫ С СОБОЙ", featureImportTitle: "Смени лаунчер.<br>Сохрани свои миры.", featureImportText: "Переноси инстансы и сборки из привычных лаунчеров — и собирай их в одной библиотеке.",
    updateLatest: "PULSAR ОБНОВЛЁН", updateSecure: "Обновление — в фоне, без лишних шагов", featureUpdateTitle: "Всегда актуален.<br>Не выпадая из игры.", featureUpdateText: "Надёжные обновления, которые не отвлекают и оставляют лаунчер готовым к запуску.",
    questProgress: "ТВОЯ ЛИНИЯ КВЕСТОВ", questCurrent: "В Незер", featureProgressTitle: "Прогресс,<br>который видно.", featureProgressText: "Достижения и квесты сборки складываются в наглядную картину твоего пути.",
    roadmapNote: "Pulsar Launcher активно разрабатывается. Функции на странице — часть плана продукта и могут измениться.", downloadKicker: "ТВОЙ СЛЕДУЮЩИЙ МИР ЖДЁТ", downloadTitle: "Выбери свой<br><em>способ запуска.</em>", downloadIntro: "Доступен первый ранний релиз Windows: установщик и портативный ZIP.", releaseComing: "РАННИЙ ДОСТУП · v0.1.0", setupTitle: "Установщик", setupDescription: "Установка с подсказками, ярлыками и обновлениями.", fileSize: "РАЗМЕР ФАЙЛА", published: "ДАТА РЕЛИЗА", notPublished: "Пока нет", portableTitle: "Портативная версия", portableDescription: "Без установки. Храни Pulsar в папке и бери с собой.", downloadNote: "Первый Windows-релиз не подписан. SmartScreen может предупредить о неизвестном издателе. Перед запуском проверьте описание релиза и SHA-256.",
    supportLabel: "ПОДДЕРЖИ СИГНАЛ", supportTitle: "Хорошие инструменты<br><em>создают вместе.</em>", supportText: "Pulsar — независимый проект Znikson. Если тебе нравится идея, поддержка поможет уделять разработке больше времени.", supportButton: "Поддержать разработку", supportSecure: "Любая поддержка важна.",
    communityKicker: "НАЙДИ СВОИХ", communityLabel: "СООБЩЕСТВО PULSAR", communityTitle: "Для игроков.<br><em>Вместе — лучше.</em>", communityText: "Делитесь сборками, обсуждайте идеи и помогайте решать, каким станет Pulsar. Присоединяйтесь к сообществу в Discord.", discordButton: "Открыть Discord", communityStatus: "СТАТУС СООБЩЕСТВА", communityMembers: "примерно в Discord · 29.10.2026", communityOpening: "ПРИГЛАШЕНИЕ ОТКРЫТО",
    authorLabel: "НЕЗАВИСИМЫЙ ПРОЕКТ", authorTitle: "Один автор.<br><em>Целая вселенная идей.</em>", authorText: "Pulsar Launcher создаёт Znikson — для тех, кто любит настраивать Minecraft под себя.", authorBy: "АВТОР", closingText: "Твой следующий мир заслуживает хорошего запуска.", closingLink: "К загрузкам <span>↗</span>", footerBlurb: "Современный дом для миров Minecraft.", footerRules: "Правила сообщества", footerPrivacy: "Конфиденциальность", footerDonate: "Поддержать", footerMade: "Создано с заботой о твоих следующих приключениях.",
    releaseToast: "Не удалось открыть загрузку. Посетите страницу релизов GitHub.", discordToast: "Открываем приглашение Pulsar в Discord.", githubToast: "Открываем профиль Znikson на GitHub.", rulesTitle: "Правила сообщества", rulesBody: "<p>Уважайте друг друга, поддерживайте конструктивное общение и соблюдайте правила Discord. Не спамьте, не преследуйте участников, не публикуйте личные данные и вредоносные ссылки.</p><p>Пишите по теме в подходящий канал. Модераторы могут удалять сообщения и ограничивать доступ ради безопасности сообщества.</p>", privacyTitle: "Конфиденциальность", privacyBody: "<p>Сайт хранит выбранный язык в localStorage браузера. Число участников — снимок примерного значения из публичного Discord invite API, полученный 29.10.2026; при каждом посещении он не обновляется. Pulsar не собирает аккаунты.</p><p>Кнопка поддержки открывает DonationAlerts в новой вкладке. Переданные там данные обрабатывает DonationAlerts.</p>",
  },
};

Object.assign(messages.en, {
  heroMeta: "EARLY ACCESS · v0.1.0",
  downloadIntro: "Choose an installer or portable ZIP from the public v0.1.0 Windows release.",
  releaseComing: "EARLY ACCESS · v0.1.0 AVAILABLE",
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
  heroMeta: "РАННИЙ ДОСТУП · v0.1.0",
  downloadIntro: "Доступен первый ранний релиз для Windows: установщик и портативный ZIP.",
  releaseComing: "РАННИЙ ДОСТУП · v0.1.0",
  downloadNote: "Первый Windows-релиз не подписан. SmartScreen может предупредить о неизвестном издателе. Перед запуском проверьте описание релиза и SHA-256.",
  communityText: "Делитесь сборками, обсуждайте идеи и помогайте решать, каким станет Pulsar. Присоединяйтесь к сообществу в Discord.",
  communityMembers: "примерно в Discord · 29.10.2026",
  communityOpening: "ПРИГЛАШЕНИЕ ОТКРЫТО",
  discordToast: "Открываем приглашение в Discord Pulsar.",
  githubToast: "Открываем профиль Znikson на GitHub.",
  rulesBody: "<p>Уважайте друг друга, поддерживайте конструктивное общение и соблюдайте правила Discord. Не спамьте, не преследуйте участников, не публикуйте личные данные и вредоносные ссылки.</p><p>Пишите по теме в подходящий канал. Модераторы могут удалять сообщения и ограничивать доступ ради безопасности сообщества.</p>",
  privacyBody: "<p>Сайт хранит выбранный язык в localStorage браузера. Число участников — снимок примерного значения из публичного Discord invite API, полученный 29.10.2026; при каждом посещении он не обновляется. Pulsar не собирает аккаунты.</p><p>Кнопка поддержки открывает DonationAlerts в новой вкладке. Переданные там данные обрабатывает DonationAlerts.</p>",
});

const RELEASE_DATE = "2026-10-29";
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
  ".section-kicker, .feature-heading-row, .feature-list .feature-card, .roadmap-note, .download-heading-row, .download-cards .download-card, .download-footnote, .support-section, .community-layout, .author-section, .closing-cta, .site-footer"
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
