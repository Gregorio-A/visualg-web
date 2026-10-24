# Percurso do bloco

**Data:** 22 de fevereiro · **Nível:** Simples

## Objetivo

Some distâncias de três trechos de rua.

## Como funciona

Some as distâncias de três trechos consecutivos na mesma unidade.

## Exemplo de execução

```text
Trecho 1 (km): 1
Trecho 2 (km): 2.5
Trecho 3 (km): 0.5
Percurso total (km): 4
```

Um trecho de distância zero não altera o percurso.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0222S"
var
a, b, c, total: real
inicio
escreva("Trecho 1 (km): ")
  leia(a)
  escreva("Trecho 2 (km): ")
  leia(b)
  escreva("Trecho 3 (km): ")
  leia(c)
  total <- a + b + c
  escreval("Percurso total (km): ", total)
fimalgoritmo
```

A soma de trechos fornece a distância percorrida.
