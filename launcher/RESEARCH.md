# Implementation research and sources

Research checked 29 October 2026. This note records the technical references behind the Java launcher slice and the boundaries that remain; it is not a claim of complete compatibility.

## Minecraft Java install and launch

The current split used by Pulsar is XMCL's Node-side `@xmcl/installer` for version/file/workflow installation and `@xmcl/core` for resolved-version parsing and child-process launch. The pinned package versions in `launcher/package.json` are `@xmcl/installer` 6.3.6 and `@xmcl/core` 2.16.2. Upstream documents these as Node/Electron-side packages, not renderer APIs; the project keeps both in Electron's main process. Both packages are MIT-licensed.

- Installer npm documentation: https://www.npmjs.com/package/@xmcl/installer
- Installer API documentation: https://xmcl.app/en/core/installer
- Core npm documentation: https://www.npmjs.com/package/@xmcl/core
- Core API documentation: https://xmcl.app/en/core/core
- Upstream repository: https://github.com/Voxelum/minecraft-launcher-core-node

The installed APIs were checked against the pinned package declarations. A real temporary installation of Minecraft 1.21.4 (official version JSON, client/library/assets files) completed, and an offline launch under Xvfb reached the launcher's `game:window-ready` event; temporary game data was removed. This does not test Microsoft authentication or a Windows graphical session. Loader availability/Java requirements vary by Minecraft version; the shipped creator supports Vanilla and Fabric only.

The exact published package tarballs contain two upstream runtime metadata gaps, worked around by small reproducible pnpm patches under `launcher/patches/`: `@xmcl/unzip` 2.2.0 declares `main: ./index.ts` although the published tarball contains only `dist/index.js`/`.mjs`; `@xmcl/installer` imports `@xmcl/core/utils`, while the published `@xmcl/core` 2.16.2 tarball includes only the declaration and no runtime JS for `isNotNull`. The first patch points to the published bundle; the second restores only the declared `isNotNull(value) => value !== undefined` runtime subpath. Neither patch changes XMCL implementation behavior beyond resolving these missing package entrypoints.

## Accounts

Microsoft Java authentication normally performs OAuth device-code login, Xbox user/XSTS exchange, Minecraft Services token exchange, and Java profile/ownership verification. Microsoft documents the device-code grant and its pending/declined/expired polling behavior. Any refresh/bearer tokens must be treated as secrets and saved only with OS-protected storage; do not collect Microsoft passwords.

- Microsoft device-code flow: https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-device-code
- MinecraftAuth Java library and predefined configuration: https://github.com/RaphiMC/MinecraftAuth
- MinecraftAuth Maven Central: https://central.sonatype.com/artifact/net.raphimc/MinecraftAuth

The researched MinecraftAuth route is a Java library, not a Node/Electron API. Pulsar 0.1.0 therefore does not claim Microsoft OAuth support. A future implementation must either safely integrate a maintained Java auth helper or implement the documented protocol and verify a supported public client configuration before claiming Microsoft ownership login.

Ely.by's documented base is `https://authserver.ely.by`; LittleSkin's documented Yggdrasil base is `https://littleskin.cn/api/yggdrasil`. Ely's docs recommend OAuth over direct password auth, and explain that `authlib-injector` adjusts game session endpoints but does not replace launcher-side login. Offline UUID/name identity is not authenticated and online-mode servers reject it. Pulsar's current code implements password-to-Yggdrasil-provider HTTPS login, OS encryption when available, and offline identities; users must choose trusted third-party services themselves.

- Ely.by auth API: https://docs.ely.by/en/minecraft-auth.html
- Ely.by authlib-injector: https://docs.ely.by/en/authlib-injector.html
- authlib-injector releases: https://github.com/yushijinhun/authlib-injector
- LittleSkin Yggdrasil manual: https://manual.littleskin.cn/yggdrasil/
- LittleSkin service identity: https://littleskin.cn/

## Modrinth

The app uses the public Modrinth API v2 for project search and exact Minecraft-version/loader compatibility queries; downloads are accepted only from `https://cdn.modrinth.com/data/…` and checked against Modrinth SHA-512/SHA-1 hashes before the local file is renamed into `mods/`.

- API documentation: https://docs.modrinth.com/api/
- Search API: https://docs.modrinth.com/api/operations/searchprojects/
- Project version API: https://docs.modrinth.com/api/operations/getprojectversions/

This first slice does not claim CurseForge/FTB access, Modrinth dependency resolution, collections, shader/resource-pack management, or AI modpack recommendations.

## Windows packaging

`electron-builder` is pinned to 26.18.0. Official docs distinguish the NSIS installer, portable target and zip target. Wine x64/i386 was installed in the isolated Linux x86_64 build sandbox; electron-builder emitted Windows x64 NSIS, portable `.exe`, and `.zip` artifacts. PE signatures/file types and ZIP integrity were checked, and the packaged Linux app was separately smoke-launched under Xvfb. The files remain unsigned because no Authenticode certificate was provided; Windows code signing is separate.

- Linux-to-Windows/multi-platform: https://www.electron.build/docs/features/multi-platform-build/
- Target descriptions: https://www.electron.build/docs/targets/
- NSIS options: https://www.electron.build/docs/nsis/
- Architecture guidance: https://www.electron.build/docs/architecture
- Windows code signing: https://www.electron.build/docs/features/code-signing/code-sign-win

## Security and product limits

- Electron renderer uses `nodeIntegration:false`, context isolation and sandbox; the preload bridge exposes explicit IPC calls and main-process validation.
- Offline profiles do not authenticate and can be impersonated on offline-mode servers.
- No Minecraft game files, credentials, license keys, Discord tokens, or user account secrets are bundled in the source archive.
- The public repository exists at `https://github.com/zniks0n/Pulsar-Launcher`; the `v0.1.0` GitHub Release is still pending publication at the time this note was updated.

## Public project endpoints checked on 2026-10-29

- User-provided author profile: https://github.com/zniks0n
- Public project repository: https://github.com/zniks0n/Pulsar-Launcher
- Published website: https://pulsar-bq4wlerh.manus.space/
- User-provided Discord invitation: https://discord.gg/S4Xjmh9wQw
- Discord public invite endpoint checked: `https://discord.com/api/v10/invites/S4Xjmh9wQw?with_counts=true`. It returned HTTP 200 and `approximate_member_count: 1` on 2026-10-29. The response had no `Access-Control-Allow-Origin`, so a browser-side fetch is not used; the website shows this dated approximate snapshot and explains that it is not refreshed on each visit.
- Donation destination required by the brief: https://www.donationalerts.com/r/zn1kson
