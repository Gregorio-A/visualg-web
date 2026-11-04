# Subprogramas

Subprogramas dividem o algoritmo em partes menores. No VisuAlg Web, procedimentos e funções são declarados depois da seção `var` global e antes do `inicio` do programa principal.

![Chamada de um subprograma e retorno ao programa principal](images/docs/chamada-subprograma.svg)

Esta aba cobre procedimentos, que executam comandos e não retornam valor. Para subprogramas com retorno, veja a aba `Funções`.

## Procedimento sem parâmetros

```visualg
procedimento <nome>
var
  <variaveis-locais>
inicio
  <comandos>
fimprocedimento
```

```visualg
algoritmo "ProcedimentoSimples"
var
  mensagem: caractere

procedimento mostrar
inicio
  escreval(mensagem)
fimprocedimento

inicio
  mensagem <- "Olá do procedimento"
  mostrar
fimalgoritmo
```

## Procedimento com parâmetros

Parâmetros são declarados entre parênteses. Grupos podem ser separados por ponto e vírgula, como no VisuAlg clássico.

Enquanto você digita uma chamada, a ajuda contextual do editor apresenta os parâmetros declarados e realça a posição do argumento atual. Passe o cursor sobre o nome do procedimento para ver um resumo; o link da dica abre esta seção.

```visualg
procedimento <nome>(<parametros>: <tipo>; <parametros>: <tipo>)
inicio
  <comandos>
fimprocedimento
```

```visualg
algoritmo "ProcedimentoComParametro"

procedimento saudacao(nome: caractere; idade: inteiro)
inicio
  escreval("Nome: ", nome)
  escreval("Idade: ", idade)
fimprocedimento

inicio
  saudacao("Ana", 17)
fimalgoritmo
```

## Variáveis locais

Variáveis declaradas dentro do procedimento existem somente durante a chamada.

```visualg
algoritmo "VariavelLocal"

procedimento tabuada(numero: inteiro)
var
  i: inteiro
inicio
  para i de 1 ate 5 faca
    escreval(numero, " x ", i, " = ", numero * i)
  fimpara
fimprocedimento

inicio
  tabuada(3)
fimalgoritmo
```

## Passagem por valor e por referência

Por padrão, parâmetros recebem uma cópia do valor. Use `var` no parâmetro para permitir que o procedimento altere a variável original.

```visualg
algoritmo "Referencia"
var
  resultado: inteiro

procedimento somar(a, b: inteiro; var saida: inteiro)
inicio
  saida <- a + b
fimprocedimento

inicio
  somar(4, 9, resultado)
  escreval("Resultado: ", resultado)
fimalgoritmo
```

Ao usar `var`, passe uma variável simples na chamada. Expressões como `x + 1` não podem receber alterações por referência.

## Parâmetros e argumentos

O **parâmetro** é o nome e o tipo declarados na definição (`nome: caractere`).
O **argumento** é o valor passado na chamada (`"Ana"`). A ordem importa: cada
argumento ocupa a posição do parâmetro correspondente. Se a quantidade ou o
tipo não combinar, corrija a chamada consultando a assinatura do procedimento.

No exemplo `ProcedimentoComParametro`, a saída é `Nome: Ana` e `Idade: 17`.
No exemplo `Referencia`, a saída é `Resultado: 13`, porque `saida` recebe a
soma por referência e fica disponível depois que o procedimento termina.

## Pratique

1. Crie um procedimento `mostrarDobro` que receba um inteiro e mostre o dobro.
2. Crie um procedimento que receba nome e idade e escreva uma frase completa.
3. Crie `somar(a, b, var resultado)` e use-o para calcular `12 + 30`.

Quando precisar produzir um valor dentro de uma expressão, use uma [função](#doc:funcoes).
Para entender os termos usados nesta página, consulte o [glossário](#doc:glossario).
