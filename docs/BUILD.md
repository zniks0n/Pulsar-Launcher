# Build and run / Сборка и запуск

## Requirements

- Node.js 22 or newer.
- pnpm 11.25.0 (pinned in `package.json`).
- No third-party runtime packages; the website and Discord setup helper use platform and Node.js built-ins.

## Website development

```sh
pnpm run dev
```

The server binds to `0.0.0.0:3000` by default and respects the `PORT` environment variable. Open `http://localhost:3000`.

## Static website build

```sh
pnpm run build
```

The static output is written to `dist/`, including `index.html`, JavaScript, CSS, the SVG mark, route manifest, `robots.txt`, and `sitemap.xml`. The build only copies project-owned source files and installs no packages.

## Checks

```sh
pnpm run check
```

The check command runs Node syntax checks for the client, local server, static build, and Discord server-setup script. The landing page has no server-side account, database or external API requirement.

## Optional Discord setup

Follow `discord/README.md`. The bot token is provided locally via environment variables and must never be committed or placed in browser code.
