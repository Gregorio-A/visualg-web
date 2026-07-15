module.exports = [
  {
    name: 'saida escreva e escreval',
    expected: 'AB\nC',
    source: `
algoritmo "saida"
inicio
  escreva("A")
  escreval("B")
  escreval("C")
fimalgoritmo
`,
  },
  {
    name: 'precedencia aritmetica',
    expected: '14\n20',
    source: `
algoritmo "aritmetica"
var
  x, y: inteiro
inicio
  x <- 2 + 3 * 4
  y <- (2 + 3) * 4
  escreval(x)
  escreval(y)
fimalgoritmo
`,
  },
  {
    name: 'condicional simples',
    expected: 'Aprovado',
    source: `
algoritmo "condicional"
var
  media: real
inicio
  media <- 6.5
  se media >= 6 entao
    escreval("Aprovado")
  senao
    escreval("Reprovado")
  fimse
fimalgoritmo
`,
  },
  {
    name: 'laco para soma',
    expected: '15',
    source: `
algoritmo "soma"
var
  i, soma: inteiro
inicio
  soma <- 0
  para i de 1 ate 5 faca
    soma <- soma + i
  fimpara
  escreval(soma)
fimalgoritmo
`,
  },
  {
    name: 'laco enquanto',
    expected: '4',
    source: `
algoritmo "enquanto"
var
  i: inteiro
inicio
  i <- 1
  enquanto i < 4 faca
    i <- i + 1
  fimenquanto
  escreval(i)
fimalgoritmo
`,
  },
  {
    name: 'procedimento por referencia',
    expected: '10',
    source: `
algoritmo "referencia"
var
  numero: inteiro

procedimento dobrar(var valor: inteiro)
inicio
  valor <- valor * 2
fimprocedimento

inicio
  numero <- 5
  dobrar(numero)
  escreval(numero)
fimalgoritmo
`,
  },
  {
    name: 'funcao com retorno',
    expected: '49',
    source: `
algoritmo "funcao"
var
  resultado: inteiro

funcao quadrado(valor: inteiro): inteiro
inicio
  retorne valor * valor
fimfuncao

inicio
  resultado <- quadrado(7)
  escreval(resultado)
fimalgoritmo
`,
  },
  {
    name: 'vetor soma',
    expected: '12',
    source: `
algoritmo "vetor"
var
  valores: vetor [1..3] de inteiro
inicio
  valores[1] <- 3
  valores[2] <- 4
  valores[3] <- 5
  escreval(valores[1] + valores[2] + valores[3])
fimalgoritmo
`,
  },
  {
    name: 'entrada leia',
    inputs: ['Ana', '17'],
    expected: 'Ana\n17\nNome: Ana\nIdade: 17',
    source: `
algoritmo "entrada"
var
  nome: caractere
  idade: inteiro
inicio
  leia nome
  leia idade
  escreval("Nome: ", nome)
  escreval("Idade: ", idade)
fimalgoritmo
`,
  },
  {
    name: 'texto e logico',
    expected: 'VisuAlg\nVERDADEIRO',
    source: `
algoritmo "texto_logico"
var
  nome: caractere
  ok: logico
inicio
  nome <- "Visu" + "Alg"
  ok <- verdadeiro xou falso
  escreval(nome)
  escreval(ok)
fimalgoritmo
`,
  },
  {
    name: 'formatacao real',
    expected: '7.36',
    source: `
algoritmo "formatacao"
var
  media: real
inicio
  media <- 7.356
  escreval(media:1:2)
fimalgoritmo
`,
  },
  {
    name: 'funcoes nativas',
    expected: '5\n5\n4',
    source: `
algoritmo "nativas"
inicio
  escreval(raizq(25))
  escreval(compr("teste"))
  escreval(int(4.8))
fimalgoritmo
`,
  },
  {
    name: 'senao se em uma linha',
    expected: 'dois',
    source: `
algoritmo "senao_se"
var
  x: inteiro
inicio
  x <- 2
  se x = 1 entao
    escreval("um")
  senao se x = 2 entao
    escreval("dois")
  fimse
fimalgoritmo
`,
  },
  {
    name: 'funcao sem parametros sem parenteses',
    expected: '42',
    source: `
algoritmo "funcao_sem_parenteses"
var
  valor: inteiro

funcao resposta: inteiro
inicio
  retorne 42
fimfuncao

inicio
  valor <- resposta
  escreval(valor)
fimalgoritmo
`,
  },
  {
    name: 'pi constante',
    expected: '3.14',
    source: `
algoritmo "pi_constante"
inicio
  escreval(pi:1:2)
fimalgoritmo
`,
  },
  {
    name: 'comandos de entrada e saida sem parenteses',
    inputs: ['21'],
    expected: 'Valor: 21\n21\nIdade: 21',
    source: `
algoritmo "sem_parenteses"
var
  idade: inteiro
inicio
  escreva "Valor: ", 21
  escreval
  leia idade
  escreval("Idade: ", idade)
fimalgoritmo
`,
  },
  {
    name: 'potencia associativa a direita',
    expected: '512',
    source: `
algoritmo "potencia"
inicio
  escreval(2 ^ 3 ^ 2)
fimalgoritmo
`,
  },
  {
    name: 'pos sem diferenciar maiusculas',
    expected: '5',
    source: `
algoritmo "pos"
inicio
  escreval(pos("alg", "VisuAlg"))
fimalgoritmo
`,
  },
];
