import fs from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { app, BrowserWindow, clipboard, dialog, ipcMain, safeStorage, shell } from "electron";
import { AccountService } from "./services/accounts.mjs";
import { installMod, listInstanceMods, searchMods, toggleMod } from "./services/modrinth.mjs";
import { MinecraftService } from "./services/minecraft.mjs";
import { PersistentStore, publicState } from "./services/store.mjs";
import { diagnoseCrash } from "./services/crash-diagnostics.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rendererPath = path.join(__dirname, "renderer", "index.html");
const rendererUrl = pathToFileURL(rendererPath).href;
const userData = path.join(app.getPath("userData"), "Pulsar");
let mainWindow;

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) app.quit();

app.setAppUserModelId("dev.znikson.pulsarlauncher");
const store = new PersistentStore(path.join(userData, "pulsar-data.json"));
store.load();
const accounts = new AccountService(store, safeStorage);
const minecraft = new MinecraftService({ store, rootDirectory: userData, emit: (message) => mainWindow?.webContents.send("pulsar:event", message) });
if (!store.getState().accounts.length) void accounts.addOffline("PulsarPlayer");

function ensureTrustedFrame(event) {
  const frameUrl = event.senderFrame?.url || "";
  if (frameUrl !== rendererUrl) throw new Error("Blocked an IPC request from an untrusted frame.");
}

function register(channel, handler) {
  ipcMain.handle(`pulsar:${channel}`, async (event, payload) => {
    ensureTrustedFrame(event);
    return handler(payload, event);
  });
}

function currentSettings() {
  return store.getState().settings;
}

function emitStatus(message) {
  mainWindow?.webContents.send("pulsar:event", { type: "app:status", message });
}

function cleanSettings(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid settings payload.");
  const allowed = new Set(["language", "theme", "palette", "minMemory", "maxMemory", "javaPath", "authlibInjectorPath", "showSnapshots", "autoOpenCrash", "autoCopyCrashPrompt", "customAiTemplate"]);
  const next = {};
  for (const [key, value] of Object.entries(input)) {
    if (!allowed.has(key)) continue;
    if (["language", "theme", "palette"].includes(key)) {
      const options = { language: ["auto", "en", "ru"], theme: ["dark", "light"], palette: ["violet", "mint", "ember", "blue"] };
      if (!options[key].includes(value)) throw new Error(`Invalid ${key} setting.`);
      next[key] = value;
    } else if (["minMemory", "maxMemory"].includes(key)) {
      const memory = Number(value);
      if (!Number.isInteger(memory) || memory < 512 || memory > 32768) throw new Error("Memory values must be 512–32768 MB.");
      next[key] = memory;
    } else if (["javaPath", "authlibInjectorPath"].includes(key)) {
      const text = String(value || "").trim();
      if (text.length > 2048 || text.includes("\u0000")) throw new Error("Invalid path value.");
      next[key] = text;
    } else if (key === "showSnapshots") {
      next[key] = Boolean(value);
    } else if (["autoOpenCrash", "autoCopyCrashPrompt"].includes(key)) {
      next[key] = Boolean(value);
    } else if (key === "customAiTemplate") {
      const template = String(value || "").trim();
      if (template.length > 4096 || template.includes("\u0000")) throw new Error("The custom AI URL template is too long or invalid.");
      if (template) {
        const sample = template.replace(/\{(?:prompt|log|mods|version|loader|error)\}/gi, "pulsar");
        let url;
        try { url = new URL(sample); } catch { throw new Error("Enter a valid HTTPS custom AI URL template."); }
        if (url.protocol !== "https:" || url.username || url.password || url.hostname === "localhost" || url.hostname.endsWith(".local") || net.isIP(url.hostname)) throw new Error("The custom AI destination must use a public HTTPS hostname without credentials.");
      }
      next[key] = template;
    }
  }
  const merged = { ...currentSettings(), ...next };
  if (merged.minMemory > merged.maxMemory) throw new Error("Minimum memory cannot be greater than maximum memory.");
  return next;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1000,
    minHeight: 690,
    backgroundColor: "#0b0c12",
    title: "Pulsar Launcher",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });
  mainWindow.webContents.on("will-navigate", (event, url) => { if (url !== rendererUrl) event.preventDefault(); });
  mainWindow.webContents.on("will-attach-webview", (event) => event.preventDefault());
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  void mainWindow.loadFile(rendererPath);
  if (process.env.PULSAR_DEVTOOLS === "1") mainWindow.webContents.openDevTools({ mode: "detach" });
  mainWindow.on("closed", () => { mainWindow = null; });
}

