# Discord API setup notes / Сведения для настройки Discord-сервера

Checked against official Discord API documentation on 2026-10-29. These notes document the optional guild-setup helper and do not imply that an account or Discord server is connected.

Сведения проверены по официальной документации Discord API 29 октября 2026 года. Они описывают ограничения скрипта настройки и не означают, что аккаунт или сервер Discord подключён.

| Operation | Verified API constraint |
|---|---|
| Create guild channel | `POST /guilds/{guild.id}/channels`; requires `MANAGE_CHANNELS`. Forum/media channels accept `available_tags`, limited to 20. |
| Channel overwrites | Overwrites may be included when creating channels. Editing afterwards uses `PUT /channels/{channel.id}/permissions/{overwrite.id}` and requires `MANAGE_ROLES`. Bitfields serialize as decimal strings. |
| Create forum starter post | `POST /channels/{channel.id}/threads`; requires `SEND_MESSAGES`, the thread is public, and its body needs a `message` object with at least one content/embeds/sticker/components/files field. `applied_tags` accepts IDs. |
| Pin a starter message | `PUT /channels/{channel.id}/pins/{message.id}`; requires `MANAGE_MESSAGES` and the message to be accessible in that channel/thread. |
| Create human invite | `POST /channels/{channel.id}/invites`, requires `CREATE_INSTANT_INVITE`, and requires a JSON body (`{}` is valid). `max_age: 0` and `max_uses: 0` make an invite permanent and unlimited. |
| Create role | `POST /guilds/{guild.id}/roles`, requires `MANAGE_ROLES`; the bot can assign only roles below its highest role and only permissions the bot itself has. |
| Modify member roles | `PATCH /guilds/{guild.id}/members/{user.id}` with a `roles` array, requiring `MANAGE_ROLES`; merge current roles to avoid removing unrelated assignments. |
| Read-only information channels | `VIEW_CHANNEL=1024`, `SEND_MESSAGES=2048`, `READ_MESSAGE_HISTORY=65536`, `ADD_REACTIONS=64`; deny send for `@everyone` and explicitly allow selected staff roles. |
| Private staff categories | Deny `VIEW_CHANNEL` to `@everyone`, allow it to specified team roles, and include the bot's own user overwrite so it can finish provisioning. |
| Modify guild | `PATCH /guilds/{guild.id}` requires `MANAGE_GUILD`; accepts `description`, `verification_level`, `explicit_content_filter`, `preferred_locale`, `rules_channel_id` and `public_updates_channel_id`. Modifying the `COMMUNITY` feature requires `ADMINISTRATOR`. |
| Safety values | Verification level 2 is Medium; explicit content filter 2 applies to all members. The helper only raises either field to 2, preserving any stricter existing level. |
| AutoMod | `POST /guilds/{guild.id}/auto-moderation/rules` requires `MANAGE_GUILD`. Trigger `SPAM=3` and `MENTION_SPAM=5`; mention metadata accepts `mention_total_limit` (up to 50) and `mention_raid_protection_enabled`. Actions can block a message and alert a channel. |
| Server creation | A bot provisions an existing guild; the owner must first create the server and add the bot. |

Sources: [Discord Channels API](https://docs.discord.com/developers/resources/channel), [Discord Permissions](https://docs.discord.com/developers/topics/permissions), [Discord Guild API](https://docs.discord.com/developers/resources/guild), [Discord Auto Moderation API](https://docs.discord.com/developers/resources/auto-moderation).
