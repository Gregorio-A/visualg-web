const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

function ensureRuntimeLoaded() {
  if (global.window && window.VisuAlgLexer && window.VisuAlgParser && window.VisuAlgExecutor) {
    return;
  }

  global.window = {};
  global.localStorage = {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {},
  };
  global.document = {
    getElementById() {
      return {
        classList: {
          add() {},
          remove() {},
        },
        onclick: null,
      };
    },
  };

  vm.runInThisContext(
    fs.readFileSync(path.join(root, 'src/js/interpreter.js'), 'utf8'),
    { filename: 'src/js/interpreter.js' },
  );
  vm.runInThisContext(
    fs.readFileSync(path.join(root, 'src/js/variables.js'), 'utf8'),
    { filename: 'src/js/variables.js' },
  );
}

class TestTerminal {
  constructor(inputs) {
    this.inputs = inputs || [];
    this.output = '';
    this.inputArea = { classList: { add() {}, remove() {} } };
  }

  write(text) {
    this.output += String(text);
  }

  writeln(text) {
    this.output += String(text || '') + '\n';
  }

  clear() {
    this.output = '';
  }

  async readInput(prompt) {
    if (prompt) {
      this.write(prompt);
    }
    if (this.inputs.length === 0) {
      throw new Error('Entrada de teste nao configurada');
    }
    return this.inputs.shift();
  }
}

const variablesPanel = {
  update() {},
  clear() {},
};

function parseSource(source) {
  ensureRuntimeLoaded();
  const tokens = new window.VisuAlgLexer(source).tokenize();
  return new window.VisuAlgParser(tokens).parse();
}

async function executeSource(source, inputs, options) {
  ensureRuntimeLoaded();
  const ast = parseSource(source);
  const terminal = new TestTerminal(inputs || inferInputs(source));
  const executor = new window.VisuAlgExecutor(terminal, variablesPanel, options);
  await executor.run(ast);
  return terminal.output;
}

function inferInputs(source) {
  const types = new Map();
  const declRe = /^\s*([A-Za-z_][A-Za-z0-9_, \t]*)\s*:\s*(?:vetor\s*\[[^\]]+\]\s*de\s*)?(inteiro|real|caractere|logico)\b/gim;
  let match;
  while ((match = declRe.exec(source)) !== null) {
    match[1].split(',').forEach((rawName) => {
      const name = rawName.trim().toLowerCase();
      if (name) types.set(name, match[2].toLowerCase());
    });
  }

  const inputs = [];
  const lines = source.split(/\r?\n/);
  for (const line of lines) {
    const cleanLine = line.replace(/\/\/.*$/, '');
    const leiaMatch = /\bleia\s*(?:\(([^)]*)\)|(.+))$/i.exec(cleanLine.trim());
    if (!leiaMatch) continue;
    const targets = leiaMatch[1] || leiaMatch[2] || '';
    targets.split(',').forEach((target) => {
      const name = target.trim().replace(/\[.*$/, '').toLowerCase();
      const type = types.get(name);
      if (type === 'inteiro') inputs.push('1');
      else if (type === 'real') inputs.push('1.5');
      else if (type === 'logico') inputs.push('verdadeiro');
      else inputs.push('teste');
    });
  }
  return inputs;
}

async function expectOk(name, source, expected, inputs, options) {
  let output;
  try {
    output = await executeSource(source, inputs, options);
  } catch (error) {
    throw new Error(`${name}: ${error.message}`);
  }
  if (expected !== undefined && output.trimEnd() !== expected) {
    throw new Error(`${name}: saida esperada "${expected}", recebeu "${output.trimEnd()}"`);
  }
}

async function expectError(name, source, pattern, inputs, options) {
  try {
    await executeSource(source, inputs || [], options);
  } catch (error) {
    if (!pattern.test(error.message)) {
      throw new Error(`${name}: erro inesperado "${error.message}"`);
    }
    return;
  }
  throw new Error(`${name}: esperava erro ${pattern}`);
}

function extractDocExamples() {
  const docsDir = path.join(root, 'src/docs');
  const examples = [];
  for (const file of fs.readdirSync(docsDir)) {
    if (!file.endsWith('.md')) continue;
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const blockRe = /```visualg\n([\s\S]*?)```/g;
    let match;
    let index = 0;
    while ((match = blockRe.exec(content)) !== null) {
      index += 1;
      const source = match[1].trim();
      if (/^algoritmo\b/i.test(source)) {
        examples.push({ name: `${file}#${index}`, source });
      }
    }
  }
  return examples;
}

module.exports = {
  root,
  ensureRuntimeLoaded,
  parseSource,
  executeSource,
  expectOk,
  expectError,
  extractDocExamples,
  variablesPanel,
  TestTerminal,
};
