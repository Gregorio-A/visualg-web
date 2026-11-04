# Sorteio de números

**Data:** 14 de dezembro · **Nível:** Simples

## Objetivo

Leia três números e exiba-os em ordem crescente.

## Como funciona

Aceite também números repetidos e negativos.

## Exemplo de execução

```text
7, 2, 5 → 2, 5, 7
```

**Como ler o exemplo:** a seta → significa "resulta em".

7, 7, 2 → 2, 7, 7.

## Dicas para resolução

1. Compare o primeiro par.
2. Compare o segundo par.
3. Revise o primeiro par após as trocas.

## Solução

```visualg
algoritmo "Desafio1214S"
var
  a, b, c, aux: inteiro
inicio
  escreva("Primeiro: ")
  leia(a)
  escreva("Segundo: ")
  leia(b)
  escreva("Terceiro: ")
  leia(c)
  se a > b entao
    aux <- a
    a <- b
    b <- aux
  fimse
  se b > c entao
    aux <- b
    b <- c
    c <- aux
  fimse
  se a > b entao
    aux <- a
    a <- b
    b <- aux
  fimse
  escreval(a, ", ", b, ", ", c)
fimalgoritmo
```

Três comparações e trocas deixam os valores em ordem.
