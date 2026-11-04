# Série enigmática

**Data:** 20 de abril · **Nível:** Avançado

## Objetivo

Identifique o primeiro termo cuja soma acumulada supera um alvo e exiba histórico.

## Como funciona

Gere os dez primeiros quadrados 1², 2², …, 10². Mostre cada termo com a soma acumulada e a primeira posição cuja soma supera um alvo informado.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Alvo 5
Somas: 1, 5, 14, …
Primeiro termo que supera o alvo: 3
```

Igualdade com o alvo ainda não conta como superação.

## Dicas para resolução

1. Defina a regra dos termos.
2. Some cada termo ao histórico.
3. Guarde a primeira posição de superação.

## Solução

```visualg
algoritmo "Desafio0420A"
var
alvo, termo, soma: inteiro
  i, primeiro: inteiro
inicio
escreva("Alvo da soma acumulada: ")
  leia(alvo)
  soma <- 0
  primeiro <- 0
  para i de 1 ate 10 faca
    termo <- i * i
    soma <- soma + termo
    escreval("Termo ", i, " = ", termo, "; soma ", soma)
    se (primeiro = 0) e (soma > alvo) entao
      primeiro <- i
    fimse
  fimpara
  se primeiro > 0 entao
    escreval("Primeiro termo que supera o alvo: ", primeiro)
  senao
    escreval("Alvo não superado nos dez termos.")
  fimse
fimalgoritmo
```

O índice é registrado apenas na primeira vez em que `soma > alvo`.