register("state:get", async () => ({ ...publicState(store.getState()), safeStorageAvailable: await safeStorage.isAsyncEncryptionAvailable(), appVersion: app.getVersion() }));
register("versions:list", async () => minecraft.listVersions(currentSettings().showSnapshots));
register("settings:update", (input) => {
  const settings = cleanSettings(input);
  store.update((state) => { state.settings = { ...state.settings, ...settings }; });
  return publicState(store.getState());
});
register("account:add-offline", (input) => accounts.addOffline(input?.name));
register("account:add-yggdrasil", (input) => accounts.addYggdrasil(input || {}));
register("account:select", (input) => accounts.select(input?.id));
register("account:remove", (input) => accounts.remove(input?.id));
register("instance:create", (input) => minecraft.createInstance(input || {}));
register("instance:select", (input) => {
  const id = input?.id;
  if (!store.getState().instances.some((instance) => instance.id === id)) throw new Error("That instance no longer exists.");
  store.update((state) => { state.selectedInstanceId = id; });
  return id;
});
register("instance:import", async () => {
  const result = await dialog.showOpenDialog(mainWindow, { title: "Import a Minecraft instance", properties: ["openDirectory"] });
  if (result.canceled || !result.filePaths[0]) return null;
  emitStatus("Importing the selected Minecraft folder");
  return minecraft.importInstance(result.filePaths[0]);
});
register("instance:delete", async (input) => {
  const instance = minecraft.getInstance(input?.id);
  const choice = await dialog.showMessageBox(mainWindow, {
    type: "warning",
    buttons: ["Cancel", "Remove instance and files"],
    defaultId: 0,
    cancelId: 0,
    title: "Remove instance?",
    message: `Remove “${instance.name}” and its local files?`,
    detail: "This permanently deletes this instance directory, including its saves, mods and resource packs. It does not delete the original imported folder.",
  });
  if (choice.response !== 1) return false;
  return minecraft.deleteInstance(instance.id);
});
register("instance:install", (input) => minecraft.installInstance(input?.id));
register("instance:cancel-install", (input) => minecraft.cancelInstall(input?.id));
register("instance:launch", (input) => minecraft.launchInstance(input?.id, accounts, currentSettings()));
register("instance:open-folder", (input) => minecraft.openInstanceFolder(input?.id, shell));
register("instance:mods", (input) => listInstanceMods(minecraft.getInstancePath(input?.id)));
register("modrinth:search", (input) => searchMods(input || {}));
register("modrinth:install", async (input) => {
  const instance = minecraft.getInstance(input?.instanceId);
  return installMod({ instancePath: minecraft.getInstancePath(instance.id), projectId: input?.projectId, minecraftVersion: instance.version, loader: instance.loader, signal: AbortSignal.timeout(120_000) });
});
register("mod:toggle", async (input) => {
  const result = await toggleMod(minecraft.getInstancePath(input?.instanceId), input?.fileName, Boolean(input?.enabled));
  return { result, mods: await listInstanceMods(minecraft.getInstancePath(input?.instanceId)) };
});
register("path:pick-java", async () => {
  const result = await dialog.showOpenDialog(mainWindow, { title: "Choose Java executable", properties: ["openFile"], filters: [{ name: "Java runtime", extensions: process.platform === "win32" ? ["exe"] : ["*", "sh"] }] });
  return result.canceled ? null : result.filePaths[0];
});
register("path:pick-injector", async () => {
  const result = await dialog.showOpenDialog(mainWindow, { title: "Choose authlib-injector JAR", properties: ["openFile"], filters: [{ name: "Java archive", extensions: ["jar"] }] });
  return result.canceled ? null : result.filePaths[0];
});
register("crash:diagnose", (input) => diagnoseCrash(input?.log, input?.exitCode, input?.language));
register("clipboard:write", (input) => {
  const text = String(input?.text || "");
  if (text.length > 1_000_000) throw new Error("Crash text is too large for the clipboard.");
  clipboard.writeText(text);
  return true;
});
register("crash:save", async (input) => {
  const text = String(input?.text || "");
  if (!text || text.length > 1_500_000) throw new Error("The crash report is empty or too large to save.");
  const fileName = String(input?.filename || `Pulsar-crash-report-${Date.now()}.txt`).replace(/[^\w.-]+/g, "_").slice(0, 100);
  const result = await dialog.showSaveDialog(mainWindow, { title: "Save Minecraft crash report", defaultPath: path.join(app.getPath("documents"), fileName), filters: [{ name: "Text report", extensions: ["txt"] }] });
  if (result.canceled || !result.filePath) return false;
  await fs.writeFile(result.filePath, text, { encoding: "utf8" });
  return true;
});
register("external:open", async (input) => {
  const url = new URL(String(input?.url || ""));
  const allowed = new Set(["pulsar-bq4wlerh.manus.space", "www.donationalerts.com", "donationalerts.com", "modrinth.com", "modrinth.app", "github.com", "discord.gg", "discord.com", "docs.ely.by", "manual.littlesk.in", "chatgpt.com", "claude.ai", "gemini.google.com", "www.perplexity.ai", "perplexity.ai", "chat.deepseek.com", "giga.chat", "alice.yandex.ru", "copilot.microsoft.com"]);
  let isConfiguredCustomHost = false;
  const template = currentSettings().customAiTemplate;
  if (template) {
    try { isConfiguredCustomHost = new URL(template.replace(/\{(?:prompt|log|mods|version|loader|error)\}/gi, "pulsar")).hostname === url.hostname; } catch {}
  }
  if (url.protocol !== "https:" || url.username || url.password || (!allowed.has(url.hostname) && !isConfiguredCustomHost)) throw new Error("This destination is not on Pulsar's approved link list.");
  await shell.openExternal(url.toString());
  return true;
});

app.whenReady().then(() => {
  if (!hasSingleInstanceLock) return;
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
}).catch((error) => {
  dialog.showErrorBox("Pulsar Launcher failed to start", String(error?.message || error));
  app.quit();
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("before-quit", () => emitStatus("Pulsar is closing"));
