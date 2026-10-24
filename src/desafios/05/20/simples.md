# Preço por quilograma

**Data:** 20 de maio · **Nível:** Simples

## Objetivo

Calcule o custo de um produto vendido por peso.

## Como funciona

Leia peso do produto em quilogramas e preço por quilograma; multiplique.

## Exemplo de execução

```text
Peso vendido (kg): 2.5
Preço por kg: 8
Custo da compra: 20
```

Peso zero produz custo zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0520S"
var
peso, preco, resultado: real
inicio
escreva("Peso vendido (kg): ")
  leia(peso)
  escreva("Preço por kg: ")
  leia(preco)
  resultado <- peso * preco
  escreval("Custo da compra: ", resultado)
fimalgoritmo
```

A expressão `peso * preco` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
