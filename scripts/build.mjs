import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');
const hashAsset = (sourceName) => {
  const content = readFileSync(resolve(root, sourceName));
  const digest = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const outputName = `${basename(sourceName, extname(sourceName))}.${digest}${extname(sourceName)}`;
  writeFileSync(resolve(output, outputName), content);
  return outputName;
};

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

const stylesAsset = hashAsset('styles.css');
const scriptAsset = hashAsset('app.js');
let html = readFileSync(resolve(root, 'index.html'), 'utf8');
for (const [source, versioned] of [
  ['/styles.css', `/${stylesAsset}`],
  ['/app.js', `/${scriptAsset}`],
]) {
  const occurrences = html.split(source).length - 1;
  if (occurrences !== 1) {
    throw new Error(`Expected exactly one ${source} reference in index.html; found ${occurrences}`);
  }
  html = html.replace(source, versioned);
}
writeFileSync(resolve(output, 'index.html'), html);

const staticFiles = ['pulsar-mark.svg', 'manus-routes.json', 'robots.txt', 'sitemap.xml'];
for (const file of staticFiles) cpSync(resolve(root, file), resolve(output, file));
console.log(`Built 7 static files into ${output} with content-hashed assets: ${stylesAsset}, ${scriptAsset}`);
