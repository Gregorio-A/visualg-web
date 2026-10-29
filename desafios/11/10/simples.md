# Coordenadas do cursor

**Data:** 10 de novembro · **Nível:** Simples

## Objetivo

Leia X e Y e exiba a posição formatada.

## Como funciona

Leia dois inteiros e apresente a posição no formato (X, Y).

## Exemplo de execução

```text
X=2, Y=3 → Posição: (2, 3)
```

**Como ler o exemplo:** a seta → significa "resulta em".

Coordenadas negativas são aceitas.

## Dicas para resolução

1. Leia X.
2. Leia Y.
3. Formate a saída.

## Solução

```visualg
algoritmo "Desafio1110S"
var
x, y: inteiro
inicio
escreva("Coordenada X: ")
  leia(x)
  escreva("Coordenada Y: ")
  leia(y)
  escreval("Posição: (", x, ", ", y, ")")
fimalgoritmo
```

A saída combina os dois valores com pontuação fixa.
