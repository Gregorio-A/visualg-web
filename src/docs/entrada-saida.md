# Entrada e Saída

Use `escreva` e `escreval` para mostrar valores no console. Use `leia` para receber dados digitados pelo usuário no campo de entrada do console.

## Saída com escreva

```visualg
escreva(<lista-de-expressoes>)
escreval(<lista-de-expressoes>)
```

`escreva` mantém o cursor na mesma linha. `escreval` imprime e pula uma linha.

```visualg
algoritmo "Saida"
inicio
  escreva("Visu")
  escreval("Alg")
  escreval("Nova linha")
fimalgoritmo
```

## Formatação

Valores podem receber largura mínima e, no caso de reais, número de casas decimais.

| Forma | Resultado |
| --- | --- |
| `x:5` | Exibe `x` alinhado à direita em 5 espaços. |
| `y:6:2` | Exibe `y` em 6 espaços com 2 casas decimais. |

```visualg
algoritmo "Formatacao"
var
  media: real
  faltas: inteiro
inicio
  media <- 7.356
  faltas <- 2
  escreval("Média: ", media:6:2)
  escreval("Faltas: ", faltas:3)
fimalgoritmo
```

## Entrada com leia

```visualg
leia(<lista-de-variaveis>)
```

`leia` atribui os valores digitados às variáveis na ordem informada. No VisuAlg Web, escreva uma mensagem antes de `leia` quando quiser orientar o usuário.

```visualg
algoritmo "Entrada"
var
  nome: caractere
  idade: inteiro
inicio
  escreva("Digite seu nome: ")
  leia(nome)

  escreva("Digite sua idade: ")
  leia(idade)

  escreval("Olá, ", nome, ". Você tem ", idade, " anos.")
fimalgoritmo
```

## Conversão dos valores digitados

| Tipo da variável | Conversão no Web |
| --- | --- |
| `inteiro` | Aceita somente números inteiros, como `10` ou `-3`. Entrada inválida gera erro. |
| `real` | Aceita números com ponto ou vírgula decimal, como `3.14` ou `3,14`. Entrada inválida gera erro. |
| `caractere` | Mantém o texto digitado. |
| `logico` | Aceita `verdadeiro`/`v` ou `falso`/`f`. Outros valores geram erro. |

```visualg
algoritmo "EntradaLogica"
var
  confirmado: logico
inicio
  escreva("Confirmado? ")
  leia(confirmado)
  escreval("Valor lógico: ", confirmado)
fimalgoritmo
```
