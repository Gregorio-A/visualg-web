# Inventário florestal

**Data:** 23 de setembro · **Nível:** Avançado

## Objetivo

Classifique árvores por faixas de altura e produza distribuição de frequências.

## Como funciona

Classifique doze árvores em três faixas: abaixo de 2 m, de 2 m até menos de 5 m, e 5 m ou mais.

## Exemplo de execução

```text
Alturas 1, 2 e 5 m → uma árvore em cada faixa
```

**Como ler o exemplo:** a seta → significa "resulta em".

Altura negativa é ignorada.

## Dicas para resolução

1. Defina limites.
2. Conte uma faixa por árvore.
3. Mostre distribuição.

## Solução

```visualg
algoritmo "Desafio0923A"
var
faixa: vetor[1..3] de inteiro
  i: inteiro
  altura: real
inicio
para i de 1 ate 3 faca
    faixa[i] <- 0
  fimpara
  para i de 1 ate 12 faca
    escreva("Altura da árvore ", i, " em metros: ")
    leia(altura)
    se altura < 0 entao
      escreval("Altura inválida")
    senao
      se altura < 2 entao
        faixa[1] <- faixa[1] + 1
      senao
        se altura < 5 entao
          faixa[2] <- faixa[2] + 1
        senao
          faixa[3] <- faixa[3] + 1
        fimse
      fimse
    fimse
  fimpara
  escreval("Abaixo de 2 m: ", faixa[1])
  escreval("De 2 a menos de 5 m: ", faixa[2])
  escreval("5 m ou mais: ", faixa[3])
fimalgoritmo
```

A sequência de condições separa intervalos sem sobreposição.
