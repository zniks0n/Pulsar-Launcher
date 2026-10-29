import fs from "node:fs";
import path from "node:path";

const DEFAULT_STATE = Object.freeze({
  schemaVersion: 1,
  settings: {
    language: "auto",
    theme: "dark",
    palette: "violet",
    minMemory: 1024,
    maxMemory: 4096,
    javaPath: "",
    authlibInjectorPath: "",
    showSnapshots: false,
    autoOpenCrash: true,
    autoCopyCrashPrompt: false,
    customAiTemplate: "",
  },
  accounts: [],
  instances: [],
  selectedAccountId: null,
  selectedInstanceId: null,
});

function normalizeState(value) {
  if (!value || value.schemaVersion !== 1) throw new Error("Unsupported Pulsar data schema.");
  if (!Array.isArray(value.accounts) || !Array.isArray(value.instances)) throw new Error("Pulsar data file is malformed.");
  return {
    ...DEFAULT_STATE,
    ...value,
    settings: { ...DEFAULT_STATE.settings, ...(value.settings || {}) },
    accounts: value.accounts,
    instances: value.instances,
  };
}

export class PersistentStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.state = structuredClone(DEFAULT_STATE);
  }

  load() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    if (!fs.existsSync(this.filePath)) {
      this.save();
      return this.getState();
    }
    try {
      this.state = normalizeState(JSON.parse(fs.readFileSync(this.filePath, "utf8")));
    } catch (error) {
      throw new Error(`Could not read Pulsar data at ${this.filePath}: ${error.message}`);
    }
    return this.getState();
  }

  getState() {
    return structuredClone(this.state);
  }

  update(mutator) {
    const next = this.getState();
    const result = mutator(next);
    this.state = normalizeState(next);
    this.save();
    return { state: this.getState(), result };
  }

  save() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    const temporary = `${this.filePath}.tmp`;
    fs.writeFileSync(temporary, `${JSON.stringify(this.state, null, 2)}\n`, { mode: 0o600 });
    fs.renameSync(temporary, this.filePath);
  }
}

export function publicState(state) {
  return {
    schemaVersion: state.schemaVersion,
    settings: { ...state.settings },
    accounts: state.accounts.map(({ encryptedAccessToken, ...account }) => account),
    instances: state.instances.map((instance) => ({ ...instance })),
    selectedAccountId: state.selectedAccountId,
    selectedInstanceId: state.selectedInstanceId,
  };
}
