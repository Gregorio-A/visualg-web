# Painéis solares

**Data:** 4 de setembro · **Nível:** Avançado

## Objetivo

Simule produção diária de vários painéis com eficiências e sombreamentos diferentes.

## Como funciona

Três painéis têm potência, eficiência e sombreamento próprios. Para cinco dias com horas de sol informadas, calcule kWh por painel e dia.

## Exemplo de execução

```text
1000 W, 4 h, 80% de eficiência, 25% de sombra → 2,4 kWh
```

**Como ler o exemplo:** a seta → significa "resulta em".

Percentuais fora de 0–100% invalidam aquele painel na soma.

## Dicas para resolução

1. Multiplique W por horas.
2. Aplique eficiência e sombra.
3. Divida Wh por mil.

## Solução

```visualg
algoritmo "Desafio0904A"
var
potencia, eficiencia, sombra: vetor[1..3] de real
  i, dia: inteiro
  horas, geracao, total: real
inicio
para i de 1 ate 3 faca
    escreva("Potência do painel ", i, " em W: ")
    leia(potencia[i])
    escreva("Eficiência percentual: ")
    leia(eficiencia[i])
    escreva("Sombreamento percentual: ")
    leia(sombra[i])
  fimpara
  para dia de 1 ate 5 faca
    escreva("Horas ideais de sol no dia ", dia, ": ")
    leia(horas)
    total <- 0
    se horas >= 0 entao
      para i de 1 ate 3 faca
        se (potencia[i] >= 0) e (eficiencia[i] >= 0) e (eficiencia[i] <= 100) e (sombra[i] >= 0) e (sombra[i] <= 100) entao
          geracao <- potencia[i] * horas * eficiencia[i] / 100 * (1 - sombra[i] / 100) / 1000
          total <- total + geracao
          escreval("Painel ", i, ": ", geracao, " kWh")
        fimse
      fimpara
    fimse
    escreval("Dia ", dia, ": ", total, " kWh")
  fimpara
fimalgoritmo
```

A produção teórica é reduzida pela eficiência e pela fração sem sombra.
