const { contextBridge, ipcRenderer } = require("electron");

const invoke = (channel, payload) => ipcRenderer.invoke(`pulsar:${channel}`, payload);

contextBridge.exposeInMainWorld("pulsar", Object.freeze({
  getState: () => invoke("state:get"),
  listVersions: () => invoke("versions:list"),
  updateSettings: (settings) => invoke("settings:update", settings),
  addOfflineAccount: (name) => invoke("account:add-offline", { name }),
  addYggdrasilAccount: (account) => invoke("account:add-yggdrasil", account),
  selectAccount: (id) => invoke("account:select", { id }),
  removeAccount: (id) => invoke("account:remove", { id }),
  createInstance: (instance) => invoke("instance:create", instance),
  selectInstance: (id) => invoke("instance:select", { id }),
  importInstance: () => invoke("instance:import"),
  deleteInstance: (id) => invoke("instance:delete", { id }),
  installInstance: (id) => invoke("instance:install", { id }),
  cancelInstall: (id) => invoke("instance:cancel-install", { id }),
  launchInstance: (id) => invoke("instance:launch", { id }),
  openInstanceFolder: (id) => invoke("instance:open-folder", { id }),
  listInstanceMods: (id) => invoke("instance:mods", { id }),
  searchMods: (query) => invoke("modrinth:search", { query }),
  installMod: (instanceId, projectId) => invoke("modrinth:install", { instanceId, projectId }),
  toggleMod: (instanceId, fileName, enabled) => invoke("mod:toggle", { instanceId, fileName, enabled }),
  pickJava: () => invoke("path:pick-java"),
  pickInjector: () => invoke("path:pick-injector"),
  openExternal: (url) => invoke("external:open", { url }),
  diagnoseCrash: (log, exitCode, language) => invoke("crash:diagnose", { log, exitCode, language }),
  copyText: (text) => invoke("clipboard:write", { text }),
  saveCrashReport: (text, filename) => invoke("crash:save", { text, filename }),
  onEvent: (listener) => {
    if (typeof listener !== "function") return () => {};
    const handler = (_event, payload) => listener(payload);
    ipcRenderer.on("pulsar:event", handler);
    return () => ipcRenderer.removeListener("pulsar:event", handler);
  },
}));
