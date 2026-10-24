# Caldeirão mágico

**Data:** 8 de outubro · **Nível:** Simples

## Objetivo

Some volumes de três ingredientes.

## Como funciona

Some os três volumes na mesma unidade.

## Exemplo de execução

```text
100, 50 e 25 mL → 175 mL
```

**Como ler o exemplo:** a seta → significa "resulta em".

Ingrediente ausente pode ter zero mL.

## Dicas para resolução

1. Leia três volumes.
2. Some.
3. Mostre mL.

## Solução

```visualg
algoritmo "Desafio1008S"
var
a, b, c: real
inicio
escreva("Volumes dos três ingredientes em mL: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Volume inválido")
  senao
    escreval("Volume do caldeirão: ", a + b + c, " mL")
  fimse
fimalgoritmo
```

A soma reúne os volumes adicionados.
