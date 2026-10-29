import { randomUUID } from "node:crypto";

const PROVIDERS = {
  elyby: { label: "Ely.by", baseUrl: "https://authserver.ely.by", path: "/auth/authenticate" },
  littleskin: { label: "LittleSkin", baseUrl: "https://littleskin.cn/api/yggdrasil", path: "/authserver/authenticate" },
};

function safeName(value) {
  const name = String(value || "").trim();
  if (!/^[A-Za-z0-9_]{3,16}$/.test(name)) throw new Error("Minecraft names must be 3–16 letters, numbers or underscores.");
  return name;
}

function validateHttpsBase(value) {
  let url;
  try { url = new URL(String(value).trim()); } catch { throw new Error("Enter a valid Yggdrasil API URL."); }
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error("For your safety, account providers must use a clean HTTPS API URL without credentials or query parameters.");
  }
  url.pathname = url.pathname.replace(/\/+$/, "");
  return url;
}

function appendEndpoint(base, endpoint) {
  return `${base.replace(/\/+$/, "")}${endpoint}`;
}

async function readJson(response) {
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : {}; } catch { throw new Error(`The account provider returned invalid JSON (HTTP ${response.status}).`); }
  if (!response.ok) {
    const message = body.errorMessage || body.error || `HTTP ${response.status}`;
    throw new Error(`Account sign-in failed: ${String(message).slice(0, 240)}`);
  }
  return body;
}

export class AccountService {
  constructor(store, safeStorage) {
    this.store = store;
    this.safeStorage = safeStorage;
  }

  list() {
    return this.store.getState().accounts.map(({ encryptedAccessToken, ...account }) => account);
  }

  async addOffline(rawName) {
    const name = safeName(rawName);
    const id = randomUUID();
    const account = { id, kind: "offline", name, profileId: "", createdAt: new Date().toISOString() };
    this.store.update((state) => {
      state.accounts.push(account);
      state.selectedAccountId = id;
    });
    return { ...account };
  }

  async addYggdrasil({ provider = "custom", baseUrl, username, password }) {
    if (!await this.safeStorage?.isAsyncEncryptionAvailable?.()) {
      throw new Error("OS-protected credential storage is unavailable on this computer. Add an offline profile or enable Windows/macOS credential storage before saving online accounts.");
    }
    const user = String(username || "").trim();
    const secret = String(password || "");
    if (!user || !secret) throw new Error("Enter the account name and password to sign in. The password is never saved by Pulsar.");
    const preset = PROVIDERS[provider];
    const base = validateHttpsBase(preset ? preset.baseUrl : baseUrl).toString().replace(/\/$/, "");
    const authPath = preset?.path || "/authserver/authenticate";
    const response = await fetch(appendEndpoint(base, authPath), {
      method: "POST",
      redirect: "error",
      headers: { "content-type": "application/json", "accept": "application/json" },
      body: JSON.stringify({
        agent: { name: "Minecraft", version: 1 },
        username: user,
        password: secret,
        clientToken: randomUUID(),
        requestUser: true,
      }),
      signal: AbortSignal.timeout(25_000),
    });
    const body = await readJson(response);
    const profile = body.selectedProfile || body.availableProfiles?.[0];
    if (!profile?.id || !profile?.name || !body.accessToken) throw new Error("The provider did not return a usable Minecraft profile and access token.");
    const account = {
      id: randomUUID(),
      kind: "yggdrasil",
      provider,
      providerLabel: preset?.label || new URL(base).hostname,
      baseUrl: base,
      name: String(profile.name).slice(0, 32),
      profileId: String(profile.id).replaceAll("-", ""),
      encryptedAccessToken: (await this.safeStorage.encryptStringAsync(String(body.accessToken))).toString("base64"),
      clientToken: String(body.clientToken || ""),
      createdAt: new Date().toISOString(),
    };
    this.store.update((state) => {
      state.accounts.push(account);
      state.selectedAccountId = account.id;
    });
    return { id: account.id, kind: account.kind, provider: account.provider, providerLabel: account.providerLabel, name: account.name, profileId: account.profileId, createdAt: account.createdAt };
  }

  select(accountId) {
    const state = this.store.getState();
    if (!state.accounts.some((account) => account.id === accountId)) throw new Error("That account no longer exists.");
    this.store.update((draft) => { draft.selectedAccountId = accountId; });
    return accountId;
  }

  remove(accountId) {
    this.store.update((state) => {
      state.accounts = state.accounts.filter((account) => account.id !== accountId);
      if (state.selectedAccountId === accountId) state.selectedAccountId = state.accounts[0]?.id || null;
    });
    return this.list();
  }

  async getLaunchProfile() {
    const state = this.store.getState();
    let account = state.accounts.find((item) => item.id === state.selectedAccountId);
    if (!account) account = state.accounts.find((item) => item.kind === "offline");
    if (!account) return { kind: "offline", name: "PulsarPlayer", profileId: "", accessToken: "0", userType: "legacy" };
    if (account.kind === "offline") return { kind: "offline", name: account.name, profileId: account.profileId, accessToken: "0", userType: "legacy" };
    try {
      const ciphertext = Buffer.from(account.encryptedAccessToken, "base64");
      const decrypted = await this.safeStorage.decryptStringAsync(ciphertext);
      const token = decrypted.shouldReEncrypt
        ? (await this.safeStorage.decryptStringAsync(ciphertext)).result
        : decrypted.result;
      return { kind: "yggdrasil", name: account.name, profileId: account.profileId, accessToken: token, userType: "mojang", provider: account.provider, baseUrl: account.baseUrl };
    } catch {
      throw new Error("Pulsar could not unlock this account token. Sign in again to continue.");
    }
  }
}
