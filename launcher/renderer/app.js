const DONATE_URL = "https://www.donationalerts.com/r/zn1kson";
const WEBSITE_URL = "https://pulsar-bq4wlerh.manus.space/";
const dictionaries = {
  en: {
    navSpace: "YOUR SPACE", navHome: "Home", navInstances: "Instances", navMods: "Mods", navManage: "MANAGE", navSettings: "Settings", navAbout: "About Pulsar", localReady: "Local profile ready", supportDev: "Support the developer", buildLabel: "EARLY ACCESS · 0.2.0", localMode: "LOCAL MODE",
    heroEyebrow: "YOUR NEXT WORLD STARTS HERE", heroTitleA: "Make room", heroTitleB: "for wonder.", heroCopy: "A quiet, thoughtful home for your Minecraft worlds. Set up an instance, make it yours, and press play when you’re ready.", playSelected: "Play selected world", createWorld: "Create an instance", openSource: "Open-source project", madeBy: "Made by Znikson", firstRunNotice: "First time here? Create an instance to begin.", statInstances: "INSTANCES", statProfile: "ACTIVE PROFILE", statRuntime: "RUNTIME", recentWorlds: "Your worlds", viewAll: "View all", emptyTitle: "A new world is one click away.", emptyCopy: "Create a separate instance so mods, settings and saves stay neatly in one place.", createFirst: "Create your first instance", noteLabel: "A SMALL NOTE", offlineTitle: "Simple, honest, and yours.", offlineCopy: "Offline profiles work in offline-mode servers only. A Microsoft account integration is not included in this early build.", learnMore: "Learn more",
    instancesTitle: "Your instances", instancesSubtitle: "Independent game folders for different versions and play styles.", importInstance: "Import a folder", newInstance: "New instance", allWorlds: "ALL WORLDS", isolatedFolders: "Each instance has its own folder", noInstances: "Your library is waiting.", noInstancesCopy: "Create a Vanilla or Fabric instance, or import a compatible Minecraft folder.",
    modsTitle: "A world of mods.", modsSubtitle: "Discover compatible projects from Modrinth and manage your local mod files.", targetInstance: "TARGET INSTANCE", search: "Search", modsCompatibility: "Install is enabled only for the exact Minecraft version and loader selected for this instance. Downloads are verified against Modrinth hashes.", results: "Results", searchToStart: "Search for something new.", searchToStartCopy: "Find mods, then install a release compatible with the selected instance.", installedMods: "Installed mods", noInstalledMods: "No mod files yet for this instance.",
    settingsTitle: "Make it feel like yours.", settingsSubtitle: "The launcher remembers your choices on this computer.", appearance: "Appearance", appearanceCopy: "Set the mood for your next session.", language: "Language", systemDefault: "System default", theme: "Theme", dark: "Dark", light: "Light", accentColor: "Accent color", violet: "Pulsar violet", mint: "Aurora mint", ember: "Solar ember", blue: "Deep blue", runtimeSettings: "Game runtime", runtimeSettingsCopy: "Choose a local Java installation and memory budget.", javaExecutable: "Java executable", browse: "Browse", minMemory: "Minimum memory (MB)", maxMemory: "Maximum memory (MB)", authlibInjector: "authlib-injector JAR (Yggdrasil only)", showSnapshots: "Show snapshots", showSnapshotsCopy: "Include experimental Minecraft versions in the picker.", privacy: "Privacy & accounts", privacyCopy: "Account tokens are protected by your operating system when available.", manageAccounts: "Manage accounts", accountWarning: "Pulsar never asks for a Microsoft password. Microsoft sign-in is not yet included in this early build. Offline profiles do not authenticate to online-mode servers.", saveSettings: "Save preferences",
    aboutTitle: "Built for the worlds we love.", aboutSubtitle: "An independent launcher project by Znikson.", project: "THE PROJECT", aboutCopy: "Pulsar is an early-stage, open-source launcher project. The current desktop preview focuses on real Java installs, isolated instances and safe local settings. Some planned integrations are not implemented yet.", theAuthor: "THE AUTHOR", authorCopy: "One creator, one launcher, and a whole lot of worlds to explore.", githubPlaceholder: "Open GitHub profile", githubStatus: "Source and v0.2.0 releases are available on GitHub.", projectRepository: "Source & releases", discordCommunity: "Join Pulsar on Discord", currentStage: "CURRENT STAGE", earlyAccess: "Early access · 0.2.0", stageCopy: "The Windows package is unsigned. Windows may display an unknown-publisher warning. Review the source before running.", projectWebsite: "Project website", donate: "DonationAlerts", notAffiliated: "Not affiliated with Mojang Studios or Microsoft.",
    newInstanceTitle: "Give your world a home.", instanceName: "Instance name", minecraftVersion: "Minecraft version", loader: "Loader", group: "Group", instanceInstallNote: "After creation, Pulsar downloads game files and then offers Play. A local Java runtime is required to launch.", createInstance: "Create instance", accountTitle: "Choose how you play.", offlineProfile: "Offline profile", yggProfile: "Yggdrasil account", playerName: "Player name", offlineExplainer: "A local identity only. Online-mode servers require an authenticated account.", addOffline: "Add offline profile", provider: "Provider", apiUrl: "Yggdrasil API base URL", accountName: "Account name / email", password: "Password", yggWarning: "Only use a provider you trust. Pulsar sends credentials to its HTTPS API and does not save your password. Yggdrasil requires authlib-injector in Settings to join the matching servers.", signIn: "Sign in securely", microsoftNotReady: "Microsoft account sign-in is not included yet. Pulsar will never ask you to type a Microsoft password here.", crashTitle: "The game closed unexpectedly.", crashCopy: "This report is from the local Minecraft process. It is not uploaded anywhere.", close: "Close", cancel: "Cancel",
    install: "Install", play: "Play", select: "Select", remove: "Remove", openFolder: "Open folder", installed: "Installed", ready: "Ready", imported: "Imported", version: "Version", modsFor: "mods", searchHint: "Search Modrinth", noCompatible: "No compatible release was found.", modSearchFailed: "Modrinth could not be reached. Check your connection and try again.", installing: "Installing", installingGame: "Preparing Minecraft files…", launching: "Starting Minecraft…", saved: "Saved on this computer", deleteAccount: "Remove account", accountSwitched: "Active profile changed.", instanceCreated: "Instance created.", importDone: "Instance imported. Review the Java path before launching.", installCancelled: "Installation cancelled.", installReady: "Installation complete — your world is ready.", gameStarted: "Minecraft is starting.", noSelected: "Select an instance first.", noInstancesYet: "Create or import an instance first.", searchFirst: "Search Modrinth to discover mods.", noMods: "No installed mods for this instance yet.", modInstalled: "Mod installed and checksum verified.", modExists: "That mod version is already installed.", secureAvailable: "OS-protected account storage is available.", secureUnavailable: "OS-protected account storage is unavailable; online tokens cannot be saved.", settingsSaved: "Preferences saved.", javaSaved: "Java runtime saved.", injectorSaved: "authlib-injector path saved.", copied: "Copied", yggHelp: "For Custom Yggdrasil, enter the API base URL from your provider’s official documentation.", noVersions: "Could not load Minecraft versions right now.", importedFile: "Imported folder", installProgress: "Preparing your world", removeConfirm: "Remove this account from Pulsar?", javaMissing: "Choose Java 17 or newer in Settings before launching this Minecraft version.", searchLoading: "Searching Modrinth…", openDonation: "Opening DonationAlerts", openingWebsite: "Opening the Pulsar website", unsupportedLoader: "Mod downloads are currently enabled for Vanilla and Fabric instances.", closeCrash: "Close this report",
  },
  ru: {
    navSpace: "ВАШЕ ПРОСТРАНСТВО", navHome: "Главная", navInstances: "Сборки", navMods: "Моды", navManage: "УПРАВЛЕНИЕ", navSettings: "Настройки", navAbout: "О Pulsar", localReady: "Локальный профиль готов", supportDev: "Поддержать разработчика", buildLabel: "РАННИЙ ДОСТУП · 0.2.0", localMode: "ЛОКАЛЬНЫЙ РЕЖИМ",
    heroEyebrow: "ВАШ СЛЕДУЮЩИЙ МИР НАЧИНАЕТСЯ ЗДЕСЬ", heroTitleA: "Место для", heroTitleB: "удивительных миров.", heroCopy: "Спокойный дом для ваших миров Minecraft. Создайте отдельную сборку, настройте её под себя и запускайте, когда будете готовы.", playSelected: "Запустить выбранный мир", createWorld: "Создать сборку", openSource: "Открытый проект", madeBy: "Автор — Znikson", firstRunNotice: "Впервые здесь? Создайте сборку, чтобы начать.", statInstances: "СБОРКИ", statProfile: "АКТИВНЫЙ ПРОФИЛЬ", statRuntime: "СРЕДА", recentWorlds: "Ваши миры", viewAll: "Все сборки", emptyTitle: "Новый мир — всего в одном шаге.", emptyCopy: "Каждая сборка хранит свои моды, настройки и сохранения отдельно.", createFirst: "Создать первую сборку", noteLabel: "ВАЖНО", offlineTitle: "Просто, честно и по-вашему.", offlineCopy: "Оффлайн-профили работают только на серверах в оффлайн-режиме. В этой ранней версии нет входа через Microsoft.", learnMore: "Подробнее",
    instancesTitle: "Ваши сборки", instancesSubtitle: "Отдельные папки игры для разных версий и стилей игры.", importInstance: "Импортировать папку", newInstance: "Новая сборка", allWorlds: "ВСЕ МИРЫ", isolatedFolders: "У каждой сборки своя папка", noInstances: "Ваша библиотека ждёт.", noInstancesCopy: "Создайте сборку Vanilla или Fabric либо импортируйте совместимую папку Minecraft.",
    modsTitle: "Целый мир модов.", modsSubtitle: "Находите проекты на Modrinth и управляйте локальными файлами модов.", targetInstance: "ЦЕЛЕВАЯ СБОРКА", search: "Найти", modsCompatibility: "Установка доступна только для точной версии Minecraft и загрузчика выбранной сборки. Загрузки проверяются по хешам Modrinth.", results: "Результаты", searchToStart: "Найдите что-нибудь новое.", searchToStartCopy: "Найдите моды и установите версию, совместимую с выбранной сборкой.", installedMods: "Установленные моды", noInstalledMods: "В этой сборке пока нет файлов модов.",
    settingsTitle: "Настройте под себя.", settingsSubtitle: "Лаунчер запомнит ваши настройки на этом компьютере.", appearance: "Внешний вид", appearanceCopy: "Выберите настроение для следующей игры.", language: "Язык", systemDefault: "Язык системы", theme: "Тема", dark: "Тёмная", light: "Светлая", accentColor: "Цвет акцента", violet: "Фиолетовый Pulsar", mint: "Мятное сияние", ember: "Солнечный янтарь", blue: "Глубокий синий", runtimeSettings: "Среда игры", runtimeSettingsCopy: "Укажите установленную Java и выделяемую память.", javaExecutable: "Исполняемый файл Java", browse: "Обзор", minMemory: "Минимум памяти (МБ)", maxMemory: "Максимум памяти (МБ)", authlibInjector: "authlib-injector JAR (только Yggdrasil)", showSnapshots: "Показывать снапшоты", showSnapshotsCopy: "Включать экспериментальные версии Minecraft в списке.", privacy: "Приватность и аккаунты", privacyCopy: "При возможности токены аккаунтов защищены средствами операционной системы.", manageAccounts: "Управление аккаунтами", accountWarning: "Pulsar не спрашивает пароль Microsoft. Вход через Microsoft пока не реализован. Оффлайн-профили не работают на серверах с online-mode.", saveSettings: "Сохранить настройки",
    aboutTitle: "Для миров, которые мы любим.", aboutSubtitle: "Независимый проект лаунчера от Znikson.", project: "ПРОЕКТ", aboutCopy: "Pulsar — ранний открытый проект лаунчера. Текущий desktop preview сосредоточен на настоящей установке Java Minecraft, изолированных сборках и безопасных локальных настройках. Часть задуманных интеграций пока не реализована.", theAuthor: "АВТОР", authorCopy: "Один создатель, один лаунчер и множество миров для исследования.", githubPlaceholder: "Профиль на GitHub", githubStatus: "Исходный код и релиз v0.2.0 доступны на GitHub.", projectRepository: "Исходный код и релизы", discordCommunity: "Открыть Discord Pulsar", currentStage: "ТЕКУЩИЙ ЭТАП", earlyAccess: "Ранний доступ · 0.2.0", stageCopy: "Windows-пакет не подписан. Windows может показать предупреждение о неизвестном издателе. Перед запуском проверьте исходники.", projectWebsite: "Сайт проекта", donate: "DonationAlerts", notAffiliated: "Не связан с Mojang Studios или Microsoft.",
    newInstanceTitle: "Найдите дому для своего мира.", instanceName: "Название сборки", minecraftVersion: "Версия Minecraft", loader: "Загрузчик", group: "Группа", instanceInstallNote: "После создания Pulsar загрузит игровые файлы, затем появится кнопка запуска. Для игры требуется установленная Java.", createInstance: "Создать сборку", accountTitle: "Выберите способ игры.", offlineProfile: "Оффлайн-профиль", yggProfile: "Аккаунт Yggdrasil", playerName: "Имя игрока", offlineExplainer: "Только локальное имя. Для серверов online-mode требуется подтверждённый аккаунт.", addOffline: "Добавить оффлайн-профиль", provider: "Провайдер", apiUrl: "Базовый URL API Yggdrasil", accountName: "Имя аккаунта / почта", password: "Пароль", yggWarning: "Используйте только доверенный провайдер. Pulsar передаёт данные его HTTPS API и не сохраняет пароль. Для серверов провайдера в настройках также нужен authlib-injector.", signIn: "Войти безопасно", microsoftNotReady: "Вход Microsoft пока не реализован. Pulsar никогда не попросит ввести здесь пароль Microsoft.", crashTitle: "Игра неожиданно закрылась.", crashCopy: "Отчёт получен от локального процесса Minecraft. Он никуда не отправляется.", close: "Закрыть", cancel: "Отмена",
    install: "Установить", play: "Играть", select: "Выбрать", remove: "Удалить", openFolder: "Открыть папку", installed: "Установлена", ready: "Готова", imported: "Импортирована", version: "Версия", modsFor: "модов", searchHint: "Поиск на Modrinth", noCompatible: "Совместимая версия не найдена.", modSearchFailed: "Не удалось подключиться к Modrinth. Проверьте интернет и повторите попытку.", installing: "Установка", installingGame: "Подготовка файлов Minecraft…", launching: "Запуск Minecraft…", saved: "Сохранено на этом компьютере", deleteAccount: "Удалить аккаунт", accountSwitched: "Активный профиль изменён.", instanceCreated: "Сборка создана.", importDone: "Сборка импортирована. Проверьте путь Java перед запуском.", installCancelled: "Установка отменена.", installReady: "Установка завершена — мир готов.", gameStarted: "Minecraft запускается.", noSelected: "Сначала выберите сборку.", noInstancesYet: "Сначала создайте или импортируйте сборку.", searchFirst: "Ищите моды на Modrinth.", noMods: "В этой сборке пока нет установленных модов.", modInstalled: "Мод установлен, контрольная сумма проверена.", modExists: "Эта версия мода уже установлена.", secureAvailable: "Защищённое хранилище ОС доступно.", secureUnavailable: "Защищённое хранилище ОС недоступно — онлайн-токены нельзя сохранить.", settingsSaved: "Настройки сохранены.", javaSaved: "Среда Java сохранена.", injectorSaved: "Путь authlib-injector сохранён.", copied: "Скопировано", yggHelp: "Для своего Yggdrasil укажите URL API из официальной документации провайдера.", noVersions: "Сейчас не удалось загрузить версии Minecraft.", importedFile: "Импортированная папка", installProgress: "Подготовка вашего мира", removeConfirm: "Удалить этот аккаунт из Pulsar?", javaMissing: "Перед запуском этой версии выберите Java 17 или новее в настройках.", searchLoading: "Поиск на Modrinth…", openDonation: "Открываем DonationAlerts", openingWebsite: "Открываем сайт Pulsar", unsupportedLoader: "Загрузка модов пока доступна для сборок Vanilla и Fabric.", closeCrash: "Закрыть отчёт",
  },
};

