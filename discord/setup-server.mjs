#!/usr/bin/env node
/**
 * Pulsar Discord setup helper.
 * Requires Node.js 22+, a bot invited to an EXISTING server, and permissions listed in discord/README.md.
 * This script never deletes or renames existing roles/channels; it creates missing entries only.
 */
const API = "https://discord.com/api/v10";
const DONATE_URL = "https://www.donationalerts.com/r/zn1kson";
const SITE_URL = process.env.PULSAR_SITE_URL || "https://pulsar-bq4wlerh.manus.space";
const GITHUB_URL = process.env.PULSAR_GITHUB_URL || "";
const token = process.env.DISCORD_BOT_TOKEN?.trim();
const guildId = process.env.DISCORD_GUILD_ID?.trim();
const ownerId = process.env.DISCORD_OWNER_ID?.trim();
const appId = process.env.DISCORD_APPLICATION_ID?.trim();

const PERM = {
  createInvite: 1n << 0n,
  kickMembers: 1n << 1n,
  banMembers: 1n << 2n,
  manageChannels: 1n << 4n,
  manageGuild: 1n << 5n,
  addReactions: 1n << 6n,
  viewChannel: 1n << 10n,
  sendMessages: 1n << 11n,
  manageMessages: 1n << 13n,
  attachFiles: 1n << 15n,
  readHistory: 1n << 16n,
  connect: 1n << 20n,
  speak: 1n << 21n,
  manageRoles: 1n << 28n,
  sendMessagesInThreads: 1n << 38n,
  moderateMembers: 1n << 40n,
};
const VIEW_READ = PERM.viewChannel | PERM.readHistory;
const MOD_TOOLS = PERM.manageMessages | PERM.kickMembers | PERM.banMembers | PERM.moderateMembers;
const CONTENT_TOOLS = PERM.manageGuild | PERM.manageChannels | PERM.manageRoles | PERM.manageMessages;
const REQUIRED_BOT_PERMISSIONS =
  PERM.createInvite | PERM.manageChannels | PERM.manageGuild | PERM.manageRoles |
  PERM.viewChannel | PERM.sendMessages | PERM.sendMessagesInThreads | PERM.readHistory |
  PERM.manageMessages | PERM.attachFiles | PERM.connect | PERM.speak | MOD_TOOLS;
const BOT_INVITE_URL = appId && /^\d{17,20}$/.test(appId)
  ? `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(appId)}&scope=bot%20applications.commands&permissions=${REQUIRED_BOT_PERMISSIONS}`
  : "";

if (process.argv.includes("--print-invite")) {
  if (!BOT_INVITE_URL) {
    console.error("Set DISCORD_APPLICATION_ID to the bot application ID first.");
    process.exit(2);
  }
  console.log(BOT_INVITE_URL);
  process.exit(0);
}

if (!token || !/^\d{17,20}$/.test(guildId || "")) {
  console.error(`Set DISCORD_BOT_TOKEN and DISCORD_GUILD_ID first. See discord/README.md.`);
  process.exit(2);
}
if (ownerId && !/^\d{17,20}$/.test(ownerId)) {
  console.error("DISCORD_OWNER_ID must be a Discord user ID (17–20 digits), or omitted.");
  process.exit(2);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function api(method, path, body) {
  const url = `${API}${path}`;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "DiscordBot (https://pulsar-bq4wlerh.manus.space, 0.1)",
        "X-Audit-Log-Reason": "Pulsar community setup",
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    if (response.status === 429) {
      const data = await response.json().catch(() => ({}));
      const wait = Math.ceil((Number(data.retry_after) || 1) * 1000) + 250;
      console.log(`Discord rate limit; retrying in ${wait} ms.`);
      await sleep(wait);
      continue;
    }
    if (response.status === 204) return null;
    const raw = await response.text();
    let data;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }
    if (!response.ok) {
      const detail = typeof data === "string" ? data : JSON.stringify(data);
      throw new Error(`Discord API ${response.status} ${method} ${path}: ${detail.slice(0, 500)}`);
    }
    return data;
  }
  throw new Error(`Discord API rate limit retries exhausted for ${method} ${path}.`);
}

function decimal(value) { return value.toString(); }
function colour(hex) { return Number.parseInt(hex.replace("#", ""), 16); }

