# Temperatura mínima

**Data:** 2 de julho · **Nível:** Simples

## Objetivo

Leia três temperaturas e exiba a menor.

## Como funciona

Compare três temperaturas, incluindo valores negativos.

## Exemplo de execução

```text
5, -2, 3 → mínima -2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empates mantêm a mesma mínima.

## Dicas para resolução

1. Comece com a primeira.
2. Compare a segunda.
3. Compare a terceira.

## Solução

```visualg
algoritmo "Desafio0702S"
var
a, b, c, menor: real
inicio
escreva("Três temperaturas: ")
  leia(a, b, c)
  menor <- a
  se b < menor entao
    menor <- b
  fimse
  se c < menor entao
    menor <- c
  fimse
  escreval("Mínima: ", menor)
fimalgoritmo
```

Uma variável guarda o menor valor encontrado até o momento.
