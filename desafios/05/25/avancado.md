# Escala de almoço

**Data:** 25 de maio · **Nível:** Avançado

## Objetivo

Distribua pausas preservando mínimo de pessoas disponíveis em cada turno.

## Como funciona

Distribua uma pausa para cada pessoa em rodadas. No máximo pessoas menos mínimo podem pausar ao mesmo tempo; informe o tamanho de cada rodada.

## Exemplo de execução

```text
8 pessoas, mínimo 5
Rodadas de 3, 3 e 2 pessoas
```

Se mínimo for igual ao total, nenhuma pausa simultânea é possível nesta escala.

## Dicas para resolução

1. Calcule quantas podem sair simultaneamente.
2. Agrupe pessoas até esse limite.
3. Trate o grupo final menor.

## Solução

```visualg
algoritmo "Desafio0525A"
var
pessoas, minimo, grupos, i, pausas, restantes: inteiro
inicio
escreva("Pessoas no turno: ")
  leia(pessoas)
  escreva("Mínimo que deve permanecer: ")
  leia(minimo)
  se (pessoas < 0) ou (minimo < 0) ou (minimo > pessoas) entao
    escreval("Dados inválidos")
  senao
    pausas <- pessoas - minimo
    se pausas = 0 entao
      escreval("Não há pessoas livres para pausa simultânea")
    senao
      grupos <- pessoas div pausas
      se grupos * pausas < pessoas entao
        grupos <- grupos + 1
      fimse
      restantes <- pessoas
      para i de 1 ate grupos faca
        se restantes >= pausas entao
          escreval("Rodada ", i, ": ", pausas, " pessoa(s) em pausa")
          restantes <- restantes - pausas
        senao
          escreval("Rodada ", i, ": ", restantes, " pessoa(s) em pausa")
          restantes <- 0
        fimse
      fimpara
    fimse
  fimse
fimalgoritmo
```

A capacidade de pausa por rodada preserva automaticamente o mínimo em serviço.
