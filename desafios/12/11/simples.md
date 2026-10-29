# Entrega de presentes

**Data:** 11 de dezembro · **Nível:** Simples

## Objetivo

Calcule a distância total de ida e volta.

## Como funciona

A volta percorre a mesma distância da ida.

## Exemplo de execução

```text
12,5 km de ida → 25 km
```

**Como ler o exemplo:** a seta → significa "resulta em".

Distância zero permanece zero.

## Dicas para resolução

1. Leia apenas a distância de ida.
2. A volta tem distância igual.
3. Multiplique por dois.

## Solução

```visualg
algoritmo "Desafio1211S"
var
  ida: real
inicio
  escreva("Distância de ida em km: ")
  leia(ida)
  se ida < 0 entao
    escreval("Distância inválida")
  senao
    escreval("Ida e volta: ", 2*ida:0:2, " km")
  fimse
fimalgoritmo
```

Some duas vezes a distância de ida.
