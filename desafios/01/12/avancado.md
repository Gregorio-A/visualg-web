# Monitor de reservatório

**Data:** 12 de janeiro · **Nível:** Avançado

## Objetivo

Simule entradas e saídas de água por turnos, impedindo volume negativo ou excessivo.

Simule variações do volume de água por turnos sem deixar o reservatório vazio além de zero nem ultrapassar sua capacidade.

## Como funciona

Leia capacidade, volume inicial e quantidade de turnos. Em cada turno, um número positivo representa entrada de água e um negativo, saída. Rejeite integralmente o movimento que levaria o volume para fora do intervalo permitido.

## Exemplo de execução

```text
Capacidade: 100; inicial: 60; turnos: +30, +20, -50
Volume após turno 1: 90
Turno 2 rejeitado; volume: 90
Volume após turno 3: 40
```

Um movimento que deixa o volume exatamente em zero ou na capacidade é aceito.

## Dicas para resolução

1. Modele entrada e saída com o sinal da variação.
2. Calcule `volume + movimento` antes da atribuição.
3. Rejeite a movimentação inteira quando ultrapassar os limites.

## Solução

```visualg
algoritmo "Desafio0112A"
var
capacidade, volume, movimento: real
  turnos, i: inteiro
inicio
escreva("Capacidade do reservatório: ")
  leia(capacidade)
  escreva("Volume inicial: ")
  leia(volume)
  escreva("Número de turnos: ")
  leia(turnos)
  se (capacidade < 0) ou (volume < 0) ou (volume > capacidade) ou (turnos < 0) entao
    escreval("Dados iniciais inválidos.")
  senao
    para i de 1 ate turnos faca
      escreva("Variação no turno ", i, " (entrada positiva; saída negativa): ")
      leia(movimento)
      se (volume + movimento >= 0) e (volume + movimento <= capacidade) entao
        volume <- volume + movimento
      senao
        escreval("Movimento rejeitado no turno ", i)
      fimse
      escreval("Volume atual: ", volume)
    fimpara
  fimse
fimalgoritmo
```

O estado só é atualizado quando o novo volume pertence ao intervalo de 0 até a capacidade.
