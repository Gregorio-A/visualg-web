# Planejamento de trilhas

**Data:** 21 de setembro · **Nível:** Avançado

## Objetivo

Distribua atividades por trechos e estime horários com pausas.

## Como funciona

Quatro trechos têm distância, velocidade e pausa final próprias. Some tempo de caminhada e pausa a um relógio em minutos.

## Exemplo de execução

```text
Trecho 4 km a 4 km/h, pausa 15 min → 75 minutos até a retomada
```

**Como ler o exemplo:** a seta → significa "resulta em".

Velocidade zero invalida o trecho para evitar divisão por zero.

## Dicas para resolução

1. Calcule distância/velocidade.
2. Converta horas em minutos.
3. Some pausa após registrar chegada.

## Solução

```visualg
algoritmo "Desafio0921A"
var
trecho: vetor[1..4] de real
  velocidade, intervaloPausa: vetor[1..4] de real
  i: inteiro
  relogio: real
inicio
escreva("Horário inicial em minutos: ")
  leia(relogio)
  para i de 1 ate 4 faca
    escreva("Distância do trecho ", i, " (km): ")
    leia(trecho[i])
    escreva("Velocidade nesse trecho (km/h): ")
    leia(velocidade[i])
    escreva("Pausa ao fim do trecho (min): ")
    leia(intervaloPausa[i])
    se (trecho[i] >= 0) e (velocidade[i] > 0) e (intervaloPausa[i] >= 0) entao
      relogio <- relogio + trecho[i] / velocidade[i] * 60
      escreval("Chegada ao fim do trecho ", i, ": minuto ", relogio)
      relogio <- relogio + intervaloPausa[i]
      escreval("Retomada: minuto ", relogio)
    senao
      escreval("Trecho inválido ignorado")
    fimse
  fimpara
  escreval("Fim da trilha: minuto ", relogio)
fimalgoritmo
```

A duração em horas é multiplicada por sessenta antes de atualizar a agenda.
