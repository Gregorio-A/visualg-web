# Peças de computador

**Data:** 11 de agosto · **Nível:** Simples

## Objetivo

Some preços de processador, memória e armazenamento.

## Como funciona

Some o preço de uma peça de cada categoria.

## Exemplo de execução

```text
R$ 500, R$ 200 e R$ 300 → R$ 1000
```

**Como ler o exemplo:** a seta → significa "resulta em".

Peça gratuita contribui com zero.

## Dicas para resolução

1. Leia três preços.
2. Some.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0811S"
var
processador, memoria, armazenamento: real
inicio
escreva("Preço do processador: ")
  leia(processador)
  escreva("Preço da memória: ")
  leia(memoria)
  escreva("Preço do armazenamento: ")
  leia(armazenamento)
  se (processador < 0) ou (memoria < 0) ou (armazenamento < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Total: R$ ", processador + memoria + armazenamento)
  fimse
fimalgoritmo
```

A soma compõe o custo total do conjunto.
