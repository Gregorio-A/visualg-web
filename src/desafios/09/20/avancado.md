# Economia acumulada

**Data:** 20 de setembro · **Nível:** Avançado

## Objetivo

Compare séries mensais de consumo e gere projeção pela média móvel.

## Como funciona

Leia oito consumos mensais. Mostre diferença mês a mês, soma dessas diferenças e projeção do mês seguinte pela média móvel dos últimos três.

## Exemplo de execução

```text
Últimos meses 90, 80, 70 → projeção 80
```

**Como ler o exemplo:** a seta → significa "resulta em".

Economia acumulada telescópica equivale ao primeiro consumo menos o último; pode ser negativa se houve aumento.

## Dicas para resolução

1. Compare meses adjacentes.
2. Some as diferenças.
3. Faça média dos meses 6 a 8.

## Solução

```visualg
algoritmo "Desafio0920A"
var
consumo: vetor[1..8] de real
  mes: inteiro
  media, economia: real
inicio
para mes de 1 ate 8 faca
    escreva("Consumo do mês ", mes, ": ")
    leia(consumo[mes])
  fimpara
  economia <- 0
  para mes de 2 ate 8 faca
    economia <- economia + consumo[mes - 1] - consumo[mes]
    escreval("Diferença mês ", mes - 1, " para ", mes, ": ", consumo[mes - 1] - consumo[mes])
  fimpara
  media <- (consumo[6] + consumo[7] + consumo[8]) / 3
  escreval("Economia acumulada relativa aos meses anteriores: ", economia)
  escreval("Projeção do próximo mês pela média dos últimos 3: ", media)
fimalgoritmo
```

A média móvel suaviza os três meses mais recentes para projetar o próximo.
