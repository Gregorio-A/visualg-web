# Painel de sensores

**Data:** 12 de julho · **Nível:** Avançado

## Objetivo

Identifique leituras fora de faixa e calcule média sem valores inválidos.

## Como funciona

Defina limites inclusivos e leia dez medições. Marque as fora da faixa e calcule média somente das leituras dentro dos limites.

## Exemplo de execução

```text
Faixa 0–10; leituras 5 e 15 → uma fora, média válida 5
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem leitura válida, não divida por zero.

## Dicas para resolução

1. Compare cada leitura aos limites.
2. Some apenas as válidas.
3. Divida pela quantidade válida.

## Solução

```visualg
algoritmo "Desafio0712A"
var
leitura: vetor[1..10] de real
  i, validas, fora: inteiro
  minimo, maximo, soma: real
inicio
escreva("Limite mínimo: ")
  leia(minimo)
  escreva("Limite máximo: ")
  leia(maximo)
  se minimo > maximo entao
    escreval("Faixa inválida")
  senao
    soma <- 0
    validas <- 0
    fora <- 0
    para i de 1 ate 10 faca
      escreva("Leitura ", i, ": ")
      leia(leitura[i])
      se (leitura[i] < minimo) ou (leitura[i] > maximo) entao
        fora <- fora + 1
        escreval("Fora da faixa")
      senao
        validas <- validas + 1
        soma <- soma + leitura[i]
      fimse
    fimpara
    escreval("Fora da faixa: ", fora)
    se validas > 0 entao
      escreval("Média válida: ", soma / validas)
    senao
      escreval("Sem leituras válidas para média")
    fimse
  fimse
fimalgoritmo
```

A contagem de válidas é o denominador da média filtrada.
