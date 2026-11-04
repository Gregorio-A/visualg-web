# Material escolar

**Data:** 2 de março · **Nível:** Simples

## Objetivo

Some os preços de caderno, lápis e borracha.

## Como funciona

Leia três preços na mesma moeda e some-os para obter o custo do material.

## Exemplo de execução

```text
Caderno: 10; lápis: 2; borracha: 3
Total: 15
```

Um item de preço zero não altera a soma.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0302S"
var
caderno, lapis, borracha, total: real
inicio
escreva("Preço do caderno: ")
  leia(caderno)
  escreva("Preço do lápis: ")
  leia(lapis)
  escreva("Preço da borracha: ")
  leia(borracha)
  total <- caderno + lapis + borracha
  escreval("Total: ", total)
fimalgoritmo
```

A variável `total` conserva a soma dos três itens.
