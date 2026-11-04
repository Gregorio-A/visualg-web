# Resumo de julho

**Data:** 31 de julho · **Nível:** Simples

## Objetivo

Calcule média de quatro temperaturas.

## Como funciona

Some quatro medições e divida por quatro.

## Exemplo de execução

```text
10, 12, 14 e 16 °C → média 13 °C
```

**Como ler o exemplo:** a seta → significa "resulta em".

Temperaturas negativas são válidas.

## Dicas para resolução

1. Some as quatro.
2. Divida por quatro.
3. Mostre a média.

## Solução

```visualg
algoritmo "Desafio0731S"
var
a, b, c, d: real
inicio
escreva("Quatro temperaturas de julho: ")
  leia(a, b, c, d)
  escreval("Média: ", (a + b + c + d) / 4)
fimalgoritmo
```

A média aritmética representa o valor central das quatro leituras.
