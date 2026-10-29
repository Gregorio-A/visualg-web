# Cicloturismo

**Data:** 23 de janeiro · **Nível:** Avançado

## Objetivo

Calcule distância acumulada, desnível e pausas para uma sequência de trechos.

Resuma uma rota de bicicleta formada por vários trechos.

## Como funciona

Leia distância, variação de altura com sinal e duração da pausa após cada trecho. Some distância e pausas; separe ganho de altura e perda de altura para não cancelar subida com descida.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Trecho 1: 5 km, +100 m, pausa 10 min; trecho 2: 3 km, -40 m, pausa 5 min
Distância total: 8 km
Subida: 100 m; descida: 40 m; pausas: 15 min
```

Trechos de distância zero são permitidos. Distância ou pausa negativa torna o trecho inválido.

## Dicas para resolução

1. Mantenha acumuladores separados.
2. Trate o sinal do desnível.
3. Valide os valores que não podem ser negativos.

## Solução

```visualg
algoritmo "Desafio0123A"
var
trechos, i: inteiro
  distancia, variacaoAltura, minutosPausa, totalDistancia, subida, descida, totalPausas: real
inicio
escreva("Número de trechos: ")
  leia(trechos)
  totalDistancia <- 0
  subida <- 0
  descida <- 0
  totalPausas <- 0
  para i de 1 ate trechos faca
    escreva("Distância do trecho ", i, " (km): ")
    leia(distancia)
    escreva("Variação de altura (m): ")
    leia(variacaoAltura)
    escreva("Pausa após o trecho (min): ")
    leia(minutosPausa)
    se (distancia >= 0) e (minutosPausa >= 0) entao
      totalDistancia <- totalDistancia + distancia
      totalPausas <- totalPausas + minutosPausa
      se variacaoAltura >= 0 entao
        subida <- subida + variacaoAltura
      senao
        descida <- descida - variacaoAltura
      fimse
    senao
      escreval("Trecho inválido ignorado.")
    fimse
  fimpara
  escreval("Distância total: ", totalDistancia, " km")
  escreval("Subida acumulada: ", subida, " m")
  escreval("Descida acumulada: ", descida, " m")
  escreval("Pausas: ", totalPausas, " min")
fimalgoritmo
```

A variação positiva alimenta `subida`; a negativa tem o sinal invertido para compor `descida` como magnitude positiva.
