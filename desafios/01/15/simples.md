# Temperatura convertida

**Data:** 15 de janeiro · **Nível:** Simples

## Objetivo

Transforme Celsius em Fahrenheit.

Converta uma temperatura de graus Celsius para Fahrenheit.

## Como funciona

Leia Celsius e aplique a fórmula `F = C × 9 / 5 + 32`.

## Exemplo de execução

```text
Temperatura (°C): 0
Temperatura (°F): 32
```

Para 100 °C, o resultado esperado é 212 °F.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0115S"
var
celsius, fahrenheit: real
inicio
escreva("Temperatura (°C): ")
  leia(celsius)
  fahrenheit <- celsius * 9 / 5 + 32
  escreval("Temperatura (°F): ", fahrenheit)
fimalgoritmo
```

A variável `fahrenheit` guarda o resultado antes de mostrá-lo.
