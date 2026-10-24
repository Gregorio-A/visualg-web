# Termômetro duplo

**Data:** 12 de julho · **Nível:** Simples

## Objetivo

Converta Fahrenheit para Celsius.

## Como funciona

Use a fórmula C = (F − 32) × 5 / 9.

## Exemplo de execução

```text
68 °F → 20 °C
```

**Como ler o exemplo:** a seta → significa "resulta em".

32 °F corresponde a 0 °C.

## Dicas para resolução

1. Subtraia 32.
2. Multiplique por 5.
3. Divida por 9.

## Solução

```visualg
algoritmo "Desafio0712S"
var
fahrenheit, celsius: real
inicio
escreva("Temperatura em Fahrenheit: ")
  leia(fahrenheit)
  celsius <- (fahrenheit - 32) * 5 / 9
  escreval("Celsius: ", celsius)
fimalgoritmo
```

A fórmula ajusta origem e escala entre as duas unidades.
