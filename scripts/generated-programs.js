// Casos determinísticos para exercitar o interpretador em combinações variadas.
const programs = [];

function add(name, body, expected, inputs = []) {
  programs.push({
    name,
    expected: String(expected),
    inputs,
    source: `algoritmo "${name.replace(/"/g, '')}"\n${body}\nfimalgoritmo\n`,
  });
}

function main(statements, declarations = '') {
  return `${declarations ? `var\n${declarations}\n` : ''}inicio\n${statements}\n`;
}

// Aritmética inteira, incluindo precedência, divisão inteira, resto e potência.
for (let i = 1; i <= 10; i += 1) {
  add(`soma ${i}`, main(`escreval(${i} + ${i + 3})`), 2 * i + 3);
  add(`subtracao ${i}`, main(`escreval(${i + 10} - ${i})`), 10);
  add(`multiplicacao ${i}`, main(`escreval(${i} * 3)`), i * 3);
  add(`precedencia ${i}`, main(`escreval(${i} + 2 * 3)`), i + 6);
}
for (let i = 1; i <= 5; i += 1) {
  add(`divisao inteira ${i}`, main(`escreval(${i * 12} div ${i + 1})`), Math.trunc((i * 12) / (i + 1)));
  add(`resto ${i}`, main(`escreval(${i * 7} mod ${i + 2})`), (i * 7) % (i + 2));
  add(`potencia ${i}`, main(`escreval(${i} ^ 2)`), i ** 2);
  add(`negativos ${i}`, main(`escreval(-${i} + ${i * 2})`), i);
}

const comparisons = [
  ['=', (a, b) => a === b], ['<>', (a, b) => a !== b],
  ['<', (a, b) => a < b], ['>', (a, b) => a > b],
  ['<=', (a, b) => a <= b], ['>=', (a, b) => a >= b],
];
for (let i = 1; i <= 4; i += 1) {
  for (const [operator, check] of comparisons) {
    const a = i;
    const b = i + (i % 2 === 0 ? 0 : 1);
    const expected = check(a, b) ? 'sim' : 'nao';
    const statements = `se ${a} ${operator} ${b} entao\n  escreval("sim")\nsenao\n  escreval("nao")\nfimse`;
    add(`comparacao ${operator} ${i}`, main(statements), expected);
  }
}

const logical = [
  ['e verdadeiro', 'verdadeiro e verdadeiro', 'VERDADEIRO'],
  ['e falso', 'verdadeiro e falso', 'FALSO'],
  ['e falso invertido', 'falso e verdadeiro', 'FALSO'],
  ['e ambos falsos', 'falso e falso', 'FALSO'],
  ['ou ambos verdadeiros', 'verdadeiro ou verdadeiro', 'VERDADEIRO'],
  ['ou verdadeiro', 'verdadeiro ou falso', 'VERDADEIRO'],
  ['ou verdadeiro invertido', 'falso ou verdadeiro', 'VERDADEIRO'],
  ['ou ambos falsos', 'falso ou falso', 'FALSO'],
  ['xou diferentes', 'verdadeiro xou falso', 'VERDADEIRO'],
  ['xou iguais', 'verdadeiro xou verdadeiro', 'FALSO'],
];
for (let i = 0; i < 3; i += 1) {
  for (const [label, expression, expected] of logical) {
    add(`logico ${label} ${i}`, main(`escreval(${expression})`), expected);
  }
}

for (let i = 1; i <= 10; i += 1) {
  const end = i + 2;
  const sum = (end * (end + 1) / 2) - ((i - 1) * i / 2);
  add(`laco para crescente ${i}`, main(`soma <- 0\npara contador de ${i} ate ${end} faca\n  soma <- soma + contador\nfimpara\nescreval(soma)`, `contador, soma: inteiro`), sum);
  add(`laco enquanto ${i}`, main(`contador <- 0\nenquanto contador < ${i} faca\n  contador <- contador + 1\nfimenquanto\nescreval(contador)`, 'contador: inteiro'), i);
}

for (let i = 1; i <= 10; i += 1) {
  add(`vetor ${i}`, main(`valores[1] <- ${i}\nvalores[2] <- ${i + 1}\nvalores[3] <- ${i + 2}\nescreval(valores[1] + valores[2] + valores[3])`, 'valores: vetor [1..3] de inteiro'), 3 * i + 3);
}

for (let i = 1; i <= 20; i += 1) {
  const funcDecl = `valor: inteiro\n\nfuncao dobro(numero: inteiro): inteiro\ninicio\n  retorne numero * 2\nfimfuncao`;
  add(`funcao dobro ${i}`, `var\n${funcDecl}\ninicio\n  valor <- dobro(${i})\n  escreval(valor)\n`, 2 * i);
  const procDecl = `valor: inteiro\n\nprocedimento somar(var numero: inteiro)\ninicio\n  numero <- numero + 5\nfimprocedimento`;
  add(`procedimento referencia ${i}`, `var\n${procDecl}\ninicio\n  valor <- ${i}\n  somar(valor)\n  escreval(valor)\n`, i + 5);
}

for (let i = 1; i <= 8; i += 1) {
  const text = `teste${i}`;
  add(`comprimento texto ${i}`, main(`escreval(compr("${text}"))`), text.length);
  add(`entrada inteira ${i}`, main(`leia valor\nescreval(valor + ${i})`, 'valor: inteiro'), `1\n${i + 1}`, ['1']);
}

if (programs.length !== 200) {
  throw new Error(`A suíte deve conter 200 programas; foram gerados ${programs.length}.`);
}

module.exports = programs;
