const {
  executeSource,
  expectOk,
  expectError,
} = require('./visualg-test-harness');

async function run() {
  await expectOk('funcoes internas do VisuAlg', `
algoritmo "funcoes"
var
  convertido: inteiro
inicio
  convertido <- caracpnum("12")
  escreval(abs(-7))
  escreval(quad(3))
  escreval(raizq(9))
  escreval(exp(2, 3))
  escreval(log(100))
  escreval(logn(1))
  escreval(sen(0))
  escreval(cos(0))
  escreval(tan(0))
  escreval(cotan(grauprad(45)):1:2)
  escreval(arcsen(0))
  escreval(arccos(1))
  escreval(arctan(0))
  escreval(grauprad(180):1:2)
  escreval(radpgrau(pi):1:0)
  escreval(int(-1.8))
  escreval(pi():1:2)
  escreval(rand():1:2)
  escreval(randi(10))
  escreval(compr("Brasil"))
  escreval(copia("Visualg", 2, 3))
  escreval(maiusc("Brasil"))
  escreval(minusc("BRASIL"))
  escreval(asc("A"))
  escreval(carac(65))
  escreval(pos("alg", "VisuAlg"))
  escreval(convertido)
  escreval(numpcarac(12.5))
fimalgoritmo
`, [
    '7', '9', '3', '8', '2', '0', '0', '1', '0', '1.00', '0', '0', '0',
    '3.14', '180', '-1', '3.14', '0.25', '2', '6', 'isu', 'BRASIL', 'brasil',
    '65', 'A', '5', '12', '12.5',
  ].join('\n'), [], { random: () => 0.25 });

  await expectOk('curto-circuito e comparacoes encadeadas', `
algoritmo "expressoes"
inicio
  escreval(falso e (1 / 0 > 0))
  escreval(verdadeiro ou (1 / 0 > 0))
  escreval(1 < 2 <= 3)
  escreval(1 < 3 < 2)
fimalgoritmo
`, 'FALSO\nVERDADEIRO\nVERDADEIRO\nFALSO');

  await expectOk('retorne preserva fluxo do VisuAlg', `
algoritmo "retorno"
funcao valor: inteiro
inicio
  retorne 1
  retorne 2
fimfuncao
inicio
  escreval(valor())
fimalgoritmo
`, '2');

  await expectOk('aspas em strings', String.raw`
algoritmo "strings"
inicio
  escreval("Ele disse ""oi"".")
  escreval("A\"B")
fimalgoritmo
`, 'Ele disse "oi".\nA"B');

  await expectOk('aliases acentuados e historicos', `
algoritmo "aliases"
declare
  numero: numerico;
  texto: literal
função identidade(valor: caracter): caráter
inicio
  retorne valor
fimfuncao
inicio
  numero <- 1.5
  texto <- identidade("ok")
  escreval(numero:1:1)
  escreval(texto)
  escreval(rand >= 0 e rand < 1)
  escreval(identidade("ok"))
fimalgoritmo
`, '1.5\nok\nVERDADEIRO\nok', [], { random: () => 0.5 });

  await expectOk('comparacoes de texto ignoram caixa', `
algoritmo "texto_sem_caixa"
inicio
  escreval("a" = "A")
  escreval("a" < "B")
  escreval("Z" > "y")
fimalgoritmo
`, 'VERDADEIRO\nVERDADEIRO\nVERDADEIRO');

  await expectError('concatenacao nao mistura tipos', `
algoritmo "concat_invalida"
inicio
  escreval("numero" + 1)
fimalgoritmo
`, /Concatenacao com \+ exige dois valores do tipo caractere/);

  await expectOk('comando aleatorio', `
algoritmo "aleatorio"
aleatorio 10, 20
eco off
var
  numero: inteiro
  decimal: real
  texto: caractere
inicio
  leia(numero, decimal, texto)
  escreval(numero)
  escreval(decimal)
  escreval(texto)
  aleatorio off
  leia(numero)
  escreval(numero)
fimalgoritmo
`, '15\n15\nNNNNN\n7', ['7'], { random: () => 0.5 });

  await expectOk('leia repete entrada invalida', `
algoritmo "leia"
eco off
var
  numero: inteiro
inicio
  leia(numero)
  escreval(numero)
fimalgoritmo
`, 'Entrada invalida para inteiro: "abc". Tente novamente.\n42', ['abc', '42']);

  await expectOk('pausa e debug condicional', `
algoritmo "pausas"
inicio
  debug falso
  pausa
  debug verdadeiro
  escreval("continuou")
fimalgoritmo
`, 'continuou', ['', '']);

  const delays = [];
  await expectOk('timer persistente', `
algoritmo "timer"
inicio
  timer 25
  escreval("A")
  timer off
  escreval("B")
fimalgoritmo
`, 'A\nB', [], {
    sleep(milliseconds) {
      delays.push(milliseconds);
      return Promise.resolve();
    },
  });
  if (delays.join(',') !== '25,25') {
    throw new Error(`timer persistente: atrasos esperados "25,25", recebeu "${delays.join(',')}"`);
  }

  const clockValues = [1000, 2345];
  await expectOk('cronometro', `
algoritmo "cronometro"
inicio
  cronometro on
  cronometro off
fimalgoritmo
`, 'Cronômetro iniciado.\nCronômetro terminado. Tempo decorrido: 1 segundo(s) e 345 ms', [], {
    now: () => clockValues.shift(),
  });

  await expectOk('eco de entrada', `
algoritmo "eco"
var
  numero: inteiro
inicio
  eco off
  leia(numero)
  eco on
  leia(numero)
  escreval(numero)
fimalgoritmo
`, '8\n8', ['7', '8']);

  const dataStore = new Map();
  const dataFiles = {
    async read(filename) {
      return dataStore.has(filename) ? dataStore.get(filename).slice() : null;
    },
    async append(filename, value) {
      const values = dataStore.get(filename) || [];
      values.push(String(value));
      dataStore.set(filename, values);
    },
  };
  const fileProgram = `
algoritmo "arquivo"
arquivo "turma/dados.txt"
eco off
var
  numero: inteiro
inicio
  leia(numero)
  escreval(numero)
fimalgoritmo
`;
  await expectOk('arquivo grava primeira entrada', fileProgram, '31', ['31'], { dataFiles });
  await expectOk('arquivo reutiliza entrada gravada', fileProgram, '31', [], { dataFiles });

  await expectError('arquivo fora das declaracoes', `
algoritmo "arquivo_invalido"
inicio
  arquivo "dados.txt"
fimalgoritmo
`, /secao de declaracoes/);

  await expectError('debug exige expressao logica', `
algoritmo "debug_invalido"
inicio
  debug 1
fimalgoritmo
`, /condicao do debug deve ser do tipo logico/);

  await expectError('comparacao encadeada com tipos invalidos', `
algoritmo "comparacao_invalida"
inicio
  escreval(1 < "dois" < 3)
fimalgoritmo
`, /Nao e possivel comparar inteiro com caractere/);

  console.log('OK: compatibilidade legada, funcoes internas e semantica avancada verificadas.');
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
