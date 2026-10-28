#!/usr/bin/env node
/**
 * Pulsar Discord setup helper for an EXISTING guild.
 * Requires Node.js 22+ and the bot permissions documented in discord/README.md.
 * It creates missing resources and preserves existing roles, channels, descriptions and stronger safety settings.
 */
const API = "https://discord.com/api/v10";
const DONATE_URL = "https://www.donationalerts.com/r/zn1kson";
const SITE_URL = process.env.PULSAR_SITE_URL || "https://pulsar-bq4wlerh.manus.space";
const GITHUB_URL = (process.env.PULSAR_GITHUB_URL || "").replace(/\/$/, "");
const RELEASES_URL = process.env.PULSAR_RELEASES_URL || (GITHUB_URL ? `${GITHUB_URL}/releases` : "");
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
  console.error("Set DISCORD_BOT_TOKEN and DISCORD_GUILD_ID first. See discord/README.md.");
  process.exit(2);
}
if (ownerId && !/^\d{17,20}$/.test(ownerId)) {
  console.error("DISCORD_OWNER_ID must be a Discord user ID (17–20 digits), or omitted.");
  process.exit(2);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function api(method, path, body) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "DiscordBot (https://pulsar-bq4wlerh.manus.space, 0.1)",
        "X-Audit-Log-Reason": encodeURIComponent("Pulsar community setup"),
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
    { key: "ru", name: "RU", color: "#8795b0", permissions: 0n, hoist: false },
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
      console.log(`Создана роль: ${spec.name}`);
    } else {
      console.log(`Сохранена существующая роль: ${spec.name}`);
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
  const parentId = spec.parent ? createdIds[spec.parent] : null;
  const channel = existing.find((item) =>
    item.name === spec.name && item.type === spec.type && (item.parent_id ?? null) === parentId,
  );
  if (channel) {
    createdIds[spec.key] = channel.id;
    console.log(`Сохранён существующий канал: ${spec.name}`);
    return { channel, created: false };
  }

  const body = { name: spec.name, type: spec.type };
  if (spec.topic) body.topic = spec.topic;
  if (parentId) body.parent_id = parentId;
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
  const created = await api("POST", `/guilds/${guildId}/channels`, body);
  existing.push(created);
  createdIds[spec.key] = created.id;
  console.log(`Создан канал: ${spec.name}`);
  return { channel: created, created: true };
}

const channelPlan = [
  { key: "start", name: "📌・ИНФОРМАЦИЯ", type: 4 },
  { key: "community", name: "🌌・СООБЩЕСТВО", type: 4 },
  { key: "support", name: "🛠・ПОДДЕРЖКА", type: 4 },
  { key: "voice", name: "🎧・ГОЛОСОВЫЕ", type: 4 },
  { key: "staff", name: "🔒・СОТРУДНИКИ", type: 4, private: true },
  { key: "news", name: "📣・объявления", type: 0, parent: "start", readOnly: true, topic: "Обновления проекта Pulsar Launcher. Автор: Znikson." },
  { key: "rules", name: "📜・правила", type: 0, parent: "start", readOnly: true, topic: "Правила сообщества и безопасность." },
  { key: "downloads", name: "📦・загрузки", type: 0, parent: "start", readOnly: true, topic: "Только официальная информация о файлах релиза." },
  { key: "general", name: "💬・общий-чат", type: 0, parent: "community", topic: "Знакомства и общение участников." },
  { key: "launcher", name: "🚀・обсуждение-лаунчера", type: 0, parent: "community", topic: "Разработка и обсуждение Pulsar Launcher." },
  { key: "screenshots", name: "🖼・скриншоты", type: 0, parent: "community", topic: "Скриншоты игровых миров и сборок." },
  { key: "modpacks", name: "🧱・моды-и-миры", type: 0, parent: "community", topic: "Моды, модпаки, серверы и Minecraft-миры." },
  { key: "suggestions", name: "💡・предложения", type: 15, parent: "community", topic: "Предложи одну идею в каждой теме.", tags: ["Открыто", "Рассматривается", "Принято", "Не планируется"] },
  { key: "help", name: "🧰・помощь", type: 15, parent: "support", topic: "Опиши вопрос по шаблону в закреплённой теме.", tags: ["Открыто", "Нужны сведения", "Решено"] },
  { key: "bugs", name: "🐛・баг-репорты", type: 15, parent: "support", topic: "Одна ошибка — одна тема. Используй теги статуса.", tags: ["Открыто", "В работе", "Исправлено"] },
  { key: "devSupport", name: "💜・поддержать-разработку", type: 0, parent: "start", readOnly: true, topic: "Добровольная поддержка автора через DonationAlerts." },
  { key: "voiceGeneral", name: "🔊・Общий", type: 2, parent: "voice" },
  { key: "voiceMods", name: "🎮・С-модами", type: 2, parent: "voice" },
  { key: "voiceAfk", name: "🌙・АФК", type: 2, parent: "voice" },
  { key: "staffChat", name: "🛡・чат-команды", type: 0, parent: "staff", topic: "Закрытый чат команды Pulsar." },
  { key: "modLog", name: "🧾・лог-модерации", type: 0, parent: "staff", topic: "Закрытые заметки модерации." },
];

