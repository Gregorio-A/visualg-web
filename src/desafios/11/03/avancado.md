# Simulador de portas

**Data:** 3 de novembro · **Nível:** Avançado

## Objetivo

Avalie uma expressão combinando AND, OR e NOT a partir de entradas lógicas.

## Como funciona

Leia duas entradas lógicas e calcule NOT A, A AND B, A OR B e a expressão composta (A AND B) OR (NOT A).

## Exemplo de execução

```text
A=falso, B=verdadeiro → expressão composta verdadeira
```

**Como ler o exemplo:** a seta → significa "resulta em".

Use entradas lógicas válidas, verdadeiro ou falso.

## Dicas para resolução

1. Calcule NOT A.
2. Calcule A AND B.
3. Combine com OR.

## Solução

```visualg
algoritmo "Desafio1103A"
var
a, b, naoA, eLogico, ouLogico, resultado: logico
inicio
escreva("Entrada A (verdadeiro/falso): ")
  leia(a)
  escreva("Entrada B (verdadeiro/falso): ")
  leia(b)
  naoA <- nao a
  eLogico <- a e b
  ouLogico <- a ou b
  resultado <- (a e b) ou (nao a)
  escreval("NOT A: ", naoA)
  escreval("A AND B: ", eLogico)
  escreval("A OR B: ", ouLogico)
  escreval("(A AND B) OR (NOT A): ", resultado)
fimalgoritmo
```

A expressão composta combina os resultados das portas AND e NOT com OR.
