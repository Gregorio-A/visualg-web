# Calibrador de controle

**Data:** 26 de agosto · **Nível:** Avançado

## Objetivo

Normalize eixos numéricos e aplique zona morta com limite configurável.

## Como funciona

Normalize eixos de -100 a 100 para -1 a 1. Valores na zona morta simétrica viram zero; fora dela, reescale o trecho restante.

## Exemplo de execução

```text
Zona 20; X=20 → 0; X=60 → 0,5; X=100 → 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zona 100 seria divisão por zero e é recusada.

## Dicas para resolução

1. Trate três faixas: negativa, morta e positiva.
2. Subtraia a zona.
3. Divida pela amplitude restante.

## Solução

```visualg
algoritmo "Desafio0826A"
var
x, y, zona, normalizadoX, normalizadoY: real
inicio
escreva("Eixo X (-100 a 100): ")
  leia(x)
  escreva("Eixo Y (-100 a 100): ")
  leia(y)
  escreva("Zona morta (0 a 100): ")
  leia(zona)
  se (x < -100) ou (x > 100) ou (y < -100) ou (y > 100) ou (zona < 0) ou (zona >= 100) entao
    escreval("Dados inválidos")
  senao
    normalizadoX <- 0
    normalizadoY <- 0
    se x > zona entao
      normalizadoX <- (x - zona) / (100 - zona)
    fimse
    se x < 0 - zona entao
      normalizadoX <- (x + zona) / (100 - zona)
    fimse
    se y > zona entao
      normalizadoY <- (y - zona) / (100 - zona)
    fimse
    se y < 0 - zona entao
      normalizadoY <- (y + zona) / (100 - zona)
    fimse
    escreval("Eixo calibrado: X=", normalizadoX, ", Y=", normalizadoY)
  fimse
fimalgoritmo
```

A transformação remove a zona central e preserva os extremos do eixo.
