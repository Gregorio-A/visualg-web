# Compostagem

**Data:** 25 de setembro · **Nível:** Simples

## Objetivo

Calcule massa restante após perda percentual.

## Como funciona

A perda percentual incide sobre a massa inicial.

## Exemplo de execução

```text
100 kg com 20% de perda → 80 kg
```

**Como ler o exemplo:** a seta → significa "resulta em".

Perda de 100% deixa zero.

## Dicas para resolução

1. Converta % em fração.
2. Subtraia de 1.
3. Multiplique pela massa.

## Solução

```visualg
algoritmo "Desafio0925S"
var
massa, perda: real
inicio
escreva("Massa inicial (kg): ")
  leia(massa)
  escreva("Perda percentual: ")
  leia(perda)
  se (massa < 0) ou (perda < 0) ou (perda > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Massa restante: ", massa * (1 - perda / 100), " kg")
  fimse
fimalgoritmo
```

A fração restante multiplica a massa original.
