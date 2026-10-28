# Discord API setup notes / Сведения для настройки Discord-сервера

Checked against the official Discord API documentation on 2026-10-29. These notes document constraints for the optional guild-setup helper and do not imply that an account or Discord server is connected.

Сведения проверены по официальной документации Discord API 29 октября 2026 года. Они описывают ограничения резервного скрипта настройки и не означают, что аккаунт или сервер Discord подключён.

| Operation | Verified API constraint |
|---|---|
| Create guild channel | `POST /guilds/{guild.id}/channels`; requires `MANAGE_CHANNELS`. Forum/media channels accept `available_tags`, limited to 20. |
| Channel overwrites | Overwrites may be included when creating channels. Editing afterwards uses `PUT /channels/{channel.id}/permissions/{overwrite.id}` and requires `MANAGE_ROLES`. Bitfields serialize as decimal strings. |
| Create forum starter post | `POST /channels/{channel.id}/threads`; requires `SEND_MESSAGES`, the thread is public, and its body needs a `message` object with at least one content/embeds/sticker/components/files field. `applied_tags` accepts IDs. |
| Create human invite | `POST /channels/{channel.id}/invites`, requires `CREATE_INSTANT_INVITE`, and requires a JSON body (`{}` is valid). `max_age: 0` and `max_uses: 0` make an invite permanent and unlimited. |
| Create role | `POST /guilds/{guild.id}/roles`, requires `MANAGE_ROLES`; the bot can assign only roles below its highest role and only permissions the bot itself has. |
| Modify member roles | `PATCH /guilds/{guild.id}/members/{user.id}` with a `roles` array, requiring `MANAGE_ROLES`; merge current roles to avoid removing unrelated assignments. |
| Read-only information channels | `VIEW_CHANNEL=1024`, `SEND_MESSAGES=2048`, `READ_MESSAGE_HISTORY=65536`, `ADD_REACTIONS=64`; deny send for `@everyone` and explicitly allow the selected staff roles. |
| Private staff categories | Deny `VIEW_CHANNEL` to `@everyone`, allow it to specified team roles, and include the bot's own user overwrite so it can finish provisioning. |
| Community server feature | Adding/removing the `COMMUNITY` guild feature requires `ADMINISTRATOR`; the helper leaves Discord Community onboarding and AutoMod for owner-side review. |
| Server creation | A bot can provision an existing guild; the owner must first create the server and add the bot. |

Sources: [Discord Channels API](https://docs.discord.com/developers/resources/channel), [Discord Permissions](https://docs.discord.com/developers/topics/permissions), [Discord Guild API](https://docs.discord.com/developers/resources/guild).
