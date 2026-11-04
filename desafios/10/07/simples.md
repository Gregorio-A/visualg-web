# Vassoura veloz

**Data:** 7 de outubro · **Nível:** Simples

## Objetivo

Calcule velocidade média de uma bruxa fictícia.

## Como funciona

Divida a distância total pelo tempo total.

## Exemplo de execução

```text
60 km em 2 h → 30 km/h
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tempo zero impede a divisão.

## Dicas para resolução

1. Leia km.
2. Leia horas.
3. Divida.

## Solução

```visualg
algoritmo "Desafio1007S"
var
distancia, tempo: real
inicio
escreva("Distância percorrida (km): ")
  leia(distancia)
  escreva("Tempo gasto (h): ")
  leia(tempo)
  se (distancia < 0) ou (tempo <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Velocidade média: ", distancia / tempo, " km/h")
  fimse
fimalgoritmo
```

A razão entre km e h resulta em km/h.
