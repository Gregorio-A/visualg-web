# Média do bimestre

**Data:** 10 de março · **Nível:** Simples

## Objetivo

Calcule a média aritmética de quatro notas.

## Como funciona

Leia quatro notas de mesmo peso e divida sua soma por quatro.

## Exemplo de execução

```text
Notas: 5, 7, 9, 7
Média: 7
```

Quatro notas iguais têm média igual a cada uma delas.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0310S"
var
a, b, c, d, media: real
inicio
escreva("Nota 1: ")
  leia(a)
  escreva("Nota 2: ")
  leia(b)
  escreva("Nota 3: ")
  leia(c)
  escreva("Nota 4: ")
  leia(d)
  media <- (a + b + c + d) / 4
  escreval("Média: ", media)
fimalgoritmo
```

Os parênteses aplicam a divisão à soma completa.
