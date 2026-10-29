# Passos do passeio

**Data:** 6 de janeiro · **Nível:** Simples

## Objetivo

Converta uma distância de quilômetros para metros.

Converta uma distância informada em quilômetros para metros.

## Como funciona

Leia um número real e multiplique por 1000, pois um quilômetro contém mil metros.

## Exemplo de execução

```text
Distância (km): 2.5
Distância (m): 2500
```

Zero quilômetro corresponde a zero metro.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0106S"
var
quilometros, metros: real
inicio
escreva("Distância (km): ")
  leia(quilometros)
  metros <- quilometros * 1000
  escreval("Distância (m): ", metros)
fimalgoritmo
```

A multiplicação realiza a conversão sem arredondar a entrada antes do cálculo.