const textSeeds = {
  news: `## Pulsar Launcher — запуск проекта\n**Автор проекта: Znikson.**\n\nPulsar — независимый Minecraft Launcher в разработке. На сайте проекта публикуется актуальный статус: ${SITE_URL}\n\nВ планах: окно краш-репорта с подсказкой ИИ, Discord Rich Presence, импорт инстансов из других лаунчеров, автообновление и визуализатор прогресса. Эти возможности ещё не следует считать готовым релизом.\n\nGitHub: ${GITHUB_URL || "Публичный репозиторий пока не создан."}\nЗагрузки: первый установщик `.exe` и портативный `.zip` ещё не опубликованы.`,
  rules: `## Правила сообщества\n**Автор проекта: Znikson.**\n\n1. Общайтесь уважительно. Запрещены травля, угрозы, дискриминация и публикация чужих персональных данных.\n2. Не размещайте спам, фишинг, вредоносные файлы, мошеннические ссылки и пиратский контент.\n3. Пишите в подходящих каналах; не злоупотребляйте массовыми упоминаниями и не обходите модерацию.\n4. Не публикуйте токены, пароли, приватные логи и данные учётных записей. Проверяйте логи перед загрузкой.\n5. Размещайте только материалы, которые вам разрешено распространять; помечайте спойлеры и потенциально небезопасные файлы.\n6. Следуйте указаниям команды и используйте форму апелляции через личное обращение к модераторам.\n\n**Меры модерации:** просьба исправить сообщение или предупреждение; удаление публикации и тайм-аут; при повторных или серьёзных нарушениях — временное или постоянное исключение. Мера зависит от тяжести и истории нарушения.\n\nПравила распространяются на текстовые, голосовые и форумные каналы. Продолжая общение, участник соглашается соблюдать эти правила.`,
  downloads: `## Официальные файлы Pulsar Launcher\nПервый релиз ещё не опубликован. Не скачивайте файлы из неофициальных сообщений.\n\n**Установщик Windows `.exe`**\nРазмер: ещё не опубликован · Дата: ещё не опубликована · SHA-256: ещё не опубликован\nСсылка: ${RELEASES_URL || "появится после публикации первого релиза"}\n\n**Портативная версия Windows `.zip`**\nРазмер: ещё не опубликован · Дата: ещё не опубликована · SHA-256: ещё не опубликован\nСсылка: ${RELEASES_URL || "появится после публикации первого релиза"}\n\nСтатус и настоящие ссылки: ${SITE_URL}`,
  general: "Добро пожаловать в Pulsar! Представьтесь, расскажите о своих мирах и будьте доброжелательны. Не отправляйте личные данные и непроверенные файлы.",
  launcher: "Обсуждайте идеи, интерфейс и развитие лаунчера. Функции, отмеченные как планы, пока могут быть изменены и не считаются доступными.",
  screenshots: "Покажите любимый Minecraft-мир, скриншот или сборку. Соблюдайте авторские права и не прикладывайте личные данные.",
  modpacks: "Какие моды, загрузчики и сборки вы используете? Указывайте версии Minecraft и загрузчика, чтобы другим было проще повторить.",
  devSupport: `## Поддержать разработку Pulsar\nPulsar Launcher — независимый проект Znikson. Добровольная поддержка помогает автору уделять больше времени разработке.\n\n[Поддержать на DonationAlerts](${DONATE_URL})\n\nПлатёж добровольный; для использования проекта обязательных платежей нет.`,
  staffChat: "Служебный канал команды Pulsar. Не публикуйте здесь токены, личные данные пользователей или приватные логи без необходимости.",
  modLog: "Внутренние заметки модерации. Фиксируйте только необходимый контекст и соблюдайте приватность участников.",
};
const forumSeeds = {
  suggestions: {
    title: "Шаблон предложения для Pulsar",
    content: "**Идея:**\n**Какую проблему решает:**\n**Как это должно работать:**\nОдна идея — одна тема. Не добавляйте личные данные или секреты.",
  },
  help: {
    title: "Шаблон сообщения в #помощь",
    content: `**Что вы хотели сделать:**\n**Что произошло:**\n**Шаги для повтора:**\n**Версия ОС / версия лаунчера:**\n\nНе публикуйте токены и личные данные. Если Minecraft завершился с ошибкой, используйте «Спросить ИИ» в окне «Краш-репорт» после выхода этой функции в лаунчере. Сайт: ${SITE_URL}`,
  },
  bugs: {
    title: "Шаблон сообщения об ошибке",
    content: "**Версия лаунчера и ОС:**\n**Шаги для повтора:**\n**Что ожидалось:**\n**Что произошло:**\nПрикладывайте только логи без токенов, паролей и приватных путей. Укажите подходящий тег: «Открыто», «В работе» или «Исправлено».",
  },
};

