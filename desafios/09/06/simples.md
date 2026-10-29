# Sementes restantes

**Data:** 6 de setembro · **Nível:** Simples

## Objetivo

Calcule o saldo após semear parte das sementes.

## Como funciona

Desconte do estoque somente a quantidade semeada.

## Exemplo de execução

```text
100 sementes, 35 semeadas → 65 restantes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Semear todas deixa saldo zero.

## Dicas para resolução

1. Leia estoque.
2. Leia uso.
3. Subtraia após validar.

## Solução

```visualg
algoritmo "Desafio0906S"
var
estoque, semeadas: inteiro
inicio
escreva("Sementes disponíveis: ")
  leia(estoque)
  escreva("Sementes plantadas: ")
  leia(semeadas)
  se (estoque < 0) ou (semeadas < 0) ou (semeadas > estoque) entao
    escreval("Dados inválidos")
  senao
    escreval("Sementes restantes: ", estoque - semeadas)
  fimse
fimalgoritmo
```

A subtração representa o estoque após o plantio.
