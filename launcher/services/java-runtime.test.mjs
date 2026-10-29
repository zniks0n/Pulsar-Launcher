import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { assertRuntimeTreeContained, buildJavaRuntimeInstallManifest, detectJavaMajor, installMojangJavaRuntime } from "./java-runtime.mjs";

const sha1 = "a".repeat(40);
const runtime = (overrides = {}) => ({
  version: { name: "21.0.7" },
  files: {
    "bin/java": { type: "file", executable: true, downloads: { raw: { url: "https://piston-data.mojang.com/v1/java", sha1, size: 123 } } },
    "conf": { type: "directory" },
    "lib/current": { type: "link", target: "server/../modules" },
    ...overrides,
  },
});

test("builds checksum-verified Java file tasks and executable/layout operations", () => {
  const destination = path.join("/tmp", "pulsar-runtime-test");
  const plan = buildJavaRuntimeInstallManifest(runtime(), destination);
  assert.equal(plan.schemaVersion, 1);
  assert.equal(plan.tasks[0].type, "files");
  assert.equal(plan.tasks[0].files.length, 1);
  assert.equal(plan.tasks[0].files[0].checksum.algorithm, "sha1");
  assert.equal(plan.tasks[0].files[0].path, path.join(destination, "bin", "java"));
  assert.deepEqual(plan.tasks[1].operations.map((operation) => operation.type), ["chmod", "ensure-directory", "link"]);
  assert.equal(plan.tasks[1].operations[0].mode, 0o755);
  assert.equal(plan.tasks[1].dependsOn[0], "java-runtime-files");
});

test("rejects a runtime file path that escapes its installation directory", () => {
  assert.throws(() => buildJavaRuntimeInstallManifest(runtime({ "../outside": { type: "directory" } }), "/tmp/pulsar-runtime-test"), /unsafe runtime path/);
});

test("rejects file downloads outside official Mojang domains", () => {
  const unsafe = runtime({ "lib/evil": { type: "file", executable: false, downloads: { raw: { url: "https://example.com/java", sha1, size: 1 } } } });
  assert.throws(() => buildJavaRuntimeInstallManifest(unsafe, "/tmp/pulsar-runtime-test"), /outside the official Mojang domains/);
});

test("rejects symbolic links that escape the managed runtime directory", () => {
  const unsafe = runtime({ "lib/escape": { type: "link", target: "../../outside" } });
  assert.throws(() => buildJavaRuntimeInstallManifest(unsafe, "/tmp/pulsar-runtime-test"), /link outside/);
});

test("rejects a pre-existing filesystem symlink in a runtime path before cached execution", async (context) => {
  if (process.platform === "win32") return context.skip("Windows symlink creation may require elevated privileges.");
  const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), "pulsar-runtime-path-test-"));
  try {
    const runtimeDirectory = path.join(temporaryRoot, "runtime");
    const outsideDirectory = path.join(temporaryRoot, "outside");
    await fs.mkdir(runtimeDirectory);
    await fs.mkdir(outsideDirectory);
    await fs.symlink(outsideDirectory, path.join(runtimeDirectory, "bin"), "dir");
    await assert.rejects(assertRuntimeTreeContained(runtimeDirectory, runtime().files), /unexpected symbolic link|outside its installation directory/);
  } finally {
    await fs.rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("rejects a symlinked runtime root rather than executing a cached runtime through it", async (context) => {
  if (process.platform === "win32") return context.skip("Windows symlink creation may require elevated privileges.");
  const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), "pulsar-runtime-root-test-"));
  try {
    const outsideDirectory = path.join(temporaryRoot, "outside");
    await fs.mkdir(outsideDirectory);
    const runtimeLink = path.join(temporaryRoot, "runtime-link");
    await fs.symlink(outsideDirectory, runtimeLink, "dir");
    await assert.rejects(assertRuntimeTreeContained(runtimeLink, runtime().files), /symbolic link/);
  } finally {
    await fs.rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("detects the installed Java major version", () => {
  assert.ok(detectJavaMajor("java") >= 8);
});

test("honours an already-aborted cancellation signal before fetching metadata", async () => {
  const signal = AbortSignal.abort(new Error("cancelled in test"));
  await assert.rejects(installMojangJavaRuntime({ component: "java-runtime-delta", majorVersion: 21, runtimeRoot: "/tmp/pulsar-runtime-test", signal }), /cancelled in test/);
});
