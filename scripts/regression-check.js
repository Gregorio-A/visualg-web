const {
  ensureRuntimeLoaded,
  expectOk,
  expectError,
  extractDocExamples,
} = require('./visualg-test-harness');

async function run() {
  ensureRuntimeLoaded();

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
`, 'Leia x (real): 3.14', ['3,14']);

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

  await expectError('funcao com parametro sem chamada', `
algoritmo "t"
var
  x: inteiro

funcao dobro(valor: inteiro): inteiro
inicio
  retorne valor * 2
fimfuncao

inicio
  x <- dobro
fimalgoritmo
`, /precisa ser chamada com parenteses/);

  await expectError('comentario em bloco sem fechamento', `
algoritmo "t"
inicio
  { comentario aberto
  escreval("x")
fimalgoritmo
`, /Comentario de bloco.*nao foi fechado/);

  await expectError('string sem fechamento', `
algoritmo "t"
inicio
  escreval("texto aberto)
fimalgoritmo
`, /String nao foi fechada/);

  console.log(`OK: ${docExamples.length} exemplos da documentacao e regressao P0 executados.`);
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
