# Rios e nascentes

**Data:** 19 de setembro · **Nível:** Simples

## Objetivo

Some volumes informados de três fontes.

## Como funciona

Some os volumes das três fontes na mesma unidade.

## Exemplo de execução

```text
10, 20 e 30 L → 60 L
```

**Como ler o exemplo:** a seta → significa "resulta em".

Fonte seca contribui com zero.

## Dicas para resolução

1. Leia três volumes.
2. Some.
3. Mostre L.

## Solução

```visualg
algoritmo "Desafio0919S"
var
a, b, c: real
inicio
escreva("Volumes das três fontes (L): ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Volume inválido")
  senao
    escreval("Volume conjunto: ", a + b + c, " L")
  fimse
fimalgoritmo
```

A soma reúne a contribuição de cada fonte.
