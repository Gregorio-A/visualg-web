# Ranking por pontos

**Data:** 27 de agosto · **Nível:** Simples

## Objetivo

Compare três pontuações e exiba a maior.

## Como funciona

Compare três pontuações e mostre o valor máximo.

## Exemplo de execução

```text
7, 12, 9 → 12
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empates mostram o mesmo máximo.

## Dicas para resolução

1. Comece com a primeira.
2. Compare as outras duas.
3. Mostre maior.

## Solução

```visualg
algoritmo "Desafio0827S"
var
a, b, c, maior: inteiro
inicio
escreva("Três pontuações: ")
  leia(a, b, c)
  maior <- a
  se b > maior entao
    maior <- b
  fimse
  se c > maior entao
    maior <- c
  fimse
  escreval("Maior pontuação: ", maior)
fimalgoritmo
```

A variável maior é atualizada quando aparece um valor superior.
