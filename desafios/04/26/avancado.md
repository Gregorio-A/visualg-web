# Validador de PIN

**Data:** 26 de abril · **Nível:** Avançado

## Objetivo

Valide lista de PINs com formato, exclusão de sequências óbvias e contagem de recusas.

## Como funciona

Leia cinco PINs inteiros. Exija quatro dígitos; rejeite quatro dígitos iguais ou quatro consecutivos crescentes; conte aceitos e recusados.

## Exemplo de execução

```text
PINs 1234, 7777, 2468
1234 recusado por sequência; 7777 por repetição; 2468 aceito
```

Esta regra não rejeita sequências decrescentes; elas ficam disponíveis para uma ampliação do exercício.

## Dicas para resolução

1. Valide primeiro a faixa de quatro dígitos.
2. Depois extraia e compare os dígitos.
3. Conte cada resultado uma só vez.

## Solução

```visualg
algoritmo "Desafio0426A"
var
pin, d1, d2, d3, d4, aceitos, recusados, i: inteiro
inicio
aceitos <- 0
  recusados <- 0
  para i de 1 ate 5 faca
    escreva("PIN ", i, ": ")
    leia(pin)
    se (pin >= 1000) e (pin <= 9999) entao
      d1 <- pin div 1000
      d2 <- (pin div 100) mod 10
      d3 <- (pin div 10) mod 10
      d4 <- pin mod 10
      se (d1 = d2) e (d2 = d3) e (d3 = d4) entao
        escreval("PIN recusado: dígitos iguais")
        recusados <- recusados + 1
      senao
        se (d2 = d1 + 1) e (d3 = d2 + 1) e (d4 = d3 + 1) entao
          escreval("PIN recusado: sequência crescente")
          recusados <- recusados + 1
        senao
          aceitos <- aceitos + 1
          escreval("PIN aceito")
        fimse
      fimse
    senao
      recusados <- recusados + 1
      escreval("PIN recusado: formato")
    fimse
  fimpara
  escreval("Aceitos: ", aceitos, "; recusados: ", recusados)
fimalgoritmo
```

Os dígitos são extraídos numericamente; cada PIN incrementa exatamente um dos dois contadores.