const byId = (id) => document.getElementById(id);
const ui = {
  pages: [...document.querySelectorAll("[data-page]")],
  routeButtons: [...document.querySelectorAll("[data-route]")],
  instanceDialog: byId("instance-dialog"),
  accountDialog: byId("account-dialog"),
  crashDialog: byId("crash-dialog"),
};
let state = null;
let currentPage = "home";
let versionsCache = null;
let installBusy = false;
let latestMods = [];
let lastCrashEvent = null;
let crashReportData = null;

function language() {
  const selected = state?.settings?.language || "auto";
  if (selected !== "auto") return selected;
  return navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
}

function t(key) {
  return dictionaries[language()][key] || dictionaries.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language();
  document.title = "Pulsar Launcher";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => { element.title = t(element.dataset.i18nTitle); });
}

function setTheme() {
  const settings = state?.settings || {};
  document.body.dataset.theme = settings.theme || "dark";
  document.body.dataset.palette = settings.palette || "violet";
}

function showToast(message, kind = "normal") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${kind}`;
  toast.textContent = String(message || "");
  byId("toast-region").append(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 260);
  }, 3300);
}

function showEvent(message) {
  const strip = byId("event-strip");
  strip.textContent = String(message || "");
  strip.hidden = !message;
  if (message) window.setTimeout(() => { if (strip.textContent === message) strip.hidden = true; }, 4200);
}

function openDialog(dialog) {
  if (dialog && !dialog.open) dialog.showModal();
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

async function refreshState() {
  state = await window.pulsar.getState();
  if (!state.selectedInstanceId && state.instances[0]) state.selectedInstanceId = state.instances[0].id;
  setTheme();
  applyLanguage();
  renderAccounts();
  renderInstances();
  renderStats();
  renderSettings();
  renderModInstancePicker();
  return state;
}

function navigate(page) {
  if (!ui.pages.some((section) => section.dataset.page === page)) return;
  currentPage = page;
  ui.pages.forEach((section) => {
    const active = section.dataset.page === page;
    section.hidden = !active;
    section.classList.toggle("is-active", active);
  });
  document.querySelectorAll(".nav-link[data-route]").forEach((button) => button.classList.toggle("is-active", button.dataset.route === page));
  const titleKey = { home: "navHome", instances: "navInstances", mods: "navMods", settings: "navSettings", about: "navAbout" }[page];
  byId("breadcrumb-title").textContent = t(titleKey);
  if (page === "mods") void refreshModsPage();
  if (page === "instances") renderInstances();
}

function renderAccounts() {
  const accounts = state?.accounts || [];
  const account = accounts.find((item) => item.id === state.selectedAccountId) || accounts[0];
  byId("account-name").textContent = account?.name || "PulsarPlayer";
  byId("account-avatar").textContent = (account?.name || "P").slice(0, 1).toUpperCase();
  byId("account-type").textContent = account?.kind === "yggdrasil" ? (account.providerLabel || "Yggdrasil") : t("offlineProfile");
  const list = byId("account-list");
  list.replaceChildren();
  accounts.forEach((item) => {
    const row = createElement("div", `account-row${item.id === state.selectedAccountId ? " is-selected" : ""}`);
    const avatar = createElement("span", "avatar account-list-avatar", item.name.slice(0, 1).toUpperCase());
    const copy = createElement("span", "account-list-copy");
    copy.append(createElement("b", "", item.name), createElement("small", "", item.kind === "yggdrasil" ? item.providerLabel : t("offlineProfile")));
    const select = createElement("button", "button button-outline button-small", item.id === state.selectedAccountId ? t("ready") : t("select"));
    select.type = "button";
    select.addEventListener("click", async () => {
      try { await window.pulsar.selectAccount(item.id); await refreshState(); showToast(t("accountSwitched")); }
      catch (error) { showToast(error.message, "error"); }
    });
    const remove = createElement("button", "icon-button account-remove", "×");
    remove.type = "button";
    remove.title = t("deleteAccount");
    remove.setAttribute("aria-label", t("deleteAccount"));
    remove.addEventListener("click", async () => {
      if (!window.confirm(t("removeConfirm"))) return;
      try { await window.pulsar.removeAccount(item.id); await refreshState(); }
      catch (error) { showToast(error.message, "error"); }
    });
    row.append(avatar, copy, select, remove);
    list.append(row);
  });
}

function renderStats() {
  const instances = state?.instances || [];
  const selected = instances.find((instance) => instance.id === state.selectedInstanceId) || instances[0];
  byId("stat-instances").textContent = String(instances.length).padStart(2, "0");
  byId("stat-profile").textContent = state?.accounts?.find((item) => item.id === state.selectedAccountId)?.name || "Offline";
  byId("stat-java").textContent = selected?.managedJavaMajor ? `JAVA ${selected.managedJavaMajor}` : state?.settings?.javaPath ? "CUSTOM JAVA" : "JAVA";
  byId("instance-count").textContent = String(instances.length).padStart(2, "0");
  byId("instance-count").setAttribute("aria-label", `${instances.length} instances`);
  if (selected) state.selectedInstanceId = selected.id;
}

function makeInstanceCard(instance, compact = false) {
  const card = createElement("article", `instance-card${compact ? " instance-card-compact" : ""}${instance.id === state.selectedInstanceId ? " is-selected" : ""}`);
  card.dataset.instanceId = instance.id;
  const cardTop = createElement("div", "instance-card-top");
  const artwork = createElement("div", `instance-art${instance.loader === "fabric" ? " art-fabric" : ""}`);
  artwork.setAttribute("aria-hidden", "true");
  artwork.append(createElement("span", "art-orbit", "✦"), createElement("i", "art-dot art-dot-one"), createElement("i", "art-dot art-dot-two"));
  const status = createElement("span", `instance-status${instance.installed ? " is-ready" : ""}`);
  status.append(createElement("i", ""), createElement("span", "", instance.installed ? t("ready") : t("install")));
  cardTop.append(artwork, status);
  const body = createElement("div", "instance-card-body");
  const title = createElement("div", "instance-title-row");
  title.append(createElement("h3", "", instance.name), createElement("span", "instance-loader", instance.loader === "fabric" ? "FABRIC" : instance.loader === "vanilla" ? "VANILLA" : instance.loader.toUpperCase()));
  body.append(title, createElement("p", "instance-version-line", `${instance.version} · ${instance.group || t("allWorlds")}`));
  if (instance.managedJavaMajor) body.append(createElement("p", "instance-version-line", `${t("managedJavaLabel")} ${instance.managedJavaMajor}`));
  const actions = createElement("div", "instance-card-actions");
  const primary = createElement("button", `button ${instance.installed ? "button-primary" : "button-outline"} button-small`, instance.installed ? t("play") : t("install"));
  primary.type = "button";
  primary.addEventListener("click", async (event) => { event.stopPropagation(); await launchOrInstall(instance); });
  const select = createElement("button", "text-button", instance.id === state.selectedInstanceId ? t("ready") : t("select"));
  select.type = "button";
  select.addEventListener("click", async (event) => { event.stopPropagation(); await selectInstance(instance.id); });
  actions.append(primary, select);
  if (!compact) {
    const more = createElement("div", "instance-card-tools");
    const folder = createElement("button", "text-button", `↗ ${t("openFolder")}`);
    folder.type = "button";
    folder.addEventListener("click", async () => { try { await window.pulsar.openInstanceFolder(instance.id); } catch (error) { showToast(error.message, "error"); } });
    const remove = createElement("button", "text-button text-danger", `× ${t("remove")}`);
    remove.type = "button";
    remove.addEventListener("click", async () => { try { const removed = await window.pulsar.deleteInstance(instance.id); if (removed) { await refreshState(); showToast(t("remove")); } } catch (error) { showToast(error.message, "error"); } });
    more.append(folder, remove);
    body.append(more);
  }
  card.append(cardTop, body, actions);
  card.addEventListener("click", () => { void selectInstance(instance.id); });
  return card;
}

function renderInstances() {
  const instances = [...(state?.instances || [])].sort((a, b) => String(b.lastPlayedAt || b.createdAt).localeCompare(String(a.lastPlayedAt || a.createdAt)));
  const home = byId("home-instances");
  const list = byId("instances-list");
  home.replaceChildren();
  list.replaceChildren();
  byId("home-empty").hidden = instances.length > 0;
  byId("instances-empty").hidden = instances.length > 0;
  instances.slice(0, 3).forEach((instance) => home.append(makeInstanceCard(instance, true)));
  instances.forEach((instance) => list.append(makeInstanceCard(instance, false)));
  byId("installed-empty").hidden = true;
}

async function selectInstance(id) {
  if (!state.instances.some((instance) => instance.id === id)) return;
  await window.pulsar.selectInstance(id);
  await refreshState();
  renderInstances();
  renderModInstancePicker();
  showToast(state.instances.find((instance) => instance.id === id)?.name || "");
}

function renderSettings() {
  const settings = state?.settings || {};
  byId("setting-language").value = settings.language || "auto";
  byId("setting-theme").value = settings.theme || "dark";
  byId("setting-palette").value = settings.palette || "violet";
  byId("setting-java-path").value = settings.javaPath || "";
  byId("setting-injector-path").value = settings.authlibInjectorPath || "";
  byId("setting-min-memory").value = settings.minMemory || 1024;
  byId("setting-max-memory").value = settings.maxMemory || 4096;
  byId("setting-snapshots").checked = Boolean(settings.showSnapshots);
  byId("setting-auto-open-crash").checked = settings.autoOpenCrash !== false;
  byId("setting-auto-copy-crash").checked = Boolean(settings.autoCopyCrashPrompt);
  byId("setting-custom-ai-template").value = settings.customAiTemplate || "";
  byId("safe-storage-status").textContent = state.safeStorageAvailable ? t("secureAvailable") : t("secureUnavailable");
  byId("safe-storage-status").classList.toggle("is-error", !state.safeStorageAvailable);
}

function renderModInstancePicker() {
  const select = byId("mods-instance");
  if (!select) return;
  const previous = select.value || state?.selectedInstanceId;
  select.replaceChildren();
  (state?.instances || []).forEach((instance) => {
    const option = document.createElement("option");
    option.value = instance.id;
    option.textContent = `${instance.name} · ${instance.version}`;
    select.append(option);
  });
  if (state?.instances?.some((instance) => instance.id === previous)) select.value = previous;
  else if (state?.instances?.[0]) select.value = state.instances[0].id;
}

async function loadVersions() {
  const select = byId("instance-version");
  select.replaceChildren();
  const loading = document.createElement("option");
  loading.textContent = "…";
  select.append(loading);
  try {
    versionsCache = await window.pulsar.listVersions();
    select.replaceChildren();
    versionsCache.versions.forEach((version) => {
      const option = document.createElement("option");
      option.value = version.id;
      option.textContent = `${version.id} · ${version.type}`;
      select.append(option);
    });
    if (versionsCache.latestRelease) select.value = versionsCache.latestRelease;
  } catch (error) {
    select.replaceChildren();
    const option = document.createElement("option");
    option.value = "";
    option.textContent = t("noVersions");
    select.append(option);
    showToast(error.message || t("noVersions"), "error");
  }
}

function openInstanceDialog() {
  byId("instance-form").reset();
  byId("instance-group").value = "My worlds";
  openDialog(ui.instanceDialog);
  void loadVersions();
  window.setTimeout(() => byId("instance-name").focus(), 60);
}

async function launchOrInstall(instance) {
  if (installBusy) return;
  if (!instance) { showToast(t("noSelected"), "error"); return; }
  installBusy = true;
  try {
    if (!instance.installed || !instance.installedVersionId) {
      await window.pulsar.installInstance(instance.id);
      await refreshState();
      instance = state.instances.find((item) => item.id === instance.id);
      showToast(t("installReady"));
    }
    if (instance) {
      const result = await window.pulsar.launchInstance(instance.id);
      showToast(`${t("gameStarted")} ${result.pid ? `PID ${result.pid}` : ""}`.trim());
    }
  } catch (error) {
    showToast(error.message || t("noInstancesYet"), "error");
  } finally {
    installBusy = false;
    window.setTimeout(() => { byId("install-panel").hidden = true; }, 900);
    await refreshState();
  }
}

function renderProgress(event) {
  const panel = byId("install-panel");
  panel.hidden = false;
  const percent = Math.max(0, Math.min(100, Number(event.progress) || 0));
  byId("install-percent").textContent = `${percent}%`;
  byId("install-bar").style.width = `${percent}%`;
  byId("install-title").textContent = event.stage === "complete" ? t("installReady") : event.stage === "java-runtime" ? t("installingJava") : `${t("installingGame")} ${event.stage || ""}`;
  byId("install-detail").textContent = event.detail || t("installProgress");
  byId("cancel-install").dataset.instanceId = event.instanceId;
}

function renderModResults() {
  const container = byId("mod-results");
  container.replaceChildren();
  byId("mod-result-count").textContent = latestMods.length ? `${latestMods.length}` : "";
  byId("mods-empty").hidden = latestMods.length > 0;
  latestMods.forEach((mod) => {
    const card = createElement("article", "mod-card");
    const top = createElement("div", "mod-card-top");
    if (mod.iconUrl && new URL(mod.iconUrl).hostname === "cdn.modrinth.com") {
      const icon = document.createElement("img");
      icon.src = mod.iconUrl;
      icon.alt = "";
      icon.loading = "lazy";
      icon.referrerPolicy = "no-referrer";
      top.append(icon);
    } else top.append(createElement("span", "mod-icon-placeholder", "⌘"));
    const title = createElement("div", "mod-title");
    title.append(createElement("h3", "", mod.title), createElement("small", "", `${Number(mod.downloads).toLocaleString()} ${language() === "ru" ? "загрузок" : "downloads"}`));
    top.append(title);
    card.append(top, createElement("p", "mod-description", mod.description));
    const footer = createElement("div", "mod-card-foot");
    const category = createElement("span", "mod-category", mod.categories?.[0] || "MODRINTH");
    const install = createElement("button", "button button-outline button-small", t("install"));
    install.type = "button";
    install.addEventListener("click", async () => {
      const instanceId = byId("mods-instance").value;
      const instance = state.instances.find((item) => item.id === instanceId);
      if (!instance) return showToast(t("noInstancesYet"), "error");
      if (!["vanilla", "fabric"].includes(instance.loader)) return showToast(t("unsupportedLoader"), "error");
      install.disabled = true;
      install.textContent = t("installing");
      try {
        const result = await window.pulsar.installMod(instanceId, mod.projectId);
        showToast(result.alreadyInstalled ? t("modExists") : t("modInstalled"));
        await refreshInstalledMods();
      } catch (error) { showToast(error.message, "error"); }
      finally { install.disabled = false; install.textContent = t("install"); }
    });
    footer.append(category, install);
    card.append(footer);
    container.append(card);
  });
}

async function refreshInstalledMods() {
  const instanceId = byId("mods-instance").value;
  const list = byId("installed-mods");
  list.replaceChildren();
  if (!instanceId) {
    byId("installed-empty").textContent = t("noInstancesYet");
    byId("installed-empty").hidden = false;
    byId("installed-count").textContent = "0";
    return;
  }
  try {
    const mods = await window.pulsar.listInstanceMods(instanceId);
    byId("installed-count").textContent = String(mods.length);
    byId("installed-empty").hidden = mods.length > 0;
    mods.forEach((mod) => {
      const row = createElement("div", `installed-row${mod.enabled ? "" : " is-disabled"}`);
      row.append(createElement("span", "installed-mod-mark", "⌘"), createElement("span", "installed-mod-name", mod.fileName), createElement("small", "", `${Math.max(1, Math.round(mod.size / 1024))} KB`));
      const toggle = createElement("button", "text-button", mod.enabled ? (language() === "ru" ? "Выключить" : "Disable") : (language() === "ru" ? "Включить" : "Enable"));
      toggle.type = "button";
      toggle.addEventListener("click", async () => {
        try { await window.pulsar.toggleMod(instanceId, mod.fileName, !mod.enabled); await refreshInstalledMods(); }
        catch (error) { showToast(error.message, "error"); }
      });
      row.append(toggle);
      list.append(row);
    });
  } catch (error) { showToast(error.message, "error"); }
}

async function refreshModsPage() {
  renderModInstancePicker();
  await refreshInstalledMods();
}

async function searchModrinth(query) {
  const cleanQuery = String(query || "").trim();
  if (!cleanQuery) { latestMods = []; renderModResults(); showToast(t("searchFirst")); return; }
  const button = document.querySelector("#mod-search-form button[type=submit]");
  button.disabled = true;
  button.textContent = t("searchLoading");
  try {
    latestMods = await window.pulsar.searchMods(cleanQuery);
    renderModResults();
    if (!latestMods.length) showToast(t("noCompatible"));
  } catch (error) { latestMods = []; renderModResults(); showToast(error.message || t("modSearchFailed"), "error"); }
  finally { button.disabled = false; button.textContent = t("search"); }
}

const AI_DESTINATIONS = Object.freeze({
  chatgpt: "https://chatgpt.com/", claude: "https://claude.ai/", gemini: "https://gemini.google.com/",
  deepseek: "https://chat.deepseek.com/", perplexity: "https://www.perplexity.ai/", copilot: "https://copilot.microsoft.com/",
  giga: "https://giga.chat/", yandex: "https://alice.yandex.ru/",
});

function redactCrashText(value) {
  return String(value || "")
    .replace(/\bBearer\s+[A-Za-z0-9._~+/-]+=*/gi, "Bearer [REDACTED]")
    .replace(/(access[_-]?token|refresh[_-]?token|client[_-]?token|password|authorization)\s*[:=]\s*["']?[^,\s"'}]+/gi, "$1=[REDACTED]")
    .replace(/([A-Z]:\\Users\\)[^\\\r\n]+/gi, "$1[USER]")
    .replace(/(\/home\/)[^/\r\n]+/g, "$1[USER]");
}

function makeCrashPrompt(data) {
  const log = redactCrashText(data.report).slice(-10000);
  return `Help diagnose this Minecraft Java crash. Separate facts from hypotheses, identify likely causes from evidence, and suggest safe reversible steps. Do not assume an account/license problem without evidence.\n\nMinecraft version: ${data.version}\nLoader: ${data.loader}\nExit code: ${data.code}\nInstalled mods: ${data.mods || "none listed"}\nLocal quick diagnosis: ${data.diagnosis}\nError/evidence: ${data.error || "not identified"}\n\nRedacted crash-report/latest.log tail:\n${log}`;
}

async function renderCrash(event, { autoCopy = false, open = true } = {}) {
  lastCrashEvent = event;
  byId("last-crash-report").hidden = false;
  const report = String(event.crashReport || "").slice(-250000) || `${language() === "ru" ? "Код завершения" : "Exit code"}: ${event.code ?? "unknown"}`;
  const instance = state?.instances?.find((item) => item.id === event.instanceId);
  let mods = [];
  if (event.instanceId) {
    try { mods = (await window.pulsar.listInstanceMods(event.instanceId)).filter((mod) => mod.enabled).map((mod) => mod.fileName).slice(0, 80); } catch {}
  }
  const diagnosis = await window.pulsar.diagnoseCrash(report, event.code, language());
  const loader = instance?.loader || "unknown";
  const version = instance?.version || "unknown";
  crashReportData = {
    report,
    code: event.code ?? "unknown",
    version,
    loader,
    mods: mods.join(", "),
    error: diagnosis.evidence || event.message || "",
    diagnosis: diagnosis.title,
    instanceName: instance?.name || "Minecraft",
    instanceId: event.instanceId,
    crashReportLocation: event.crashReportLocation || "",
  };
  byId("crash-summary").textContent = `${crashReportData.instanceName} · Minecraft ${version} · ${loader} · ${t("exitCode")}: ${crashReportData.code}`;
  byId("crash-diagnosis-title").textContent = diagnosis.title;
  byId("crash-diagnosis-detail").textContent = diagnosis.detail;
  byId("crash-diagnosis-evidence").textContent = diagnosis.evidence ? `${t("evidence")}: ${diagnosis.evidence}` : "";
  byId("crash-report").textContent = `${report}${event.crashReportLocation ? `\n\n${event.crashReportLocation}` : ""}`;
  byId("open-custom-ai").hidden = !state?.settings?.customAiTemplate;
  if (open) openDialog(ui.crashDialog);
  if (autoCopy && state?.settings?.autoCopyCrashPrompt) {
    try { await window.pulsar.copyText(makeCrashPrompt(crashReportData)); showToast(t("promptCopied")); }
    catch (error) { showToast(error.message, "error"); }
  }
}

function openAccountDialog(tab = "offline") {
  openDialog(ui.accountDialog);
  document.querySelectorAll("[data-account-tab]").forEach((button) => button.classList.toggle("is-active", button.dataset.accountTab === tab));
  byId("offline-form").hidden = tab !== "offline";
  byId("ygg-form").hidden = tab !== "yggdrasil";
  byId("account-message").textContent = "";
  window.setTimeout(() => byId(tab === "offline" ? "offline-name" : "ygg-username").focus(), 60);
}

function setAccountMessage(message, error = false) {
  const element = byId("account-message");
  element.textContent = message;
  element.classList.toggle("is-error", error);
}

function handleAppEvent(event) {
  if (!event) return;
  if (event.type === "install:progress") renderProgress(event);
  if (event.type === "install:complete") {
    renderProgress({ ...event, stage: "complete", progress: 100, detail: t("ready") });
    void refreshState();
  }
  if (event.type === "install:cancelled") { byId("install-panel").hidden = true; showToast(t("installCancelled")); }
  if (event.type === "install:error") { byId("install-panel").hidden = true; showToast(event.message, "error"); }
  if (event.type === "game:started") showEvent(`${t("gameStarted")} ${event.account || ""}`.trim());
  if (event.type === "game:window-ready") showEvent(language() === "ru" ? "Окно Minecraft готово." : "Minecraft window is ready.");
  if (event.type === "game:exit" && Number(event.code) !== 0) {
    const shouldOpen = state?.settings?.autoOpenCrash !== false;
    const shouldCopy = Boolean(state?.settings?.autoCopyCrashPrompt);
    if (shouldOpen || shouldCopy) void renderCrash(event, { autoCopy: true, open: shouldOpen }).catch((error) => showToast(error.message, "error"));
    else { lastCrashEvent = event; byId("last-crash-report").hidden = false; showToast(t("crashAvailable")); }
  }
  if (event.type === "game:error") showToast(event.message, "error");
  if (event.type === "app:status") showEvent(event.message);
}

ui.routeButtons.forEach((button) => button.addEventListener("click", (event) => {
  if (button.matches("a")) event.preventDefault();
  navigate(button.dataset.route);
}));

byId("hero-launch").addEventListener("click", () => launchOrInstall(state.instances.find((item) => item.id === state.selectedInstanceId) || state.instances[0]));
byId("new-instance").addEventListener("click", openInstanceDialog);
byId("empty-new-instance").addEventListener("click", openInstanceDialog);
byId("import-instance").addEventListener("click", async () => { try { const result = await window.pulsar.importInstance(); if (result) { await refreshState(); navigate("instances"); showToast(t("importDone")); } } catch (error) { showToast(error.message, "error"); } });
byId("empty-import-instance").addEventListener("click", () => byId("import-instance").click());
byId("account-trigger").addEventListener("click", () => openAccountDialog("offline"));
byId("add-account").addEventListener("click", () => openAccountDialog("offline"));
byId("settings-account-button").addEventListener("click", () => openAccountDialog("offline"));
byId("instance-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = event.currentTarget.querySelector("button[type=submit]");
  submit.disabled = true;
  try {
    const instance = await window.pulsar.createInstance({ name: byId("instance-name").value, version: byId("instance-version").value, loader: byId("instance-loader").value, group: byId("instance-group").value });
    ui.instanceDialog.close();
    await refreshState();
    navigate("instances");
    showToast(t("instanceCreated"));
    await launchOrInstall(instance);
  } catch (error) { showToast(error.message, "error"); }
  finally { submit.disabled = false; }
});

document.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", () => button.closest("dialog")?.close()));
document.querySelectorAll("dialog.modal").forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }));
document.querySelectorAll("[data-account-tab]").forEach((button) => button.addEventListener("click", () => openAccountDialog(button.dataset.accountTab)));
byId("ygg-provider").addEventListener("change", () => { document.querySelector(".custom-provider-field").hidden = byId("ygg-provider").value !== "custom"; });
byId("offline-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  try { await window.pulsar.addOfflineAccount(byId("offline-name").value); byId("offline-name").value = ""; await refreshState(); setAccountMessage(t("saved")); }
  catch (error) { setAccountMessage(error.message, true); }
});
byId("ygg-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = event.currentTarget.querySelector("button[type=submit]");
  submit.disabled = true;
  setAccountMessage(language() === "ru" ? "Выполняется HTTPS-вход…" : "Signing in over HTTPS…");
  const provider = byId("ygg-provider").value;
  try {
    await window.pulsar.addYggdrasilAccount({ provider, baseUrl: byId("ygg-base-url").value, username: byId("ygg-username").value, password: byId("ygg-password").value });
    byId("ygg-password").value = "";
    await refreshState();
    setAccountMessage(t("saved"));
  } catch (error) { byId("ygg-password").value = ""; setAccountMessage(error.message, true); }
  finally { submit.disabled = false; }
});

byId("settings-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const settings = {
    language: byId("setting-language").value,
    theme: byId("setting-theme").value,
    palette: byId("setting-palette").value,
    javaPath: byId("setting-java-path").value,
    authlibInjectorPath: byId("setting-injector-path").value,
    minMemory: Number(byId("setting-min-memory").value),
    maxMemory: Number(byId("setting-max-memory").value),
    showSnapshots: byId("setting-snapshots").checked,
    autoOpenCrash: byId("setting-auto-open-crash").checked,
    autoCopyCrashPrompt: byId("setting-auto-copy-crash").checked,
    customAiTemplate: byId("setting-custom-ai-template").value,
  };
  try {
    await window.pulsar.updateSettings(settings);
    await refreshState();
    byId("settings-saved").textContent = t("settingsSaved");
    window.setTimeout(() => { byId("settings-saved").textContent = ""; }, 2800);
  } catch (error) { showToast(error.message, "error"); }
});

byId("pick-java").addEventListener("click", async () => {
  const path = await window.pulsar.pickJava();
  if (path) { byId("setting-java-path").value = path; await window.pulsar.updateSettings({ javaPath: path }); await refreshState(); showToast(t("javaSaved")); }
});
byId("pick-injector").addEventListener("click", async () => {
  const path = await window.pulsar.pickInjector();
  if (path) { byId("setting-injector-path").value = path; await window.pulsar.updateSettings({ authlibInjectorPath: path }); await refreshState(); showToast(t("injectorSaved")); }
});
byId("mod-search-form").addEventListener("submit", (event) => { event.preventDefault(); void searchModrinth(byId("mod-search-input").value); });
byId("mods-instance").addEventListener("change", () => { void refreshInstalledMods(); });
byId("cancel-install").addEventListener("click", async () => {
  const id = byId("cancel-install").dataset.instanceId;
  if (!id) return;
  try { await window.pulsar.cancelInstall(id); } catch (error) { showToast(error.message, "error"); }
});

document.querySelectorAll('[data-action="donate"]').forEach((button) => button.addEventListener("click", async () => { try { await window.pulsar.openExternal(DONATE_URL); } catch (error) { showToast(error.message, "error"); } }));
document.querySelectorAll('[data-action="website"]').forEach((button) => button.addEventListener("click", async () => { try { await window.pulsar.openExternal(WEBSITE_URL); } catch (error) { showToast(error.message, "error"); } }));
const projectLinks = { "author-github": "https://github.com/zniks0n", "project-repo": "https://github.com/zniks0n/Pulsar-Launcher", "project-discord": "https://discord.gg/S4Xjmh9wQw" };
for (const [action, url] of Object.entries(projectLinks)) {
  document.querySelectorAll(`[data-action="${action}"]`).forEach((button) => button.addEventListener("click", async () => { try { await window.pulsar.openExternal(url); } catch (error) { showToast(error.message, "error"); } }));
}

window.pulsar.onEvent(handleAppEvent);

byId("last-crash-report").addEventListener("click", () => {
  if (lastCrashEvent) void renderCrash(lastCrashEvent).catch((error) => showToast(error.message, "error"));
});
byId("copy-crash-report").addEventListener("click", async () => {
  if (!crashReportData) return;
  try { await window.pulsar.copyText(crashReportData.report); showToast(t("crashCopied")); }
  catch (error) { showToast(error.message, "error"); }
});
byId("save-crash-report").addEventListener("click", async () => {
  if (!crashReportData) return;
  try {
    const saved = await window.pulsar.saveCrashReport(`${crashReportData.report}\n\n${crashReportData.crashReportLocation}`, `${crashReportData.instanceName}-crash-report.txt`);
    if (saved) showToast(t("crashSaved"));
  } catch (error) { showToast(error.message, "error"); }
});
byId("open-crash-folder").addEventListener("click", async () => {
  if (!crashReportData?.instanceId) return;
  try { await window.pulsar.openInstanceFolder(crashReportData.instanceId); }
  catch (error) { showToast(error.message, "error"); }
});

async function openCrashAssistant(provider) {
  if (!crashReportData) return;
  const custom = provider === "custom";
  const consent = custom ? t("customAiConsent") : t("aiPrivacyConsent");
  if (!window.confirm(consent)) return;
  const prompt = makeCrashPrompt(crashReportData);
  try {
    await window.pulsar.copyText(prompt);
    if (!custom) {
      await window.pulsar.openExternal(AI_DESTINATIONS[provider]);
    } else {
      const template = String(state?.settings?.customAiTemplate || "");
      const fields = { prompt, log: redactCrashText(crashReportData.report).slice(-10000), mods: crashReportData.mods, version: crashReportData.version, loader: crashReportData.loader, error: crashReportData.error };
      const url = template.replace(/\{(prompt|log|mods|version|loader|error)\}/gi, (_match, key) => encodeURIComponent(fields[key.toLowerCase()] || ""));
      if (url.length > 8000) { showToast(t("customAiTooLong"), "error"); return; }
      await window.pulsar.openExternal(url);
    }
    showToast(t("promptCopied"));
  } catch (error) { showToast(error.message, "error"); }
}

document.querySelectorAll("[data-crash-ai]").forEach((button) => button.addEventListener("click", () => void openCrashAssistant(button.dataset.crashAi)));
byId("open-custom-ai").addEventListener("click", () => void openCrashAssistant("custom"));

refreshState().then(() => navigate(currentPage)).catch((error) => showToast(error.message, "error"));

Object.assign(dictionaries.en, {
  autoOpenCrash: "Open crash report automatically", autoOpenCrashCopy: "Keep the latest local report available in the top bar when this is off.", autoCopyCrash: "Automatically copy an AI prompt", autoCopyCrashCopy: "Opt-in only; copies redacted text to the local clipboard and never uploads it.", customAiTemplate: "Custom AI HTTPS URL template", customAiTemplateCopy: "Optional. HTTPS only. Supports {prompt}, {log}, {mods}, {version}, {loader}, and {error}. Opening a custom URL may transmit its query to that service.",
  lastCrash: "Last crash report", localDiagnosis: "LOCAL QUICK DIAGNOSIS", aiAssistants: "OPTIONAL EXTERNAL ASSISTANTS", aiPrivacyWarning: "Pulsar does not upload this report. Before opening an assistant, Pulsar asks and copies a redacted prompt to your clipboard; you choose whether to paste or send it.", customAI: "Custom AI", showFullReport: "Show full local report", copyCrashLog: "Copy report", saveCrashLog: "Save report…", openCrashFolder: "Open instance folder", exitCode: "exit code", evidence: "Evidence", aiPrivacyConsent: "Pulsar will copy a redacted crash prompt to your local clipboard and open the selected AI website. It will not submit anything. Review the text and paste/send only if you agree. Continue?", customAiConsent: "The configured HTTPS template may place redacted crash data directly in the URL and transmit it to that service when opened. Continue only if you trust this destination.", customAiTooLong: "The custom URL is too long. The redacted prompt is already copied; paste it manually in the AI service.", promptCopied: "Redacted prompt copied. Review it before sending.", crashCopied: "Crash report copied to the local clipboard.", crashSaved: "Crash report saved.", crashAvailable: "The last crash report is available from the top bar.",
});
Object.assign(dictionaries.ru, {
  autoOpenCrash: "Открывать отчёт автоматически", autoOpenCrashCopy: "Если выключить, последний локальный отчёт останется доступен в верхней панели.", autoCopyCrash: "Автоматически копировать запрос для ИИ", autoCopyCrashCopy: "Только по вашему выбору: очищенный от очевидных секретов текст копируется в буфер и никуда не отправляется.", customAiTemplate: "Шаблон HTTPS-ссылки собственного ИИ", customAiTemplateCopy: "Необязательно. Только HTTPS. Поддерживаются {prompt}, {log}, {mods}, {version}, {loader} и {error}. При открытии собственной ссылки параметры могут попасть этому сервису.",
  lastCrash: "Последний отчёт об ошибке", localDiagnosis: "ЛОКАЛЬНАЯ БЫСТРАЯ ДИАГНОСТИКА", aiAssistants: "ВНЕШНИЕ ИИ-СЕРВИСЫ (НЕОБЯЗАТЕЛЬНО)", aiPrivacyWarning: "Pulsar не загружает этот отчёт. Перед открытием ИИ Pulsar спросит разрешение и скопирует очищенный запрос в буфер; вставлять или отправлять его решаете вы.", customAI: "Свой ИИ", showFullReport: "Показать полный локальный отчёт", copyCrashLog: "Копировать отчёт", saveCrashLog: "Сохранить отчёт…", openCrashFolder: "Открыть папку сборки", exitCode: "код выхода", evidence: "Фрагмент", aiPrivacyConsent: "Pulsar скопирует очищенный запрос в локальный буфер и откроет сайт выбранного ИИ. Ничего не будет отправлено автоматически. Просмотрите текст и вставляйте/отправляйте его только если согласны. Продолжить?", customAiConsent: "Настроенный HTTPS-шаблон может поместить очищенные данные об ошибке прямо в URL и передать их этому сервису при открытии. Продолжайте, только если доверяете адресу.", customAiTooLong: "Пользовательская ссылка слишком длинная. Очищенный запрос уже скопирован — вставьте его в ИИ вручную.", promptCopied: "Очищенный запрос скопирован. Проверьте его перед отправкой.", crashCopied: "Отчёт скопирован в локальный буфер обмена.", crashSaved: "Отчёт сохранён.", crashAvailable: "Последний отчёт доступен из верхней панели.",
});

Object.assign(dictionaries.en, {
  installingJava: "Downloading a compatible Java runtime from Mojang…",
  instanceInstallNote: "Pulsar downloads game files first. If no compatible Java is available, pressing Play downloads the official matching runtime from Mojang.",
  managedJavaLabel: "MOJANG JAVA",
});
Object.assign(dictionaries.ru, {
  installingJava: "Загружается подходящая Java с серверов Mojang…",
  instanceInstallNote: "Сначала Pulsar загрузит файлы игры. Если подходящей Java нет, при нажатии «Играть» будет загружена официальная версия Mojang.",
  managedJavaLabel: "JAVA MOJANG",
});
