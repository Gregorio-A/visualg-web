# Visitas familiares

**Data:** 25 de dezembro · **Nível:** Simples

## Objetivo

Some distâncias de três trajetos.

## Como funciona

Os três trechos usam quilômetros e pertencem ao mesmo percurso.

## Exemplo de execução

```text
5, 8 e 2 km → 15 km
```

**Como ler o exemplo:** a seta → significa "resulta em".

Um trecho zero não altera o total.

## Dicas para resolução

1. Leia as três distâncias em quilômetros.
2. Confirme que não há trecho negativo.
3. Some o percurso.

## Solução

```visualg
algoritmo "Desafio1225S"
var
  a, b, c: real
inicio
  escreva("Trecho 1 em km: ")
  leia(a)
  escreva("Trecho 2 em km: ")
  leia(b)
  escreva("Trecho 3 em km: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Distância inválida")
  senao
    escreval("Total: ", a+b+c:0:2, " km")
  fimse
fimalgoritmo
```

Some as três distâncias.
