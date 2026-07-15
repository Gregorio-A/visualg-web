# Entrada e Saída

Use `escreva` e `escreval` para mostrar valores no console. Use `leia` para receber dados digitados pelo usuário no campo de entrada do console.

## Saída com escreva

```visualg
escreva(<lista-de-expressoes>)
escreval(<lista-de-expressoes>)
escreva <lista-de-expressoes>
escreval <lista-de-expressoes>
```

`escreva` mantém o cursor na mesma linha. `escreval` imprime e pula uma linha. As formas sem parênteses são aceitas para aproximar o Web dos materiais clássicos do VisuAlg.

```visualg
algoritmo "Saida"
inicio
  escreva "Visu"
  escreval "Alg"
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
leia <lista-de-variaveis>
```

`leia` atribui os valores digitados às variáveis na ordem informada. Como no VisuAlg, o próprio algoritmo deve usar `escreva` quando quiser mostrar uma orientação antes da leitura. A entrada aceita o campo inline ou a janela modal configurada na IDE.

```visualg
algoritmo "Entrada"
var
  nome: caractere
  idade: inteiro
inicio
  escreva("Digite seu nome: ")
  leia nome

  escreva("Digite sua idade: ")
  leia idade

  escreval("Olá, ", nome, ". Você tem ", idade, " anos.")
fimalgoritmo
```

## Conversão dos valores digitados

| Tipo da variável | Conversão no Web |
| --- | --- |
| `inteiro` | Aceita somente números inteiros, como `10` ou `-3`. |
| `real` | Aceita números com ponto ou vírgula decimal, como `3.14` ou `3,14`. |
| `caractere` | Mantém o texto digitado. |
| `logico` | Aceita `verdadeiro`/`v` ou `falso`/`f`. |

Uma entrada inválida mostra uma mensagem didática e a leitura é repetida até chegar um valor compatível. No modo modal, cancelar a entrada interrompe o programa de forma controlada. Por padrão, o valor lido aparece no console; use `eco off` para ocultá-lo e `eco on` para reativá-lo.

```visualg
algoritmo "EntradaLogica"
var
  confirmado: logico
inicio
  escreva("Confirmado? ")
  leia confirmado
  escreval("Valor lógico: ", confirmado)
fimalgoritmo
```
