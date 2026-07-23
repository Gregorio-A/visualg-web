# Subprogramas

Subprogramas dividem o algoritmo em partes menores. No VisuAlg Web, procedimentos e funções são declarados depois da seção `var` global e antes do `inicio` do programa principal.

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
