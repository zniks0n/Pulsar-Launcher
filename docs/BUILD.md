# Build and run / Сборка и запуск

## Requirements

- Node.js 22 or newer.
- pnpm 11.25.0 (pinned in `package.json`); no third-party dependencies are required.

## Development

```sh
pnpm run dev
```

The server binds to `0.0.0.0:3000` by default and respects the `PORT` environment variable. Open `http://localhost:3000`.

## Static build

```sh
pnpm run build
```

The generated static files are written to `dist/`. The build copies the source HTML, CSS, JavaScript, SVG mark and `/manus-routes.json` without downloading packages.

## Checks

```sh
pnpm run check
```

This runs Node's syntax checks for the JavaScript entry points. The landing page has no server-side account, database or external API requirement.
