import assert from "node:assert/strict";
import test from "node:test";
import { diagnoseCrash } from "./crash-diagnostics.mjs";

test("detects an unsupported Java bytecode version", () => {
  assert.equal(diagnoseCrash("java.lang.UnsupportedClassVersionError: class file version 65.0", 1).id, "java-version");
});

test("explains memory failures in Russian", () => {
  const result = diagnoseCrash("java.lang.OutOfMemoryError: Java heap space", 1, "ru");
  assert.equal(result.id, "memory");
  assert.match(result.title, /памяти/i);
});

test("detects mod resolution issues", () => {
  assert.equal(diagnoseCrash("ModResolutionException: Incompatible mods found", 1).id, "mod-conflict");
});

test("detects graphics initialization problems", () => {
  assert.equal(diagnoseCrash("GLFW error 65542: WGL: The driver does not appear to support OpenGL", 1).id, "graphics");
});

test("returns a normal exit explanation for exit code zero", () => {
  assert.equal(diagnoseCrash("", 0, "ru").id, "normal-exit");
});

test("returns a bounded generic fallback for unrecognized reports", () => {
  const result = diagnoseCrash("unrecognized", 1);
  assert.equal(result.id, "unknown");
  assert.ok(result.detail.length < 500);
});