async function ensureRoles() {
  const existing = await api("GET", `/guilds/${guildId}/roles`);
  const specs = [
    { key: "owner", name: "Владелец", color: "#aa92ff", permissions: CONTENT_TOOLS | MOD_TOOLS, hoist: true },
    { key: "developer", name: "Разработчик", color: "#8b78f6", permissions: CONTENT_TOOLS, hoist: true },
    { key: "moderator", name: "Модератор", color: "#4fc8b8", permissions: MOD_TOOLS, hoist: true },
    { key: "helper", name: "Помощник", color: "#7cb8ea", permissions: 0n, hoist: true },
    { key: "tester", name: "Тестировщик", color: "#f2c46c", permissions: 0n, hoist: true },
    { key: "booster", name: "Бустер", color: "#ee91ca", permissions: 0n, hoist: true },
    { key: "player", name: "Игрок", color: "#abb2c6", permissions: 0n, hoist: false },
  ];
  const result = {};
  for (const spec of specs) {
    let role = existing.find((item) => item.name === spec.name);
    if (!role) {
      role = await api("POST", `/guilds/${guildId}/roles`, {
        name: spec.name,
        color: colour(spec.color),
        permissions: decimal(spec.permissions),
        hoist: spec.hoist,
        mentionable: false,
      });
      existing.push(role);
      console.log(`Created role: ${spec.name}`);
    } else {
      console.log(`Kept existing role: ${spec.name}`);
    }
    result[spec.key] = role;
  }
  return result;
}

function categoryOverwrites(roles, botId) {
  return [
    { id: guildId, type: 0, allow: "0", deny: decimal(PERM.viewChannel) },
    ...[roles.owner, roles.developer, roles.moderator].map((role) => ({
      id: role.id, type: 0, allow: decimal(VIEW_READ | PERM.sendMessages), deny: "0",
    })),
    { id: botId, type: 1, allow: decimal(VIEW_READ | PERM.sendMessages | PERM.manageMessages), deny: "0" },
  ];
}

async function ensureChannel(existing, spec, roles, botId, createdIds) {
  let channel = existing.find((item) => item.name === spec.name && item.type === spec.type && item.parent_id === (spec.parent ? createdIds[spec.parent] : null));
  if (channel) {
    console.log(`Kept existing channel: ${spec.name}`);
    return { channel, created: false };
  }
  const body = { name: spec.name, type: spec.type };
  if (spec.topic) body.topic = spec.topic;
  if (spec.parent) body.parent_id = createdIds[spec.parent];
  if (spec.type === 4 && spec.private) body.permission_overwrites = categoryOverwrites(roles, botId);
  if (spec.type === 15) {
    body.available_tags = (spec.tags || []).map((name) => ({ name, moderated: false }));
    body.default_forum_layout = 1;
  }
  if (spec.readOnly) {
    body.permission_overwrites = [
      { id: guildId, type: 0, allow: decimal(VIEW_READ), deny: decimal(PERM.sendMessages | PERM.addReactions) },
      ...[roles.owner, roles.developer, roles.moderator].map((role) => ({
        id: role.id, type: 0, allow: decimal(PERM.sendMessages | PERM.manageMessages), deny: "0",
      })),
      { id: botId, type: 1, allow: decimal(VIEW_READ | PERM.sendMessages | PERM.manageMessages), deny: "0" },
    ];
  }
  channel = await api("POST", `/guilds/${guildId}/channels`, body);
  existing.push(channel);
  createdIds[spec.key] = channel.id;
  console.log(`Created ${spec.type === 4 ? "category" : "channel"}: ${spec.name}`);
  return { channel, created: true };
}