async function seedTextChannel(channel, text) {
  const messages = await api("GET", `/channels/${channel.id}/messages?limit=50`);
  if (messages.length) return;
  const sent = await api("POST", `/channels/${channel.id}/messages`, {
    content: text,
    allowed_mentions: { parse: [] },
  });
  await api("PUT", `/channels/${channel.id}/pins/${sent.id}`);
  console.log(`Опубликовано и закреплено первое сообщение в #${channel.name}`);
}

async function seedForum(channel, key, created) {
  if (!created || !forumSeeds[key]) return;
  const seed = forumSeeds[key];
  const thread = await api("POST", `/channels/${channel.id}/threads`, {
    name: seed.title,
    auto_archive_duration: 10080,
    message: { content: seed.content, allowed_mentions: { parse: [] } },
  });
  try {
    const messages = await api("GET", `/channels/${thread.id}/messages?limit=1`);
    if (messages[0]?.id) await api("PUT", `/channels/${thread.id}/pins/${messages[0].id}`);
  } catch (error) {
    console.warn(`Не удалось закрепить шаблон в #${channel.name}: ${error.message}`);
  }
  console.log(`Создана стартовая тема в #${channel.name}`);
}

async function ensureGuildMetadata(guild, ids) {
  if (!guild.description) {
    const description = `Pulsar Launcher | Автор: Znikson | ${SITE_URL} | ${DONATE_URL}`;
    try {
      await api("PATCH", `/guilds/${guildId}`, { description });
      console.log("Добавлено описание сервера с автором, сайтом и ссылкой поддержки.");
    } catch (error) {
      console.warn(`Не удалось добавить описание сервера: ${error.message}`);
    }
  } else {
    console.log("Сохранено существующее описание сервера.");
  }

  const safety = {};
  if (Number(guild.verification_level ?? 0) < 2) safety.verification_level = 2;
  if (Number(guild.explicit_content_filter ?? 0) < 2) safety.explicit_content_filter = 2;
  if (guild.features?.includes("COMMUNITY")) {
    if (guild.preferred_locale !== "ru") safety.preferred_locale = "ru";
    if (guild.rules_channel_id !== ids.rules) safety.rules_channel_id = ids.rules;
    if (guild.public_updates_channel_id !== ids.news) safety.public_updates_channel_id = ids.news;
  }
  if (Object.keys(safety).length) {
    try {
      await api("PATCH", `/guilds/${guildId}`, safety);
      console.log("Включены безопасные настройки; существующие более строгие ограничения сохранены.");
    } catch (error) {
      console.warn(`Не удалось изменить часть настроек сервера: ${error.message}`);
    }
  } else {
    console.log("Безопасность сервера не ослаблена; Community-каналы согласованы, если Community включён.");
  }
}

