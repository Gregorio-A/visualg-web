# Pedido de papelaria

**Data:** 11 de maio · **Nível:** Simples

## Objetivo

Some o preço de quatro materiais.

## Como funciona

Leia os preços de quatro materiais e some os quatro valores.

## Exemplo de execução

```text
Material 1: 2
Material 2: 3
Material 3: 4
Material 4: 5
Total dos materiais: 14
```

Material de preço zero não altera a soma.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0511S"
var
a, b, c, d, resultado: real
inicio
escreva("Material 1: ")
  leia(a)
  escreva("Material 2: ")
  leia(b)
  escreva("Material 3: ")
  leia(c)
  escreva("Material 4: ")
  leia(d)
  resultado <- a + b + c + d
  escreval("Total dos materiais: ", resultado)
fimalgoritmo
```

A expressão `a + b + c + d` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
