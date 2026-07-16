import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { appendDataFile, readDataFile, resolveDataFile } from '../electron/data-files.mjs';

const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'visualg-security-'));
const root = path.join(temporary, 'data');
const outside = path.join(temporary, 'outside');

try {
  await appendDataFile(root, 'turma/dados.txt', 'primeiro');
  await appendDataFile(root, 'turma/dados.txt', 'segundo');
  assert.deepEqual(await readDataFile(root, 'turma/dados.txt'), ['primeiro', 'segundo']);
  assert.equal(await readDataFile(root, 'inexistente.txt'), null);

  assert.throws(() => resolveDataFile(root, '../fora.txt'), /deve ficar dentro/);
  assert.throws(() => resolveDataFile(root, path.resolve(temporary, 'absoluto.txt')), /deve ficar dentro/);
  assert.throws(() => resolveDataFile(root, ''), /invalido/);
  assert.throws(() => resolveDataFile(root, 'nome\0.txt'), /invalido/);

  await fs.mkdir(outside);
  await fs.writeFile(path.join(outside, 'segredo.txt'), 'nao tocar\n');
  await fs.symlink(outside, path.join(root, 'atalho'), 'dir');
  await assert.rejects(() => readDataFile(root, 'atalho/segredo.txt'), /links simbolicos/);
  await assert.rejects(() => appendDataFile(root, 'atalho/segredo.txt', 'ataque'), /links simbolicos/);
  assert.equal(await fs.readFile(path.join(outside, 'segredo.txt'), 'utf8'), 'nao tocar\n');

  await fs.symlink(path.join(outside, 'segredo.txt'), path.join(root, 'link-final.txt'), 'file');
  await assert.rejects(() => readDataFile(root, 'link-final.txt'), /link simbolico/);
  await assert.rejects(() => appendDataFile(root, 'link-final.txt', 'ataque'), /link simbolico/);

  const mainSource = await fs.readFile(new URL('../electron/main.js', import.meta.url), 'utf8');
  for (const required of ['contextIsolation: true', 'nodeIntegration: false', 'sandbox: true', 'webSecurity: true',
    'setWindowOpenHandler', "on('will-navigate'", 'assertTrustedIpcSender', 'Content-Security-Policy']) {
    assert.ok(mainSource.includes(required), `electron/main.js deve conter: ${required}`);
  }

  const preloadSource = await fs.readFile(new URL('../electron/preload.js', import.meta.url), 'utf8');
  const channels = [...preloadSource.matchAll(/ipcRenderer\.invoke\('([^']+)'/g)].map((match) => match[1]);
  assert.deepEqual(channels.sort(), ['visualg-data-file:append', 'visualg-data-file:read']);

  const rendererSource = await fs.readFile(new URL('../src/index.html', import.meta.url), 'utf8');
  assert.match(rendererSource, /Content-Security-Policy[^>]+script-src 'self'/);
  const inlineScripts = [...rendererSource.matchAll(/<script(?![^>]+src=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .filter((match) => match[1].trim() !== '');
  assert.equal(inlineScripts.length, 0, 'A CSP nao permite JavaScript inline');
  console.log('OK: CSP, isolamento Electron, IPC, caminhos e links simbolicos verificados.');
} finally {
  await fs.rm(temporary, { recursive: true, force: true });
}
