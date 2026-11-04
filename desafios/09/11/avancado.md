# Mutirão de limpeza

**Data:** 11 de setembro · **Nível:** Avançado

## Objetivo

Organize coleta por equipe e área e classifique rendimento por hora.

## Como funciona

Seis coletas registram equipe, área, massa e horas. Some massa e tempo por equipe; classifique a de maior rendimento em kg/h.

## Exemplo de execução

```text
Equipe A recolhe 20 kg em 2 h → rendimento 10 kg/h
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tempo zero não entra no cálculo; equipe sem coleta não recebe média.

## Dicas para resolução

1. Some massa por equipe.
2. Some horas por equipe.
3. Divida e compare rendimentos.

## Solução

```visualg
algoritmo "Desafio0911A"
var
equipe, area: vetor[1..6] de inteiro
  massa, horas: vetor[1..6] de real
  total: vetor[1..3] de real
  tempo: vetor[1..3] de real
  i, j, melhor: inteiro
  rendimento, maior: real
inicio
para i de 1 ate 3 faca
    total[i] <- 0
    tempo[i] <- 0
  fimpara
  para i de 1 ate 6 faca
    escreva("Equipe da coleta ", i, " (1 a 3): ")
    leia(equipe[i])
    escreva("Área (1 a 3): ")
    leia(area[i])
    escreva("Massa recolhida (kg): ")
    leia(massa[i])
    escreva("Tempo (h): ")
    leia(horas[i])
    se (equipe[i] >= 1) e (equipe[i] <= 3) e (area[i] >= 1) e (area[i] <= 3) e (massa[i] >= 0) e (horas[i] > 0) entao
      total[equipe[i]] <- total[equipe[i]] + massa[i]
      tempo[equipe[i]] <- tempo[equipe[i]] + horas[i]
      escreval("Área ", area[i], " registrada para equipe ", equipe[i])
    fimse
  fimpara
  maior <- -1
  para i de 1 ate 3 faca
    se tempo[i] > 0 entao
      rendimento <- total[i] / tempo[i]
      escreval("Equipe ", i, ": ", total[i], " kg em ", tempo[i], " h; ", rendimento, " kg/h")
      se rendimento > maior entao
        maior <- rendimento
        melhor <- i
      fimse
    fimse
  fimpara
  se maior >= 0 entao
    escreval("Maior rendimento: equipe ", melhor)
  fimse
fimalgoritmo
```

O rendimento agregado usa massa total dividida por tempo total de cada equipe.
