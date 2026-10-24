# Nota da fantasia

**Data:** 6 de fevereiro · **Nível:** Simples

## Objetivo

Leia três avaliações e calcule a média.

## Como funciona

Leia as três avaliações e calcule sua média aritmética, sem pesos diferentes.

## Exemplo de execução

```text
Avaliação 1: 7
Avaliação 2: 8
Avaliação 3: 9
Média: 8
```

Quando todas as notas são iguais, a média reproduz essa nota.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0206S"
var
a, b, c, media: real
inicio
escreva("Avaliação 1: ")
  leia(a)
  escreva("Avaliação 2: ")
  leia(b)
  escreva("Avaliação 3: ")
  leia(c)
  media <- (a + b + c) / 3
  escreval("Média: ", media)
fimalgoritmo
```

Somar antes de dividir garante que as três avaliações participem do cálculo.
