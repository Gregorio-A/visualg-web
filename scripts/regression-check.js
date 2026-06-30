const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

global.window = {};
global.localStorage = {
  getItem() {
    return null;
  },
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

  async readInput() {
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
  const tokens = new window.VisuAlgLexer(source).tokenize();
  return new window.VisuAlgParser(tokens).parse();
}

async function executeSource(source, inputs) {
  const ast = parseSource(source);
  const terminal = new TestTerminal(inputs || inferInputs(source));
  const executor = new window.VisuAlgExecutor(terminal, variablesPanel);
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
  const leiaRe = /\bleia\s*\(([^)]*)\)/gim;
  while ((match = leiaRe.exec(source)) !== null) {
    match[1].split(',').forEach((target) => {
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

async function expectOk(name, source, expected, inputs) {
  let output;
  try {
    output = await executeSource(source, inputs);
  } catch (error) {
    throw new Error(`${name}: ${error.message}`);
  }
  if (expected !== undefined && output.trimEnd() !== expected) {
    throw new Error(`${name}: saida esperada "${expected}", recebeu "${output.trimEnd()}"`);
  }
}

async function expectError(name, source, pattern, inputs) {
  try {
    await executeSource(source, inputs || []);
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

async function run() {
  const vectorPreview = window.VariablesPanel.formatValue(
    { '2': 5 },
    'vetor de inteiro',
    {
      type: 'vetor de inteiro',
      dataType: 'inteiro',
      dimensions: [{ low: 1, high: 2 }],
      value: { '2': 5 },
    },
  );
  if (!/\[1\.\.2\]/.test(vectorPreview) || !/1: 0/.test(vectorPreview) || !/2: 5/.test(vectorPreview)) {
    throw new Error('painel de variaveis nao formatou vetor de forma inspecionavel');
  }

  const docExamples = extractDocExamples();
  for (const example of docExamples) {
    await expectOk(`docs ${example.name}`, example.source);
  }

  await expectOk('recursao de funcao', `
algoritmo "rec"
funcao fatorial(valor: inteiro): inteiro
inicio
  se valor <= 1 entao
    retorne 1
  senao
    retorne valor * fatorial(valor - 1)
  fimse
fimfuncao
inicio
  escreval(fatorial(5))
fimalgoritmo
`, '120');

  await expectOk('vetor dentro do intervalo', `
algoritmo "vetor"
var
  v: vetor [1..2] de inteiro
inicio
  v[1] <- 4
  v[2] <- 6
  escreval(v[1] + v[2])
fimalgoritmo
`, '10');

  await expectOk('repita fimrepita com interrompa', `
algoritmo "repita"
var
  i: inteiro
inicio
  i <- 0
  repita
    i <- i + 1
    se i = 3 entao
      interrompa
    fimse
  fimrepita
  escreval(i)
fimalgoritmo
`, '3');

  await expectOk('leia real com virgula', `
algoritmo "entrada"
var
  x: real
inicio
  leia(x)
  escreval(x:1:2)
fimalgoritmo
`, '3.14', ['3,14']);

  await expectError('caractere desconhecido', `
algoritmo "t"
var
  x: inteiro
inicio
  x @ <- 1
fimalgoritmo
`, /Caractere invalido/);

  await expectError('comando nao suportado', `
algoritmo "t"
inicio
  pausa
fimalgoritmo
`, /pausa/);

  await expectError('interrompa fora de laco', `
algoritmo "t"
inicio
  interrompa
fimalgoritmo
`, /interrompa/);

  await expectError('retorne fora de funcao', `
algoritmo "t"
inicio
  retorne 1
fimalgoritmo
`, /retorne/);

  await expectError('atribuicao de tipo invalido', `
algoritmo "t"
var
  x: inteiro
inicio
  x <- "abc"
fimalgoritmo
`, /Nao e possivel atribuir caractere a inteiro/);

  await expectError('divisao por zero', `
algoritmo "t"
var
  x: real
inicio
  x <- 1 / 0
fimalgoritmo
`, /Divisao por zero/);

  await expectError('indice fora do vetor', `
algoritmo "t"
var
  v: vetor [1..2] de inteiro
inicio
  v[99] <- 7
fimalgoritmo
`, /fora dos limites/);

  await expectError('argumento faltante', `
algoritmo "t"
procedimento p(x: inteiro)
inicio
  escreval(x)
fimprocedimento
inicio
  p()
fimalgoritmo
`, /espera 1 argumento/);

  await expectError('argumento extra', `
algoritmo "t"
procedimento p(x: inteiro)
inicio
  escreval(x)
fimprocedimento
inicio
  p(1, 2)
fimalgoritmo
`, /espera 1 argumento/);

  await expectError('referencia exige variavel', `
algoritmo "t"
procedimento p(var x: inteiro)
inicio
  x <- 1
fimprocedimento
inicio
  p(1)
fimalgoritmo
`, /referencia/);

  await expectError('leia inteiro invalido', `
algoritmo "t"
var
  x: inteiro
inicio
  leia(x)
fimalgoritmo
`, /Entrada invalida para inteiro/, ['abc']);

  console.log(`OK: ${docExamples.length} exemplos da documentacao e regressao P0 executados.`);
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
