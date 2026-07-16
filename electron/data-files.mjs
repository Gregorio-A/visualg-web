import fs from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import path from 'node:path';

const MAX_FILENAME_LENGTH = 1024;
const MAX_VALUE_LENGTH = 1024 * 1024;
const noFollow = fsConstants.O_NOFOLLOW || 0;

function invalidPath(message) {
  const error = new Error(message);
  error.code = 'VISUALG_INVALID_DATA_PATH';
  return error;
}

export function resolveDataFile(root, filename) {
  if (typeof filename !== 'string' || filename.trim() === '') {
    throw invalidPath('Nome de arquivo de dados invalido');
  }
  if (filename.length > MAX_FILENAME_LENGTH || filename.includes('\0')) {
    throw invalidPath('Nome de arquivo de dados invalido');
  }

  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, filename);
  if (resolved === resolvedRoot || !resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw invalidPath('O arquivo de dados deve ficar dentro da pasta de dados do VisuAlg Web');
  }
  return { root: resolvedRoot, resolved };
}

async function lstatOrNull(target) {
  try {
    return await fs.lstat(target);
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  }
}

async function ensureSafeDirectory(root, target, create) {
  let rootStat = await lstatOrNull(root);
  if (!rootStat) {
    if (!create) return false;
    await fs.mkdir(root, { recursive: true, mode: 0o700 });
    rootStat = await fs.lstat(root);
  }
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) {
    throw invalidPath('A pasta de dados nao pode ser um link simbolico');
  }

  const relative = path.relative(root, target);
  let current = root;
  for (const part of relative ? relative.split(path.sep) : []) {
    current = path.join(current, part);
    let stat = await lstatOrNull(current);
    if (!stat && create) {
      await fs.mkdir(current, { mode: 0o700 });
      stat = await fs.lstat(current);
    }
    if (!stat) return false;
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw invalidPath('Subpastas de dados nao podem ser links simbolicos');
    }
  }
  return true;
}

async function openRegularFile(target, flags, mode) {
  const existing = await lstatOrNull(target);
  if (existing && (existing.isSymbolicLink() || !existing.isFile())) {
    throw invalidPath('O arquivo de dados deve ser um arquivo regular, nunca um link simbolico');
  }

  const handle = await fs.open(target, flags | noFollow, mode);
  const openedStat = await handle.stat();
  if (!openedStat.isFile()) {
    await handle.close();
    throw invalidPath('O arquivo de dados deve ser um arquivo regular');
  }
  return handle;
}

export async function readDataFile(root, filename) {
  const paths = resolveDataFile(root, filename);
  if (!await ensureSafeDirectory(paths.root, path.dirname(paths.resolved), false)) return null;

  let handle;
  try {
    handle = await openRegularFile(paths.resolved, fsConstants.O_RDONLY, 0o600);
    const content = await handle.readFile('utf8');
    const values = content.split(/\r?\n/);
    if (values.length > 0 && values[values.length - 1] === '') values.pop();
    return values;
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  } finally {
    if (handle) await handle.close();
  }
}

export async function appendDataFile(root, filename, value) {
  if (typeof value === 'symbol' || String(value).length > MAX_VALUE_LENGTH) {
    throw new Error('Valor grande demais para o arquivo de dados');
  }
  const paths = resolveDataFile(root, filename);
  await ensureSafeDirectory(paths.root, path.dirname(paths.resolved), true);

  let handle;
  try {
    handle = await openRegularFile(
      paths.resolved,
      fsConstants.O_APPEND | fsConstants.O_CREAT | fsConstants.O_WRONLY,
      0o600,
    );
    await handle.writeFile(`${String(value)}\n`, 'utf8');
  } finally {
    if (handle) await handle.close();
  }
}
