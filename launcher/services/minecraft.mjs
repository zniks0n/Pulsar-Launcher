import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  createMinecraftProcessWatcher,
  launch,
  MinecraftFolder,
  Version,
} from "@xmcl/core";
import {
  createDefaultNodeInstallRuntime,
  createFabricInstallWorkflow,
  executeInstallManifest,
  executeInstallWorkflow,
  getLoaderArtifactListFor,
  getVersionList,
  ProgressTrackerMultiple,
  resolveAssetMetadataInstallFiles,
  resolveAssetObjectInstallFiles,
  resolveLibraryInstallFiles,
  resolveMinecraftJarInstallFile,
  resolveMinecraftVersionJsonInstallFile,
} from "@xmcl/installer";
import { detectJavaMajor, installMojangJavaRuntime } from "./java-runtime.mjs";

const ALLOWED_LOADERS = new Set(["vanilla", "fabric"]);
const MIN_MEMORY = 512;
const MAX_MEMORY = 32768;

function safeInstanceName(value) {
  const name = String(value || "").trim().replace(/\s+/g, " ");
  if (!name || name.length > 48 || /[\u0000-\u001f]/.test(name)) throw new Error("Instance names must be 1–48 characters.");
  return name;
}

function offlineUuid(name) {
  const bytes = crypto.createHash("md5").update(`OfflinePlayer:${name}`, "utf8").digest();
  bytes[6] = (bytes[6] & 0x0f) | 0x30;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function validVersionId(value) {
  return /^[A-Za-z0-9._+-]{1,100}$/.test(String(value || ""));
}

export class MinecraftService {
  constructor({ store, rootDirectory, emit }) {
    this.store = store;
    this.instancesRoot = path.join(rootDirectory, "instances");
    this.runtimeRoot = path.join(rootDirectory, "runtimes");
    this.emit = emit || (() => {});
    this.controllers = new Map();
    this.processes = new Map();
    fs.mkdirSync(this.instancesRoot, { recursive: true });
  }

  getInstance(instanceId) {
    const instance = this.store.getState().instances.find((item) => item.id === instanceId);
    if (!instance) throw new Error("That instance no longer exists.");
    return instance;
  }

  getInstancePath(instanceId) {
    const instance = this.getInstance(instanceId);
    const resolved = path.resolve(this.instancesRoot, instance.id);
    if (!resolved.startsWith(`${path.resolve(this.instancesRoot)}${path.sep}`)) throw new Error("Invalid instance path.");
    return resolved;
  }

  async listVersions(includeSnapshots = false) {
    const manifest = await getVersionList();
    const versions = manifest.versions.filter((version) => includeSnapshots || version.type === "release");
    return { latestRelease: manifest.latest.release, latestSnapshot: manifest.latest.snapshot, versions: versions.slice(0, 180).map((version) => ({ id: version.id, type: version.type, releaseTime: version.releaseTime })) };
  }

  async createInstance({ name, version, loader = "vanilla", group = "My worlds" }) {
    const safeName = safeInstanceName(name);
    const versionId = String(version || "").trim();
    if (!validVersionId(versionId)) throw new Error("Choose a Minecraft version from the list.");
    if (!ALLOWED_LOADERS.has(loader)) throw new Error("This first build supports Vanilla and Fabric instances.");
    const manifest = await getVersionList();
    if (!manifest.versions.some((candidate) => candidate.id === versionId)) throw new Error("That Minecraft version is not in the official version manifest.");
    const id = crypto.randomUUID();
    const instance = {
      id,
      name: safeName,
      version: versionId,
      loader,
      group: String(group || "My worlds").trim().slice(0, 32) || "My worlds",
      installedVersionId: "",
      installed: false,
      createdAt: new Date().toISOString(),
      lastPlayedAt: null,
    };
    await fs.promises.mkdir(path.join(this.instancesRoot, id), { recursive: true });
    this.store.update((state) => {
      state.instances.push(instance);
      state.selectedInstanceId = id;
    });
    return { ...instance };
  }

  async importInstance(sourcePath) {
    const selected = path.resolve(String(sourcePath || ""));
    const candidates = [selected, path.join(selected, ".minecraft"), path.join(selected, "minecraft")];
    const source = candidates.find((candidate) => fs.existsSync(path.join(candidate, "versions")) && fs.statSync(candidate).isDirectory());
    if (!source) throw new Error("No Minecraft `versions` folder was found. Choose a Prism/CurseForge instance folder or its `.minecraft` directory.");
    const versions = (await fs.promises.readdir(path.join(source, "versions"), { withFileTypes: true })).filter((item) => item.isDirectory()).map((item) => item.name).filter(validVersionId);
    const importedVersion = versions[0] || "1.21.1";
    const id = crypto.randomUUID();
    const name = safeInstanceName(path.basename(selected) || "Imported world");
    const destination = path.join(this.instancesRoot, id);
    const sensitiveNames = new Set(["launcher_profiles.json", "launcher_accounts.json", "accounts.json", "auth.json", "msa_credentials.json"]);
    await fs.promises.mkdir(destination, { recursive: true });
    await fs.promises.cp(source, destination, {
      recursive: true,
      dereference: false,
      filter: (sourceItem) => !sensitiveNames.has(path.basename(sourceItem).toLowerCase()) && !sourceItem.endsWith(".tmp"),
    });
    const installedVersionId = versions.find((versionId) => fs.existsSync(path.join(destination, "versions", versionId, `${versionId}.json`))) || versions[0] || "";
    const lowerVersion = `${installedVersionId} ${importedVersion}`.toLowerCase();
    const loader = lowerVersion.includes("fabric") ? "fabric" : lowerVersion.includes("forge") ? "forge" : lowerVersion.includes("quilt") ? "quilt" : "vanilla";
    const instance = { id, name, version: importedVersion, loader, group: "Imported", installedVersionId, installed: Boolean(installedVersionId), createdAt: new Date().toISOString(), lastPlayedAt: null, imported: true };
    this.store.update((state) => { state.instances.push(instance); state.selectedInstanceId = id; });
    return { ...instance };
  }

  async deleteInstance(instanceId) {
    if (this.processes.has(instanceId)) throw new Error("Close Minecraft before removing this instance.");
    this.cancelInstall(instanceId);
    const directory = this.getInstancePath(instanceId);
    await fs.promises.rm(directory, { recursive: true, force: true });
    this.store.update((state) => {
      state.instances = state.instances.filter((item) => item.id !== instanceId);
      if (state.selectedInstanceId === instanceId) state.selectedInstanceId = state.instances[0]?.id || null;
    });
    return true;
  }

  cancelInstall(instanceId) {
    const controller = this.controllers.get(instanceId);
    if (!controller) return false;
    controller.abort(new Error("Installation cancelled by user."));
    return true;
  }

  sendProgress(instanceId, stage, progress, detail = "") {
    this.emit({ type: "install:progress", instanceId, stage, progress: Math.max(0, Math.min(100, Math.round(progress))), detail });
  }

  async runFiles(instanceId, stage, files, signal, fromPercent, toPercent) {
    if (!files.length) return;
    const tracker = new ProgressTrackerMultiple();
    const runtime = createDefaultNodeInstallRuntime({ signal, tracker, maxConcurrency: 8 });
    const timer = setInterval(() => {
      const ratio = tracker.total > 0 ? Math.min(0.98, tracker.progress / tracker.total) : 0;
      this.sendProgress(instanceId, stage, fromPercent + (toPercent - fromPercent) * ratio, `${Math.round(tracker.progress / 1024 / 1024)} / ${Math.ceil(tracker.total / 1024 / 1024)} MB`);
    }, 250);
    try {
      await executeInstallManifest({ schemaVersion: 1, tasks: [{ id: stage, type: "files", files }] }, runtime, {
        signal,
        onEvent: (event) => this.emit({ type: "install:event", instanceId, stage, event: { type: event.type, task: event.task?.id } }),
      });
    } finally {
      clearInterval(timer);
    }
    this.sendProgress(instanceId, stage, toPercent, "");
  }

  async installInstance(instanceId) {
    if (this.controllers.has(instanceId)) throw new Error("This instance is already installing.");
    const controller = new AbortController();
    this.controllers.set(instanceId, controller);
    const { signal } = controller;
    const instance = this.getInstance(instanceId);
    const minecraft = MinecraftFolder.from(this.getInstancePath(instanceId));
    const emitLoader = (event) => this.emit({ type: "install:event", instanceId, stage: "fabric", event: { type: event.type, task: event.task?.id } });
    try {
      this.sendProgress(instanceId, "version", 2, "Reading the official Minecraft version manifest");
      const versionManifest = await getVersionList();
      const metadata = versionManifest.versions.find((entry) => entry.id === instance.version);
      if (!metadata) throw new Error(`Minecraft version ${instance.version} is no longer present in the official manifest.`);
      const jsonFile = resolveMinecraftVersionJsonInstallFile(metadata, minecraft, { side: "client", signal });
      await this.runFiles(instanceId, "version-json", [jsonFile], signal, 3, 8);
      const resolved = await Version.parse(minecraft, instance.version);
      const clientJar = resolveMinecraftJarInstallFile(resolved, { side: "client", signal });
      const libraries = resolveLibraryInstallFiles(resolved.libraries, minecraft, { signal });
      const metadataFiles = resolveAssetMetadataInstallFiles(resolved, minecraft, { abortSignal: signal });
      await this.runFiles(instanceId, "libraries", [...(clientJar ? [clientJar] : []), ...libraries, ...metadataFiles], signal, 8, 58);
      const assetFiles = await resolveAssetObjectInstallFiles(resolved, minecraft, { abortSignal: signal });
      await this.runFiles(instanceId, "assets", assetFiles, signal, 58, 92);
      let installedVersionId = instance.version;
      if (instance.loader === "fabric") {
        this.sendProgress(instanceId, "fabric", 93, "Preparing Fabric loader");
        const artifacts = await getLoaderArtifactListFor(instance.version, { signal });
        const chosen = artifacts.find((item) => item.loader?.stable) || artifacts[0];
        if (!chosen?.loader?.version) throw new Error(`Fabric has no loader release for Minecraft ${instance.version}.`);
        const tracker = new ProgressTrackerMultiple();
        const runtime = createDefaultNodeInstallRuntime({ signal, tracker, maxConcurrency: 8 });
        const timer = setInterval(() => {
          const ratio = tracker.total > 0 ? tracker.progress / tracker.total : 0;
          this.sendProgress(instanceId, "fabric", 93 + Math.min(5, ratio * 5), `${Math.round(tracker.progress / 1024 / 1024)} / ${Math.ceil(tracker.total / 1024 / 1024)} MB`);
        }, 250);
        try {
          installedVersionId = await executeInstallWorkflow(
            createFabricInstallWorkflow({ minecraftVersion: instance.version, version: chosen.loader.version, minecraft, side: "client" }),
            runtime,
            { signal, onEvent: emitLoader },
          );
        } finally { clearInterval(timer); }
      }
      if (signal.aborted) throw signal.reason || new Error("Installation cancelled.");
      this.store.update((state) => {
        const current = state.instances.find((item) => item.id === instanceId);
        if (current) { current.installed = true; current.installedVersionId = installedVersionId; }
      });
      this.sendProgress(instanceId, "complete", 100, "Ready to play");
      this.emit({ type: "install:complete", instanceId, installedVersionId });
      return { instanceId, installedVersionId };
    } catch (error) {
      const cancelled = signal.aborted;
      this.emit({ type: cancelled ? "install:cancelled" : "install:error", instanceId, message: cancelled ? "Installation cancelled." : (error?.message || String(error)).slice(0, 500) });
      throw new Error(cancelled ? "Installation cancelled." : (error?.message || "Minecraft installation failed."));
    } finally {
      this.controllers.delete(instanceId);
    }
  }

  async resolveJavaPath(instanceId, instance, settings, expectedJava, requiredMajor) {
    const configuredPath = String(settings.javaPath || "").trim();
    const instancePath = String(instance.javaPath || "").trim();
    const javaPath = configuredPath || instancePath || "java";
    const explicitPath = Boolean(configuredPath) || Boolean(instancePath && !instance.managedJava);
    let detectedMajor = 0;
    let detectionError;
    try { detectedMajor = detectJavaMajor(javaPath); }
    catch (error) { detectionError = error; }
    if (!detectionError && detectedMajor >= requiredMajor) return javaPath;
    if (explicitPath) {
      if (detectionError) throw detectionError;
      throw new Error(`Minecraft ${instance.version} needs Java ${requiredMajor} or newer. The selected runtime is Java ${detectedMajor}.`);
    }

    if (this.controllers.has(instanceId)) throw new Error("Another installation is already running for this instance.");
    const controller = new AbortController();
    this.controllers.set(instanceId, controller);
    this.sendProgress(instanceId, "java-runtime", 1, `Minecraft ${instance.version} · Java ${requiredMajor}`);
    try {
      const runtime = await installMojangJavaRuntime({
        component: expectedJava.javaVersion?.component,
        majorVersion: requiredMajor,
        runtimeRoot: this.runtimeRoot,
        signal: controller.signal,
        onProgress: (progress, detail) => this.sendProgress(instanceId, "java-runtime", progress, detail),
      });
      if (controller.signal.aborted) throw controller.signal.reason || new Error("Java runtime installation cancelled.");
      this.store.update((state) => {
        const current = state.instances.find((candidate) => candidate.id === instanceId);
        if (current) {
          current.javaPath = runtime.javaPath;
          current.managedJava = true;
          current.managedJavaMajor = runtime.majorVersion;
          current.managedJavaComponent = runtime.component;
        }
      });
      return runtime.javaPath;
    } finally {
      if (this.controllers.get(instanceId) === controller) this.controllers.delete(instanceId);
    }
  }

  async launchInstance(instanceId, accounts, settings) {
    if (this.processes.has(instanceId)) throw new Error("Minecraft is already running for this instance.");
    if (this.controllers.has(instanceId)) throw new Error("An installation is already running for this instance.");
    const instance = this.getInstance(instanceId);
    if (!instance.installed || !instance.installedVersionId) throw new Error("Install this instance before launching it.");
    const profile = await accounts.getLaunchProfile();
    const expectedJava = await Version.parse(MinecraftFolder.from(this.getInstancePath(instanceId)), instance.installedVersionId);
    const required = Number(expectedJava.javaVersion?.majorVersion || 8);
    const javaPath = await this.resolveJavaPath(instanceId, instance, settings, expectedJava, required);
    const major = detectJavaMajor(javaPath);
    if (major < required) throw new Error(`Minecraft ${instance.version} needs Java ${required} or newer. The selected runtime is Java ${major}.`);
    const minimum = Number(instance.minMemory || settings.minMemory || 1024);
    const maximum = Number(instance.maxMemory || settings.maxMemory || 4096);
    if (!Number.isFinite(minimum) || !Number.isFinite(maximum) || minimum < MIN_MEMORY || maximum > MAX_MEMORY || minimum > maximum) throw new Error("Set valid memory values in Settings (512–32768 MB, minimum must not exceed maximum).");
    const extraJVMArgs = String(instance.jvmArgs || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (extraJVMArgs.some((line) => line.includes("\u0000") || line.length > 300)) throw new Error("A JVM argument contains unsupported text or is too long.");
    const options = {
      gamePath: this.getInstancePath(instanceId),
      javaPath,
      version: instance.installedVersionId,
      gameProfile: { name: profile.name, id: profile.profileId || offlineUuid(profile.name) },
      accessToken: profile.accessToken,
      userType: profile.userType,
      launcherName: "Pulsar Launcher",
      launcherBrand: "Pulsar",
      minMemory: minimum,
      maxMemory: maximum,
      extraJVMArgs,
      extraExecOption: { detached: true, windowsHide: true },
    };
    if (profile.kind === "yggdrasil") {
      if (!settings.authlibInjectorPath) throw new Error("Choose the authlib-injector JAR in Settings before launching a Yggdrasil account.");
      options.yggdrasilAgent = { jar: settings.authlibInjectorPath, server: profile.baseUrl };
    }
    const child = await launch(options);
    const watcher = createMinecraftProcessWatcher(child);
    this.processes.set(instanceId, child);
    this.store.update((state) => {
      const current = state.instances.find((item) => item.id === instanceId);
      if (current) current.lastPlayedAt = new Date().toISOString();
    });
    this.emit({ type: "game:started", instanceId, pid: child.pid || null, account: profile.name });
    watcher.on("minecraft-window-ready", () => this.emit({ type: "game:window-ready", instanceId }));
    watcher.on("error", (error) => {
      this.processes.delete(instanceId);
      this.emit({ type: "game:error", instanceId, message: String(error?.message || error).slice(0, 500) });
    });
    watcher.on("minecraft-exit", (event) => {
      this.processes.delete(instanceId);
      this.emit({ type: "game:exit", instanceId, code: event.code, crashReport: String(event.crashReport || "").slice(0, 12000), crashReportLocation: event.crashReportLocation || "" });
    });
    child.once("error", (error) => {
      this.processes.delete(instanceId);
      this.emit({ type: "game:error", instanceId, message: String(error?.message || error).slice(0, 500) });
    });
    return { pid: child.pid || null, instanceId };
  }

  async openInstanceFolder(instanceId, shell) {
    const directory = this.getInstancePath(instanceId);
    await fs.promises.mkdir(directory, { recursive: true });
    return shell.openPath(directory);
  }
}
