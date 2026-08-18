/* ============================================================
   Copia o app (PWA) para www/, que é a pasta que o Capacitor
   empacota dentro do APK. Sem dependências externas.
   ============================================================ */

import { cp, rm, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const RAIZ = resolve(import.meta.dirname, '..');
const DESTINO = join(RAIZ, 'www');

const INCLUIR = [
  'index.html',
  'manifest.webmanifest',
  'sw.js',
  'styles',
  'src',
  'assets',
];

async function main() {
  if (existsSync(DESTINO)) await rm(DESTINO, { recursive: true, force: true });
  await mkdir(DESTINO, { recursive: true });

  for (const item of INCLUIR) {
    const origem = join(RAIZ, item);
    if (!existsSync(origem)) {
      console.warn(`aviso: ${item} não encontrado, ignorando`);
      continue;
    }
    const info = await stat(origem);
    await cp(origem, join(DESTINO, item), { recursive: info.isDirectory() });
    console.log('copiado', item);
  }

  const arquivos = await contar(DESTINO);
  console.log(`\nwww/ pronto com ${arquivos} arquivos.`);
}

async function contar(dir) {
  let n = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += await contar(join(dir, e.name));
    else n += 1;
  }
  return n;
}

main().catch((e) => { console.error(e); process.exit(1); });
