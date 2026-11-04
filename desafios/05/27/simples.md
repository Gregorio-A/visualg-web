# Pesquisa de preço

**Data:** 27 de maio · **Nível:** Simples

## Objetivo

Calcule média de três preços pesquisados.

## Como funciona

Leia três preços e calcule a média aritmética.

## Exemplo de execução

```text
Preço 1: 10
Preço 2: 20
Preço 3: 30
Preço médio: 20
```

Três preços iguais produzem média igual ao preço comum.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0527S"
var
a, b, c, resultado: real
inicio
escreva("Preço 1: ")
  leia(a)
  escreva("Preço 2: ")
  leia(b)
  escreva("Preço 3: ")
  leia(c)
  resultado <- (a + b + c) / 3
  escreval("Preço médio: ", resultado)
fimalgoritmo
```

A expressão `(a + b + c) / 3` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
