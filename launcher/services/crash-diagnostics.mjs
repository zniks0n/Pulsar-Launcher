const RULES = [
  {
    id: "java-version",
    pattern: /UnsupportedClassVersionError|class file version .* (?:only recognizes|is newer)|requires Java \d+|Unsupported major\.minor version/i,
    en: ["Java version mismatch", "The installed Java runtime may not match this Minecraft or mod version. Check the required Java version in the game version metadata, then select a compatible Java runtime in Pulsar Settings."],
    ru: ["Несовпадение версии Java", "Установленная Java может не подходить этой версии Minecraft или модов. Проверьте требуемую версию Java и выберите подходящую среду в настройках Pulsar."],
  },
  {
    id: "memory",
    pattern: /OutOfMemoryError|Java heap space|GC overhead limit exceeded|Native memory allocation \(malloc\) failed/i,
    en: ["Memory allocation failed", "Minecraft or a mod ran out of heap/native memory. Close other applications and review the instance's minimum/maximum memory settings. Raising the limit helps only when the computer has enough free RAM."],
    ru: ["Не хватило памяти", "Minecraft или мод исчерпал память. Закройте лишние приложения и проверьте настройки выделения памяти сборки. Увеличивайте лимит только если на компьютере достаточно свободной RAM."],
  },
  {
    id: "mod-conflict",
    pattern: /ModResolutionException|Incompatible mods found|mod resolution encountered an incompatible mod|requires .* but only .* is present|Mod .* requires .* version/i,
    en: ["Mod compatibility issue", "The log indicates incompatible or missing mod requirements. Check that every mod targets this exact Minecraft version and loader; temporarily disable the most recently added mods to isolate a conflict."],
    ru: ["Проблема совместимости модов", "В логе указаны несовместимые или отсутствующие зависимости. Проверьте точную версию Minecraft и загрузчика для каждого мода; временно отключите недавно добавленные моды, чтобы найти конфликт."],
  },
  {
    id: "missing-class",
    pattern: /NoClassDefFoundError|ClassNotFoundException|Could not find or load main class/i,
    en: ["A required class or library is missing", "A library/mod dependency may be absent or corrupted. Reinstall the game files for this instance and verify the dependencies of recently added mods. Imported loader installations may need to be repaired in their original launcher."],
    ru: ["Не найдена обязательная библиотека", "Возможно, отсутствует или повреждена библиотека/зависимость мода. Переустановите файлы Minecraft для сборки и проверьте зависимости недавно добавленных модов. Импортированную сборку загрузчика иногда нужно восстановить исходным лаунчером."],
  },
  {
    id: "graphics",
    pattern: /GLFW error|GLFWError|Failed to create (?:OpenGL|window)|OpenGL context|No suitable driver|Could not initialize class org\.lwjgl/i,
    en: ["Graphics driver or OpenGL issue", "Minecraft could not initialize its graphics context. Update the graphics driver from the GPU manufacturer's website, check that Minecraft is using the intended GPU, and remove unsupported graphics overrides."],
    ru: ["Ошибка графического драйвера или OpenGL", "Minecraft не смог создать графический контекст. Обновите драйвер с сайта производителя видеокарты, проверьте выбранную видеокарту и уберите неподдерживаемые графические параметры."],
  },
  {
    id: "auth",
    pattern: /Invalid session|Failed to verify username|Authentication servers are down|Invalid access token/i,
    en: ["Authentication was rejected", "The selected profile or third-party account session is not valid for this server. Sign in again with the account provider or use an offline-mode server only with an offline profile."],
    ru: ["Сервер отклонил авторизацию", "Сеанс выбранного аккаунта недействителен для этого сервера. Войдите снова через провайдера аккаунта; оффлайн-профиль подходит только для серверов, разрешающих offline-mode."],
  },
  {
    id: "network",
    pattern: /UnknownHostException|ConnectException|Connection timed out|Read timed out|network is unreachable/i,
    en: ["Network connection failed", "The game could not reach a server. Check the connection, firewall and DNS, then retry. This finding may refer to a game server rather than a Minecraft download."],
    ru: ["Сетевая ошибка", "Игра не смогла подключиться к серверу. Проверьте сеть, брандмауэр и DNS. Ошибка может относиться к игровому серверу, а не к загрузке Minecraft."],
  },
];

export function diagnoseCrash(log, exitCode, language = "en") {
  const text = String(log || "").slice(-250_000);
  const locale = language === "ru" ? 1 : 0;
  for (const rule of RULES) {
    const match = text.match(rule.pattern);
    if (match) return { id: rule.id, title: rule[locale === 1 ? "ru" : "en"][0], detail: rule[locale === 1 ? "ru" : "en"][1], evidence: match[0].slice(0, 180) };
  }
  if (Number(exitCode) === 0) {
    return language === "ru"
      ? { id: "normal-exit", title: "Игра завершилась без ошибки", detail: "Код выхода 0 обычно означает штатное закрытие Minecraft.", evidence: "exit code 0" }
      : { id: "normal-exit", title: "Minecraft closed normally", detail: "Exit code 0 usually means that Minecraft shut down normally.", evidence: "exit code 0" };
  }
  return language === "ru"
    ? { id: "unknown", title: "Причину пока не удалось определить", detail: "Это локальная эвристика, а не точный диагноз. Проверьте последние строки crash report/latest.log, совместимость модов и версию Java. Исходный отчёт никуда не отправлялся.", evidence: "no known signature matched" }
    : { id: "unknown", title: "No common cause identified yet", detail: "This is a local heuristic, not a definitive diagnosis. Review the end of crash-report/latest.log, mod compatibility and the Java version. The report has not been sent anywhere.", evidence: "no known signature matched" };
}