const channelPlan = [
  { key: "start", name: "📌・НАЧНИ ЗДЕСЬ", type: 4 },
  { key: "community", name: "🌌・СООБЩЕСТВО", type: 4 },
  { key: "support", name: "🛠・ПОДДЕРЖКА", type: 4 },
  { key: "voice", name: "🎧・ГОЛОСОВЫЕ", type: 4 },
  { key: "staff", name: "🔒・КОМАНДА", type: 4, private: true },
  { key: "news", name: "📣-announcements", type: 0, parent: "start", readOnly: true, topic: "Официальные новости Pulsar Launcher. Только для чтения." },
  { key: "rules", name: "📜-rules", type: 0, parent: "start", readOnly: true, topic: "Правила и безопасность сообщества." },
  { key: "downloads", name: "📦-downloads", type: 0, parent: "start", readOnly: true, topic: "Ссылки на проверенные официальные релизы Pulsar." },
  { key: "general", name: "💬-general", type: 0, parent: "community", topic: "Приветствия и общение игроков." },
  { key: "launcher", name: "🚀-launcher-chat", type: 0, parent: "community", topic: "Обсуждение Pulsar Launcher и идей проекта." },
  { key: "screenshots", name: "🖼-screenshots", type: 0, parent: "community", topic: "Скриншоты миров, сборок и игровых моментов." },
  { key: "modpacks", name: "🧱-mods-and-worlds", type: 0, parent: "community", topic: "Обсуждаем моды, модпаки и Minecraft-миры." },
  { key: "suggestions", name: "💡-suggestions", type: 15, parent: "community", topic: "Предлагай идеи для Pulsar Launcher.", tags: ["Открыто", "Рассматривается", "Принято", "Не планируется"] },
  { key: "help", name: "🧰-help", type: 15, parent: "support", topic: "Задай вопрос и приложи нужные сведения.", tags: ["Открыто", "Нужны сведения", "Решено"] },
  { key: "bugs", name: "🐛-bug-reports", type: 15, parent: "support", topic: "Описывай один баг в каждой теме.", tags: ["Открыто", "В работе", "Исправлено", "Невоспроизводимо"] },
  { key: "devSupport", name: "💜-support-development", type: 0, parent: "support", topic: "Поддержать независимую разработку Pulsar Launcher." },
  { key: "voiceGeneral", name: "🔊・Общая", type: 2, parent: "voice" },
  { key: "voiceFocus", name: "🎮・Играем вместе", type: 2, parent: "voice" },
  { key: "voiceAfk", name: "🌙・AFK", type: 2, parent: "voice" },
  { key: "staffChat", name: "🛡-staff-chat", type: 0, parent: "staff", topic: "Закрытый чат команды." },
  { key: "modLog", name: "🧾-moderation-log", type: 0, parent: "staff", topic: "Закрытые заметки команды модерации." },
];

const textSeeds = {
  news: `## Новости Pulsar Launcher\nЗдесь публикуются официальные обновления и релизы. Следите за сайтом проекта: ${SITE_URL}`,
  rules: "## Правила сообщества\n1. Будьте вежливы и уважайте участников.\n2. Не публикуйте личные данные и вредоносные ссылки.\n3. Используйте подходящие каналы и описывайте технические вопросы спокойно и по существу.\n4. Не используйте спам, оскорбления или травлю.\n\n## Community rules\nBe respectful, protect personal information, use the right channels, and do not spam or harass other members.",
  downloads: `## Официальные загрузки\nПервый релиз лаунчера ещё не опубликован. Проверяйте актуальные ссылки на сайте: ${SITE_URL}\nНе скачивайте файлы из неофициальных сообщений.`,
  general: `Добро пожаловать в Pulsar! Представься, расскажи о своих мирах и будь доброжелателен.\n\nWelcome to Pulsar—say hello and tell us what you like to play.`,
  launcher: "Обсуждайте идеи, интерфейс и развитие лаунчера. Помечайте непроверенные сообщения как предположения: проект активно разрабатывается.",
  screenshots: "Покажи любимый Minecraft-мир или сборку. Уважай авторские права и не прикладывай личные данные.",
  modpacks: "Какие моды, загрузчики и сборки вы используете? Делитесь контекстом версии игры, чтобы другим было проще повторить.",
  devSupport: `Pulsar Launcher — независимый проект Znikson. Если хочешь поддержать разработку, используй официальный DonationAlerts: ${DONATE_URL}\n\nPulsar пока в разработке; не существует обязательных платежей.`,
  staffChat: "Служебный канал команды Pulsar. Не публикуйте здесь токены, личные данные пользователей или приватные логи без необходимости.",
  modLog: "Внутренние заметки модерации. Фиксируйте только необходимый контекст и соблюдайте приватность участников.",
};
const forumSeeds = {
  suggestions: { title: "Предложение для Pulsar Launcher", content: "Опиши идею, какую проблему она решает и как ты представляешь её работу. Один пост — одно предложение." },
  help: { title: "Нужна помощь с Pulsar?", content: `Напиши, что ты пытался сделать и что произошло. Добавь версию ОС и launcher, если она уже есть. Не прикладывай токены и личные данные. Сайт проекта: ${SITE_URL}` },
  bugs: { title: "Шаблон сообщения об ошибке", content: "Версия лаунчера/ОС:\nШаги для повтора:\nЧто ожидалось:\nЧто произошло:\nПрикрепляй только логи без токенов, личных путей и секретов." },
};

