const { expectOk, expectError } = require('./visualg-test-harness');

async function run() {
  let count = 0;
  const ok = async (name, source, expected, inputs = [], options = {}) => {
    await expectOk(name, source, expected, inputs, options);
    count += 1;
  };
  const error = async (name, source, pattern) => {
    await expectError(name, source, pattern);
    count += 1;
  };

  await ok('loop para passo negativo', [
    'algoritmo "passo_negativo"', 'var', 'i, soma: inteiro', 'inicio',
    'soma <- 0', 'para i de 5 ate 1 passo -2 faca',
    '  soma <- soma + i', 'fimpara', 'escreval(soma)', 'fimalgoritmo',
  ].join('\n'), '9');

  await ok('repita ate e interrupma', [
    'algoritmo "repita"', 'var', 'n: inteiro', 'inicio', 'n <- 0',
    'repita', '  n <- n + 1', 'ate n = 3', 'escreval(n)',
    'repita', '  n <- n + 1', '  se n = 5 entao', '    interrompa',
    '  fimse', 'fimrepita', 'escreval(n)', 'fimalgoritmo',
  ].join('\n'), '3\n5');

  await ok('matriz bidimensional com limites variados', [
    'algoritmo "matriz"', 'var', 'm: vetor [-1..0, 2..3] de inteiro',
    'inicio', 'm[-1,2] <- 10', 'm[-1,3] <- 20', 'm[0,2] <- 30',
    'm[0,3] <- 40', 'escreval(m[-1,2] + m[-1,3] + m[0,2] + m[0,3])',
    'fimalgoritmo',
  ].join('\n'), '100');

  await ok('escolha valores multiplos e padrao', [
    'algoritmo "escolha"', 'inicio', 'escolha 4',
    'caso 1, 3, 5', '  escreval("impar")',
    'caso 2, 4, 6', '  escreval("par")',
    'outrocaso', '  escreval("fora")',
    'fimescolha', 'fimalgoritmo',
  ].join('\n'), 'par');

  await ok('parametros por valor e referencia e variavel local', [
    'algoritmo "parametros"', 'var', 'x, y: inteiro',
    'procedimento altera(a: inteiro; var b: inteiro)',
    'var temporario: inteiro', 'inicio', 'temporario <- a + 1',
    'a <- temporario', 'b <- temporario', 'fimprocedimento', 'inicio',
    'x <- 2', 'y <- 10', 'altera(x, y)', 'escreval(x)', 'escreval(y)',
    'fimalgoritmo',
  ].join('\n'), '2\n3');

  await ok('funcao com variavel local e chamada sem parenteses', [
    'algoritmo "funcao_local"', 'funcao resposta: inteiro',
    'var local: inteiro', 'inicio', 'local <- 42', 'retorne local',
    'fimfuncao', 'inicio', 'escreval(resposta)', 'fimalgoritmo',
  ].join('\n'), '42');

  await ok('condicionais aninhadas com senao se', [
    'algoritmo "se"', 'var', 'n: inteiro', 'inicio', 'n <- 2',
    'se n > 0 entao', '  se n = 2 entao', '    escreval("dois")',
    '  senao', '    escreval("positivo")', '  fimse',
    'senao se n = 0 entao', '  escreval("zero")',
    'senao', '  escreval("negativo")', 'fimse', 'fimalgoritmo',
  ].join('\n'), 'dois');

  await ok('tipos de entrada com eco desligado', [
    'algoritmo "entradas"', 'eco off', 'var', 'n: inteiro',
    'r: real', 'c: caractere', 'l: logico', 'inicio',
    'leia(n, r, c, l)', 'escreval(n)', 'escreval(r:1:1)',
    'escreval(c)', 'escreval(l)', 'fimalgoritmo',
  ].join('\n'), '7\n2.5\nZ\nVERDADEIRO', ['7', '2.5', 'Z', 'verdadeiro']);

  await ok('formatacao de saida e escreval vazio', [
    'algoritmo "formatacao"', 'inicio', 'escreva("X")',
    'escreva(7:3)', 'escreval', 'escreval(3.14159:1:2)',
    'fimalgoritmo',
  ].join('\n'), 'X  7\n3.14');

  await ok('sintaxe alternativa com aliases e acentos', [
    'algoritmo "aliases"', 'declare', 'valor: numérico;',
    'texto: literal', 'função ecoar(dado: caráter): caráter',
    'inicio', 'retorne dado', 'fimfunção', 'inicio',
    'valor <- 1.25', 'texto <- ecoar("ok")',
    'escreval(valor:1:2)', 'escreval(texto)', 'fimalgoritmo',
  ].join('\n'), '1.25\nok');

  await ok('operador nao e comparacao encadeada', [
    'algoritmo "logica"', 'inicio', 'escreval(nao falso)',
    'escreval(1 < 2 <= 3)', 'escreval(1 < 3 < 2)', 'fimalgoritmo',
  ].join('\n'), 'VERDADEIRO\nVERDADEIRO\nFALSO');

  await ok('erro de entrada numerica e nova tentativa', [
    'algoritmo "entrada_invalida"', 'eco off', 'var',
    'n: inteiro', 'inicio', 'leia(n)', 'escreval(n)', 'fimalgoritmo',
  ].join('\n'), 'Entrada invalida para inteiro: "abc". Tente novamente.\n42', ['abc', '42']);

  await error('indice de vetor fora dos limites', [
    'algoritmo "vetor_limite"', 'var', 'v: vetor [1..2] de inteiro',
    'inicio', 'v[3] <- 1', 'fimalgoritmo',
  ].join('\n'), /fora dos limites/i);

  await error('atribuicao de tipo incompatível', [
    'algoritmo "tipo_invalido"', 'var', 'valor: inteiro',
    'inicio', 'valor <- "texto"', 'fimalgoritmo',
  ].join('\n'), /atribuir caractere a inteiro/i);

  await error('funcao com quantidade errada de argumentos', [
    'algoritmo "args"', 'funcao soma(a, b: inteiro): inteiro',
    'inicio', 'retorne a + b', 'fimfuncao', 'inicio',
    'escreval(soma(1))', 'fimalgoritmo',
  ].join('\n'), /argumento|parametro/i);

  await error('retorne fora de funcao', [
    'algoritmo "retorne"', 'inicio', 'retorne 1', 'fimalgoritmo',
  ].join('\n'), /retorne.*funcao/i);

  console.log('OK: ' + count + ' casos adicionais de sintaxe e semantica do VisuAlg.');
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
