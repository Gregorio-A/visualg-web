# Jogo de cartas

**Data:** 16 de julho · **Nível:** Simples

## Objetivo

Compare dois valores e indique o maior.

## Como funciona

Compare os valores numéricos de duas cartas.

## Exemplo de execução

```text
Carta 8 e carta 5 → maior 8
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valores iguais produzem empate.

## Dicas para resolução

1. Leia duas cartas.
2. Compare >.
3. Trate igualdade.

## Solução

```visualg
algoritmo "Desafio0716S"
var
primeira, segunda: inteiro
inicio
escreva("Carta 1: ")
  leia(primeira)
  escreva("Carta 2: ")
  leia(segunda)
  se primeira > segunda entao
    escreval("Maior carta: ", primeira)
  senao
    se segunda > primeira entao
      escreval("Maior carta: ", segunda)
    senao
      escreval("Cartas iguais")
    fimse
  fimse
fimalgoritmo
```

Duas comparações e o caso restante cobrem todas as possibilidades.
