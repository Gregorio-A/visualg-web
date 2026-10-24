# Trilha da mata

**Data:** 21 de setembro · **Nível:** Simples

## Objetivo

Calcule o tempo de caminhada por distância e velocidade.

## Como funciona

Assuma velocidade constante e use tempo = distância / velocidade.

## Exemplo de execução

```text
12 km a 4 km/h → 3 h
```

**Como ler o exemplo:** a seta → significa "resulta em".

Velocidade zero torna o cálculo impossível.

## Dicas para resolução

1. Leia km.
2. Leia km/h.
3. Divida após validar.

## Solução

```visualg
algoritmo "Desafio0921S"
var
distancia, velocidade: real
inicio
escreva("Distância da trilha (km): ")
  leia(distancia)
  escreva("Velocidade média (km/h): ")
  leia(velocidade)
  se (distancia < 0) ou (velocidade <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Tempo estimado: ", distancia / velocidade, " h")
  fimse
fimalgoritmo
```

As unidades km e km/h resultam em horas.
