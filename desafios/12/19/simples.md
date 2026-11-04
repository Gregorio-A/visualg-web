# Nota da decoração

**Data:** 19 de dezembro · **Nível:** Simples

## Objetivo

Calcule média de três avaliações.

## Como funciona

As avaliações vão de 0 a 10 e têm peso igual.

## Exemplo de execução

```text
8, 9, 10 → média 9
```

**Como ler o exemplo:** a seta → significa "resulta em".

Três notas iguais preservam esse valor.

## Dicas para resolução

1. Leia notas de 0 a 10.
2. Some as três avaliações.
3. Divida por três.

## Solução

```visualg
algoritmo "Desafio1219S"
var
  a, b, c: real
inicio
  escreva("Nota 1: ")
  leia(a)
  escreva("Nota 2: ")
  leia(b)
  escreva("Nota 3: ")
  leia(c)
  se (a < 0) ou (a > 10) ou (b < 0) ou (b > 10) ou (c < 0) ou (c > 10) entao
    escreval("Nota inválida")
  senao
    escreval("Média: ", (a+b+c)/3:0:2)
  fimse
fimalgoritmo
```

Divida a soma das notas por três.
