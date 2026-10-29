# Changelog

## 0.2.0 — 2026-10-29 — Early Access

- Added cancellable installation of an official Mojang Java runtime matching the selected Minecraft version when the system Java is missing or too old and the user has not explicitly selected a Java executable. The managed Java path is stored per instance.
- Validated runtime file SHA-1 values from Mojang metadata, restricted downloads to Mojang/Minecraft HTTPS domains, and rejected runtime paths or links that escape the per-user installation directory.
- Rebuilt the Windows x64 NSIS installer, portable executable and portable ZIP; all Windows builds remain unsigned and release checksums are supplied separately.
- Updated the bilingual website download links and release metadata to the v0.2.0 assets.

## 0.1.0 — 2026-10-29 — Early Access

- Released the Pulsar Launcher Windows x64 desktop app with real Vanilla and Fabric Minecraft Java installation/launch, isolated instances, compatible Modrinth mod management, offline/Yggdrasil accounts and local crash diagnostics.
- Prepared an NSIS installer, portable executable and portable ZIP. All Windows builds are unsigned; release checksums are provided separately.
- Added a bilingual EN/RU website with real GitHub, download, author, DonationAlerts and user-provided Discord links; includes subtle transitions and motion-reduction support.
- Added the optional helper for setting up channels and moderation in an existing Discord guild; creating and administering the guild remains with its owner.
- Microsoft/Xbox sign-in, Bedrock, Forge/NeoForge/Quilt, Discord Rich Presence, built-in auto-update, full migrations from other launchers and quest/social features are not included in this early-access release.