async function seedTextChannel(channel, text) {
  const messages = await api("GET", `/channels/${channel.id}/messages?limit=50`);
  if (messages.length) return;
  const sent = await api("POST", `/channels/${channel.id}/messages`, {
    content: text,
    allowed_mentions: { parse: [] },
  });
  await api("PUT", `/channels/${channel.id}/pins/${sent.id}`);
  console.log(`Posted and pinned the starter message in #${channel.name}`);
}

async function seedForum(channel, key, created) {
  if (!created || !forumSeeds[key]) return;
  const seed = forumSeeds[key];
  await api("POST", `/channels/${channel.id}/threads`, {
    name: seed.title,
    auto_archive_duration: 10080,
    message: { content: seed.content, allowed_mentions: { parse: [] } },
  });
  console.log(`Created a starter post in #${channel.name}`);
}

async function main() {
  const guild = await api("GET", `/guilds/${guildId}`);
  const bot = await api("GET", "/users/@me");
  const botId = bot.id;
  console.log(`Preparing Pulsar channels in: ${guild.name} (${guild.id})`);
  const roles = await ensureRoles();
  const existing = await api("GET", `/guilds/${guildId}/channels`);
  const ids = {};
  const result = {};

  for (const spec of channelPlan.filter((item) => item.type === 4)) {
    const made = await ensureChannel(existing, spec, roles, botId, ids);
    result[spec.key] = made;
  }
  for (const spec of channelPlan.filter((item) => item.type !== 4)) {
    const made = await ensureChannel(existing, spec, roles, botId, ids);
    result[spec.key] = made;
    if (made.created && spec.type === 15) await seedForum(made.channel, spec.key, true);
    if (spec.type === 0 && textSeeds[spec.key]) await seedTextChannel(made.channel, textSeeds[spec.key]);
  }

  if (ownerId) {
    try {
      const member = await api("GET", `/guilds/${guildId}/members/${ownerId}`);
      if (!member.roles.includes(roles.owner.id)) {
        await api("PATCH", `/guilds/${guildId}/members/${ownerId}`, { roles: [...member.roles, roles.owner.id] });
        console.log("Assigned the owner role to DISCORD_OWNER_ID.");
      } else {
        console.log("Owner role is already assigned.");
      }
    } catch (error) {
      console.warn(`Could not assign the optional owner role: ${error.message}`);
    }
  } else {
    console.log("DISCORD_OWNER_ID not set; the owner role was created but not assigned.");
  }

  let invite;
  try {
    const oldInvites = await api("GET", `/channels/${ids.general}/invites`);
    invite = oldInvites.find((item) => item.inviter?.id === botId && item.max_age === 0 && item.max_uses === 0);
  } catch {
    // Creating a fresh invite below provides a clearer permission error if invite lookup is unavailable.
  }
  if (!invite) invite = await api("POST", `/channels/${ids.general}/invites`, { max_age: 0, max_uses: 0, unique: true });
  console.log(`\nPublic invite: https://discord.gg/${invite.code}`);
  console.log(`Website: ${SITE_URL}`);
  if (GITHUB_URL) console.log(`GitHub: ${GITHUB_URL}`);
  else console.log("GitHub link is not configured; set PULSAR_GITHUB_URL after the public repository exists.");
  if (BOT_INVITE_URL) console.log(`Bot invite URL: ${BOT_INVITE_URL}`);
  console.log("\nDone. Existing channels and roles were preserved; only missing entries were created.");
}

main().catch((error) => {
  console.error(`Setup stopped: ${error.message}`);
  process.exitCode = 1;
});
