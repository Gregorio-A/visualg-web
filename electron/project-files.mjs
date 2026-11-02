import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { TextDecoder, promisify } from 'node:util';
import { execFile } from 'node:child_process';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_DIRECTORY_ENTRIES = 5000;
const MAX_SEARCH_BYTES = 100 * 1024 * 1024;
const EDITABLE_EXTENSION = /\.(alg|txt)$/i;
const INVALID_NAME = /[<>:"/\\|?*]/;
const RESERVED_NAME = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
const hasControl = (value) => Array.from(value).some((character) => character.charCodeAt(0) < 32);
const execFileAsync = promisify(execFile);

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

  async gitSnapshot() {
    if (!this.root) throw new Error('Abra uma pasta primeiro');
    const options = { cwd: this.root, windowsHide: true, timeout: 5000, maxBuffer: 2 * 1024 * 1024, encoding: 'utf8', env: { ...process.env, GIT_OPTIONAL_LOCKS: '0', GIT_TERMINAL_PROMPT: '0', GIT_PAGER: 'cat' } };
    try {
      const status = await execFileAsync('git', ['status', '--short', '--branch', '--untracked-files=all'], options);
      const [unstaged, staged, history] = await Promise.all([
        execFileAsync('git', ['diff', '--no-ext-diff', '--no-textconv', '--no-color', '--unified=3', '--'], options),
        execFileAsync('git', ['diff', '--cached', '--no-ext-diff', '--no-textconv', '--no-color', '--unified=3', '--'], options),
        execFileAsync('git', ['log', '-8', '--date=iso-strict', '--pretty=format:%h%x09%ad%x09%s'], options)
          .catch((error) => { if (error.code === 128) return { stdout: '' }; throw error; }),
      ]);
      return { available: true, status: status.stdout, unstaged: unstaged.stdout, staged: staged.stdout, history: history.stdout };
    } catch (error) {
      if (error.code === 'ENOENT') return { available: false, message: 'Git não está instalado ou não está disponível no PATH.' };
      if (error.code === 128 && /not a git repository/i.test(error.stderr || '')) return { available: false, message: 'A pasta aberta não é um repositório Git.' };
      if (error.killed || error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') return { available: false, message: 'A consulta ao Git excedeu o limite de tempo ou de saída.' };
      throw new Error('Não foi possível consultar o Git: ' + (error.stderr || error.message).trim());
    }
  }

  async gitCommitDiff(revisionId) {
    if (!this.root) throw new Error('Abra uma pasta primeiro');
    if (typeof revisionId !== 'string' || !/^[a-f0-9]{4,40}$/i.test(revisionId)) throw new Error('Identificador de commit inválido');
    try {
      const result = await execFileAsync('git', ['show', '--no-ext-diff', '--no-textconv', '--no-color', '--format=fuller', '--stat', '--patch', revisionId, '--'], {
        cwd: this.root, windowsHide: true, timeout: 5000, maxBuffer: 2 * 1024 * 1024, encoding: 'utf8', env: { ...process.env, GIT_OPTIONAL_LOCKS: '0', GIT_TERMINAL_PROMPT: '0', GIT_PAGER: 'cat' },
      });
      return { available: true, output: result.stdout };
    } catch (error) {
      if (error.code === 'ENOENT') return { available: false, message: 'Git não está instalado ou não está disponível no PATH.' };
      if (error.killed || error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') return { available: false, message: 'A consulta ao Git excedeu o limite de tempo ou de saída.' };
      throw new Error('Não foi possível consultar esse commit: ' + (error.stderr || error.message).trim());
    }
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

  async search(query) {
    if (!this.root) throw new Error('Abra uma pasta primeiro');
    if (typeof query !== 'string' || query.trim().length < 2 || query.length > 256) return { results: [], truncated: false };
    const needle = query.trim().toLocaleLowerCase('pt-BR');
    const results = [];
    let scanned = 0;
    let visitedEntries = 0;
    let scannedBytes = 0;
    let truncated = false;
    const visit = async (relative) => {
      if (truncated) return;
      const directory = await this.resolve(relative, 'directory');
      const entries = await fs.readdir(directory, { withFileTypes: true });
      for (const entry of entries) {
        if (++visitedEntries > MAX_DIRECTORY_ENTRIES) { truncated = true; return; }
        if (entry.isSymbolicLink()) continue;
        const child = relative ? relative + '/' + entry.name : entry.name;
        if (entry.isDirectory()) { await visit(child); if (truncated) return; continue; }
        if (!entry.isFile() || !EDITABLE_EXTENSION.test(entry.name)) continue;
        if (++scanned > MAX_DIRECTORY_ENTRIES) { truncated = true; return; }
        try {
          const file = await this.resolve(child, 'file');
          const stat = await fs.stat(file);
          if (stat.size > MAX_FILE_BYTES) continue;
          if (scannedBytes + stat.size > MAX_SEARCH_BYTES) { truncated = true; return; }
          scannedBytes += stat.size;
          const text = new TextDecoder('utf-8', { fatal: true }).decode(await fs.readFile(file));
          if (text.includes('\0')) continue;
          const lines = text.split(/\r?\n/);
          for (let index = 0; index < lines.length; index++) {
            if (!lines[index].toLocaleLowerCase('pt-BR').includes(needle)) continue;
            results.push({ path: child, line: index + 1, text: lines[index].slice(0, 240) });
            if (results.length >= 200) { truncated = true; return; }
          }
        } catch { /* Ignore unreadable or concurrently removed files. */ }
      }
    };
    await visit('');
    return { results, truncated };
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

  async move(relative, parent = '') {
    const parts = segments(relative);
    if (!parts.length) throw new Error('A pasta principal não pode ser movida aqui');
    const source = await this.resolve(relative, 'file');
    const destinationDirectory = await this.resolve(parent, 'directory');
    const name = parts[parts.length - 1];
    const destination = path.join(destinationDirectory, name);
    if (source === destination) return { path: relative };
    try {
      await fs.lstat(destination);
      throw new Error('Já existe um item com esse nome na pasta de destino');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    await fs.rename(source, destination);
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
