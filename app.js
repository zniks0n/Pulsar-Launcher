const DONATE_URL = "https://www.donationalerts.com/r/zn1kson";
const LINKS = {
  github: "[GITHUB_ZNIKSON]",
  discord: "[DISCORD_ZNIKSON]",
  installer: "",
  portable: "",
};

const messages = {
  en: {
    skip: "Skip to content", navFeatures: "Features", navDownloads: "Downloads", navCommunity: "Community", navGet: "Get Pulsar",
    heroEyebrow: "A new orbit for your Minecraft worlds", heroTitle: "Your worlds,<br><em>one orbit.</em>",
    heroText: "Keep every instance, modpack and save close at hand. Pulsar is a modern Minecraft launcher in the making — focused on your worlds, not the busywork.",
    downloadSetup: "Download installer", downloadPortable: "Portable version", heroMeta: "Early access is being prepared", heroDiscord: "Meet the community <span>↗</span>",
    floatMods: "MODS, IN ORBIT", floatModsSub: "Your library, organized", mockOverline: "YOUR LIBRARY", mockGreeting: "Ready when you are.", mockReady: "READY", mockInstances: "Instances", mockModsCount: "Mods managed", mockJava: "Runtime ready", mockLocal: "LOCAL PROFILE", floatFocus: "FOCUS MODE", floatFocusSub: "Less setup. More play.", artCaption: "PRODUCT CONCEPT · INTERFACE PREVIEW", bottomLine: "BUILT FOR THE WAY YOU PLAY",
    featureKicker: "THE LAUNCHER, REIMAGINED", featureTitle: "A little less setup.<br><em>A lot more world.</em>", featureIntro: "The tools you need to shape a Minecraft experience that feels like yours — brought together in one thoughtfully designed place.", roadmap: "IN DEVELOPMENT",
    crashLine: "Mod resolution failed", crashFound: "Found a conflict", featureCrashTitle: "Crash report,<br>with a way forward.", featureCrashText: "Understand the error, spot a likely culprit and get clear next steps — with an optional AI-assisted explanation.",
    presencePlaying: "PLAYING A GAME", featurePresenceTitle: "Your Discord status,<br>in sync with your world.", featurePresenceText: "Show your instance, loader and play time with a Rich Presence that you can control from settings.",
    importLabel: "BRING YOUR WORLDS WITH YOU", featureImportTitle: "Switch launchers.<br>Keep your worlds.", featureImportText: "Bring instances and modpacks from launchers you already use, then keep everything in one tidy library.",
    updateLatest: "PULSAR IS UP TO DATE", updateSecure: "A smoother update, in the background", featureUpdateTitle: "Stay current.<br>Stay in your flow.", featureUpdateText: "Designed for reliable updates that keep your launcher ready without interrupting your routine.",
    questProgress: "YOUR QUEST LINE", questCurrent: "Into the Nether", featureProgressTitle: "Progress that<br>feels like progress.", featureProgressText: "See achievements and modpack quests come together in a clear view of how far you've travelled.",
    roadmapNote: "Pulsar Launcher is in active development. Features shown are part of the product roadmap and may change.", downloadKicker: "YOUR NEXT WORLD IS WAITING", downloadTitle: "Choose your<br><em>way to launch.</em>", downloadIntro: "Pick the build that fits your setup. Both releases will be published on GitHub.", releaseComing: "FIRST RELEASE IN PREPARATION", setupTitle: "Installer", setupDescription: "A guided install. Shortcuts, updates and a clean start.", fileSize: "FILE SIZE", published: "PUBLISHED", notPublished: "Not yet", portableTitle: "Portable", portableDescription: "No installer. Keep Pulsar in a folder and take it with you.", downloadNote: "The first release is not available yet. Download links and file details will appear here when the binaries are published.",
    supportLabel: "KEEP THE SIGNAL ALIVE", supportTitle: "Good tools are<br><em>built together.</em>", supportText: "Pulsar is an independent project by Znikson. If you like the direction, your support helps make more time for development.", supportButton: "Support development", supportSecure: "A little support goes a long way.",
    communityKicker: "FIND YOUR PEOPLE", communityLabel: "THE PULSAR COMMUNITY", communityTitle: "Made for players.<br><em>Better with players.</em>", communityText: "Share your setups, trade ideas and help shape what Pulsar becomes. The community space is getting ready to open.", discordButton: "Join the Discord", communityStatus: "COMMUNITY STATUS", communityMembers: "players ready to find their next world", communityOpening: "INVITE LINK COMING SOON",
    authorLabel: "INDEPENDENTLY BUILT", authorTitle: "One creator.<br><em>A universe of ideas.</em>", authorText: "Pulsar Launcher is created by Znikson — for people who love making Minecraft their own.", authorBy: "AUTHOR", closingText: "Your next world deserves a better launch.", closingLink: "Explore downloads <span>↗</span>", footerBlurb: "A modern home for your Minecraft worlds.", footerRules: "Community rules", footerPrivacy: "Privacy", footerDonate: "Support", footerMade: "Made with care for your next adventure.",
    releaseToast: "The first release is not published yet. Installer and portable downloads will appear here when they're ready.", discordToast: "The Discord invitation will be added when the community server opens.", githubToast: "The project GitHub link will be added when the public repository is ready.", rulesTitle: "Community rules", rulesBody: "<p>The Pulsar community is being prepared. Our rules will be published here before invitations open.</p><p>We want a welcoming space for players of every experience level. Be respectful, protect personal information and keep conversations constructive.</p>", privacyTitle: "Privacy", privacyBody: "<p>This static page stores only your language choice in your browser's localStorage. It does not use accounts or collect a member count.</p><p>Support opens DonationAlerts in a new tab. Any data submitted there is handled by that service.</p>",
  },
  ru: {
    skip: "Перейти к содержимому", navFeatures: "Возможности", navDownloads: "Скачать", navCommunity: "Сообщество", navGet: "О Pulsar",
    heroEyebrow: "Новая орбита для миров Minecraft", heroTitle: "Твои миры.<br><em>В одной орбите.</em>",
    heroText: "Все инстансы, сборки и сохранения — рядом. Pulsar — современный лаунчер Minecraft в разработке, который помогает заниматься мирами, а не рутиной.",
    downloadSetup: "Скачать установщик", downloadPortable: "Портативная версия", heroMeta: "Готовим ранний доступ", heroDiscord: "К сообществу <span>↗</span>",
    floatMods: "МОДЫ НА ОРБИТЕ", floatModsSub: "Библиотека в порядке", mockOverline: "ТВОЯ БИБЛИОТЕКА", mockGreeting: "Готовы к запуску.", mockReady: "ГОТОВО", mockInstances: "Инстансы", mockModsCount: "Модов в порядке", mockJava: "Среда готова", mockLocal: "ЛОКАЛЬНЫЙ ПРОФИЛЬ", floatFocus: "ФОКУС-РЕЖИМ", floatFocusSub: "Меньше настроек. Больше игры.", artCaption: "КОНЦЕПТ ПРОДУКТА · ПРЕВЬЮ ИНТЕРФЕЙСА", bottomLine: "ДЛЯ ТВОЕГО СПОСОБА ИГРАТЬ",
    featureKicker: "НОВЫЙ ВЗГЛЯД НА ЛАУНЧЕР", featureTitle: "Меньше подготовки.<br><em>Больше миров.</em>", featureIntro: "Всё, чтобы собрать Minecraft под себя, — в одном продуманном и удобном месте.", roadmap: "В РАЗРАБОТКЕ",
    crashLine: "Не удалось разрешить моды", crashFound: "Найден конфликт", featureCrashTitle: "Краш-репорт<br>с планом действий.", featureCrashText: "Разберись в ошибке, найди возможную причину и получи понятные шаги. При желании — с помощью ИИ.",
    presencePlaying: "СЕЙЧАС В ИГРЕ", featurePresenceTitle: "Статус Discord<br>в ритме твоего мира.", featurePresenceText: "Показывай инстанс, загрузчик и время в игре. Rich Presence можно включать и отключать в настройках.",
    importLabel: "ЗАБЕРИ СВОИ МИРЫ С СОБОЙ", featureImportTitle: "Смени лаунчер.<br>Сохрани свои миры.", featureImportText: "Переноси инстансы и сборки из привычных лаунчеров — и собирай их в одной библиотеке.",
    updateLatest: "PULSAR ОБНОВЛЁН", updateSecure: "Обновление — в фоне, без лишних шагов", featureUpdateTitle: "Всегда актуален.<br>Не выпадая из игры.", featureUpdateText: "Надёжные обновления, которые не отвлекают и оставляют лаунчер готовым к запуску.",
    questProgress: "ТВОЯ ЛИНИЯ КВЕСТОВ", questCurrent: "В Незер", featureProgressTitle: "Прогресс,<br>который видно.", featureProgressText: "Достижения и квесты сборки складываются в наглядную картину твоего пути.",
    roadmapNote: "Pulsar Launcher активно разрабатывается. Функции на странице — часть плана продукта и могут измениться.", downloadKicker: "ТВОЙ СЛЕДУЮЩИЙ МИР ЖДЁТ", downloadTitle: "Выбери свой<br><em>способ запуска.</em>", downloadIntro: "Выбери подходящий вариант. Оба релиза появятся на GitHub.", releaseComing: "ГОТОВИМ ПЕРВЫЙ РЕЛИЗ", setupTitle: "Установщик", setupDescription: "Установка с подсказками, ярлыками и обновлениями.", fileSize: "РАЗМЕР ФАЙЛА", published: "ДАТА РЕЛИЗА", notPublished: "Пока нет", portableTitle: "Портативная версия", portableDescription: "Без установки. Храни Pulsar в папке и бери с собой.", downloadNote: "Первый релиз ещё не опубликован. Ссылки, размеры и даты появятся после публикации файлов.",
    supportLabel: "ПОДДЕРЖИ СИГНАЛ", supportTitle: "Хорошие инструменты<br><em>создают вместе.</em>", supportText: "Pulsar — независимый проект Znikson. Если тебе нравится идея, поддержка поможет уделять разработке больше времени.", supportButton: "Поддержать разработку", supportSecure: "Любая поддержка важна.",
    communityKicker: "НАЙДИ СВОИХ", communityLabel: "СООБЩЕСТВО PULSAR", communityTitle: "Для игроков.<br><em>Вместе — лучше.</em>", communityText: "Делись сборками, обсуждай идеи и помогай решать, каким станет Pulsar. Мы готовим пространство для сообщества.", discordButton: "Открыть Discord", communityStatus: "СТАТУС СООБЩЕСТВА", communityMembers: "игроков готовы к следующему миру", communityOpening: "ССЫЛКА-ПРИГЛАШЕНИЕ СКОРО ПОЯВИТСЯ",
    authorLabel: "НЕЗАВИСИМЫЙ ПРОЕКТ", authorTitle: "Один автор.<br><em>Целая вселенная идей.</em>", authorText: "Pulsar Launcher создаёт Znikson — для тех, кто любит настраивать Minecraft под себя.", authorBy: "АВТОР", closingText: "Твой следующий мир заслуживает хорошего запуска.", closingLink: "К загрузкам <span>↗</span>", footerBlurb: "Современный дом для миров Minecraft.", footerRules: "Правила сообщества", footerPrivacy: "Конфиденциальность", footerDonate: "Поддержать", footerMade: "Создано с заботой о твоих следующих приключениях.",
    releaseToast: "Первый релиз ещё не опубликован. Здесь появятся ссылки на установщик и портативную версию.", discordToast: "Приглашение в Discord появится, когда откроется сервер сообщества.", githubToast: "Ссылка на GitHub появится после создания публичного репозитория.", rulesTitle: "Правила сообщества", rulesBody: "<p>Сообщество Pulsar готовится к запуску. Правила появятся здесь до открытия приглашений.</p><p>Мы хотим создать дружелюбное пространство для игроков любого уровня. Уважай других, береги личные данные и поддерживай конструктивное общение.</p>", privacyTitle: "Конфиденциальность", privacyBody: "<p>Эта статическая страница сохраняет только выбранный язык в localStorage браузера. Здесь нет аккаунтов и не собирается счётчик участников.</p><p>Кнопка поддержки открывает DonationAlerts в новой вкладке. Переданные там данные обрабатывает этот сервис.</p>",
  },
};

const RELEASES = {
  setup: { url: LINKS.installer, size: "—", date: "" },
  portable: { url: LINKS.portable, size: "—", date: "" },
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
  document.title = currentLanguage === "ru"
    ? "Pulsar Launcher — каждый мир на своей орбите"
    : "Pulsar Launcher — every world, in its own orbit";
  document.querySelector('meta[name="description"]').content = currentLanguage === "ru"
    ? "Pulsar Launcher — современный дом для миров Minecraft. Инстансы, моды и сохранения в одном месте, меньше настройки — больше игры."
    : "Pulsar Launcher is a modern home for your Minecraft worlds. Keep instances, mods and saves together, and spend less time setting up.";
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
