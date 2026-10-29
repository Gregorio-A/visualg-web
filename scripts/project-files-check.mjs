import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { ProjectFiles } from '../electron/project-files.mjs';

const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'visualg-project-'));
const root = path.join(temporary, 'algoritmos');
const outside = path.join(temporary, 'fora.alg');
const project = new ProjectFiles();

try {
  await fs.mkdir(root);
  await fs.writeFile(outside, 'segredo');
  await fs.mkdir(path.join(root, 'aulas'));
  await fs.writeFile(path.join(root, 'aulas', 'media.alg'), 'algoritmo "Media"\n');
  await fs.writeFile(path.join(root, 'notas.md'), 'arquivo externo');
  assert.deepEqual(await project.open(root), { name: 'algoritmos' });
  assert.deepEqual((await project.list('')).entries.map((entry) => entry.name), ['aulas', 'notas.md']);
  const initial = await project.read('aulas/media.alg');
  assert.equal(initial.content, 'algoritmo "Media"\n');
  const saved = await project.write('aulas/media.alg', 'algoritmo "Novo"\n', initial.revision);
  assert.equal((await project.read('aulas/media.alg')).content, 'algoritmo "Novo"\n');
  await assert.rejects(() => project.write('aulas/media.alg', 'perdido', initial.revision), /mudou no disco/);
  assert.equal((await project.read('aulas/media.alg')).revision, saved.revision);

  const created = await project.createFile('aulas', 'teste.alg');
  await project.write(created.path, 'algoritmo "Teste"', created.revision);
  await assert.rejects(() => project.createFile('aulas', 'teste.alg'), { code: 'EEXIST' });
  await assert.rejects(() => project.createFile('aulas', 'script.js'), /\.alg ou \.txt/);
  await project.createDirectory('aulas', 'turma');
  await assert.rejects(() => project.remove('aulas'), (error) => ['ENOTEMPTY', 'EEXIST'].includes(error.code));
  await project.remove('aulas/turma');
  assert.deepEqual(await project.rename('aulas/teste.alg', 'exercicio.alg'), { path: 'aulas/exercicio.alg' });
  assert.equal((await project.read('aulas/exercicio.alg')).content, 'algoritmo "Teste"');
  await project.remove('aulas/exercicio.alg');

  await assert.rejects(() => project.list('../'), /inválido/);
  await assert.rejects(() => project.read('../fora.alg'), /inválido/);
  await assert.rejects(() => project.createFile('', 'CON.alg'), /Nome inválido/);
  await assert.rejects(() => project.rename('aulas/media.alg', 'notas.md'), /\.alg ou \.txt/);
  await assert.rejects(() => project.read('notas.md'), /\.alg ou \.txt/);
  await fs.writeFile(path.join(root, 'binario.alg'), Buffer.from([0, 1, 2]));
  await assert.rejects(() => project.read('binario.alg'), /binário/);
  try {
    await fs.symlink(outside, path.join(root, 'atalho.alg'), 'file');
    assert.equal((await project.list('')).entries.some((entry) => entry.name === 'atalho.alg'), false);
    await assert.rejects(() => project.read('atalho.alg'), /Links simbólicos/);
  } catch (error) {
    if (!['EPERM', 'EACCES'].includes(error.code)) throw error;
    console.log('Aviso: o sistema não permitiu criar um link simbólico para este teste.');
  }
  assert.equal(await fs.readFile(outside, 'utf8'), 'segredo');
  project.close();
  await assert.rejects(() => project.list(''), /Abra uma pasta/);
  console.log('OK: abrir pasta, navegar, editar, conflito, criação, renomeação, exclusão e bloqueios de caminho.');
} finally {
  await fs.rm(temporary, { recursive: true, force: true });
}
