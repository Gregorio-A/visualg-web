# Game over

**Data:** 30 de agosto · **Nível:** Simples

## Objetivo

Informe se a vida chegou a zero.

## Como funciona

O jogo termina quando a vida chega a zero ou menos.

## Exemplo de execução

```text
Vida 0 → GAME OVER; vida 1 → jogo continua
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor negativo também representa personagem sem vida.

## Dicas para resolução

1. Leia a vida.
2. Compare com zero.
3. Mostre a situação.

## Solução

```visualg
algoritmo "Desafio0830S"
var
vida: real
inicio
escreva("Vida atual: ")
  leia(vida)
  se vida <= 0 entao
    escreval("GAME OVER")
  senao
    escreval("Jogo continua")
  fimse
fimalgoritmo
```

A condição <= cobre zero e valores inferiores.
