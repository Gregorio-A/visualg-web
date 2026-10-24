# Brilho da fantasia

**Data:** 13 de fevereiro · **Nível:** Simples

## Objetivo

Calcule a soma de três notas de acabamento.

## Como funciona

Leia as três notas de acabamento e some os valores sem calcular média.

## Exemplo de execução

```text
Nota de acabamento 1: 2
Nota de acabamento 2: 3
Nota de acabamento 3: 4
Soma das notas: 9
```

Nota zero não altera a soma.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0213S"
var
a, b, c, soma: real
inicio
escreva("Nota de acabamento 1: ")
  leia(a)
  escreva("Nota de acabamento 2: ")
  leia(b)
  escreva("Nota de acabamento 3: ")
  leia(c)
  soma <- a + b + c
  escreval("Soma das notas: ", soma)
fimalgoritmo
```

A variável `soma` recebe a adição das três avaliações.