async function ensureAutoMod(roles, modLogId) {
  try {
    const current = await api("GET", `/guilds/${guildId}/auto-moderation/rules`);
    const exemptRoles = [roles.owner, roles.developer, roles.moderator].map((role) => role.id);
    const specs = [
      {
        name: "Pulsar • фильтр спама",
        trigger_type: 3,
        trigger_metadata: {},
        actions: [
          { type: 1, metadata: { custom_message: "Сообщение остановлено фильтром спама." } },
          { type: 2, metadata: { channel_id: modLogId } },
        ],
      },
      {
        name: "Pulsar • защита от набега упоминаний",
        trigger_type: 5,
        trigger_metadata: { mention_total_limit: 5, mention_raid_protection_enabled: true },
        actions: [
          { type: 1, metadata: { custom_message: "Пожалуйста, не упоминайте большое число участников." } },
          { type: 2, metadata: { channel_id: modLogId } },
        ],
      },
    ];
    for (const spec of specs) {
      const found = current.find((rule) => rule.trigger_type === spec.trigger_type);
      if (found) {
        console.log(`Сохранено существующее AutoMod-правило: ${found.name}`);
        continue;
      }
      try {
        const created = await api("POST", `/guilds/${guildId}/auto-moderation/rules`, {
          ...spec,
          event_type: 1,
          enabled: true,
          exempt_roles: exemptRoles,
          exempt_channels: [],
        });
        current.push(created);
        console.log(`Создано AutoMod-правило: ${created.name}`);
      } catch (error) {
        console.warn(`Не удалось создать AutoMod-правило «${spec.name}»: ${error.message}`);
      }
    }
  } catch (error) {
    console.warn(`AutoMod недоступен для бота; проверьте MANAGE_GUILD: ${error.message}`);
  }
}

async function main() {
  const guild = await api("GET", `/guilds/${guildId}`);
  const bot = await api("GET", "/users/@me");
  console.log(`Настройка Pulsar в сервере: ${guild.name} (${guild.id})`);
  const roles = await ensureRoles();
  const existing = await api("GET", `/guilds/${guildId}/channels`);
  const ids = {};

  for (const spec of channelPlan.filter((item) => item.type === 4)) {
    await ensureChannel(existing, spec, roles, bot.id, ids);
  }
  for (const spec of channelPlan.filter((item) => item.type !== 4)) {
    const { channel, created } = await ensureChannel(existing, spec, roles, bot.id, ids);
    if (created && spec.type === 15) await seedForum(channel, spec.key, true);
    if (spec.type === 0 && textSeeds[spec.key]) await seedTextChannel(channel, textSeeds[spec.key]);
  }

  if (ownerId && ownerId !== guild.owner_id) {
    try {
      const member = await api("GET", `/guilds/${guildId}/members/${ownerId}`);
      if (!member.roles.includes(roles.owner.id)) {
        await api("PATCH", `/guilds/${guildId}/members/${ownerId}`, { roles: [...member.roles, roles.owner.id] });
        console.log("Роль «Владелец» выдана DISCORD_OWNER_ID.");
      }
    } catch (error) {
      console.warn(`Не удалось выдать дополнительную роль владельца: ${error.message}`);
    }
  } else if (ownerId === guild.owner_id) {
    console.log("DISCORD_OWNER_ID является владельцем сервера; при необходимости назначьте ему роль «Владелец» вручную.");
  } else {
    console.log("DISCORD_OWNER_ID не задан; роль «Владелец» создана, но не назначена.");
  }

  await ensureGuildMetadata(guild, ids);
  await ensureAutoMod(roles, ids.modLog);

  let invite;
  try {
    const oldInvites = await api("GET", `/channels/${ids.general}/invites`);
    invite = oldInvites.find((item) => item.inviter?.id === bot.id && item.max_age === 0 && item.max_uses === 0);
  } catch {
    // Creating a fresh invite below provides a clearer permission error if invite lookup is unavailable.
  }
  if (!invite) invite = await api("POST", `/channels/${ids.general}/invites`, { max_age: 0, max_uses: 0, unique: true });
  console.log(`\nПриглашение для участников: https://discord.gg/${invite.code}`);
  console.log(`Сайт: ${SITE_URL}`);
  if (GITHUB_URL) console.log(`GitHub: ${GITHUB_URL}`);
  else console.log("GitHub: публичный репозиторий ещё не создан.");
  if (BOT_INVITE_URL) console.log(`Ссылка установки бота: ${BOT_INVITE_URL}`);
  console.log("\nГотово. Существующие роли и каналы сохранены; созданы только отсутствующие элементы.");
}

main().catch((error) => {
  console.error(`Настройка остановлена: ${error.message}`);
  process.exitCode = 1;
});
