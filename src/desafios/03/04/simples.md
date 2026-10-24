# Hora de estudar

**Data:** 4 de março · **Nível:** Simples

## Objetivo

Converta horas de estudo em minutos.

## Como funciona

Leia horas, inclusive valores fracionários, e multiplique por sessenta.

## Exemplo de execução

```text
Horas de estudo: 1.5
Minutos: 90
```

Zero hora corresponde a zero minuto.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0304S"
var
horas, minutos: real
inicio
escreva("Horas de estudo: ")
  leia(horas)
  minutos <- horas * 60
  escreval("Minutos: ", minutos)
fimalgoritmo
```

Usar tipo real permite representar meia hora sem perder informação.
