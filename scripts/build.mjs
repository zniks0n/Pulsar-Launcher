import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');
const files = ['index.html', 'styles.css', 'app.js', 'pulsar-mark.svg', 'manus-routes.json', 'robots.txt', 'sitemap.xml'];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of files) cpSync(resolve(root, file), resolve(output, file));
console.log(`Built ${files.length} static files into ${output}`);
