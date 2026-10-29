# Competição de mergulho

**Data:** 27 de janeiro · **Nível:** Simples

## Objetivo

Calcule a média de três notas.

Calcule a média aritmética de três notas.

## Como funciona

Leia três valores reais, some-os e divida por três.

## Exemplo de execução

```text
Nota 1: 6
Nota 2: 8
Nota 3: 10
Média: 8
```

Três notas iguais produzem média igual a cada nota.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0127S"
var
primeira, segunda, terceira, media: real
inicio
escreva("Nota 1: ")
  leia(primeira)
  escreva("Nota 2: ")
  leia(segunda)
  escreva("Nota 3: ")
  leia(terceira)
  media <- (primeira + segunda + terceira) / 3
  escreval("Média: ", media)
fimalgoritmo
```

Os parênteses garantem que a divisão seja aplicada à soma completa.
