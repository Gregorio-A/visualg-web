# Lanche compartilhado

**Data:** 9 de janeiro · **Nível:** Simples

## Objetivo

Leia o preço de três itens e some os valores.

Some os preços de três itens de um lanche compartilhado.

## Como funciona

Leia os três preços separadamente, some os valores e mostre o total da compra.

## Exemplo de execução

```text
Preço 1: 5
Preço 2: 7
Preço 3: 3
Total: 15
```

Um item com preço zero não altera a soma.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0109S"
var
primeiro, segundo, terceiro, total: real
inicio
escreva("Preço 1: ")
  leia(primeiro)
  escreva("Preço 2: ")
  leia(segundo)
  escreva("Preço 3: ")
  leia(terceiro)
  total <- primeiro + segundo + terceiro
  escreval("Total: ", total)
fimalgoritmo
```

A variável `total` acumula as três entradas e é apresentada depois de todas as leituras.
