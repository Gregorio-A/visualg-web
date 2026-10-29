import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { TextDecoder } from 'node:util';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_DIRECTORY_ENTRIES = 5000;
const EDITABLE_EXTENSION = /\.(alg|txt)$/i;
const INVALID_NAME = /[<>:"/\\|?*]/;
const RESERVED_NAME = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
const hasControl = (value) => Array.from(value).some((character) => character.charCodeAt(0) < 32);

function segments(relative = '') {
  if (typeof relative !== 'string' || relative.includes('\\') || relative.startsWith('/') || relative.length > 4096) {
    throw new Error('Caminho do projeto inválido');
  }
  if (!relative) return [];
  const parts = relative.split('/');
  if (parts.some((part) => !part || part === '.' || part === '..' || INVALID_NAME.test(part) || hasControl(part) ||
      RESERVED_NAME.test(part) || /[. ]$/.test(part))) {
    throw new Error('Caminho do projeto inválido');
  }
  return parts;
}

function validName(name, file = false) {
  if (typeof name !== 'string' || !name || name === '.' || name === '..' ||
      name.length > 255 || INVALID_NAME.test(name) || hasControl(name) || RESERVED_NAME.test(name) || /[. ]$/.test(name)) {
    throw new Error('Nome inválido');
  }
  if (file && !EDITABLE_EXTENSION.test(name)) throw new Error('Use arquivos .alg ou .txt');
  return name;
}

function revision(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export class ProjectFiles {
  constructor() {
    this.root = null;
  }

  async open(directory) {
    const root = await fs.realpath(directory);
    if (!(await fs.stat(root)).isDirectory()) throw new Error('Selecione uma pasta');
    this.root = root;
    return { name: path.basename(root) || root };
  }

  close() {
    this.root = null;
  }

  info() {
    return this.root ? { name: path.basename(this.root) || this.root } : null;
  }

  async resolve(relative, kind) {
    if (!this.root) throw new Error('Abra uma pasta primeiro');
    const parts = segments(relative);
    let current = this.root;
    for (const part of parts) {
      current = path.join(current, part);
      const stat = await fs.lstat(current);
      if (stat.isSymbolicLink()) throw new Error('Links simbólicos não são permitidos no projeto');
      const real = await fs.realpath(current);
      const inside = path.relative(this.root, real);
      if (inside === '..' || inside.startsWith('..' + path.sep) || path.isAbsolute(inside)) {
        throw new Error('Caminho fora da pasta aberta');
      }
    }
    const stat = await fs.stat(current);
    if (kind === 'directory' && !stat.isDirectory()) throw new Error('Não é uma pasta');
    if (kind === 'file' && !stat.isFile()) throw new Error('Não é um arquivo regular');
    return current;
  }

  async list(relative = '') {
    const directory = await this.resolve(relative, 'directory');
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const visible = entries.filter((entry) => !entry.isSymbolicLink() && (entry.isDirectory() || entry.isFile()));
    visible.sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) ||
      a.name.localeCompare(b.name, 'pt-BR', { numeric: true, sensitivity: 'base' }));
    return {
      entries: visible.slice(0, MAX_DIRECTORY_ENTRIES).map((entry) => ({
        name: entry.name,
        path: relative ? relative + '/' + entry.name : entry.name,
        directory: entry.isDirectory(),
        editable: entry.isFile() && EDITABLE_EXTENSION.test(entry.name),
      })),
      truncated: visible.length > MAX_DIRECTORY_ENTRIES,
    };
  }

  async read(relative) {
    if (!EDITABLE_EXTENSION.test(relative)) throw new Error('Abra arquivos .alg ou .txt');
    const file = await this.resolve(relative, 'file');
    const stat = await fs.stat(file);
    if (stat.size > MAX_FILE_BYTES) throw new Error('Arquivo grande demais (limite de 5 MB)');
    const bytes = await fs.readFile(file);
    if (bytes.length > MAX_FILE_BYTES) throw new Error('Arquivo grande demais (limite de 5 MB)');
    const content = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    if (content.includes('\0')) throw new Error('Arquivo binário não pode ser aberto como código');
    return { content, revision: revision(bytes) };
  }

  async write(relative, content, expectedRevision) {
    if (typeof content !== 'string' || Buffer.byteLength(content, 'utf8') > MAX_FILE_BYTES) {
      throw new Error('Código grande demais (limite de 5 MB)');
    }
    if (typeof expectedRevision !== 'string' || !/^[a-f0-9]{64}$/.test(expectedRevision)) {
      throw new Error('Revisão do arquivo inválida');
    }
    const file = await this.resolve(relative, 'file');
    const previous = await fs.readFile(file);
    if (revision(previous) !== expectedRevision) throw new Error('O arquivo mudou no disco. Reabra-o antes de sobrescrever. Seu código continua no editor.');
    const temporary = path.join(path.dirname(file), '.visualg-' + randomUUID() + '.tmp');
    try {
      await fs.writeFile(temporary, content, { flag: 'wx', mode: 0o600 });
      await this.resolve(relative, 'file');
      await fs.rename(temporary, file);
    } finally {
      await fs.rm(temporary, { force: true });
    }
    return { revision: revision(Buffer.from(content, 'utf8')) };
  }

  async createFile(parent, name) {
    validName(name, true);
    const directory = await this.resolve(parent, 'directory');
    const file = path.join(directory, name);
    await fs.writeFile(file, '', { flag: 'wx', mode: 0o600 });
    const relative = parent ? parent + '/' + name : name;
    return { path: relative, revision: revision(Buffer.alloc(0)) };
  }

  async createDirectory(parent, name) {
    validName(name);
    const directory = await this.resolve(parent, 'directory');
    await fs.mkdir(path.join(directory, name));
    return { path: parent ? parent + '/' + name : name };
  }

  async rename(relative, name) {
    const parts = segments(relative);
    if (!parts.length) throw new Error('A pasta principal não pode ser renomeada aqui');
    const oldPath = await this.resolve(relative);
    const stat = await fs.stat(oldPath);
    validName(name, stat.isFile());
    const parent = parts.slice(0, -1).join('/');
    const directory = await this.resolve(parent, 'directory');
    const destination = path.join(directory, name);
    try {
      await fs.lstat(destination);
      throw new Error('Já existe um item com esse nome');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    await fs.rename(oldPath, destination);
    return { path: parent ? parent + '/' + name : name };
  }

  async remove(relative) {
    if (!segments(relative).length) throw new Error('A pasta principal não pode ser excluída aqui');
    const target = await this.resolve(relative);
    const stat = await fs.stat(target);
    if (stat.isDirectory()) await fs.rmdir(target);
    else if (stat.isFile()) await fs.unlink(target);
    else throw new Error('Tipo de arquivo não permitido');
  }
}
