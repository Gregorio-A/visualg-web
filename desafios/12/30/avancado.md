# Relógio de eventos

**Data:** 30 de dezembro · **Nível:** Avançado

## Objetivo

Simule a contagem de vários eventos até um horário-alvo em segundos.

## Como funciona

Quatro eventos e o instante atual são medidos em segundos desde 00:00 do mesmo dia; mostre contagem restante ou tempo decorrido.

## Exemplo de execução

```text
Agora 100 s, alvo 225 s → faltam 2 min e 5 s.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Alvo igual ao instante atual aparece como “agora”.

## Dicas para resolução

1. Guarde quatro alvos.
2. Calcule alvo menos instante atual.
3. Separe antes, agora e depois.

## Solução

```visualg
algoritmo "Desafio1230A"
var
  alvo, instante: vetor[1..4] de inteiro
  i, segundo, faltam: inteiro
inicio
  para i de 1 ate 4 faca
    escreva("Instante-alvo do evento ", i, " em segundos desde 00:00: ")
    leia(alvo[i])
    se alvo[i] < 0 entao
      alvo[i] <- 0
    fimse
  fimpara
  escreva("Segundo atual desde 00:00: ")
  leia(segundo)
  se segundo < 0 entao
    segundo <- 0
  fimse
  para i de 1 ate 4 faca
    faltam <- alvo[i]-segundo
    se faltam > 0 entao
      escreval("Evento ", i, ": faltam ", faltam div 60, " min e ", faltam mod 60, " s")
    senao
      se faltam = 0 entao
        escreval("Evento ", i, ": agora")
      senao
        escreval("Evento ", i, ": ocorreu há ", -faltam, " segundo(s)")
      fimse
    fimse
  fimpara
fimalgoritmo
```

Subtraia o instante atual de cada alvo e decomponha diferenças positivas.
