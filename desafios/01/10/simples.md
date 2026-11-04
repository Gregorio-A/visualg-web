# Relógio de férias

**Data:** 10 de janeiro · **Nível:** Simples

## Objetivo

Converta horas em minutos.

Converta um número de horas para minutos.

## Como funciona

Leia a duração em horas e multiplique por 60. Aceite frações de hora.

## Exemplo de execução

```text
Horas: 1.5
Minutos: 90
```

Meia hora, `0.5`, corresponde a 30 minutos.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0110S"
var
horas, minutos: real
inicio
escreva("Horas: ")
  leia(horas)
  minutos <- horas * 60
  escreval("Minutos: ", minutos)
fimalgoritmo
```

O tipo real permite trabalhar com durações que não são horas inteiras.
