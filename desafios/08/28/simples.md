# Recompensa diária

**Data:** 28 de agosto · **Nível:** Simples

## Objetivo

Calcule bônus após N dias fixos.

## Como funciona

Cada dia concede o mesmo bônus fixo.

## Exemplo de execução

```text
5 dias de 10 moedas → 50 moedas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero dia dá bônus zero.

## Dicas para resolução

1. Leia dias.
2. Leia bônus diário.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0828S"
var
dias, bonusDiario, bonusTotal: inteiro
inicio
escreva("Dias de recompensa: ")
  leia(dias)
  escreva("Bônus fixo por dia: ")
  leia(bonusDiario)
  se (dias < 0) ou (bonusDiario < 0) entao
    escreval("Dados inválidos")
  senao
    bonusTotal <- dias * bonusDiario
    escreval("Bônus acumulado: ", bonusTotal)
  fimse
fimalgoritmo
```

A multiplicação soma o mesmo bônus N vezes.
