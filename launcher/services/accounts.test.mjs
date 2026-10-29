import assert from "node:assert/strict";
import test from "node:test";
import { AccountService } from "./accounts.mjs";

function makeStore(initialState) {
  return {
    state: initialState,
    getState() { return this.state; },
    update(mutator) { mutator(this.state); },
  };
}

test("blocks Yggdrasil sign-in when asynchronous OS-protected storage is unavailable", async () => {
  const service = new AccountService(makeStore({ accounts: [], selectedAccountId: null }), {
    isAsyncEncryptionAvailable: async () => false,
  });
  await assert.rejects(
    service.addYggdrasil({ username: "player", password: "not-saved" }),
    /OS-protected credential storage is unavailable/,
  );
});

test("reads Yggdrasil access tokens using async safeStorage and handles key rotation", async () => {
  let calls = 0;
  const store = makeStore({
    selectedAccountId: "account-1",
    accounts: [{
      id: "account-1",
      kind: "yggdrasil",
      name: "Player",
      profileId: "1234",
      provider: "custom",
      baseUrl: "https://auth.example/api/yggdrasil",
      encryptedAccessToken: Buffer.from("ciphertext").toString("base64"),
    }],
  });
  const service = new AccountService(store, {
    async decryptStringAsync(buffer) {
      assert.equal(buffer.toString(), "ciphertext");
      calls += 1;
      return calls === 1
        ? { result: "old-decrypted-value", shouldReEncrypt: true }
        : { result: "rotated-safe-token", shouldReEncrypt: false };
    },
  });
  const profile = await service.getLaunchProfile();
  assert.equal(profile.accessToken, "rotated-safe-token");
  assert.equal(calls, 2);
});
