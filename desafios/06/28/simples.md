# Custo da decoração

**Data:** 28 de junho · **Nível:** Simples

## Objetivo

Some preços de três materiais decorativos.

## Como funciona

Some o preço de três materiais decorativos.

## Exemplo de execução

```text
R$ 4, R$ 5 e R$ 6 → R$ 15
```

**Como ler o exemplo:** a seta → significa "resulta em".

Material gratuito pode ter preço zero.

## Dicas para resolução

1. Leia os três preços.
2. Some.
3. Exiba em reais.

## Solução

```visualg
algoritmo "Desafio0628S"
var
primeiro, segundo, terceiro: real
inicio
escreva("Custo do material 1: ")
  leia(primeiro)
  escreva("Custo do material 2: ")
  leia(segundo)
  escreva("Custo do material 3: ")
  leia(terceiro)
  se (primeiro < 0) ou (segundo < 0) ou (terceiro < 0) entao
    escreval("Custo inválido")
  senao
    escreval("Decoração: R$ ", primeiro + segundo + terceiro)
  fimse
fimalgoritmo
```

O orçamento é a soma de cada material.
