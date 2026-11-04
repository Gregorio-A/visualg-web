# Duas passagens

**Data:** 8 de janeiro · **Nível:** Simples

## Objetivo

Calcule o total de passagens para ida e volta.

Calcule o custo de duas passagens de mesmo preço, uma para ida e outra para volta.

## Como funciona

Leia o preço unitário e multiplique por dois. Este exercício supõe a mesma tarifa nos dois sentidos.

## Exemplo de execução

```text
Preço de uma passagem: 18
Total de ida e volta: 36
```

Quando a passagem for gratuita, o custo total também será zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0108S"
var
preco, total: real
inicio
escreva("Preço de uma passagem: ")
  leia(preco)
  total <- 2 * preco
  escreval("Total de ida e volta: ", total)
fimalgoritmo
```

O fator dois representa exatamente os dois trajetos.
