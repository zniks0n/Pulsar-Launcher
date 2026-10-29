import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  createDefaultNodeInstallRuntime,
  executeInstallManifest,
  fetchJavaRuntimeManifest,
  ProgressTrackerMultiple,
} from "@xmcl/installer";

const JAVA_COMPONENTS = new Set([
  "java-runtime-alpha",
  "java-runtime-beta",
  "java-runtime-gamma",
  "java-runtime-delta",
  "jre-legacy",
]);
const MAX_RUNTIME_ENTRIES = 10_000;

export function detectJavaMajor(javaPath) {
  const result = spawnSync(javaPath, ["-version"], { encoding: "utf8", timeout: 8000, windowsHide: true });
  if (result.error) throw new Error(`Java could not be started (${result.error.message}). Choose a Java executable in Settings.`);
  const output = `${result.stdout || ""}\n${result.stderr || ""}`;
  const match = output.match(/version\s+"?([0-9]+)(?:\.([0-9]+))?/i) || output.match(/openjdk\s+([0-9]+)(?:\.([0-9]+))?/i);
  if (!match) throw new Error("The selected file did not report a recognizable Java version.");
  const major = Number(match[1]) === 1 ? Number(match[2]) : Number(match[1]);
  return Number.isFinite(major) ? major : 0;
}

function supportedRuntimePlatform() {
  if (process.platform === "win32") return ["x64", "ia32", "arm64"].includes(process.arch);
  if (process.platform === "darwin") return ["x64", "arm64"].includes(process.arch);
  if (process.platform === "linux") return ["x64", "ia32"].includes(process.arch);
  return false;
}

function isPathInside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || (relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function samePath(left, right) {
  return path.relative(left, right) === "";
}

function safeRuntimePath(root, relativePath) {
  const relative = String(relativePath || "");
  if (!relative || relative.includes("\u0000") || relative.includes("\\") || relative.startsWith("/")) {
    throw new Error("Mojang's Java manifest contains an unsafe runtime path.");
  }
  const segments = relative.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || /[<>:\"|?*\u0000-\u001f]/.test(segment))) {
    throw new Error("Mojang's Java manifest contains an unsafe runtime path.");
  }
  const resolvedRoot = path.resolve(root);
  const resolvedPath = path.resolve(resolvedRoot, ...segments);
  if (!isPathInside(resolvedRoot, resolvedPath) || samePath(resolvedRoot, resolvedPath)) {
    throw new Error("Mojang's Java manifest points outside the managed runtime folder.");
  }
  return resolvedPath;
}

function validateMojangDownload(download) {
  if (!download || typeof download.url !== "string" || !/^[a-f0-9]{40}$/i.test(String(download.sha1 || ""))) {
    throw new Error("Mojang's Java manifest contains incomplete download metadata.");
  }
  let url;
  try { url = new URL(download.url); } catch { throw new Error("Mojang's Java manifest contains an invalid download URL."); }
  const hostname = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || !(hostname === "mojang.com" || hostname.endsWith(".mojang.com") || hostname === "minecraft.net" || hostname.endsWith(".minecraft.net")) || url.username || url.password) {
    throw new Error("Mojang's Java manifest contains a download outside the official Mojang domains.");
  }
}

export function buildJavaRuntimeInstallManifest(manifest, destination) {
  if (!manifest || !manifest.files || typeof manifest.files !== "object" || Array.isArray(manifest.files)) {
    throw new Error("Mojang's Java runtime manifest is malformed.");
  }
  const entries = Object.entries(manifest.files);
  if (!entries.length || entries.length > MAX_RUNTIME_ENTRIES) throw new Error("Mojang's Java runtime manifest has an invalid number of files.");

  const files = [];
  const operations = [];
  const outputs = [];
  for (const [relativePath, entry] of entries) {
    const filePath = safeRuntimePath(destination, relativePath);
    if (!entry || !["file", "directory", "link"].includes(entry.type)) {
      throw new Error("Mojang's Java runtime manifest contains an unsupported entry.");
    }
    if (entry.type === "file") {
      const download = entry.downloads?.raw;
      validateMojangDownload(download);
      if (download.size !== undefined && (!Number.isSafeInteger(download.size) || download.size < 0)) {
        throw new Error("Mojang's Java manifest contains an invalid file size.");
      }
      files.push({
        path: filePath,
        urls: [download.url],
        ...(download.size === undefined ? {} : { size: download.size }),
        checksum: { algorithm: "sha1", value: download.sha1.toLowerCase() },
        validator: "file",
      });
      if (entry.executable) {
        operations.push({ type: "chmod", path: filePath, mode: 0o755 });
        outputs.push({ path: filePath, checksum: { algorithm: "sha1", value: download.sha1.toLowerCase() } });
      }
    } else if (entry.type === "directory") {
      operations.push({ type: "ensure-directory", path: filePath });
    } else {
      const target = String(entry.target || "");
      if (!target || target.includes("\u0000") || path.isAbsolute(target) || target.includes("\\")) {
        throw new Error("Mojang's Java manifest contains an unsafe symbolic-link target.");
      }
      const source = path.resolve(path.dirname(filePath), target);
      const resolvedRoot = path.resolve(destination);
      if (!isPathInside(resolvedRoot, source) || samePath(resolvedRoot, source)) {
        throw new Error("Mojang's Java manifest contains a link outside the managed runtime folder.");
      }
      operations.push({ type: "link", source, path: filePath });
      outputs.push({ path: filePath, validator: "file" });
    }
  }
  if (!files.length) throw new Error("Mojang's Java runtime manifest does not contain downloadable files.");

  const tasks = [{ id: "java-runtime-files", type: "files", files }];
  if (operations.length) tasks.push({ id: "java-runtime-layout", type: "materialize", operations, outputs, dependsOn: ["java-runtime-files"] });
  return { schemaVersion: 1, tasks };
}

async function resolveRuntimeRoot(runtimeRoot) {
  if (typeof runtimeRoot !== "string" || !runtimeRoot.trim()) throw new Error("The managed Java runtime folder is not configured.");
  const requestedRoot = path.resolve(runtimeRoot);
  await fs.mkdir(requestedRoot, { recursive: true, mode: 0o700 });
  const canonicalRoot = await fs.realpath(requestedRoot);
  const rootStat = await fs.stat(canonicalRoot);
  if (!rootStat.isDirectory()) throw new Error("The managed Java runtime location is not a directory.");
  return canonicalRoot;
}

async function assertRuntimeTreeContained(runtimeDirectory, manifestFiles) {
  const requestedRoot = path.resolve(runtimeDirectory);
  const canonicalRoot = await fs.realpath(requestedRoot);
  if (!samePath(requestedRoot, canonicalRoot)) {
    throw new Error("The managed Java runtime directory is a symbolic link; refusing to use it.");
  }
  const entries = Object.entries(manifestFiles);
  for (const [relativePath] of entries) {
    const targetPath = safeRuntimePath(canonicalRoot, relativePath);
    const segments = path.relative(canonicalRoot, targetPath).split(path.sep);
    let current = canonicalRoot;
    for (let index = 0; index < segments.length; index += 1) {
      current = path.join(current, segments[index]);
      let stat;
      try { stat = await fs.lstat(current); }
      catch (error) { if (error.code === "ENOENT") break; throw error; }
      const prefix = segments.slice(0, index + 1).join("/");
      const declared = manifestFiles[prefix];
      if (stat.isSymbolicLink()) {
        if (declared?.type !== "link") throw new Error("The managed Java runtime contains an unexpected symbolic link; refusing to write or execute through it.");
        const declaredTarget = String(declared.target || "");
        if (!declaredTarget || path.isAbsolute(declaredTarget) || declaredTarget.includes("\\") || declaredTarget.includes("\u0000")) {
          throw new Error("The managed Java runtime contains an unsafe symbolic-link target.");
        }
        const actualLink = await fs.readlink(current);
        const actualTarget = path.resolve(path.dirname(current), actualLink);
        const expectedTarget = path.resolve(path.dirname(current), declaredTarget);
        if (!samePath(actualTarget, expectedTarget) || !isPathInside(canonicalRoot, actualTarget)) {
          throw new Error("The managed Java runtime contains a symbolic link outside its installation directory.");
        }
        try {
          const resolvedTarget = await fs.realpath(current);
          if (!isPathInside(canonicalRoot, resolvedTarget)) throw new Error("The managed Java runtime contains a symbolic link outside its installation directory.");
        } catch (error) {
          if (error.code !== "ENOENT") throw error;
        }
      } else {
        const realPath = await fs.realpath(current);
        if (!isPathInside(canonicalRoot, realPath)) throw new Error("The managed Java runtime contains a path outside its installation directory.");
        if (index < segments.length - 1 && !stat.isDirectory()) {
          throw new Error("The managed Java runtime has a non-directory path component.");
        }
      }
    }
  }
  return canonicalRoot;
}

async function inspectExistingRuntime(runtimeRoot, destination, manifestFiles) {
  let stat;
  try { stat = await fs.lstat(destination); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new Error("The expected managed Java runtime path is not a regular directory; refusing to follow it.");
  }
  const realPath = await fs.realpath(destination);
  const relative = path.relative(runtimeRoot, realPath);
  if (!relative || path.dirname(relative) !== "." || !samePath(path.join(runtimeRoot, relative), realPath)) {
    throw new Error("The expected Java runtime directory resolves outside its managed runtime root.");
  }
  return assertRuntimeTreeContained(realPath, manifestFiles);
}

function javaExecutableFor(manifest, destination) {
  const candidates = process.platform === "win32" ? ["bin/java.exe"] : ["bin/java"];
  const relative = candidates.find((candidate) => manifest.files[candidate]?.type === "file" || manifest.files[candidate]?.type === "link");
  if (!relative) throw new Error("The official Java runtime manifest has no executable for this platform.");
  return safeRuntimePath(destination, relative);
}

function uniqueRuntimePath(root, basename) {
  return path.join(root, `${basename}-${crypto.randomUUID()}`);
}

export async function installMojangJavaRuntime({ component, majorVersion, runtimeRoot, signal, onProgress = () => {} }) {
  const runtimeComponent = String(component || "");
  if (!JAVA_COMPONENTS.has(runtimeComponent)) throw new Error("This Minecraft version does not identify a supported official Java runtime component.");
  if (!Number.isInteger(Number(majorVersion)) || Number(majorVersion) < 8 || Number(majorVersion) > 100) {
    throw new Error("Minecraft's version metadata does not specify a valid Java version.");
  }
  if (!supportedRuntimePlatform()) throw new Error(`Automatic Java download is not available for ${process.platform}/${process.arch}; choose a compatible Java executable in Settings.`);
  if (signal?.aborted) throw signal.reason || new Error("Java runtime installation cancelled.");

  onProgress(1, `Java ${Number(majorVersion)} · loading official Mojang runtime manifest`);
  const manifest = await fetchJavaRuntimeManifest({ target: runtimeComponent, signal });
  if (!manifest?.files || !manifest.version?.name || !/^[A-Za-z0-9._+-]{1,80}$/.test(manifest.version.name)) {
    throw new Error("Mojang returned incomplete Java runtime metadata.");
  }
  const canonicalRuntimeRoot = await resolveRuntimeRoot(runtimeRoot);
  const basename = `${runtimeComponent}-${manifest.version.name}-${process.platform}-${process.arch}`;
  const baseDestination = path.join(canonicalRuntimeRoot, basename);
  const existingDestination = await inspectExistingRuntime(canonicalRuntimeRoot, baseDestination, manifest.files);

  if (existingDestination) {
    const javaPath = javaExecutableFor(manifest, existingDestination);
    try {
      const installedMajor = detectJavaMajor(javaPath);
      if (installedMajor >= Number(majorVersion)) {
        onProgress(100, `Java ${installedMajor} runtime is already ready`);
        return { javaPath, majorVersion: installedMajor, runtimeVersion: manifest.version.name, component: runtimeComponent };
      }
    } catch {}
  }

  const stagingDirectory = await fs.mkdtemp(path.join(canonicalRuntimeRoot, `.pulsar-java-${runtimeComponent}-`));
  await fs.chmod(stagingDirectory, 0o700).catch(() => {});
  let cleanupStagingDirectory = stagingDirectory;
  try {
    const plan = buildJavaRuntimeInstallManifest(manifest, stagingDirectory);
    const tracker = new ProgressTrackerMultiple();
    const runtime = createDefaultNodeInstallRuntime({ signal, tracker, maxConcurrency: 8 });
    onProgress(4, `Java ${Number(majorVersion)} · verified download from Mojang`);
    const timer = setInterval(() => {
      const ratio = tracker.total > 0 ? Math.min(0.98, tracker.progress / tracker.total) : 0;
      const received = Math.round(tracker.progress / 1024 / 1024);
      const total = Math.ceil(tracker.total / 1024 / 1024);
      onProgress(4 + 92 * ratio, total ? `${received} / ${total} MB` : "Preparing runtime files");
    }, 250);
    try {
      await executeInstallManifest(plan, runtime, { signal });
    } finally {
      clearInterval(timer);
    }
    if (signal?.aborted) throw signal.reason || new Error("Java runtime installation cancelled.");

    await assertRuntimeTreeContained(stagingDirectory, manifest.files);
    const stagedJavaPath = javaExecutableFor(manifest, stagingDirectory);
    const installedMajor = detectJavaMajor(stagedJavaPath);
    if (installedMajor < Number(majorVersion)) {
      throw new Error(`The downloaded runtime is Java ${installedMajor}, but Minecraft requires Java ${Number(majorVersion)} or newer.`);
    }

    let finalDestination = existingDestination ? uniqueRuntimePath(canonicalRuntimeRoot, basename) : baseDestination;
    try {
      await fs.rename(stagingDirectory, finalDestination);
      cleanupStagingDirectory = "";
    } catch (error) {
      if (finalDestination !== baseDestination || !["EEXIST", "ENOTEMPTY", "EPERM"].includes(error.code)) throw error;
      finalDestination = uniqueRuntimePath(canonicalRuntimeRoot, basename);
      await fs.rename(stagingDirectory, finalDestination);
      cleanupStagingDirectory = "";
    }
    const safeFinalDestination = await inspectExistingRuntime(canonicalRuntimeRoot, finalDestination, manifest.files);
    if (!safeFinalDestination) throw new Error("The installed Java runtime could not be verified in its final location.");
    const javaPath = javaExecutableFor(manifest, safeFinalDestination);
    const finalMajor = detectJavaMajor(javaPath);
    if (finalMajor < Number(majorVersion)) throw new Error(`The installed runtime is Java ${finalMajor}, but Minecraft requires Java ${Number(majorVersion)} or newer.`);
    onProgress(100, `Java ${finalMajor} · ${manifest.version.name} ready`);
    return { javaPath, majorVersion: finalMajor, runtimeVersion: manifest.version.name, component: runtimeComponent };
  } finally {
    if (cleanupStagingDirectory) await fs.rm(cleanupStagingDirectory, { recursive: true, force: true });
  }
}

export { assertRuntimeTreeContained };
