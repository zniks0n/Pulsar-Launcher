import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const API = "https://api.modrinth.com/v2";
const USER_AGENT = "PulsarLauncher/0.2.0 (+https://pulsar-bq4wlerh.manus.space)";

async function getJson(url, signal) {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT, accept: "application/json" }, signal, redirect: "error" });
  if (!response.ok) throw new Error(`Modrinth request failed (HTTP ${response.status}).`);
  return response.json();
}

export async function searchMods({ query = "", limit = 24, offset = 0, signal }) {
  const params = new URLSearchParams({
    query: String(query).slice(0, 100),
    limit: String(Math.max(1, Math.min(30, Number(limit) || 24))),
    offset: String(Math.max(0, Number(offset) || 0)),
    facets: JSON.stringify([["project_type:mod"]]),
    index: "relevance",
  });
  const data = await getJson(`${API}/search?${params}`, signal);
  return (data.hits || []).map((item) => ({
    projectId: item.project_id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    iconUrl: item.icon_url || "",
    downloads: item.downloads || 0,
    follows: item.follows || 0,
    categories: item.categories || [],
  }));
}

export async function listInstanceMods(instancePath) {
  const modsPath = path.join(instancePath, "mods");
  await fs.promises.mkdir(modsPath, { recursive: true });
  const entries = await fs.promises.readdir(modsPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && (/\.jar$/i.test(entry.name) || /\.jar\.disabled$/i.test(entry.name)))
    .map((entry) => ({ fileName: entry.name, enabled: !entry.name.endsWith(".disabled"), size: fs.statSync(path.join(modsPath, entry.name)).size }))
    .sort((a, b) => a.fileName.localeCompare(b.fileName));
}

function cleanFileName(value) {
  const name = path.basename(String(value || "")).replace(/[\u0000-\u001f<>:"/\\|?*]/g, "_").trim();
  if (!name || name === "." || name === ".." || !name.toLowerCase().endsWith(".jar")) throw new Error("Modrinth did not provide a safe .jar filename.");
  return name.slice(0, 160);
}

export async function installMod({ instancePath, projectId, minecraftVersion, loader, signal }) {
  if (!/^[a-zA-Z0-9]{6,64}$/.test(String(projectId))) throw new Error("Invalid Modrinth project ID.");
  const filters = new URLSearchParams({
    game_versions: JSON.stringify([String(minecraftVersion)]),
    loaders: JSON.stringify([loader === "fabric" ? "fabric" : "minecraft"]),
  });
  const versions = await getJson(`${API}/project/${encodeURIComponent(projectId)}/version?${filters}`, signal);
  const candidate = (versions || []).find((version) => (version.files || []).some((file) => file.primary || file.filename?.toLowerCase().endsWith(".jar")));
  if (!candidate) throw new Error(`No compatible file was found for Minecraft ${minecraftVersion}.`);
  const file = candidate.files.find((item) => item.primary) || candidate.files.find((item) => item.filename?.toLowerCase().endsWith(".jar"));
  const url = new URL(file.url);
  if (url.protocol !== "https:" || url.hostname !== "cdn.modrinth.com" || !url.pathname.startsWith("/data/")) throw new Error("Modrinth returned a file URL outside its official download CDN.");
  const filename = cleanFileName(file.filename);
  if (!file.hashes?.sha512 && !file.hashes?.sha1) throw new Error("This file has no recognized integrity hash; refusing an unverified download.");
  const modsPath = path.join(instancePath, "mods");
  await fs.promises.mkdir(modsPath, { recursive: true });
  let target = path.join(modsPath, filename);
  if (fs.existsSync(target)) {
    const stem = filename.slice(0, -4);
    target = path.join(modsPath, `${stem}-${candidate.id.slice(0, 8)}.jar`);
    if (fs.existsSync(target)) return { fileName: path.basename(target), alreadyInstalled: true };
  }
  const temporary = `${target}.${crypto.randomUUID()}.part`;
  try {
    const response = await fetch(url, { headers: { "user-agent": USER_AGENT }, signal, redirect: "error" });
    if (!response.ok || !response.body) throw new Error(`Mod download failed (HTTP ${response.status}).`);
    const algorithm = file.hashes.sha512 ? "sha512" : "sha1";
    const hash = crypto.createHash(algorithm);
    const verifier = new Transform({ transform(chunk, _encoding, callback) { hash.update(chunk); callback(null, chunk); } });
    await pipeline(response.body, verifier, fs.createWriteStream(temporary, { flags: "wx" }), { signal });
    const actual = hash.digest("hex").toLowerCase();
    if (actual !== String(file.hashes[algorithm]).toLowerCase()) throw new Error("Downloaded mod failed its SHA-512/SHA-1 integrity check.");
    await fs.promises.rename(temporary, target);
  } catch (error) {
    await fs.promises.rm(temporary, { force: true });
    throw error;
  }
  return { fileName: path.basename(target), versionId: candidate.id, title: candidate.name, alreadyInstalled: false };
}

export async function toggleMod(instancePath, fileName, enabled) {
  const safeName = path.basename(String(fileName || ""));
  if (safeName !== fileName || !/\.jar(?:\.disabled)?$/i.test(safeName)) throw new Error("Invalid mod filename.");
  const from = path.join(instancePath, "mods", safeName);
  const toName = enabled ? safeName.replace(/\.disabled$/i, "") : safeName.endsWith(".disabled") ? safeName : `${safeName}.disabled`;
  const to = path.join(instancePath, "mods", toName);
  await fs.promises.access(from);
  if (from !== to && fs.existsSync(to)) throw new Error(`Cannot toggle mod: ${toName} already exists.`);
  if (from !== to) await fs.promises.rename(from, to);
  return { fileName: toName, enabled: !toName.endsWith(".disabled") };
}
